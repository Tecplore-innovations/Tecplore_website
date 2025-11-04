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
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: "url('/patterns/serious.png')" }}
      />

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-10">

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-200 shadow-md rounded-lg p-8 space-y-6"
        >
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Let's Connect
          </h1>
          <p className="text-gray-600 mb-4">
            Share your details. Our team will reach out to understand your needs.
          </p>

          <div className="space-y-4">
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

          {/* Direct email section */}
          <div className="pt-5 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-800 mb-1">
              Prefer sending requirements directly?
            </p>
            <a
              href="mailto:info@tecplore.com"
              className="text-blue-700 font-medium hover:underline"
            >
              info@tecplore.com
            </a>
          </div>

          <div className="pt-2">
            <Link
              href="/faq"
              className="text-sm text-blue-700 hover:underline"
            >
              View FAQs
            </Link>
          </div>
        </motion.div>

        {/* Office Locations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-white border border-gray-200 shadow-md rounded-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Our Offices
            </h2>
            <p className="text-gray-600 text-sm">
              Connect with the location closest to you.
            </p>
          </div>

          {/* Main Office */}
          <div className="bg-white border border-gray-200 shadow-md rounded-lg p-8">
            <span className="text-xs uppercase font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full mb-3 inline-block">
              Main Office
            </span>
            <h3 className="text-lg font-semibold text-gray-900">Coimbatore</h3>
            <p className="text-gray-600 text-sm">Tamil Nadu, India</p>
          </div>

          {/* Branch Offices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 shadow rounded-lg p-6">
              <span className="text-xs uppercase font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded mb-2 inline-block">
                Branch
              </span>
              <h4 className="font-semibold text-gray-900 mb-1">Trivandrum</h4>
              <p className="text-gray-600 text-sm">Kerala, India</p>
            </div>

            <div className="bg-white border border-gray-200 shadow rounded-lg p-6">
              <span className="text-xs uppercase font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded mb-2 inline-block">
                Branch
              </span>
              <h4 className="font-semibold text-gray-900 mb-1">Nagpur</h4>
              <p className="text-gray-600 text-sm">Maharashtra, India</p>
            </div>
          </div>
        </motion.div>
      </div>

      <Toaster />
    </div>
  );
};

export default ContactPage;
