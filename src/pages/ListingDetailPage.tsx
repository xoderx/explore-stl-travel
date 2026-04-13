import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Star, MapPin, Info, Sparkles, Globe, Phone } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Listing } from '@shared/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
export function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: listing, isLoading, error } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => api<Listing>(`/api/listings/${id}`),
    enabled: !!id,
  });
  if (isLoading) return (
    <div className="space-y-6 animate-fade-in">
      <Skeleton className="aspect-video w-full rounded-3xl" />
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
  if (error || !listing) return (
    <div className="text-center py-20 space-y-4">
      <p className="text-muted-foreground">Listing not found.</p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="relative group">
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute top-4 left-4 z-10 rounded-full bg-black/20 backdrop-blur-md text-white border-white/20 hover:bg-black/40"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="aspect-video overflow-hidden rounded-3xl shadow-xl border">
          <img 
            src={listing.imageUrl} 
            alt={listing.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-orange-500 hover:bg-orange-600 border-none">{listing.category}</Badge>
            <div className="flex items-center gap-1 text-sm font-bold ml-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {listing.rating}
            </div>
            <span className="text-muted-foreground mx-1">•</span>
            <span className="text-sm font-bold text-foreground">{"$".repeat(listing.priceLevel)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">{listing.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{listing.address}</span>
          </div>
        </div>
        <Card className="bg-gradient-to-br from-orange-50/50 to-blue-50/50 dark:from-orange-950/10 dark:to-blue-950/10 border-none shadow-soft overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-lg">AI Concierge Insight</h3>
            </div>
            <p className="text-foreground/90 leading-relaxed italic">
              "{listing.aiSummary}"
            </p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <Button variant="outline" className="rounded-2xl h-14 gap-2 border-primary/10 hover:bg-accent">
             <Globe className="w-4 h-4" /> Website
           </Button>
           <Button variant="outline" className="rounded-2xl h-14 gap-2 border-primary/10 hover:bg-accent">
             <Phone className="w-4 h-4" /> Contact
           </Button>
           <Button className="rounded-2xl h-14 gap-2 bg-orange-500 hover:bg-orange-600 text-white border-none shadow-lg shadow-orange-500/20">
             Get Directions
           </Button>
        </div>
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            About this venue
          </h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {listing.description}
          </p>
        </div>
      </div>
    </div>
  );
}