"use client"

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const ProcessDetail = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery & Research",
      description: "We begin with understanding your goals, target audience, and project requirements through in-depth research and consultation.",
      image: "/photos/process/discovery.jpg"
    },
    {
      number: "02", 
      title: "Concept Development",
      description: "Our team creates innovative concepts and designs based on research findings and your specific requirements.",
      image: "/concept.jpg"
    },
    {
      number: "03",
      title: "Design & Engineering",
      description: "We bring concepts to life through detailed design, prototyping, and rigorous engineering processes.",
      image: "/engineering.jpg"
    },
    {
      number: "04",
      title: "Testing & Refinement",
      description: "Each element undergoes thorough testing and refinement to ensure optimal performance and user experience.",
      image: "/testing.jpg"
    },
    {
      number: "05",
      title: "Implementation",
      description: "We handle the complete implementation, from manufacturing to installation, ensuring quality at every step.",
      image: "/implementation.jpg"
    },
    {
      number: "06",
      title: "Support & Maintenance",
      description: "Our commitment continues with comprehensive support and maintenance services post-implementation.",
      image: "/support.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src="/process-hero.jpg"
          alt="Our Process"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Our Process</h1>
        </div>
      </div>

      {/* Process Steps */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {steps.map((step, index) => (
            <div key={step.number} className="flex gap-8">
              <div className="flex-none">
                <span className="text-4xl font-bold text-black/20">{step.number}</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                <div className="relative h-60 w-full rounded-lg overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <Button 
            className="bg-black hover:bg-gray-800 px-8 py-6 text-lg"
            onClick={() => window.location.href = '/contact'}
          >
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProcessDetail