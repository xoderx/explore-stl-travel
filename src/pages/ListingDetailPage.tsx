import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Star, MapPin, Info, Sparkles, Globe, Phone, MessageSquare, User } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Listing, Review } from '@shared/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
export function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: listing, isLoading, error } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => api<Listing>(`/api/listings/${id}`),
    enabled: !!id,
  });
  const { data: reviews } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => api<Review[]>(`/api/listings/${id}/reviews`),
    enabled: !!id,
  });
  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-6 animate-fade-in">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-12 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
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
             <Button variant="outline" className="rounded-2xl h-14 gap-2 border-primary/10 hover:bg-accent" onClick={() => toast.info("External link would open here")}>
               <Globe className="w-4 h-4" /> Website
             </Button>
             <Button variant="outline" className="rounded-2xl h-14 gap-2 border-primary/10 hover:bg-accent" onClick={() => toast.info("Phone dialing...")}>
               <Phone className="w-4 h-4" /> Contact
             </Button>
             <Button className="rounded-2xl h-14 gap-2 bg-orange-500 hover:bg-orange-600 text-white border-none shadow-lg shadow-orange-500/20" onClick={() => toast.info("Directions loading...")}>
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
          <section className="space-y-6 pt-10 border-t">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-orange-500" />
                Community Buzz
              </h3>
              <Button size="sm" variant="outline" className="rounded-xl font-bold" onClick={() => toast.info("Review system coming soon in Phase 7!")}>
                Write a Review
              </Button>
            </div>
            <div className="space-y-4">
              {reviews?.length ? (
                reviews.map((review) => (
                  <Card key={review.id} className="border-none bg-secondary/20 rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            {review.avatarUrl ? (
                              <img src={review.avatarUrl} alt={review.userName} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <User className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{review.userName}</p>
                            <p className="text-[10px] text-muted-foreground uppercase">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn("w-3 h-3", i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30")} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed italic">
                        "{review.comment}"
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-secondary/10 rounded-3xl border border-dashed">
                  <p className="text-muted-foreground">Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}