{/* app/catalog/page.tsx */}

import { CatalogGrid } from './components/catalog-grid';
import { EXHIBITS } from './data';

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-white">
      <CatalogGrid exhibits={EXHIBITS} />
    </div>
  );
}