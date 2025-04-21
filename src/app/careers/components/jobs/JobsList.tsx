import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Position } from '../../types';
import FeaturedJobCard from './FeaturedJobCard';
import Pagination from './Pagination';

interface JobsListProps {
  positions: Position[];
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onApply: (position: Position) => void;
  baseUrl: string; // Add baseUrl to the props
}

const JobsList: React.FC<JobsListProps> = ({
  positions,
  currentPage,
  pageSize,
  onPageChange,
  onApply,
  baseUrl // Add baseUrl to the destructured props
}) => {
  const totalPages = Math.ceil(positions.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const displayedPositions = positions.slice(startIndex, startIndex + pageSize);

  return (
    <div className="py-12 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-12 flex-wrap gap-4"
      >
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Featured Opportunities</h2>
          <p className="text-gray-700 mt-2">
            {positions.length} positions found
          </p>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {displayedPositions.map((position: Position, index: number) => (
            <motion.div
              key={position.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <FeaturedJobCard
                position={position}
                onApply={onApply}
                baseUrl={baseUrl} // Pass baseUrl to FeaturedJobCard
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {positions.length > pageSize && (
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default JobsList;