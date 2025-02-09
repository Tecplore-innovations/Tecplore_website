import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit }) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      onSubmit={onSubmit}
      className="mt-12 w-full"
    >
      <div className="relative max-w-2xl bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 z-10" />
        <input
          type="text"
          placeholder="Search by title or keyword"
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-4 py-4 text-white placeholder-gray-100 focus:border-purple-500 focus:ring-purple-500 focus:ring-offset-0 bg-transparent border-0"
        />
      </div>
    </motion.form>
  );
};

export default SearchBar;