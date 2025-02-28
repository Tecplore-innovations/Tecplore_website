'use client';

/* app/catalog/components/product-detail.tsx */

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { 
  Share2, Download, ArrowRight, ArrowLeft,
  Facebook, Twitter, Linkedin, FileText,
  Building2, Users2, Ruler, Power, Globe, Wind,
  CheckCircle2, Shield, Lightbulb, GraduationCap,
  ArrowUpRight, ChevronRight, Box,
  Activity, Thermometer, Sun, Triangle, Battery,
  Layers, Search, ZoomIn, Grid, Square,
  Camera, Maximize, Circle, Mail, Phone
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedExhibit } from '../types';
import { EXHIBITS } from '../data';

// Define the type for icon mapping
type IconName = 
  | 'ruler' | 'power' | 'building' | 'users' | 'wind' 
  | 'gauge' | 'thermometer' | 'sun' | 'triangle' | 'battery' 
  | 'layers' | 'search' | 'zoom-in' | 'container' | 'box' 
  | 'grid' | 'square' | 'camera' | 'maximize' | 'circle';

// Type guard to check if a string is a valid IconName
function isIconName(icon: string | undefined): icon is IconName {
  if (!icon) return false;
  
  const validIcons: ReadonlyArray<IconName> = [
    'ruler', 'power', 'building', 'users', 'wind', 
    'gauge', 'thermometer', 'sun', 'triangle', 'battery', 
    'layers', 'search', 'zoom-in', 'container', 'box', 
    'grid', 'square', 'camera', 'maximize', 'circle'
  ] as const;
  
  return validIcons.includes(icon as IconName);
}

interface ProductDetailProps {
  product: EnhancedExhibit;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const isMediaInView = useInView(mediaRef);

  // Get related products
  const relatedProducts = EXHIBITS.filter(
    exhibit => exhibit.category === product.category && exhibit.id !== product.id
  ).slice(0, 3);

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
    // Added return for the case where the condition is not met
    return () => {};
  }, [isMediaInView, product?.media]);

  const handleShare = async (platform?: string) => {
    const shareUrl = window.location.href;
    const shareText = `Check out ${product.title} - ${product.description}`;
    
    const platforms: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(product.title)}`
    };

    if (platform && platforms[platform]) {
      window.open(platforms[platform], '_blank');
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

  // Function to get icon component based on string name
  const getIconComponent = (iconName?: string) => {
    // Use the type guard to ensure type safety
    if (!iconName || !isIconName(iconName)) return <Lightbulb className="h-5 w-5" />;
    
    const iconMap: Record<IconName, React.ReactElement> = {
      ruler: <Ruler className="h-5 w-5" />,
      power: <Power className="h-5 w-5" />,
      building: <Building2 className="h-5 w-5" />,
      users: <Users2 className="h-5 w-5" />,
      wind: <Wind className="h-5 w-5" />,
      gauge: <Activity className="h-5 w-5" />,
      thermometer: <Thermometer className="h-5 w-5" />,
      sun: <Sun className="h-5 w-5" />,
      triangle: <Triangle className="h-5 w-5" />,
      battery: <Battery className="h-5 w-5" />,
      layers: <Layers className="h-5 w-5" />,
      search: <Search className="h-5 w-5" />,
      "zoom-in": <ZoomIn className="h-5 w-5" />,
      container: <Box className="h-5 w-5" />,
      box: <Box className="h-5 w-5" />,
      grid: <Grid className="h-5 w-5" />,
      square: <Square className="h-5 w-5" />,
      camera: <Camera className="h-5 w-5" />,
      maximize: <Maximize className="h-5 w-5" />,
      circle: <Circle className="h-5 w-5" />
    };
    
    return iconMap[iconName];
  };

  // Product Media Gallery
  const MediaGallery = () => (
    <div 
      ref={mediaRef}
      className="relative aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 shadow-lg"
    >
      {product.media ? (
        <>
          {product.media.map((item, index) => (
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
          
          {/* Media Navigation Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2 bg-black/20 backdrop-blur-sm p-2 rounded-full">
            {product.media.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeMediaIndex === index ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setActiveMediaIndex(index)}
                aria-label={`View media item ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Large Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-black/20 backdrop-blur-sm text-white pointer-events-auto"
              onClick={() => setActiveMediaIndex(prev => prev === 0 ? product.media!.length - 1 : prev - 1)}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-black/20 backdrop-blur-sm text-white pointer-events-auto"
              onClick={() => setActiveMediaIndex(prev => prev === product.media!.length - 1 ? 0 : prev + 1)}
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
        </>
      ) : (
        // Fallback if no media is available
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          priority
        />
      )}
    </div>
  );

  // Product Header (Title, Category, Actions)
  const ProductHeader = () => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Link href="/catalog" className="text-sm text-blue-600 hover:underline hover:text-blue-800">
            Catalog
          </Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setShowShareModal(true)}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button onClick={() => setShowQuoteModal(true)}>
          Request Quote
        </Button>
      </div>
    </div>
  );

  // Product Overview (Description, Stats, Price)
  const ProductOverview = () => (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{product.headerTagline || "Product Overview"}</h2>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
        
        {product.conceptualQuestions && product.conceptualQuestions.length > 0 && (
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-blue-800">Questions this product helps answer:</h3>
            <ul className="space-y-2">
              {product.conceptualQuestions.map((question, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{question}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Category:</span>
              <Badge variant="outline">{product.category}</Badge>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Availability:</span>
              <Badge
                className={`${
                  product.availability === 'in-stock'
                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                    : product.availability === 'pre-order'
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                }`}
                variant="secondary"
              >
                {product.availability === 'in-stock'
                  ? 'In Stock'
                  : product.availability === 'pre-order'
                  ? 'Pre-order'
                  : 'Coming Soon'}
              </Badge>
            </div>
            {product.price && (
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium text-lg">
                  ${product.price.toLocaleString()}
                </span>
              </div>
            )}
            <div className="pt-4">
              <Button className="w-full" onClick={() => setShowContactInfo(true)}>
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );

  // Product Features Grid
  const FeaturesSection = () => (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
      {product.features && product.features.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                {getIconComponent(feature.icon)}
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">Feature information will be available soon.</p>
      )}
    </section>
  );

  // Product Content Sections (with alternating layout)
  const ContentSections = () => (
    <section className="mt-16 space-y-16">
      {product.sections && product.sections.length > 0 ? (
        product.sections.map((section, index) => (
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
              <div className="relative aspect-video rounded-xl overflow-hidden group">
                <Image
                  src={section.imageUrl}
                  alt={section.altText}
                  fill
                  className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold">{section.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {section.description}
              </p>
              <Button variant="outline" className="mt-4">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-gray-500 italic">Additional product details coming soon.</p>
      )}
    </section>
  );
  
  // Technical Specifications & Resources
  const SpecsAndResourcesSection = () => (
    <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Technical Specifications</h2>
        {product.technicalSpecs && product.technicalSpecs.length > 0 ? (
          <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-200">
            {product.technicalSpecs.map((spec, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  {getIconComponent(spec.icon)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{spec.label}</p>
                  <p className="text-sm text-gray-600">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Technical specifications will be available soon.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Resources & Documentation</h2>
        {product.resources && product.resources.length > 0 ? (
          <div className="space-y-4">
            {product.resources.map((resource, index) => (
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
        ) : (
          <p className="text-gray-500 italic">Resources will be available soon.</p>
        )}
      </div>
    </section>
  );

  // Setup & Safety Tabs
  const SetupAndSafetySection = () => (
    <section className="mt-16">
      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="w-full max-w-md mx-auto justify-center mb-8">
          <TabsTrigger value="setup">Setup Guide</TabsTrigger>
          <TabsTrigger value="safety">Safety Guidelines</TabsTrigger>
          <TabsTrigger value="benefits">Educational Benefits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="setup">
          {product.setupGuide ? (
            <div className="bg-white p-6 rounded-xl border border-gray-200 max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="outline">{product.setupGuide.difficulty}</Badge>
                <span className="text-sm text-gray-500">
                  Time Required: {product.setupGuide.timeRequired}
                </span>
              </div>
              <div className="space-y-6">
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
          ) : (
            <p className="text-center text-gray-500 italic">Setup information will be available soon.</p>
          )}
        </TabsContent>
        
        <TabsContent value="safety">
          {product.safety ? (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-amber-600" />
                  Safety Requirements
                </h4>
                <ul className="space-y-2">
                  {product.safety.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-amber-600 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-semibold mb-4">Guidelines</h4>
                <ul className="space-y-2">
                  {product.safety.guidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                      <span>{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">Safety guidelines will be available soon.</p>
          )}
        </TabsContent>
        
        <TabsContent value="benefits">
          {product.educationalBenefits && product.educationalBenefits.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {product.educationalBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white p-4 rounded-lg border border-gray-200"
                >
                  <div className="mt-1">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">Educational benefit information will be available soon.</p>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );

  // Related Products Section
  const RelatedProductsSection = () => (
    <section className="mt-20 mb-12">
      <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map((relatedProduct) => (
          <Link 
            href={`/catalog/${relatedProduct.id}`} 
            key={relatedProduct.id}
            className="group"
          >
            <Card className="h-full transition-all duration-300 group-hover:shadow-md overflow-hidden">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={relatedProduct.image}
                  alt={relatedProduct.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{relatedProduct.title}</CardTitle>
                <CardDescription>{relatedProduct.category}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-0 flex justify-between items-center">
                <Badge variant="outline">
                  {relatedProduct.price 
                    ? `$${relatedProduct.price.toLocaleString()}` 
                    : 'Contact for Price'}
                </Badge>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );

  // Bottom CTA Section
  const CTASection = () => (
    <section className="mt-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl overflow-hidden shadow-xl">
      <div className="p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to transform your classroom?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Contact our educational consultants to discuss how {product.title} can enhance your teaching experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="secondary"
            size="lg"
            onClick={() => setShowQuoteModal(true)}
          >
            Request Quote
          </Button>
          <Button 
            variant="outline" 
            className="bg-transparent border-white text-white hover:bg-white/20"
            size="lg"
            onClick={() => setShowContactInfo(true)}
          >
            Contact Sales
          </Button>
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
                <input type="radio" name="contact" value="email" defaultChecked />
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

  // Contact Info Modal
  const ContactInfoModal = () => (
    <Dialog open={showContactInfo} onOpenChange={setShowContactInfo}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Our Sales Team</DialogTitle>
          <DialogDescription>
            Get in touch with our educational consultants for more information.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">sales@tecplore.edu</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Website</p>
              <p className="font-medium">www.tecplore.edu</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setShowContactInfo(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductHeader />
        <MediaGallery />
        <ProductOverview />
        <FeaturesSection />
        <ContentSections />
        <SetupAndSafetySection />
        <SpecsAndResourcesSection />
        <RelatedProductsSection />
        <CTASection />
      </div>
      
      <ShareModal />
      <QuoteRequestModal />
      <ContactInfoModal />
    </div>
  );
}