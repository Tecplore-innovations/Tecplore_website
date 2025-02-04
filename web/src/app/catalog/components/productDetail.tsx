'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Download, Share2, Building2, Users2, Ruler, Weight, Clock, Power, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Exhibit } from '../page';

interface ProductDetailProps {
  product: Exhibit | undefined;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const handleImageClick = (imageSrc: string) => {
    setCurrentImage(imageSrc);
    setShowModal(true);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link
            href="/catalog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Additional product images (replace with actual images in production)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/catalog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Catalog
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
        {/* Header Section */}
        <div className="space-y-4">
          <Badge className="mb-4">{product.category}</Badge>
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button>Request Quote</Button>
            </div>
          </div>
        </div>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div 
              className="relative aspect-video rounded-lg overflow-hidden bg-white cursor-pointer"
              onClick={() => handleImageClick(product.image)}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.slice(1).map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative aspect-square rounded-lg overflow-hidden bg-white cursor-pointer"
                  onClick={() => handleImageClick(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.title} view ${idx + 2}`}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            {/* Quick Specifications */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Ruler className="h-5 w-5" />
                <span>Dimensions: 120 x 80 x 160 cm</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Weight className="h-5 w-5" />
                <span>Weight: 75 kg</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Power className="h-5 w-5" />
                <span>Power: 220V AC</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span>Setup Time: 30 mins</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Building2 className="h-5 w-5" />
                <span>Space Required: 4m²</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users2 className="h-5 w-5" />
                <span>Max Participants: 4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Demo Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Product Demonstration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: "Product Overview",
                description: "Complete walkthrough of features and setup",
                duration: "5:30" 
              },
              { 
                title: "Student Experiments",
                description: "Examples of classroom activities",
                duration: "6:15" 
              },
              { 
                title: "Setup & Maintenance",
                description: "Installation and care guidelines",
                duration: "4:45" 
              }
            ].map((video, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-white">
                  <Image
                    src="/api/placeholder/640/360"
                    alt={video.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Features</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Interactive digital display with real-time data",
              "Adjustable parameters for different experiments",
              "Built-in safety features",
              "Durable construction for long-term use",
              "Easy maintenance and cleaning",
              "Compatible with data logging software",
            ].map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Educational Benefits */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Educational Benefits</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Hands-on experience with scientific principles",
              "Aligned with STEM curriculum standards",
              "Supports multiple learning styles",
              "Encourages collaborative learning",
              "Develops critical thinking skills",
              "Real-world applications demonstration"
            ].map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Resources Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Resources</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Documents</h3>
              <ul className="space-y-3">
                {[
                  { title: "Technical Specifications", size: "2.4 MB" },
                  { title: "Installation Guide", size: "1.8 MB" },
                  { title: "Educational Guide", size: "3.2 MB" },
                  { title: "Safety Manual", size: "1.1 MB" }
                ].map((doc, index) => (
                  <li key={index}>
                    <Button variant="outline" className="w-full justify-between">
                      <span className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        {doc.title}
                      </span>
                      <span className="text-gray-500 text-sm">{doc.size}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Support</h3>
              <div className="space-y-3">
                <p className="text-gray-600">Need help with this product?</p>
                <Button className="w-full">Contact Support</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Image Modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-[90vw] h-[90vh] p-0">
            <div className="relative h-full w-full">
              <Button
                className="absolute right-4 top-4 z-10"
                size="icon"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                <X className="h-6 w-6" />
              </Button>
              <Image
                src={currentImage}
                alt="Product view"
                fill
                className="object-contain"
                priority
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}