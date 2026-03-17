import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function DateRangeFields({ checkIn, checkOut, onCheckInChange, onCheckOutChange, compact = false }) {
  const { t } = useLanguage();
  return (
    <div className="two-col" style={{ gap: "1rem" }}>
      <div>
        {!compact ? <div className="muted" style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{t.checkIn}</div> : null}
        <input type="date" value={checkIn} onChange={(e) => onCheckInChange(e.target.value)} />
      </div>
      <div>
        {!compact ? <div className="muted" style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{t.checkOut}</div> : null}
        <input type="date" value={checkOut} min={checkIn || undefined} onChange={(e) => onCheckOutChange(e.target.value)} />
      </div>
    </div>
  );
}
