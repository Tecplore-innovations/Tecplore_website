"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Mail, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribing(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setSubscribeStatus('success');
      setEmail('');

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubscribeStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-32 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Let's Build Your Future
            </h2>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Connect with our experts to discuss your industrial needs and discover 
              how we can help transform your operations.
            </p>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-black border-2 border-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
            >
              <Link href="/contact">Contact Us</Link> <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            {/* Contact Info Card */}
            <Card className="bg-gray-900/50 border-gray-800 p-6 backdrop-blur-sm">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-200">Headquarters</h3>
                  <p className="text-gray-400">Coming soon in India<br /></p>
                </div>
                <Separator className="bg-gray-800" />
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-200">Contact</h3>
                  <p className="text-gray-400">
                    +91 234 567 8900<br />
                    info@tecplore.com
                  </p>
                </div>
              </div>
            </Card>

            {/* Newsletter Subscription Card */}
            <Card className="bg-gray-900/50 border-gray-800 p-6 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-200">Newsletter</h3>
                </div>

                <form onSubmit={handleSubscribe} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {subscribeStatus === 'success' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-green-500/10 text-green-400 p-4 rounded-lg flex items-center gap-3"
                      >
                        <Check className="h-5 w-5" />
                        <div className="space-y-1">
                          <p className="font-medium">Successfully subscribed!</p>
                          <p className="text-sm text-green-500/80">
                            Check your inbox for a confirmation email.
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex gap-3">
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-gray-950/50 border-gray-800 text-white placeholder:text-gray-500 focus:border-blue-500 transition-colors"
                          />
                          <Button 
                            type="submit"
                            disabled={isSubscribing}
                            className="bg-blue-600 hover:bg-blue-500 text-white min-w-[120px] transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                          >
                            {isSubscribing ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              'Subscribe'
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <p className="text-sm text-gray-400">
                    Join our newsletter to receive the latest updates, industry insights, 
                    and exclusive offers. You can unsubscribe at any time.
                  </p>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;