import React from "react";
import { Card } from "../components/common/ui";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { useLanguage } from "../context/LanguageContext";

export default function OwnerDashboardPage() {
  const { t } = useLanguage();
  return (
    <ProtectedRoute>
      <section className="section">
        <div className="container">
          <Card>
            <div className="property-card">
              <h1>{t.ownerDashboard}</h1>
              <table className="table" style={{ marginTop: "1rem" }}>
                <thead>
                  <tr><th>Property</th><th>Login ID</th><th>Password</th></tr>
                </thead>
                <tbody>
                  <tr><td>Ocean View Condo 101</td><td>owner-101</td><td>PEVH101!</td></tr>
                  <tr><td>Beach Tower Suite 204</td><td>owner-204</td><td>PEVH204!</td></tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>
    </ProtectedRoute>
  );
}
