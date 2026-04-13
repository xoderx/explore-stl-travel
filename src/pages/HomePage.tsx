import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Listing, UserCard } from '@shared/types';
import { ListingCard } from '@/components/shared/ListingCard';
import { DistrictModules } from '@/components/special/DistrictModules';
import { useDistrictStore } from '@/store/use-district-store';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroOS } from '@/components/home/HeroOS';
import { ActivityFeed } from '@/components/home/ActivityFeed';
import { ExperienceGenerator } from '@/components/home/ExperienceGenerator';
import { ImpactPreview } from '@/components/home/ImpactPreview';
import { SocialFeed } from '@/components/home/SocialFeed';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ArrowRight, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
export function HomePage() {
  const currentDistrict = useDistrictStore(s => s.currentDistrict);
  const [claimVenue, setClaimVenue] = useState<string | null>(null);
  const { data: listings, isLoading } = useQuery({
    queryKey: ['listings'],
    queryFn: () => api<Listing[]>('/api/listings'),
  });
  const { data: userCard } = useQuery({
    queryKey: ['card', 'u1'],
    queryFn: () => api<UserCard & { id: string }>('/api/card/u1'),
  });
  useEffect(() => {
    const handler = (e: any) => setClaimVenue(e.detail);
    window.addEventListener('open-claim-modal', handler);
    return () => window.removeEventListener('open-claim-modal', handler);
  }, []);
  const filteredListings = listings?.filter(l => l.district === currentDistrict);
  const sponsoredListings = listings?.filter(l => l.isSponsored);
  return (
    <div className="animate-fade-in space-y-0 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-bold text-white shadow-lg">G</div>
            <div>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Guest Explorer</p>
              <p className="font-bold text-sm">314 Level: Gold</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-black">{userCard?.points.toLocaleString() || 0} PTS</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <HeroOS />
      </div>
      <ActivityFeed />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-24">
        <section className="space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-3xl font-display font-bold">Partner Spotlights</h3>
              <p className="text-muted-foreground text-sm">Premium experiences from our verified city partners.</p>
            </div>
            <Badge variant="outline" className="border-orange-500/30 text-orange-500 font-bold uppercase tracking-widest text-[10px] px-3">Sponsored</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="aspect-video rounded-3xl" />)
            : sponsoredListings?.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              The First Responsive <br />
              <span className="text-orange-500">City Interface.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg">
              We've connected the city's heartbeat to a single digital ecosystem. From real-time foot traffic to AI-generated walking tours.
            </p>
            <div className="flex gap-4">
              <Button className="rounded-2xl h-12 px-8 font-bold bg-primary text-primary-foreground">Get Started</Button>
              <Button variant="ghost" className="rounded-2xl h-12 font-bold gap-2">Explore Features <ArrowRight className="w-4 h-4" /></Button>
            </div>
          </div>
          <ExperienceGenerator />
        </section>
        <section className="space-y-8">
          <div className="flex justify-between items-end">
            <h3 className="text-3xl font-display font-bold uppercase tracking-tighter italic">The {currentDistrict} View</h3>
            <div className="flex items-center gap-1.5 text-xs text-orange-500 font-bold uppercase tracking-widest">
              Live District Context
            </div>
          </div>
          <DistrictModules district={currentDistrict} />
        </section>
        <ImpactPreview />
        <SocialFeed />
        <section className="space-y-8">
          <div className="flex justify-between items-end">
            <h3 className="text-3xl font-display font-bold">Featured Experiences</h3>
            <Button variant="link" className="text-primary p-0 h-auto font-bold">Browse All →</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-64 rounded-3xl" />)
            : filteredListings?.filter(l => l.featured && !l.isSponsored).map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        </section>
        <section className="bg-secondary/30 rounded-[3rem] p-8 md:p-16 border border-border/50 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h3 className="text-4xl font-display font-bold">Partner with the OS.</h3>
            <p className="text-muted-foreground text-xl">
              Join 400+ venues using the STL OS to drive traffic, track ROI, and reward loyal customers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="rounded-2xl h-14 px-10 font-black bg-orange-500 hover:bg-orange-600 shadow-glow"
                onClick={() => setClaimVenue("General Inquiry")}
              >
                Claim Your Listing
              </Button>
              <Button variant="outline" className="rounded-2xl h-14 px-10 font-bold border-border/50">Partnership Deck</Button>
            </div>
          </div>
          <div className="w-full md:w-1/3 aspect-square bg-gradient-to-br from-orange-400 to-blue-600 rounded-5xl p-1 shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-background rounded-[2.5rem] flex flex-col items-center justify-center p-8 space-y-4">
              <TrendingUp className="w-16 h-16 text-orange-500" />
              <div className="text-center">
                <p className="text-3xl font-black">+14%</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Avg Foot Traffic Lift</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Dialog open={!!claimVenue} onOpenChange={() => setClaimVenue(null)}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">Claim Your Venue</DialogTitle>
            <DialogDescription>
              Verify ownership of <b>{claimVenue}</b> to access the ROI Dashboard and create custom deals.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Business Email</label>
              <Input placeholder="owner@venue.com" className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Verification Method</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="rounded-xl h-12 text-xs font-bold border-border/50">Phone Call</Button>
                <Button variant="outline" className="rounded-xl h-12 text-xs font-bold border-border/50">Tax ID</Button>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-secondary/50 p-4 rounded-2xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <p className="text-xs text-muted-foreground">Claimed venues receive 5,000 "Boost" points to promote their first event.</p>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full h-14 rounded-2xl bg-primary font-black" onClick={() => {
              toast.success("Inquiry sent! Our verification team will reach out within 24 hours.");
              setClaimVenue(null);
            }}>
              Submit Claim Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}