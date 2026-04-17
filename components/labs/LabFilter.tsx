'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export interface FilterOption {
  id: string;
  label: string;
  category: 'difficulty' | 'topic';
  count?: number;
}

interface LabFilterProps {
  filters: FilterOption[];
  onFilterChange: (selectedFilters: FilterOption[]) => void;
  className?: string;
}

export const LabFilter: React.FC<LabFilterProps> = ({
  filters,
  onFilterChange,
  className,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const handleFilterToggle = (filter: FilterOption) => {
    const newSelected = new Set(selectedFilters);

    if (newSelected.has(filter.id)) {
      newSelected.delete(filter.id);
    } else {
      newSelected.add(filter.id);
    }

    setSelectedFilters(newSelected);

    // Get all selected filter objects
    const selectedFilterObjects = filters.filter((f) =>
      newSelected.has(f.id)
    );

    // If no filters selected, pass empty array (show all)
    if (newSelected.size === 0) {
      onFilterChange([]);
    } else {
      onFilterChange(selectedFilterObjects);
    }
  };

  // Group filters by category
  const difficultyFilters = filters.filter((f) => f.category === 'difficulty');
  const topicFilters = filters.filter((f) => f.category === 'topic');

  return (
    <div className={clsx('space-y-6', className)}>
      {/* Difficulty Filters */}
      {difficultyFilters.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            {difficultyFilters.map((filter) => {
              const isSelected = selectedFilters.has(filter.id);

              return (
                <motion.button
                  key={filter.id}
                  onClick={() => handleFilterToggle(filter)}
                  className={clsx(
                    'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300',
                    isSelected
                      ? 'bg-[#0369A1] text-white shadow-lg border-b-2 border-white'
                      : 'bg-white/15 text-[#0F172A] border border-white/20 hover:bg-white/20'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`filter-${filter.id}`}
                >
                  <span>{filter.label}</span>
                  {filter.count !== undefined && (
                    <span className="ml-2 text-xs opacity-75">({filter.count})</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Topic Filters */}
      {topicFilters.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Topic</h3>
          <div className="flex flex-wrap gap-2">
            {topicFilters.map((filter) => {
              const isSelected = selectedFilters.has(filter.id);

              return (
                <motion.button
                  key={filter.id}
                  onClick={() => handleFilterToggle(filter)}
                  className={clsx(
                    'px-3 py-1 rounded-full font-medium text-xs transition-all duration-300',
                    isSelected
                      ? 'bg-[#0369A1] text-white shadow-md border-b border-white'
                      : 'bg-white/15 text-[#0F172A] border border-white/20 hover:bg-white/20'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`filter-${filter.id}`}
                >
                  {filter.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Clear All Button */}
      {selectedFilters.size > 0 && (
        <motion.button
          onClick={() => {
            setSelectedFilters(new Set());
            onFilterChange([]);
          }}
          className="text-xs text-[#0369A1] hover:text-[#0369A1]/80 font-medium transition-colors"
          whileHover={{ x: 2 }}
          data-testid="clear-filters"
        >
          Clear all filters
        </motion.button>
      )}
    </div>
  );
};

LabFilter.displayName = 'LabFilter';
