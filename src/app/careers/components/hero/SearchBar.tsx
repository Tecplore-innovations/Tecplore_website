import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

// With exactOptionalPropertyTypes: true, we need to be explicit about types
export interface SearchBarProps {
  // Required prop
  value: string;
  // Optional props with explicit undefined union
  onChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  onSubmit: ((e: React.FormEvent) => void) | undefined;
}

const SearchBar = (props: SearchBarProps): React.ReactElement => {
  const { value, onChange, onSubmit } = props;
  
  // Safe handler with type checking
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      onSubmit={handleSubmit}
      className="mt-12 w-full"
    >
      <div className="relative max-w-2xl bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 focus-within:border-purple-500 transition-colors duration-200">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 z-10" size={20} />
        <input
          type="text"
          placeholder="Search by title or keyword"
          value={value}
          onChange={onChange || undefined}
          className="w-full pl-12 pr-4 py-4 text-white placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 bg-transparent border-0 rounded-xl"
          aria-label="Search"
        />
      </div>
    </motion.form>
  );
};

export default SearchBar;