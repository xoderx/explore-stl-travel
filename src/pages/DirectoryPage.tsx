import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, SlidersHorizontal, X, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api-client';
import type { Listing } from '@shared/types';
import { ListingCard } from '@/components/shared/ListingCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const filters = ['All', 'Food', 'Attractions', 'Nightlife', 'Museums', 'Parks'];
export function DirectoryPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { data: listings, isLoading } = useQuery({
    queryKey: ['listings'],
    queryFn: () => api<Listing[]>('/api/listings'),
  });
  const filtered = listings?.filter(l => {
    const matchesFilter = selectedFilter === 'All' || l.category === selectedFilter;
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
                          l.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <h1 className="text-4xl font-display font-bold">Smart Directory</h1>
          <LayoutGrid className="text-muted-foreground w-6 h-6 mb-1" />
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-orange-500" />
          <Input
            placeholder="Search venues, cuisines, or locations..."
            className="pl-12 pr-12 h-14 bg-secondary/40 border-none rounded-2xl focus-visible:ring-2 ring-orange-500/20 text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
              onClick={() => setSearch('')}
            >
              <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </Button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <Button variant="outline" size="icon" className="flex-shrink-0 bg-secondary/40 rounded-xl border-none h-11 w-11">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
          {filters.map((f) => (
            <Badge
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={cn(
                "px-5 py-2.5 rounded-xl cursor-pointer transition-all border-none text-sm font-bold whitespace-nowrap",
                selectedFilter === f 
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-105" 
                  : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60"
              )}
            >
              {f}
            </Badge>
          ))}
        </div>
      </div>
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <motion.div 
                key={`skel-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="aspect-video w-full rounded-3xl bg-secondary animate-pulse" />
                <div className="h-6 w-3/4 bg-secondary animate-pulse rounded-lg" />
                <div className="h-4 w-1/2 bg-secondary animate-pulse rounded-lg" />
              </motion.div>
            ))
          ) : filtered?.length ? (
            filtered.map((listing) => (
              <motion.div
                key={listing.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ListingCard listing={listing} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-32 text-center space-y-4"
            >
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">No results found</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">Try adjusting your filters or search terms for better results.</p>
              <Button variant="link" className="text-orange-500 font-bold" onClick={() => { setSearch(''); setSelectedFilter('All'); }}>
                Clear all filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}