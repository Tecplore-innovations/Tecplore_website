{/* app/catalog/[id]/page.tsx */}

import React from 'react';
import { ProductDetail } from '../components/product-detail';
import { EXHIBITS } from '../data';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const productId = parseInt(resolvedParams.id);
  const product = EXHIBITS.find(exhibit => exhibit.id === productId);

  // If no product is found, use Next.js notFound function
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

export async function generateStaticParams() {
  return EXHIBITS.map((exhibit) => ({
    id: exhibit.id.toString(),
  }));
}