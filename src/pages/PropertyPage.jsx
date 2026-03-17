import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge, Button, Card } from "../components/common/ui";
import DateRangeFields from "../components/common/DateRangeFields";
import PlatformMascot from "../components/common/PlatformMascot";
import PropertyAvailabilityCalendar from "../components/listings/PropertyAvailabilityCalendar";
import { getPropertyBySlug } from "../services/propertyService";
import { useLanguage } from "../context/LanguageContext";

export default function PropertyPage() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const [property, setProperty] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  useEffect(() => {
    getPropertyBySlug(slug).then(setProperty);
  }, [slug]);

  if (!property) return <section className="section"><div className="container">Loading property...</div></section>;

  return (
    <section className="section">
      <div className="container">
        <div className="space" style={{ flexWrap: "wrap", marginBottom: "1rem" }}>
          <Link to="/listings" className="muted">← {t.navRentals}</Link>
          <PlatformMascot size="small" caption="Saul Playa" />
        </div>

        <div className="two-col">
          <Card>
            <div className="property-card">
              <img src={property.image} alt={property.name} style={{ height: 360 }} />
              <div className="price-row" style={{ marginTop: 14, flexWrap: "wrap" }}>
                <Badge>{property.category}</Badge>
                <Badge>{property.status}</Badge>
              </div>

              <h1 style={{ marginTop: 16 }}>{property.name}</h1>
              <div className="muted">{property.location}</div>
              <p className="muted" style={{ lineHeight: 1.7 }}>{property.description}</p>

              <div className="listing-info-grid">
                <div className="info-pill"><div className="label">{t.bedrooms}</div><div className="value">{property.bedrooms}</div></div>
                <div className="info-pill"><div className="label">{t.bathrooms}</div><div className="value">{property.bathrooms}</div></div>
                <div className="info-pill"><div className="label">{t.guests}</div><div className="value">{property.guests}</div></div>
                <div className="info-pill"><div className="label">{t.sqMeters}</div><div className="value">{property.sqm}</div></div>
                <div className="info-pill"><div className="label">{t.sqFeet}</div><div className="value">{property.sqft}</div></div>
                <div className="info-pill"><div className="label">{t.nightly}</div><div className="value">${property.rate}</div></div>
              </div>

              <PropertyAvailabilityCalendar property={property} currency="$" />
            </div>
          </Card>

          <Card>
            <div className="property-card">
              <h3>{t.reserveProperty}</h3>
              <p className="muted">{t.clickRange}</p>

              <div className="grid" style={{ marginTop: "1rem" }}>
                <DateRangeFields checkIn={checkIn} checkOut={checkOut} onCheckInChange={setCheckIn} onCheckOutChange={setCheckOut} />
                <input value={guests} onChange={(e) => setGuests(e.target.value)} placeholder={t.guests} />
                <Link to={`/booking/${property.slug}`}><Button style={{ width: "100%" }}>{t.continueBooking}</Button></Link>
              </div>

              <div className="card" style={{ padding: "1rem", marginTop: "1rem" }}>
                <div className="muted" style={{ letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 800, fontSize: 13 }}>{t.ownerAccess}</div>
                <div className="price-row" style={{ marginTop: 10 }}><span className="muted">{t.ownerId}</span><strong>{property.owner_login_id}</strong></div>
                <div className="price-row" style={{ marginTop: 8 }}><span className="muted">{t.ownerPassword}</span><strong>{property.owner_password}</strong></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
