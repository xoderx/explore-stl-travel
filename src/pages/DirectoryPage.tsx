import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, SlidersHorizontal } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Listing } from '@shared/types';
import { ListingCard } from '@/components/shared/ListingCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
      <div className="space-y-4">
        <h1 className="text-3xl font-display font-bold">Smart Directory</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search venues, cuisines, or locations..." 
            className="pl-10 h-12 bg-secondary/50 border-none rounded-2xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <Button variant="ghost" size="icon" className="flex-shrink-0 bg-secondary/50 rounded-xl">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
          {filters.map((f) => (
            <Badge
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={cn(
                "px-4 py-2 rounded-xl cursor-pointer transition-all border-none text-sm font-medium",
                selectedFilter === f ? "bg-orange-500 text-white" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              )}
            >
              {f}
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="aspect-[4/3] w-full rounded-2xl bg-secondary animate-pulse" />
          ))
        ) : filtered?.length ? (
          filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-2">
            <p className="text-muted-foreground font-medium">No results found for your search.</p>
            <Button variant="link" onClick={() => { setSearch(''); setSelectedFilter('All'); }}>Clear filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
import { cn } from '@/lib/utils';