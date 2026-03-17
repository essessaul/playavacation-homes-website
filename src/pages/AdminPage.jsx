import React from "react";
import { Card } from "../components/common/ui";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { useLanguage } from "../context/LanguageContext";

export default function AdminPage() {
  const { t } = useLanguage();
  return (
    <ProtectedRoute>
      <section className="section">
        <div className="container">
          <Card>
            <div className="property-card">
              <h1>{t.adminDashboard}</h1>
              <div className="two-col" style={{ marginTop: "1rem" }}>
                <div className="notice">Manage listings</div>
                <div className="notice">Manage bookings</div>
                <div className="notice">Manage owners</div>
                <div className="notice">Review signup requests</div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </ProtectedRoute>
  );
}
