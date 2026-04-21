import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Star, MapPin, Info, Sparkles, Globe, Phone, MessageSquare, User, MapPinned, Loader2 } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Listing, Review, ReviewInput } from '@shared/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
export function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
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
  const checkInMutation = useMutation({
    mutationFn: () => api('/api/card/check-in', {
      method: 'POST',
      body: JSON.stringify({ userId: 'u1', listingId: id, listingName: listing?.name })
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['card', 'u1'] });
      toast.success(`Check-in verified! +50 Points added to your digital 314 Wallet.`);
    },
    onError: (err: any) => toast.error(err.message || "Verification failed. Are you at the venue?")
  });
  const reviewMutation = useMutation({
    mutationFn: (input: ReviewInput) => api(`/api/listings/${id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(input)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', id] });
      toast.success("Experience shared with the community!");
      setIsReviewOpen(false);
      setReviewText('');
      setReviewRating(5);
    },
    onError: (err: any) => toast.error(err.message)
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
            <img src={listing.imageUrl} alt={listing.name} className="w-full h-full object-cover" />
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute bottom-4 right-4"
          >
            <Button
              size="lg"
              onClick={() => checkInMutation.mutate()}
              disabled={checkInMutation.isPending}
              className="rounded-2xl gap-2 bg-orange-500 hover:bg-orange-600 text-white border-none shadow-glow font-bold h-14"
            >
              {checkInMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPinned className="w-5 h-5" />}
              Verify Check-in
            </Button>
          </motion.div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-orange-500 hover:bg-orange-600 border-none">{listing.category}</Badge>
              {listing.isSponsored && <Badge variant="outline" className="border-orange-500 text-orange-500 font-bold uppercase tracking-widest text-[10px]">Partner</Badge>}
              <div className="flex items-center gap-1 text-sm font-bold ml-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {listing.rating}
              </div>
              <span className="text-sm font-bold text-foreground">{"$".repeat(listing.priceLevel)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">{listing.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4" /> {listing.address}</p>
          </div>
          <Card className="bg-secondary/30 border-none shadow-soft overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-lg">AI Concierge Insight</h3>
              </div>
              <p className="text-foreground/90 leading-relaxed italic">"{listing.aiSummary}"</p>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <Button variant="outline" className="rounded-2xl h-14 border-primary/10 hover:bg-accent" onClick={() => toast.info("Opening site...")}>
               <Globe className="w-4 h-4 mr-2" /> Website
             </Button>
             <Button variant="outline" className="rounded-2xl h-14 border-primary/10 hover:bg-accent" onClick={() => toast.info("Dialing...")}>
               <Phone className="w-4 h-4 mr-2" /> Contact
             </Button>
             <Button className="rounded-2xl h-14 bg-primary text-white" onClick={() => toast.info("Directions loading...")}>Get Directions</Button>
          </div>
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold flex items-center gap-2"><Info className="w-5 h-5 text-blue-500" /> About</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">{listing.description}</p>
          </div>
          <section className="space-y-6 pt-10 border-t">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-orange-500" /> Community Buzz
              </h3>
              <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="rounded-xl font-bold">Write a Review</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader><DialogTitle>Share your experience</DialogTitle></DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn("w-8 h-8 cursor-pointer transition-colors", star <= reviewRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")}
                          onClick={() => setReviewRating(star)}
                        />
                      ))}
                    </div>
                    <Textarea
                      placeholder="What did you love about this place?"
                      className="min-h-[100px] rounded-xl"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 font-bold"
                      onClick={() => reviewMutation.mutate({ listingId: id!, userName: 'Guest Explorer', rating: reviewRating, comment: reviewText })}
                      disabled={reviewMutation.isPending || !reviewText.trim()}
                    >
                      {reviewMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post Review"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-4">
              {reviews?.length ? reviews.map((review) => (
                <Card key={review.id} className="border-none bg-secondary/20 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600"><User className="w-5 h-5" /></div>
                        <div>
                          <p className="font-bold text-sm">{review.userName}</p>
                          <p className="text-[10px] text-muted-foreground uppercase">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn("w-3 h-3", i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30")} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed italic">"{review.comment}"</p>
                  </CardContent>
                </Card>
              )) : (
                <div className="text-center py-12 bg-secondary/10 rounded-3xl border border-dashed text-muted-foreground">Be the first to share your experience!</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}