'use client';

{/* app/catalog/components/product-detail.tsx */}

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { 
  ChevronLeft, Share2, Download, ArrowRight, 
  Facebook, Twitter, Linkedin, FileText,
  Building2, Users2, Ruler, Power, Globe,
  CheckCircle2, Shield, Lightbulb, GraduationCap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedExhibit } from '../types';

interface ProductDetailProps {
  product: EnhancedExhibit;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const isMediaInView = useInView(mediaRef);

  // Auto-scroll media section
  useEffect(() => {
    if (isMediaInView && product?.media && product.media.length > 1) {
      const interval = setInterval(() => {
        setActiveMediaIndex((prev) => 
          prev === product.media!.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMediaInView, product?.media]);

  const handleShare = async (platform?: string) => {
    const shareUrl = window.location.href;
    const shareText = `Check out ${product.title} - ${product.description}`;
    
    const platforms = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(product.title)}`
    };

    if (platform && platforms[platform as keyof typeof platforms]) {
      window.open(platforms[platform as keyof typeof platforms], '_blank');
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      setShowShareModal(true);
    }
  };

  // Section 1: Auto-scrolling Media Hero Section
  const MediaSection = () => (
    <div 
      ref={mediaRef}
      className="relative h-[80vh] overflow-hidden rounded-xl bg-gray-100"
    >
      {product.media?.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: activeMediaIndex === index ? 1 : 0,
            scale: activeMediaIndex === index ? 1 : 1.1 
          }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {item.type === 'image' ? (
            <Image
              src={item.url}
              alt={item.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          ) : (
            <video
              src={item.url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      ))}
      
      {/* Media Navigation Dots */}
      <div className="absolute bottom-4 right-4 flex gap-2 bg-black/20 p-2 rounded-full">
        {product.media?.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              activeMediaIndex === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setActiveMediaIndex(index)}
          />
        ))}
      </div>
    </div>
  );

  // Section 2: Dynamic Header Section
  const HeaderSection = () => (
    <div className="py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-4xl font-bold mb-6">
          {product.headerTagline || "Revolutionize Your Learning Experience"}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {product.description}
        </p>
        {product.conceptualQuestions && (
          <div className="mt-8 space-y-4">
            {product.conceptualQuestions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-lg text-gray-700 italic"
              >
                {question}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );

  // Section 3: Alternating Content Sections
  const ContentSections = () => (
    <div className="space-y-24">
      {product.sections?.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`flex flex-col ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          } gap-8 items-center`}
        >
          <div className="flex-1">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
              <Image
                src={section.imageUrl}
                alt={section.altText}
                fill
                className="object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="text-3xl font-bold">{section.title}</h3>
            <p className="text-gray-600 leading-relaxed">
              {section.description}
            </p>
            <Button variant="outline" className="mt-4">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Section 4: Features Grid
  const FeaturesSection = () => (
    <section className="py-16 bg-gray-50 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Key Features & Benefits
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {product.features?.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Section 5: Educational Benefits & Setup Guide
  const EducationalSection = () => (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <Tabs defaultValue="benefits" className="w-full">
          <TabsList className="w-full justify-start mb-8">
            <TabsTrigger value="benefits">Educational Benefits</TabsTrigger>
            <TabsTrigger value="setup">Setup Guide</TabsTrigger>
            <TabsTrigger value="safety">Safety Guidelines</TabsTrigger>
          </TabsList>
          
          <TabsContent value="benefits">
            <div className="grid md:grid-cols-2 gap-8">
              {product.educationalBenefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="setup">
            {product.setupGuide && (
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-6">
                  <Badge variant="outline">{product.setupGuide.difficulty}</Badge>
                  <span className="text-sm text-gray-500">
                    Time Required: {product.setupGuide.timeRequired}
                  </span>
                </div>
                <div className="space-y-4">
                  {product.setupGuide.steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 flex-1">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="safety">
            {product.safety && (
              <div className="space-y-8">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-amber-600" />
                    Safety Requirements
                  </h4>
                  <ul className="space-y-2">
                    {product.safety.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-600" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Guidelines</h4>
                  <ul className="space-y-2">
                    {product.safety.guidelines.map((guideline, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-1 text-green-600" />
                        <span>{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );

  // Section 6: Technical Details and Resources
  const TechnicalAndResourcesSection = () => (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
            <div className="space-y-4 bg-white p-6 rounded-xl">
              {product.technicalSpecs?.map((spec, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    {spec.icon === 'building' && <Building2 className="h-5 w-5 text-blue-600" />}
                    {spec.icon === 'users' && <Users2 className="h-5 w-5 text-blue-600" />}
                    {spec.icon === 'ruler' && <Ruler className="h-5 w-5 text-blue-600" />}
                    {spec.icon === 'power' && <Power className="h-5 w-5 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{spec.label}</p>
                    <p className="text-sm text-gray-600">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Resources & Documentation</h3>
            <div className="space-y-4">
              {product.resources?.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-white hover:bg-gray-50"
                    asChild
                  >
                    <Link href={resource.fileUrl} target="_blank">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4" />
                        <span>{resource.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{resource.fileSize}</span>
                        <span>{resource.fileType}</span>
                        <Download className="h-4 w-4" />
                      </div>
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Share Modal
  const ShareModal = () => (
    <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this Product</DialogTitle>
          <DialogDescription>
            Share this product with your colleagues and friends
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleShare('facebook')}
          >
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleShare('twitter')}
          >
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleShare('linkedin')}
          >
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setShowShareModal(false);
            }}
          >
            <Globe className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Quote Request Modal
  const QuoteRequestModal = () => (
    <Dialog open={showQuoteModal} onOpenChange={setShowQuoteModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            Please provide your details and we&apos;ll get back to you with pricing information.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <Input placeholder="Your Name" />
          <Input type="email" placeholder="Email Address" />
          <Input placeholder="Organization" />
          <Textarea 
            placeholder="Additional Requirements or Questions"
            className="min-h-[100px]"
          />
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Preferred Contact Method</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="contact" value="email" />
                <span>Email</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="contact" value="phone" />
                <span>Phone</span>
              </label>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" onClick={() => setShowQuoteModal(false)}>
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/catalog"
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Catalog
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setShowShareModal(true)}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button onClick={() => setShowQuoteModal(true)}>
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-24">
        <MediaSection />
        <HeaderSection />
        <ContentSections />
        <FeaturesSection />
        <EducationalSection />
        <TechnicalAndResourcesSection />
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-50 border-t mt-24">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Contact Support</h4>
              <p className="text-sm text-gray-600">
                Need help with this product?
                Our technical team is here to assist you.
              </p>
              <Button variant="outline" className="mt-4">
                Contact Us
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Installation Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Technical Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Related Products</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Other STEM Equipment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Educational Tools
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Lab Supplies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Share</h4>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('facebook')}
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('twitter')}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('linkedin')}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <ShareModal />
      <QuoteRequestModal />
    </div>
  );
}