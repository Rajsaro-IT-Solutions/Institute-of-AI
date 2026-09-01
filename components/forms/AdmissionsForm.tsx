"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdmissionsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "AI Career Bootcamp",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admissions-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setErrorMsg(data.error || "Failed to submit inquiry.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
        <p className="mt-2 text-base text-slate-600">
          Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. Our admissions team will review your message and contact you within 24 hours.
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              program: "AI Career Bootcamp",
              message: "",
            });
          }}
          className="mt-6 font-semibold text-blue-600 hover:text-blue-700 text-sm"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-100 space-y-5">
      <div>
        <h3 className="text-2xl font-bold text-slate-900">Send Admissions an Inquiry</h3>
        <p className="mt-1 text-sm text-slate-500">Fill in your details below and our advisors will respond directly.</p>
      </div>

      {errorMsg ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
          {errorMsg}
        </div>
      ) : null}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Aarav Sharma"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Program of Interest
        </label>
        <select
          name="program"
          value={formData.program}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
        >
          <option value="AI Career Bootcamp">AI Career Bootcamp</option>
          <option value="Advanced Deep Learning">Advanced Deep Learning</option>
          <option value="NLP & LLM Mastery">NLP & LLM Mastery</option>
          <option value="Corporate AI Training">Corporate AI Training</option>
          <option value="Other / General Inquiry">Other / General Inquiry</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Your Message
        </label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you reach your AI goals?"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      <Button type="submit" disabled={loading} size="lg" className="w-full flex items-center justify-center gap-2">
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Inquiry
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
