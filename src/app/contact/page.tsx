"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { MapPin, Mail, HelpCircle } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { fadeIn, fadeInUp } from "@/lib/animations";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwxY0TkY9a0CwjHBdIFbmedDCxhowbt3zpFpui1uJwz4eTQgslid1bw-w6nIdR5X-nw/exec";

const BUYER_TYPES = [
  "Public space or park",
  "School or college",
  "Learning centre",
  "NGO or CSR programme",
  "Something else",
];

const NO_ERRORS = { name: "", email: "", buyerType: "" };

const ContactPage = () => {
  const { toast } = useToast();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [buyerType, setBuyerType] = React.useState("");
  const [audience, setAudience] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sendFailed, setSendFailed] = React.useState(false);
  const [errors, setErrors] = React.useState(NO_ERRORS);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { ...NO_ERRORS };
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!buyerType) newErrors.buyerType = "Please choose one";

    if (newErrors.name || newErrors.email || newErrors.buyerType) {
      setErrors(newErrors);
      return;
    }

    // The new answers also go into `message`, so they are kept even if the
    // receiving script only stores name, email and message.
    const message = [
      `Enquiring for: ${buyerType}`,
      audience.trim() && `Who will use the space: ${audience.trim()}`,
      details.trim() && `Message: ${details.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

    setErrors(NO_ERRORS);
    setSendFailed(false);
    setLoading(true);
    try {
      // no-cors hides the script's response, so this only catches network failures.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          buyerType,
          audience: audience.trim(),
          details: details.trim(),
          message,
          timestamp: new Date().toISOString(),
        }),
      });
      toast({ title: "Thanks, we've got your details", description: "We'll get back to you within one business day." });
      setName("");
      setEmail("");
      setBuyerType("");
      setAudience("");
      setDetails("");
    } catch {
      setSendFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <PageHero
        title="Let's Build Something Together"
        subtitle="Tell us about your space and goals. Our team will reach out to design the right learning experience for you."
        backgroundImage="/photos/career1.avif"
      />

      {/* MAIN CONTENT */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">

          {/* FORM */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
          >
            <div className="surface-card shadow-sm p-10">
              <h2 className="heading-section mb-2">Book a 30-minute design call</h2>
              <p className="text-muted-foreground text-sm mb-8">
                Share a few details and we&apos;ll get back to you within one business day.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="name" className="field-label">Name</label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={name}
                    aria-invalid={!!errors.name}
                    onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
                    className={errors.name ? "border-destructive focus-visible:ring-destructive" : undefined}
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs mt-1.5">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="field-label">Email</label>
                  <Input
                    id="email"
                    placeholder="you@school.com"
                    type="email"
                    value={email}
                    aria-invalid={!!errors.email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                    className={errors.email ? "border-destructive focus-visible:ring-destructive" : undefined}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1.5">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="buyerType" className="field-label">I&apos;m enquiring for a</label>
                  <select
                    id="buyerType"
                    value={buyerType}
                    aria-invalid={!!errors.buyerType}
                    onChange={(e) => { setBuyerType(e.target.value); setErrors((p) => ({ ...p, buyerType: "" })); }}
                    className={`field-select ${buyerType ? "text-foreground" : "text-muted-foreground"} ${errors.buyerType ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  >
                    <option value="" disabled>Choose one</option>
                    {BUYER_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.buyerType && (
                    <p className="text-destructive text-xs mt-1.5">{errors.buyerType}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="audience" className="field-label">Who will use the space? (optional)</label>
                  <Input
                    id="audience"
                    placeholder="e.g. Class 6-10 students"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="details" className="field-label">Anything else we should know? (optional)</label>
                  <Textarea
                    id="details"
                    rows={4}
                    placeholder="Your space, your goals, your timeline"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>

                <Button type="submit" disabled={loading} size="lg" className="w-full">
                  {loading ? "Sending..." : "Request a Design Call"}
                </Button>

                {sendFailed && (
                  <p role="alert" className="text-destructive text-sm">
                    We couldn&apos;t send your details. Your answers are still here, so please try again, or email{" "}
                    <a href="mailto:info@tecplore.com" className="font-medium underline">info@tecplore.com</a>.
                  </p>
                )}
              </form>

              <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
                <p className="text-sm text-muted-foreground">
                  Or email us directly at{" "}
                  <a href="mailto:info@tecplore.com" className="text-primary font-medium hover:underline">
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
              className="surface-card bg-muted p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-4 w-4 text-primary" strokeWidth={1.5} />
                <h3 className="font-semibold text-foreground">Our Offices</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <span className="tag">
                    Registered Office
                  </span>
                  <p className="mt-2 font-semibold text-foreground">Coimbatore</p>
                  <p className="text-sm text-muted-foreground">Tamil Nadu, India</p>
                </div>
                <div className="border-t border-border pt-5">
                  <span className="tag">
                    Branch Offices
                  </span>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-foreground text-sm">Trivandrum</p>
                      <p className="text-xs text-muted-foreground">Kerala, India</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">Nagpur</p>
                      <p className="text-xs text-muted-foreground">Maharashtra, India</p>
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
              className="flex items-start gap-4 surface-card bg-muted p-6"
            >
              <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Have questions?</h3>
                <p className="text-sm text-muted-foreground mb-3">Browse our most common questions before reaching out.</p>
                <Link href="/faq" className="text-primary text-sm font-medium hover:underline">
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
