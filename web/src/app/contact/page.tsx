'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, Mail, MessageSquare, MapPin } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ContactPage = () => {
  return (
    <motion.div 
      className="max-w-6xl mx-auto px-4 py-12"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Main Header */}
      <motion.div 
        className="text-center mb-12"
        variants={fadeInUp}
      >
        <h1 className="text-4xl font-bold mb-4">Contact our team</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Got any questions about the product or scaling on our platform? We&apos;re here to help.<br/>Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
          </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div variants={fadeInUp}>
          <form className="space-y-6">
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={fadeInUp}
            >
              <div>
                <label className="block text-sm font-medium mb-2">First name</label>
                <Input placeholder="First name" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last name</label>
                <Input placeholder="Last name" className="w-full" />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="you@company.com" className="w-full" />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-medium mb-2">Phone number</label>
              <div className="flex">
                <select className="w-24 rounded-l-md border border-r-0 border-input bg-background pl-2 pr-1 text-sm h-9 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0">
                  <option value="+61">
                    🇦🇺 +61
                  </option>
                  <option value="+55">
                    🇧🇷 +55
                  </option>
                  <option value="+1">
                    🇨🇦 +1
                  </option>
                  <option value="+41">
                    🇨🇭 +41
                  </option>
                  <option value="+86">
                    🇨🇳 +86
                  </option>
                  <option value="+49">
                    🇩🇪 +49
                  </option>
                  <option value="+34">
                    🇪🇸 +34
                  </option>
                  <option value="+33">
                    🇫🇷 +33
                  </option>
                  <option value="+44">
                    🇬🇧 +44
                  </option>
                  <option value="+91">
                    🇮🇳 +91
                  </option>
                  <option value="+39">
                    🇮🇹 +39
                  </option>
                  <option value="+81">
                    🇯🇵 +81
                  </option>
                  <option value="+82">
                    🇰🇷 +82
                  </option>
                  <option value="+52">
                    🇲🇽 +52
                  </option>
                  <option value="+31">
                    🇳🇱 +31
                  </option>
                  <option value="+64">
                    🇳🇿 +64
                  </option>
                  <option value="+7">
                    🇷🇺 +7
                  </option>
                  <option value="+65">
                    🇸🇬 +65
                  </option>
                  <option value="+46">
                    🇸🇪 +46
                  </option>
                  <option value="+1">
                    🇺🇸 +1
                  </option>
                </select>
                <Input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  className="rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea 
                placeholder="Leave us a message..."
                className="min-h-[150px]"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <label className="block text-sm font-medium mb-2">Services</label>
              <div className="grid grid-cols-2 gap-4">
                {['Existing Products', 'Custom Product', 
                  'Strategy & consulting', 'Other'].map((service) => (
                  <label key={service} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                Send message
              </Button>
            </motion.div>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div className="space-y-8" variants={staggerContainer}>
          <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }}>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Chat with us</h2>
                <p className="text-gray-600 mb-4">
                  Speak to our friendly team via live chat.
                </p>
                <div className="space-y-4">
                  <motion.div whileHover={{ x: 5 }}>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Start a live chat
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }}>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="mr-2 h-4 w-4" />
                      Shoot us an email
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }}>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message us on X
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }}>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Call us</h2>
                <p className="text-gray-600 mb-4">
                  Call our team Mon-Fri from 8am to 5pm.
                </p>
                <motion.div whileHover={{ x: 5 }}>
                  <Button variant="outline" className="w-full justify-start">
                    <PhoneCall className="mr-2 h-4 w-4" />
                    9876540000
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }}>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Visit us</h2>
                <p className="text-gray-600 mb-4">
                  Chat to us in person at our Melbourne HQ.
                </p>
                <motion.div whileHover={{ x: 5 }}>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    Coming soon in India
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;