'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PhoneCall, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from "@/components/ui/toaster";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwxY0TkY9a0CwjHBdIFbmedDCxhowbt3zpFpui1uJwz4eTQgslid1bw-w6nIdR5X-nw/exec';

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() })
      });

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    { icon: <Mail className="w-5 h-5" />, title: "Email", value: "vivek@tecplore.com", href: "mailto:vivek@tecplore.com", color: "blue" },
    { icon: <PhoneCall className="w-5 h-5" />, title: "Phone", value: "+91 70101 31721", href: "tel:+917010131721", color: "green" },
    { icon: <MapPin className="w-5 h-5" />, title: "Office", value: "Coimbatore, Tamilnadu", href: "https://maps.app.goo.gl/FtN8uryurorbamcN6", color: "purple" },
    { icon: <Clock className="w-5 h-5" />, title: "Hours", value: "Mon-Fri, 9AM-6PM IST", href: null, color: "orange" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-5xl font-semibold mb-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              Have a question or want to work together? <br />
              Drop us a message and we'll respond within 24 hours.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-4"
            >
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: method.href ? 1.02 : 1, x: method.href ? 4 : 0 }}
                  onClick={() => method.href && window.open(method.href, method.href.startsWith('http') ? '_blank' : '_self')}
                  className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${
                      method.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      method.color === 'green' ? 'from-green-500 to-green-600' :
                      method.color === 'purple' ? 'from-purple-500 to-purple-600' :
                      'from-orange-500 to-orange-600'
                    } text-white`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-500 mb-1">{method.title}</div>
                      <div className="text-gray-900 font-semibold">{method.value}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="h-12 text-base bg-gray-50 border border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      className="h-12 text-base bg-gray-50 border border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project or question..."
                      className="min-h-[140px] text-base bg-gray-50 border border-gray-300 focus:border-blue-500 resize-none"
                    />
                  </div>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-ce  nter gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                  <p className="text-sm text-gray-500 text-center">
                    We typically respond within 24 hours during business days
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ContactPage;
