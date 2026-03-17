import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button } from "../components/common/ui";
import { useLanguage } from "../context/LanguageContext";
import DateRangeFields from "../components/common/DateRangeFields";
import PlatformMascot from "../components/common/PlatformMascot";
import PropertyCard from "../components/listings/PropertyCard";
import { starterProperties } from "../data/starterData";

function HomeSearch() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  function handleSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (checkIn) params.set("check_in", checkIn);
    if (checkOut) params.set("check_out", checkOut);
    if (guests) params.set("guests", String(guests));
    navigate(`/listings?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <div className="grid">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.destinationOrProperty} />
        <DateRangeFields checkIn={checkIn} checkOut={checkOut} onCheckInChange={setCheckIn} onCheckOutChange={setCheckOut} compact />
        <div className="inline" style={{ flexWrap: "wrap" }}>
          <input type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} placeholder={t.guests} style={{ width: 160 }} />
          <Button type="submit">{t.search}</Button>
          <Link to="/listings"><Button type="button">{t.viewRentals}</Button></Link>
        </div>
      </div>
    </form>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const vip = starterProperties.slice(0, 2);
  const other = starterProperties.slice(2);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="hero">
            <div className="hero-inner">
              <div className="space" style={{ alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 420px" }}>
                  <Badge>{t.luxuryBeachfront}</Badge>
                  <h1 className="page-title">{t.homeHeroTitle}</h1>
                  <p style={{ fontSize: "1.15rem", lineHeight: 1.8 }}>{t.homeHeroText}</p>
                </div>
                <PlatformMascot size="medium" caption="Saul Playa" />
              </div>

              <HomeSearch />
              <div className="muted" style={{ marginTop: "1rem", fontWeight: 700 }}>{t.homeNote}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-heading">
            <div className="muted" style={{ letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 800, fontSize: 13 }}>{t.vipListings}</div>
            <h2 style={{ fontSize: "2rem", margin: ".5rem 0 0" }}>{t.featuredRentals}</h2>
            <div className="divider" />
          </div>
          <div className="listing-grid">
            {vip.map((item) => <PropertyCard key={item.id} property={item} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-heading">
            <div className="muted" style={{ letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 800, fontSize: 13 }}>{t.otherListings}</div>
            <h2 style={{ fontSize: "2rem", margin: ".5rem 0 0" }}>{t.moreRentalOptions}</h2>
            <div className="divider" />
          </div>
          <div className="listing-grid">
            {other.map((item) => <PropertyCard key={item.id} property={item} />)}
          </div>
        </div>
      </section>
    </>
  );
}
