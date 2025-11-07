"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

const ContactPage = () => {
  const { toast } = useToast();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwxY0TkY9a0CwjHBdIFbmedDCxhowbt3zpFpui1uJwz4eTQgslid1bw-w6nIdR5X-nw/exec";

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Fields required",
        description: "Please enter your name and email.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: "",
          timestamp: new Date().toISOString(),
        }),
      });

      toast({
        title: "Details submitted",
        description: "We will contact you shortly.",
      });

      setName("");
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
        style={{ backgroundImage: "url('/patterns/contact_us_bg.jpg')" }}
      />

      <div className="relative w-full max-w-lg space-y-12">
        {/* Let's Connect Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 space-y-6 text-center"
        >
          <h1 className="text-2xl font-semibold text-gray-900">
            Let&apos;s Connect
          </h1>
          <p className="text-gray-600">
          Our team will reach out, to understand your needs.
          </p>

          <div className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gray-900 text-white hover:bg-black transition h-11"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>

          {/* Direct email + FAQ */}
          <div className="pt-5 border-t border-gray-200 space-y-1">
            <p className="text-sm font-medium text-gray-800">
              Prefer sending requirements directly?
            </p>
            <a
              href="mailto:info@tecplore.com"
              className="text-blue-700 font-medium hover:underline"
            >
              info@tecplore.com
            </a>
          
          </div>
        </motion.div>

          {/* Locations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 border border-gray-200 rounded-2xl shadow-inner p-8"
        >
          <div className="space-y-8">
            {/* Registered Office */}
            <div className="text-center">
              <span className="text-xs font-medium text-gray-700 bg-violet-100 px-3 py-1 rounded-full inline-block mb-1">
                Registered Office
              </span>
              <h3 className="text-lg font-semibold text-gray-900">Coimbatore</h3>
              <p className="text-gray-600 text-sm">Tamil Nadu, India</p>
            </div>

            {/* Branch Offices */}
            <div className="text-center">
              <span className="text-xs font-medium text-gray-600 bg-violet-100 px-3 py-1 rounded-full inline-block mb-1">
                Branch Offices
              </span>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-700">
                <div>
                  <h4 className="font-medium text-gray-900">Trivandrum</h4>
                  <p className="text-gray-600 text-xs">Kerala, India</p>
                </div>
                <div className="hidden sm:block text-gray-400">|</div>
                <div>
                  <h4 className="font-medium text-gray-900">Nagpur</h4>
                  <p className="text-gray-600 text-xs">Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Link Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-center"
        >
          <Link
            href="/faq"
            className="text-sm text-blue-700 hover:underline"
          >
            View FAQs
          </Link>
        </motion.div>

        </div>

  <Toaster />
  </div>
  );
  };

  export default ContactPage;
