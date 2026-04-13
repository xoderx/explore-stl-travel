import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sparkles, Utensils, Landmark, Music, Trees } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Listing } from '@shared/types';
import { ListingCard } from '@/components/shared/ListingCard';
import { LoopNightsModule } from '@/components/special/LoopNightsModule';
import { WalkableMap } from '@/components/special/WalkableMap';
import { useDistrictStore } from '@/store/use-district-store';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const categories = [
  { name: 'Food', icon: Utensils, color: 'bg-orange-500' },
  { name: 'Attractions', icon: Landmark, color: 'bg-blue-500' },
  { name: 'Nightlife', icon: Music, color: 'bg-purple-500' },
  { name: 'Parks', icon: Trees, color: 'bg-green-500' },
];
export function HomePage() {
  const currentDistrict = useDistrictStore(s => s.currentDistrict);
  const { data: listings, isLoading } = useQuery({
    queryKey: ['listings'],
    queryFn: () => api<Listing[]>('/api/listings'),
  });

  const filteredListings = listings?.filter(l => l.district === currentDistrict);

  return (
    <div className="space-y-10 animate-fade-in">
      <section className="space-y-4">
        {currentDistrict === 'delmar' ? (
          <div className="space-y-2">
            <h2 className="text-xs font-bold tracking-[0.2em] text-pink-500 uppercase">Neon Nights</h2>
            <h1 className="text-4xl md:text-6xl font-display font-bold">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 drop-shadow-sm">Delmar Loop</span></h1>
            <p className="text-muted-foreground max-w-lg">One of the 10 great streets in America. Walkable, vibrant, legendary.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <h2 className="text-xs font-bold tracking-[0.2em] text-orange-500 uppercase">Gateway to Adventure</h2>
            <h1 className="text-4xl md:text-6xl font-display font-bold">Explore <span className="text-gradient">St. Louis</span></h1>
            <p className="text-muted-foreground max-w-lg">Discover the best of the 314 with your personal Travel OS.</p>
          </div>
        )}
      </section>

      {currentDistrict === 'delmar' && <WalkableMap />}

      <section>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <div key={cat.name} className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
              <div className={`${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 group-active:scale-95`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {currentDistrict === 'delmar' ? (
        <LoopNightsModule />
      ) : (
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
          <Sparkles className="absolute top-[-20px] right-[-20px] w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 space-y-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold">Unlock 314 Deals</h3>
              <p className="text-orange-100 text-sm max-w-xs">Scan your City Card at any partner venue to earn points and exclusive discounts.</p>
            </div>
            <Button variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50 border-none font-bold rounded-xl">
              View My Wallet
            </Button>
          </div>
        </section>
      )}

      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h3 className="text-2xl font-bold">Featured Experiences</h3>
          <Button variant="link" className="text-orange-500 p-0 h-auto font-bold">See all</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : (
            filteredListings?.filter(l => l.featured).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}