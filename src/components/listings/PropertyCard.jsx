import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card } from "../common/ui";
import { useLanguage } from "../../context/LanguageContext";

export default function PropertyCard({ property }) {
  const { t } = useLanguage();
  return (
    <Card>
      <div className="property-card">
        <Link to={`/property/${property.slug}`}>
          <img src={property.image} alt={property.name} />
        </Link>

        <div className="price-row" style={{ marginTop: 14, flexWrap: "wrap" }}>
          <Badge>{property.category}</Badge>
          <Badge>{property.status}</Badge>
        </div>

        <Link to={`/property/${property.slug}`}><h3 style={{ margin: "16px 0 8px" }}>{property.name}</h3></Link>
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

        <div className="price-row" style={{ marginTop: 18 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900 }}>${property.rate}</div>
            <div className="muted" style={{ fontSize: 12 }}>per night</div>
          </div>
          <div className="inline">
            <Link to={`/property/${property.slug}`}><Button variant="light">Details</Button></Link>
            <Link to={`/booking/${property.slug}`}><Button>Reserve</Button></Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
