"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send, Globe } from 'lucide-react'; 
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from "@/components/ui/toaster";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface OfficeLocationProps {
  type: 'Main' | 'Branch';
  city: string;
  href: string;
  delay: number;
}

const OfficeLocationCard: React.FC<OfficeLocationProps> = ({ type, city, href, delay }) => {
  const colorMap = type === 'Main' 
    ? { stroke: 'text-purple-600', border: 'border-purple-600', bg: 'bg-white', text: 'text-gray-900', shadow: 'shadow-md' } 
    : { stroke: 'text-blue-600', border: 'border-blue-600', bg: 'bg-gray-50', text: 'text-gray-800', shadow: 'shadow-sm' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + delay, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.01, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
      onClick={() => window.open(href, "_blank")}
      className={`${colorMap.bg} ${colorMap.shadow} rounded-xl p-5 border border-gray-100 cursor-pointer transition-all`}
    >
      <div className="flex items-start gap-4">
        {/* Outer circle border, no fill */}
        <div className={`p-3 rounded-xl border-2 ${colorMap.border} flex items-center justify-center`}>
          <MapPin className={`w-5 h-5 ${colorMap.stroke}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-0.5">{type} Office</div>
          <div className={`text-lg font-bold truncate ${colorMap.text}`}>{city}</div>
        </div>
      </div>
    </motion.div>
  );
};


const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState<ContactFormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwxY0TkY9a0CwjHBdIFbmedDCxhowbt3zpFpui1uJwz4eTQgslid1bw-w6nIdR5X-nw/exec';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() })
      });
      toast({ title: "Message sent!", description: "We've received your message and will respond soon.", variant: "default" });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      toast({ title: "Error", description: "Failed to send message. Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const officeLocations = [
    { type: "Main" as const, city: "Coimbatore, Tamil Nadu", href: "https://maps.app.goo.gl/FtN8uryurorbamcN6" },
    { type: "Branch" as const, city: "Trivandrum, Kerala", href: "https://maps.app.goo.gl/e9qYCa6pufYQgeUFA" },
    { type: "Branch" as const, city: "Nagpur, Maharashtra", href: "https://maps.app.goo.gl/3fLQQAhyTj1jhPoM7" },
  ];

  return (
    <div className="relative min-h-screen py-16 bg-gray-50 overflow-hidden">
      {/* Background Gradient / Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-indigo-50 opacity-60" />
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/photos/contact1.jpg')" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
             Let&apos;s Connect
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
           Got a question, project idea, or need support? Drop us a message and we&apos;ll respond quickly.
             </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl shadow-md p-10 border border-gray-100">
              <h2 className="text-2xl font-bold mb-8 text-gray-800">Send us a message</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="h-12 text-base bg-gray-50 border border-gray-200 focus:border-indigo-500 transition duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    className="h-12 text-base bg-gray-50 border border-gray-200 focus:border-indigo-500 transition duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project or question..."
                    className="min-h-[160px] text-base bg-gray-50 border border-gray-200 focus:border-indigo-500 resize-none transition duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-all transform hover:scale-[1.005]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
                <p className="text-sm text-gray-500 text-center pt-2">
                  Expect a response within 24 hours (business days).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Info & Offices */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-5 space-y-10"
          >
            {/* General Info */}
            <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-500"/> General Info
              </h3>
              <div className="space-y-4">
                <div onClick={() => window.open("mailto:vivek@tecplore.com", "_self")} className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-3 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition">vivek@tecplore.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 ml-1">Our Locations</h3>
              {officeLocations.map((office, index) => (
                <OfficeLocationCard key={office.city} {...office} delay={index * 0.1} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ContactPage;
