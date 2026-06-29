"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

export default function ContactPage() {
  const { tr } = useLang();
  const cp = tr.contact_page;
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16 px-4" style={{ background: "var(--clr-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-1">{cp.title}</h1>
          <p className="text-gray-400">{cp.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">{cp.address_title}</h3>
              <ul className="space-y-3">
                {[
                  { icon: MapPin, text: tr.footer.address },
                  { icon: Phone, text: tr.footer.phone },
                  { icon: Mail, text: tr.footer.email },
                ].map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <Icon size={16} className="mt-0.5 shrink-0" style={{ color: "var(--clr-accent)" }} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock size={16} style={{ color: "var(--clr-accent)" }} />
                {cp.hours_title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>{cp.weekdays}</li>
                <li>{cp.saturday}</li>
                <li className="text-gray-400">{cp.sunday}</li>
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-56">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.7876!2d23.5875!3d46.7712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDQ2JzE2LjMiTiAyM8KwMzUnMTUuMCJF!5e0!3m2!1sen!2sro!4v1234567890"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="map"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{cp.form_title}</h2>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 size={48} className="mb-4" style={{ color: "var(--clr-accent)" }} />
                <p className="text-gray-700 font-medium">{cp.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { label: cp.name, type: "text", required: true },
                  { label: cp.phone, type: "tel", required: true },
                  { label: cp.email, type: "email", required: false },
                ].map(({ label, type, required }) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                    <input
                      type={type}
                      required={required}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm transition-colors focus:border-[var(--clr-accent)]"
                      style={{ ["--tw-ring-color" as string]: "var(--clr-accent-subtle)" }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{cp.message}</label>
                  <textarea rows={4} placeholder={cp.message_placeholder} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm transition-colors resize-none focus:border-[var(--clr-accent)]" />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-white font-semibold rounded-xl transition-colors disabled:opacity-60 text-sm"
                  style={{ background: "var(--clr-accent)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--clr-accent-dk)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clr-accent)")}
                >
                  {loading ? "..." : cp.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
