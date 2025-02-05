import React from 'react';
import { ProductDetail } from '../components/productDetail';
import { EXHIBITS } from '../data';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const productId = parseInt(resolvedParams.id);
  const product = EXHIBITS.find(exhibit => exhibit.id === productId);

  return <ProductDetail product={product} />;
}

export async function generateStaticParams() {
  return EXHIBITS.map((exhibit) => ({
    id: exhibit.id.toString(),
  }));
}