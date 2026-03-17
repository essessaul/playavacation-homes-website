import React, { useMemo, useState } from "react";
import { Card } from "../common/ui";
import { useLanguage } from "../../context/LanguageContext";
import { starterAvailability } from "../../data/starterData";
import AdvancedDateRangePicker from "../common/AdvancedDateRangePicker";

function nightsBetween(start, end) {
  if (!start || !end) return 0;
  const a = new Date(start);
  const b = new Date(end);
  const diff = Math.round((b - a) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function toDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function PropertyAvailabilityCalendar({ property, currency = "$" }) {
  const { t } = useLanguage();
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [includeCleaning, setIncludeCleaning] = useState(true);
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [includeTransfer, setIncludeTransfer] = useState(false);

  const blockedKeys = useMemo(() => {
    const bookedDays = starterAvailability[property.slug]?.bookedDays || [];
    return bookedDays.map((day) => `2026-04-${String(day).padStart(2, "0")}`);
  }, [property.slug]);

  const nights = useMemo(() => nightsBetween(selectedStart, selectedEnd), [selectedStart, selectedEnd]);
  const base = nights * Number(property.rate || 0);
  const insurance = includeInsurance ? 39 : 0;
  const cleaning = includeCleaning ? Number(property.cleaning_fee || 0) : 0;
  const transfer = includeTransfer ? 65 : 0;
  const total = base + insurance + cleaning + transfer;

  const label = useMemo(() => {
    if (selectedStart && selectedEnd) {
      return `${t.selectedRange}: ${toDateKey(selectedStart)} → ${toDateKey(selectedEnd)} · ${t.nightsSelected}: ${nights}`;
    }
    if (selectedStart) {
      return `${t.selectedStart}: ${toDateKey(selectedStart)}. ${t.clickRange}`;
    }
    return t.clickRange;
  }, [selectedStart, selectedEnd, nights, t]);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div className="price-row" style={{ marginBottom: "1rem", flexWrap: "wrap" }}>
        <h3 style={{ margin: 0 }}>{t.propertyCalendar}</h3>
        <div className="muted" style={{ fontWeight: 600 }}>{label}</div>
      </div>

      <AdvancedDateRangePicker
        monthsToShow={2}
        blockedDateKeys={blockedKeys}
        minNights={1}
        onChange={(start, end) => {
          setSelectedStart(start);
          setSelectedEnd(end);
        }}
      />

      <Card style={{ padding: "1rem", marginTop: "1rem" }}>
        <div className="option-list">
          <label className="option-row">
            <span className="inline">
              <input type="checkbox" checked={includeCleaning} onChange={(e) => setIncludeCleaning(e.target.checked)} style={{ width: 18 }} />
              <span>{t.cleaningFee}</span>
            </span>
            {includeCleaning ? <strong>{currency}{property.cleaning_fee}</strong> : null}
          </label>

          <label className="option-row">
            <span className="inline">
              <input type="checkbox" checked={includeInsurance} onChange={(e) => setIncludeInsurance(e.target.checked)} style={{ width: 18 }} />
              <span>{t.insurance}</span>
            </span>
            {includeInsurance ? <strong>{currency}39</strong> : null}
          </label>

          <label className="option-row">
            <span className="inline">
              <input type="checkbox" checked={includeTransfer} onChange={(e) => setIncludeTransfer(e.target.checked)} style={{ width: 18 }} />
              <span>Airport transfer</span>
            </span>
            {includeTransfer ? <strong>{currency}65</strong> : null}
          </label>
        </div>

        <div className="booking-summary" style={{ marginTop: "1rem" }}>
          <div className="price-row"><span className="muted">{t.nightlyRate}</span><strong>{currency}{property.rate}</strong></div>
          <div className="price-row" style={{ marginTop: 8 }}><span className="muted">{t.nights}</span><strong>{nights}</strong></div>
          <div className="price-row" style={{ marginTop: 8 }}><span className="muted">{t.accommodation}</span><strong>{currency}{base}</strong></div>
          {includeCleaning ? <div className="price-row" style={{ marginTop: 8 }}><span className="muted">{t.cleaningFee}</span><strong>{currency}{property.cleaning_fee}</strong></div> : null}
          {includeInsurance ? <div className="price-row" style={{ marginTop: 8 }}><span className="muted">{t.insurance}</span><strong>{currency}39</strong></div> : null}
          {includeTransfer ? <div className="price-row" style={{ marginTop: 8 }}><span className="muted">Airport transfer</span><strong>{currency}65</strong></div> : null}
          <div className="price-row" style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #e9dfd5" }}>
            <span style={{ fontWeight: 800 }}>{t.total}</span>
            <strong style={{ fontSize: 22 }}>{currency}{total}</strong>
          </div>
        </div>
      </Card>
    </div>
  );
}
