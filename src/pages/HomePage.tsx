import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Listing, UserCard } from '@shared/types';
import { ListingCard } from '@/components/shared/ListingCard';
import { DistrictModules } from '@/components/special/DistrictModules';
import { useDistrictStore } from '@/store/use-district-store';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { HeroOS } from '@/components/home/HeroOS';
import { ActivityFeed } from '@/components/home/ActivityFeed';
import { ExperienceGenerator } from '@/components/home/ExperienceGenerator';
import { ImpactPreview } from '@/components/home/ImpactPreview';
import { SocialFeed } from '@/components/home/SocialFeed';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';
export function HomePage() {
  const currentDistrict = useDistrictStore(s => s.currentDistrict);
  const { data: listings, isLoading } = useQuery({
    queryKey: ['listings'],
    queryFn: () => api<Listing[]>('/api/listings'),
  });
  const { data: userCard } = useQuery({
    queryKey: ['card', 'u1'],
    queryFn: () => api<UserCard & { id: string }>('/api/card/u1'),
  });
  const filteredListings = listings?.filter(l => l.district === currentDistrict);
  return (
    <div className="animate-fade-in space-y-0">
      {/* OS Welcome Layer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 flex justify-between items-center">
          {userCard && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white text-lg">G</div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">Welcome back</p>
                <p className="font-bold">Guest Explorer</p>
              </div>
            </div>
          )}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/50 border border-border/50">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold">{userCard?.points.toLocaleString() || 0} PTS</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <HeroOS />
      </div>
      <ActivityFeed />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-24">
        {/* Experience Engine Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              One Operating System. <br />
              <span className="text-orange-500">Infinite STL.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg">
              We've connected the city's heartbeat to a single digital ecosystem. From real-time foot traffic to AI-generated walking tours, the 314 is now at your fingertips.
            </p>
            <div className="flex gap-4">
              <Button className="rounded-2xl h-12 px-8 font-bold bg-primary text-primary-foreground">Get Started</Button>
              <Button variant="ghost" className="rounded-2xl h-12 font-bold gap-2">Learn More <ArrowRight className="w-4 h-4" /></Button>
            </div>
          </div>
          <ExperienceGenerator />
        </section>
        {/* Dynamic District Modules */}
        <section className="space-y-8">
          <div className="flex justify-between items-end">
            <h3 className="text-3xl font-display font-bold uppercase tracking-tighter italic">The {currentDistrict} View</h3>
            <div className="flex items-center gap-1.5 text-xs text-orange-500 font-bold uppercase tracking-widest">
              Live District Context
            </div>
          </div>
          <DistrictModules district={currentDistrict} />
        </section>
        {/* Impact Dashboard Preview */}
        <ImpactPreview />
        {/* Social Feed Integration */}
        <SocialFeed />
        {/* Featured Listings - Preserved Original */}
        <section className="space-y-8">
          <div className="flex justify-between items-end">
            <h3 className="text-3xl font-display font-bold">Featured Experiences</h3>
            <Button variant="link" className="text-primary p-0 h-auto font-bold flex items-center gap-1">
              Browse All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-video w-full rounded-3xl" />
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
        {/* Business/Partner CTA */}
        <section className="bg-secondary/30 rounded-[3rem] p-8 md:p-12 border border-border/50 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h3 className="text-3xl font-display font-bold">Own a Business in St. Louis?</h3>
            <p className="text-muted-foreground text-lg">
              Join the 400+ venues already integrated into the STL OS. Access deep analytics, manage deals, and reach thousands of explorers daily.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="rounded-2xl h-12 px-8 font-bold bg-orange-500 hover:bg-orange-600">Claim Your Listing</Button>
              <Button variant="outline" className="rounded-2xl h-12 px-8 font-bold border-border/50">Partnership Inquiries</Button>
            </div>
          </div>
          <div className="w-full md:w-1/3 aspect-square bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-950/20 dark:to-orange-900/20 rounded-3xl flex items-center justify-center p-8">
            <div className="w-full h-full bg-white dark:bg-black rounded-2xl shadow-2xl flex items-center justify-center">
              <TrendingUpIcon className="w-16 h-16 text-orange-500 opacity-20" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
  );
}