import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Listing } from '@shared/types';
import { ListingCard } from '@/components/shared/ListingCard';
import { DistrictModules } from '@/components/special/DistrictModules';
import { WalkableMap } from '@/components/special/WalkableMap';
import { useDistrictStore } from '@/store/use-district-store';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function HomePage() {
  const currentDistrict = useDistrictStore(s => s.currentDistrict);
  const { data: listings, isLoading } = useQuery({
    queryKey: ['listings'],
    queryFn: () => api<Listing[]>('/api/listings'),
  });
  const filteredListings = listings?.filter(l => l.district === currentDistrict);
  const getHeroContent = () => {
    switch (currentDistrict) {
      case 'delmar': return { tag: 'Neon Nights', title: 'The Delmar Loop', desc: 'One of the 10 great streets in America. Walkable, vibrant, legendary.', accent: 'from-pink-500 to-cyan-400' };
      case 'cwe': return { tag: 'Refined Lifestyle', title: 'Central West End', desc: 'Sidewalk cafes, elegant boutiques, and historic charm.', accent: 'from-stone-600 to-stone-400' };
      case 'grove': return { tag: 'Vibrant & Diverse', title: 'The Grove', desc: 'The heart of STL nightlife and LGBTQ+ culture.', accent: 'from-purple-500 to-pink-500' };
      case 'downtown': return { tag: 'The Gateway', title: 'Downtown STL', desc: 'Where business meets pleasure in the heart of the city.', accent: 'from-blue-600 to-amber-500' };
      case 'ferguson': return { tag: 'Community & Culture', title: 'Strength in Ferguson', desc: 'A district built on resilience, local flavor, and community impact.', accent: 'from-amber-600 to-amber-500' };
      default: return { tag: 'Gateway to Adventure', title: 'Explore St. Louis', desc: 'Discover the best of the 314 with your personal Travel OS.', accent: 'from-orange-500 to-orange-400' };
    }
  };
  const hero = getHeroContent();
  return (
    <div className="space-y-10 animate-fade-in">
      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xs font-bold tracking-[0.2em] text-primary uppercase">{hero.tag}</h2>
          <h1 className="text-4xl md:text-6xl font-display font-bold">
            {hero.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", hero.accent)}>
              {hero.title.split(' ').pop()}
            </span>
          </h1>
          <p className="text-muted-foreground max-w-lg">{hero.desc}</p>
        </div>
      </section>
      {currentDistrict === 'delmar' && <WalkableMap />}
      <section className="space-y-6">
        <DistrictModules district={currentDistrict} />
      </section>
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h3 className="text-2xl font-bold">Featured Experiences</h3>
          <Button variant="link" className="text-primary p-0 h-auto font-bold">See all</Button>
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