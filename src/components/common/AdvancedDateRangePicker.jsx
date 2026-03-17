import React, { useMemo, useState } from "react";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function formatKey(year, monthIndex, day) {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function buildMonth(year, monthIndex) {
  const first = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  const jsWeekday = first.getDay();
  const mondayOffset = (jsWeekday + 6) % 7;

  const cells = [];
  for (let i = 0; i < mondayOffset; i += 1) cells.push({ empty: true, key: `empty-start-${monthIndex}-${i}` });
  for (let day = 1; day <= lastDay; day += 1) {
    cells.push({
      day,
      dateKey: formatKey(year, monthIndex, day),
      timestamp: new Date(year, monthIndex, day).setHours(0, 0, 0, 0),
      key: `${year}-${monthIndex}-${day}`,
    });
  }
  while (cells.length % 7 !== 0) cells.push({ empty: true, key: `empty-end-${monthIndex}-${cells.length}` });

  return {
    label: new Date(year, monthIndex, 1).toLocaleString("en-US", { month: "long", year: "numeric" }),
    cells,
  };
}

function nightsBetween(startTs, endTs) {
  if (!startTs || !endTs) return 0;
  const diff = Math.round((endTs - startTs) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

export default function AdvancedDateRangePicker({
  monthsToShow = 2,
  startMonth = new Date(2026, 3, 1),
  blockedDateKeys = [],
  minNights = 1,
  onChange,
}) {
  const [startTs, setStartTs] = useState(null);
  const [endTs, setEndTs] = useState(null);
  const [hoverTs, setHoverTs] = useState(null);

  const blockedSet = useMemo(() => new Set(blockedDateKeys), [blockedDateKeys]);

  const months = useMemo(() => {
    return Array.from({ length: monthsToShow }).map((_, index) => {
      const monthDate = new Date(startMonth.getFullYear(), startMonth.getMonth() + index, 1);
      return buildMonth(monthDate.getFullYear(), monthDate.getMonth());
    });
  }, [monthsToShow, startMonth]);

  function containsBlockedInside(startValue, endValue) {
    for (const month of months) {
      for (const cell of month.cells) {
        if (!cell.empty && blockedSet.has(cell.dateKey)) {
          if (cell.timestamp > startValue && cell.timestamp < endValue) return true;
        }
      }
    }
    return false;
  }

  function commitRange(newStart, newEnd) {
    setStartTs(newStart);
    setEndTs(newEnd);
    setHoverTs(null);
    if (newStart && newEnd && onChange) {
      onChange(new Date(newStart), new Date(newEnd));
    }
  }

  function handleClick(cell) {
    if (cell.empty || blockedSet.has(cell.dateKey)) return;

    if (!startTs || (startTs && endTs)) {
      commitRange(cell.timestamp, null);
      return;
    }

    if (cell.timestamp <= startTs) {
      commitRange(cell.timestamp, null);
      return;
    }

    const nights = nightsBetween(startTs, cell.timestamp);
    if (nights < minNights) return;
    if (containsBlockedInside(startTs, cell.timestamp)) return;

    commitRange(startTs, cell.timestamp);
  }

  function handleEnter(cell) {
    if (cell.empty || blockedSet.has(cell.dateKey) || !startTs || endTs) return;
    if (cell.timestamp > startTs) setHoverTs(cell.timestamp);
  }

  const previewEndTs = endTs || hoverTs;

  function isSelected(cellTs) {
    return cellTs === startTs || cellTs === endTs;
  }

  function isInRange(cellTs) {
    if (!startTs || !previewEndTs) return false;
    return cellTs >= startTs && cellTs <= previewEndTs;
  }

  return (
    <div>
      <div className="airbnb-calendar-wrap">
        {months.map((month) => (
          <div key={month.label} className="airbnb-month-card">
            <div className="airbnb-month-label">{month.label}</div>
            <div className="airbnb-weekdays">
              {WEEKDAYS.map((day) => (
                <div key={day} className="airbnb-weekday">{day}</div>
              ))}
            </div>
            <div className="airbnb-month-grid">
              {month.cells.map((cell) => {
                if (cell.empty) return <div key={cell.key} className="airbnb-day-empty" />;

                let className = "airbnb-day";
                if (blockedSet.has(cell.dateKey)) className += " blocked";
                else className += " available";
                if (isInRange(cell.timestamp)) className += " in-range";
                if (isSelected(cell.timestamp)) className += " selected";

                return (
                  <button
                    key={cell.key}
                    type="button"
                    className={className}
                    onClick={() => handleClick(cell)}
                    onMouseEnter={() => handleEnter(cell)}
                    disabled={blockedSet.has(cell.dateKey)}
                    aria-label={cell.dateKey}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="muted" style={{ marginTop: "1rem", fontWeight: 700 }}>
        {!startTs ? "Choose check-in date" : !endTs ? "Choose checkout date" : "Range selected"}
      </div>
    </div>
  );
}
