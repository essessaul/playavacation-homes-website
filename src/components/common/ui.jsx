import React from "react";
export function Button({ children, variant = "dark", ...props }) {
  return <button {...props} className={variant === "light" ? "btn btn-light" : "btn btn-dark"}>{children}</button>;
}
export function Card({ children, style }) {
  return <div className="card" style={style}>{children}</div>;
}
export function Badge({ children }) {
  return <span className="badge">{children}</span>;
}
