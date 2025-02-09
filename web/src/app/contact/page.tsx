'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, Mail, MessageSquare, MapPin } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from '@/components/ui/use-toast';

// Types
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  message: string;
  services: string[];
}

interface CountryCode {
  code: string;
  flag: string;
  label: string;
}

interface ContactCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  actions: {
    text: string;
    icon: React.ReactNode;
    onClick: () => void;
  }[];
}

// Animation variants
const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5 
    }
  }
};

const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Constants
const COUNTRY_CODES: CountryCode[] = [
  { code: '+61', flag: '🇦🇺', label: 'Australia' },
  { code: '+1', flag: '🇺🇸', label: 'United States' },
  { code: '+44', flag: '🇬🇧', label: 'United Kingdom' },
  { code: '+91', flag: '🇮🇳', label: 'India' },
  { code: '+86', flag: '🇨🇳', label: 'China' },
  { code: '+81', flag: '🇯🇵', label: 'Japan' },
  { code: '+49', flag: '🇩🇪', label: 'Germany' },
];

const SERVICES = [
  'Existing Products',
  'Custom Product',
  'Strategy & consulting',
  'Other'
] as const;

const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    message: '',
    services: []
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add your form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+1',
        message: '',
        services: []
      });
    } catch (error: unknown) {
      // Properly handle the error with type safety
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards: ContactCard[] = [
    {
      title: "Chat with us",
      description: "Speak to our friendly team via live chat.",
      icon: <MessageSquare className="h-5 w-5" />,
      actions: [
        {
          text: "Start a live chat",
          icon: <MessageSquare className="h-4 w-4" />,
          onClick: () => window.open('your-chat-url', '_blank')
        },
        {
          text: "Send an email",
          icon: <Mail className="h-4 w-4" />,
          onClick: () => window.location.href = 'mailto:support@example.com'
        }
      ]
    },
    {
      title: "Call us",
      description: "Call our team Mon-Fri from 8am to 5pm.",
      icon: <PhoneCall className="h-5 w-5" />,
      actions: [
        {
          text: "+1 (555) 000-0000",
          icon: <PhoneCall className="h-4 w-4" />,
          onClick: () => window.location.href = 'tel:+15550000000'
        }
      ]
    },
    {
      title: "Visit us",
      description: "Visit our office in Melbourne, Australia.",
      icon: <MapPin className="h-5 w-5" />,
      actions: [
        {
          text: "Get directions",
          icon: <MapPin className="h-4 w-4" />,
          onClick: () => window.open('your-maps-url', '_blank')
        }
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pt-16 pb-24 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/photos/contact1.jpg" 
            alt="background" 
            fill
            priority
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight break-words"
            >
              Contact us
              <br />
              Got questions? We&apos;re here to help 24/7
              <motion.span
                animate={{ 
                  color: ['#0B0B45', '#1E3A8A', '#0B0B45']  // Deep navy to royal blue
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                }}
                className="text-purple-400"
              >
                {' '}Here +
              </motion.span>
            </motion.h1>
          </motion.div>
        </div>
      </motion.div>
      <motion.div 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form 
            variants={fadeInUp}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  First name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  Last name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@company.com"
                className="w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone number
              </label>
              <div className="flex">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="w-24 rounded-l-md border border-r-0 border-input bg-background px-2 text-sm h-9 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0"
                >
                  {COUNTRY_CODES.map(({ code, flag }) => (
                    <option key={code} value={code}>
                      {flag} {code}
                    </option>
                  ))}
                </select>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 000-0000"
                  className="rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="How can we help you?"
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2">
                Services
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                {SERVICES.map((service) => (
                  <label
                    key={service}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="rounded border-gray-300 dark:border-gray-700"
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
            </Button>
          </motion.form>

          {/* Contact Cards */}
          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
          >
            {contactCards.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="transition-all duration-200"
              >
                <Card className="overflow-hidden dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {card.icon}
                      <h2 className="text-xl font-semibold">{card.title}</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {card.description}
                    </p>
                    <div className="space-y-3">
                      {card.actions.map((action, actionIndex) => (
                        <motion.div
                          key={actionIndex}
                          whileHover={{ x: 5 }}
                        >
                          <Button
                            variant="outline"
                            onClick={action.onClick}
                            className="w-full justify-start"
                          >
                            {action.icon}
                            <span className="ml-2">{action.text}</span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      <Toaster />
    </div>
  );
};

export default ContactPage;