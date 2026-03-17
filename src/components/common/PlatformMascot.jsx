import React from "react";
import mascot from "../../assets/mascot-saul-playa.png";

export default function PlatformMascot({ size = "small", caption = "" }) {
  const sizeMap = { small: 88, medium: 130, large: 240 };
  const width = sizeMap[size] || 88;

  return (
    <div className="mascot-card">
      <img
        src={mascot}
        alt="Saul Playa mascot"
        style={{ width, height: "auto", filter: "drop-shadow(0 10px 22px rgba(47,61,107,.14))" }}
      />
      {caption ? <div className="muted" style={{ fontWeight: 700 }}>{caption}</div> : null}
    </div>
  );
}
