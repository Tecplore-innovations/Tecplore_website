"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface OfficeLocationProps {
  type: "Main" | "Branch";
  city: string;

  
}

const OfficeLocationCard: React.FC<OfficeLocationProps> = ({
  type,
  city,
  
  }) => {
    const colorMap =
      type === "Main"
        ? {
            stroke: "text-blue-600",
            border: "border-blue-500/30",
            bg: "bg-white/25 backdrop-blur-xl",
          }
        : {
            stroke: "text-gray-700",
            border: "border-gray-400/30",
            bg: "bg-white/15 backdrop-blur-lg",
          };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{type: "spring", stiffness: 100 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)",
      }}
 
      className={`${colorMap.bg} ${colorMap.border} border rounded-2xl p-4 cursor-pointer shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] transition-all`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-xl border ${colorMap.border} flex items-center justify-center`}
        >
          <MapPin className={`w-5 h-5 ${colorMap.stroke}`} />
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase">
            {type} Office
          </div>
          <div className="text-base font-medium text-gray-900">{city}</div>
        </div>
      </div>
    </motion.div>
  );
};

const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwxY0TkY9a0CwjHBdIFbmedDCxhowbt3zpFpui1uJwz4eTQgslid1bw-w6nIdR5X-nw/exec";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
      });
      toast({
        title: "Message sent!",
        description: "We've received your message and will respond soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const officeLocations = [
    {
      type: "Main" as const,
      city: "Coimbatore, Tamil Nadu",     
    },
    {
      type: "Branch" as const,
      city: "Trivandrum, Kerala",     
    },
    {
      type: "Branch" as const,
      city: "Nagpur, Maharashtra",
    },
  ];

  return (
   <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden py-10 sm:py-16">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/photos/contact1.jpg')" }}
      />
      <div className="absolute inset-0 bg-white/60 backdrop-blur-2xl" />

      {/* Floating light gradient overlays */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-white/60 to-transparent rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/50 to-transparent rounded-full blur-3xl opacity-40" />

      {/* Main Glass Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-10 bg-white/30 backdrop-blur-2xl border border-white/40 rounded-[2rem] shadow-[0_8px_60px_-10px_rgba(0,0,0,0.15),inset_0_0_15px_rgba(255,255,255,0.4)] p-8 sm:p-10"
      >
        {/* Contact Form */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-2 drop-shadow-sm">
              Let’s Connect
            </h2>
            <p className="text-gray-700 text-sm sm:text-base font-light">
              Have a question or idea? Drop us a quick note.
            </p>
          </div>

          <div className="space-y-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="h-11 bg-white/50 border border-gray-300/40 text-gray-800 placeholder-gray-500 rounded-xl focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-400/50 shadow-inner"
            />
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              className="h-11 bg-white/50 border border-gray-300/40 text-gray-800 placeholder-gray-500 rounded-xl focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-400/50 shadow-inner"
            />
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message..."
              className="min-h-[120px] bg-white/50 border border-gray-300/40 text-gray-800 placeholder-gray-500 rounded-xl focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-400/50 resize-none shadow-inner"
            />
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full h-11 text-base font-medium bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white rounded-xl shadow-lg shadow-black/10 transition-transform hover:scale-[1.01]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Info & Offices */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.3)]">
           
           <div
              onClick={() =>
                window.open("mailto:vivek@tecplore.com", "_self")
              }
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div className="p-3 rounded-full bg-white/50 text-gray-800 group-hover:bg-white/70 transition shadow-inner">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-gray-900 font-medium group-hover:text-blue-600 transition">
                  vivek@tecplore.com
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">Our Offices</h3>
            {officeLocations.map((office) => (
              <OfficeLocationCard
                key={office.city}
                {...office}
               
              />
            ))}
          </div>
        </div>
      </motion.div>

      <Toaster />
    </div>
  );
};

export default ContactPage;
