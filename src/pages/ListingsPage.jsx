import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/listings/PropertyCard";
import DateRangeFields from "../components/common/DateRangeFields";
import PlatformMascot from "../components/common/PlatformMascot";
import { getProperties } from "../services/propertyService";
import { useLanguage } from "../context/LanguageContext";

export default function ListingsPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [checkIn, setCheckIn] = useState(searchParams.get("check_in") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("check_out") || "");
  const [guests, setGuests] = useState(searchParams.get("guests") || "");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties().then(setProperties);
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((item) => {
      const text = [item.name, item.category, item.location, item.description].join(" ").toLowerCase();
      const textMatch = !query.trim() || text.includes(query.toLowerCase());
      const guestMatch = !guests || Number(item.guests) >= Number(guests);
      return textMatch && guestMatch;
    });
  }, [properties, query, guests, checkIn, checkOut]);

  return (
    <section className="section">
      <div className="container">
        <div className="space" style={{ flexWrap: "wrap", marginBottom: "1rem" }}>
          <div className="section-heading" style={{ marginBottom: 0 }}>
            <div className="muted" style={{ letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 800, fontSize: 13 }}>{t.navRentals}</div>
            <h1 className="page-title" style={{ marginBottom: ".5rem" }}>{t.rentalsHeading}</h1>
            <div className="divider" />
            <p className="muted" style={{ marginTop: "1rem" }}>{t.rentalsSub} {t.availableResults}: {filtered.length}</p>
          </div>
          <PlatformMascot size="small" caption="Saul Playa" />
        </div>

        <div className="card" style={{ padding: "1rem", marginBottom: "1.5rem" }}>
          <div className="grid">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.destinationOrProperty} />
            <DateRangeFields checkIn={checkIn} checkOut={checkOut} onCheckInChange={setCheckIn} onCheckOutChange={setCheckOut} />
            <input type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} placeholder={t.guests} />
          </div>
        </div>

        <div className="listing-grid">
          {filtered.map((item) => <PropertyCard key={item.id} property={item} />)}
        </div>
      </div>
    </section>
  );
}
