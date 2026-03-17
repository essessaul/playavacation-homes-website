import React, { useState } from "react";
import { Button, Card } from "../components/common/ui";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function SignupPage() {
  const { t } = useLanguage();
  const { signUp } = useAuth();
  const [form, setForm] = useState({ display_name:"", email:"", password:"", role:"owner" });
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    const result = await signUp(form.email, form.password, form.role, form.display_name);
    setMessage(result.error ? result.error.message : "Account created. Check your email.");
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 620 }}>
        <Card>
          <div className="property-card">
            <h1>{t.createAccount}</h1>
            <div className="grid" style={{ marginTop: "1rem" }}>
              <input value={form.display_name} onChange={(e) => setForm((p) => ({ ...p, display_name: e.target.value }))} placeholder={t.displayName} />
              <input value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder={t.email} />
              <input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder={t.password} />
              <select value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
                <option value="guest">{t.guest}</option>
                <option value="owner">{t.owner}</option>
                <option value="admin">{t.admin}</option>
              </select>
              <Button onClick={handleSubmit}>{t.createAccount}</Button>
              {message ? <div className="notice">{message}</div> : null}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
