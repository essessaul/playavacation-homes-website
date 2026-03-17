import React, { useState } from "react";

export default function InteractiveMascot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="interactive-mascot-button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open Saul Playa contact options"
      >
        <img src="/saul-hero.png" alt="Saul Playa mascot" className="interactive-mascot-image" />
      </button>

      {open ? (
        <div className="interactive-mascot-panel">
          <div className="interactive-mascot-header">Talk to Saul Playa</div>
          <div className="interactive-mascot-text">
            Direct sales, rentals, and Playa Escondida information.
          </div>
          <div className="interactive-mascot-actions">
            <a
              href="https://wa.me/50766164212"
              target="_blank"
              rel="noreferrer"
              className="interactive-mascot-link"
            >
              WhatsApp
            </a>
            <a
              href="mailto:saul@playaescondidaresort.com"
              className="interactive-mascot-link"
            >
              Email
            </a>
            <a
              href="/listings"
              className="interactive-mascot-link"
            >
              View Listings
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
