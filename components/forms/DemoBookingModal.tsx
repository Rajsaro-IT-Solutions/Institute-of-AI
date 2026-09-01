"use client";

import React, { useState } from "react";
import { CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoBookingModal({ isOpen, onClose }: DemoBookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTopic: "AI & Machine Learning Overview",
    preferredDate: "",
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
      const res = await fetch("/api/demo-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setErrorMsg(data.error || "Failed to book demo class.");
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
      preferredTopic: "AI & Machine Learning Overview",
      preferredDate: "",
      message: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Book Free Demo Class">
      {success ? (
        <div className="py-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h4 className="text-2xl font-bold text-slate-900">Demo Class Booked!</h4>
          <p className="mt-2 text-sm text-slate-600">
            Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. Our team will contact you shortly to confirm your demo session details.
          </p>
          <div className="mt-6">
            <Button onClick={handleReset} className="w-full">
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-3 text-xs text-blue-800 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-600 flex-shrink-0" />
            <span>Join a live interactive demo session led by our senior AI mentors.</span>
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
              placeholder="e.g. Rahul Sharma"
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Preferred Topic
              </label>
              <select
                name="preferredTopic"
                value={formData.preferredTopic}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="AI & Machine Learning Overview">AI & Machine Learning Overview</option>
                <option value="Generative AI & LLMs">Generative AI & LLMs</option>
                <option value="AI Career Roadmap">AI Career Roadmap</option>
                <option value="Computer Vision & Deep Learning">Computer Vision & Deep Learning</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Message / Notes (Optional)
            </label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Any specific questions or topics you'd like us to cover?"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Booking Demo...
                </>
              ) : (
                "Confirm Demo Booking"
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
