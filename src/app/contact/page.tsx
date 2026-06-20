"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { MapPin, Mail, HelpCircle } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { fadeIn, fadeInUp } from "@/lib/animations";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwxY0TkY9a0CwjHBdIFbmedDCxhowbt3zpFpui1uJwz4eTQgslid1bw-w6nIdR5X-nw/exec";

const ContactPage = () => {
  const { toast } = useToast();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({ name: "", email: "" });

  const handleSubmit = async () => {
    const newErrors = { name: "", email: "" };
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (newErrors.name || newErrors.email) {
      setErrors(newErrors);
      return;
    }

    setErrors({ name: "", email: "" });
    setLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: "", timestamp: new Date().toISOString() }),
      });
      toast({ title: "Details submitted", description: "We will contact you shortly." });
      setName("");
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <PageHero
        title="Let's Build Something Together"
        subtitle="Tell us about your space and goals. Our team will reach out to design the right learning experience for you."
        backgroundImage="/photos/career1.avif"
        overlayClass="bg-slate-950/80"
      />

      {/* MAIN CONTENT */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">

          {/* FORM */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
          >
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a message</h2>
              <p className="text-slate-500 text-sm mb-8">
                Fill in your details and we&apos;ll get back to you within one business day.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                  <Input
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
                    className={`h-11 ${errors.name ? "border-red-400 focus-visible:ring-red-300" : "border-slate-300"}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <Input
                    placeholder="you@school.com"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                    className={`h-11 ${errors.email ? "border-red-400 focus-visible:ring-red-300" : "border-slate-300"}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
                  )}
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-base font-semibold rounded-xl transition-colors"
                >
                  {loading ? "Submitting..." : "Send Message"}
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-sm text-slate-500">
                  Or email us directly at{" "}
                  <a href="mailto:info@tecplore.com" className="text-blue-600 font-medium hover:underline">
                    info@tecplore.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* SIDEBAR */}
          <div className="lg:col-span-5 space-y-6">

            {/* Locations */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-4 w-4 text-blue-600" strokeWidth={1.5} />
                <h3 className="font-semibold text-slate-900">Our Offices</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    Registered Office
                  </span>
                  <p className="mt-2 font-semibold text-slate-900">Coimbatore</p>
                  <p className="text-sm text-slate-500">Tamil Nadu, India</p>
                </div>
                <div className="border-t border-slate-200 pt-5">
                  <span className="text-xs font-semibold text-slate-500 bg-slate-200 px-2.5 py-1 rounded-full">
                    Branch Offices
                  </span>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Trivandrum</p>
                      <p className="text-xs text-slate-500">Kerala, India</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Nagpur</p>
                      <p className="text-xs text-slate-500">Maharashtra, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-6"
            >
              <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Have questions?</h3>
                <p className="text-sm text-slate-500 mb-3">Browse our most common questions before reaching out.</p>
                <Link href="/faq" className="text-blue-600 text-sm font-medium hover:underline">
                  View FAQs -&gt;
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Toaster />
    </div>
  );
};

export default ContactPage;
