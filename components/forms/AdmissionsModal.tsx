"use client";

import React, { useState } from "react";
import { CheckCircle2, Headphones, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";

interface AdmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmissionsModal({ isOpen, onClose }: AdmissionsModalProps) {
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

  const handleReset = () => {
    setSuccess(false);
    setErrorMsg("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      program: "AI Career Bootcamp",
      message: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Talk to Admissions">
      {success ? (
        <div className="py-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h4 className="text-2xl font-bold text-slate-900">Inquiry Received!</h4>
          <p className="mt-2 text-sm text-slate-600">
            Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. An admissions counselor will reach out to you within 24 hours.
          </p>
          <div className="mt-6">
            <Button onClick={handleReset} className="w-full">
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-2xl border border-cyan-100 bg-cyan-50/60 p-3 text-xs text-cyan-800 flex items-center gap-2">
            <Headphones className="h-4 w-4 text-cyan-600 flex-shrink-0" />
            <span>Connect with our academic advisors to find the right program for your goals.</span>
          </div>

          {errorMsg ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
              {errorMsg}
            </div>
          ) : null}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Ananya Patel"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Program of Interest
            </label>
            <select
              name="program"
              value={formData.program}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="AI Career Bootcamp">AI Career Bootcamp</option>
              <option value="Advanced Deep Learning">Advanced Deep Learning</option>
              <option value="NLP & LLM Mastery">NLP & LLM Mastery</option>
              <option value="Corporate AI Training">Corporate AI Training</option>
              <option value="Other / General Inquiry">Other / General Inquiry</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Questions or Comments
            </label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your background, career targets, or any specific questions..."
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
