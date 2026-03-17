import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../common/ui";
import { useLanguage } from "../../context/LanguageContext";
import logo from "../../assets/logo.png";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="site-header">
      <div className="container site-header-inner" style={{ padding: "1rem 0" }}>
        <Link to="/" className="inline">
          <img src={logo} alt="Playa Escondida Vacation Homes" className="logo" />
        </Link>

        <nav className="nav-links">
          <NavLink to="/listings">{t.navRentals}</NavLink>
          <NavLink to="/login">{t.signIn}</NavLink>
          <NavLink to="/signup">{t.signUp}</NavLink>
          <NavLink to="/admin">{t.navAdmin}</NavLink>
        </nav>

        <div className="header-actions">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: 120 }}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
          <Button>{t.contact}</Button>
        </div>
      </div>
    </header>
  );
}
