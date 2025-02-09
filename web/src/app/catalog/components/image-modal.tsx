'use client';

{/* app/catalog/components/image-modal.tsx */}

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt: string;
  title?: string;
}

export function ImageModal({ 
  isOpen, 
  onClose, 
  imageSrc, 
  alt, 
  title = "Image Preview" 
}: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{title}: {alt}</DialogTitle>
        </DialogHeader>
        <div className="relative h-full w-full">
          <Button
            className="absolute right-4 top-4 z-10"
            size="icon"
            variant="outline"
            onClick={onClose}
            aria-label="Close image preview"
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="h-full w-full flex items-center justify-center p-4">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}