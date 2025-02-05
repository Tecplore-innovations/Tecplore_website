import { CatalogGrid } from './components/catalog-grid';
import { EXHIBITS } from './data';

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Science Experiment Exhibits</h1>
        <CatalogGrid exhibits={EXHIBITS} />
      </div>
    </div>
  );
}