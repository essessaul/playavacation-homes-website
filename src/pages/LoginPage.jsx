import React, { useState } from "react";
import { Button, Card } from "../components/common/ui";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function LoginPage() {
  const { t } = useLanguage();
  const { signIn } = useAuth();
  const [form, setForm] = useState({ email:"", password:"" });
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    const result = await signIn(form.email, form.password);
    setMessage(result.error ? result.error.message : "Signed in.");
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 560 }}>
        <Card>
          <div className="property-card">
            <h1>{t.signIn}</h1>
            <div className="grid" style={{ marginTop: "1rem" }}>
              <input value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder={t.email} />
              <input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder={t.password} />
              <Button onClick={handleSubmit}>{t.signIn}</Button>
              {message ? <div className="notice">{message}</div> : null}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
