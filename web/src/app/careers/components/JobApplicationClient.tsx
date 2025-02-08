'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, MapPin, Building2, Calendar, Clock, Upload } from 'lucide-react';
import { Position } from '../components/types';
import { useRouter } from 'next/navigation';

interface JobApplicationClientProps {
  position: Position;
  onBack?: () => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const JobApplicationClient: React.FC<JobApplicationClientProps> = ({ position, onBack }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setResume(file);
        setError('');
      } else {
        setError('Please upload only PDF files');
        setResume(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setError('Please upload your resume');
      return;
    }
    console.log('Form submitted:', { ...formData, resume });
    setSubmitted(true);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/careers');
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="min-h-screen bg-black p-6"
      >
        <div className="max-w-3xl mx-auto mt-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Alert className="bg-green-500/20 border-green-500/50 text-green-400">
              <AlertDescription className="text-lg">
                Thanks for applying! We&apos;ll review your application and get back to you soon.
              </AlertDescription>
            </Alert>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={handleBack}
              className="mt-6 bg-purple-500 hover:bg-purple-600"
            >
              Back to Jobs
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <Button
            onClick={handleBack}
            variant="ghost"
            className="mb-8 text-gray-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Job Details Section */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={fadeIn}
              className="text-4xl font-bold mb-6"
            >
              {position.title}
            </motion.h1>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap gap-4 mb-8 text-gray-400"
            >
              <div className="flex items-center">
                <Building2 className="w-4 h-4 mr-2" />
                {position.department}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {position.location}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Posted {position.datePosted}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {position.type}
              </div>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="space-y-6 bg-white/5 p-6 rounded-lg"
            >
              <div>
                <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                <p className="text-gray-400">{position.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>{position.experienceRequired}+ years of experience</li>
                  <li>Expertise in {position.tags.join(', ')}</li>
                  <li>Strong communication and collaboration skills</li>
                  <li>Passion for educational technology</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {position.tags.map((tag, index) => (
                    <motion.span 
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Application Form Section */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="bg-white/5 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Apply for this position</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                variants={fadeIn}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="bg-white/5 border-white/20 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/5 border-white/20 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-white/5 border-white/20 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/20 text-white mt-2 h-32"
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>

                <div>
                  <Label htmlFor="resume">Resume (PDF only)</Label>
                  <div className="mt-2">
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('resume')?.click()}
                      className="w-full border-dashed border-2 border-white/20 hover:border-purple-500 bg-transparent"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {resume ? resume.name : 'Upload Resume'}
                    </Button>
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-purple-500 hover:bg-purple-600"
                  >
                    Submit Application
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobApplicationClient;