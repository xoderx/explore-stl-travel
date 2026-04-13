import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Listing } from '@shared/types';
import { cn } from '@/lib/utils';
interface ListingCardProps {
  listing: Listing;
  className?: string;
}
export function ListingCard({ listing, className }: ListingCardProps) {
  return (
    <div className="relative group">
      <Link to={`/listing/${listing.id}`} className="block">
        <Card className={cn(
          "overflow-hidden border-none bg-secondary/30 transition-all duration-300",
          "hover:shadow-glow-lg hover:bg-secondary/50 hover:scale-[1.02]",
          listing.isSponsored && "ring-2 ring-orange-500/20 shadow-glow bg-orange-50/5 dark:bg-orange-950/5",
          className
        )}>
          <div className="relative aspect-video overflow-hidden">
            <img
              src={listing.imageUrl}
              alt={listing.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
              <div className="flex gap-2">
                {listing.isSponsored && (
                  <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none shadow-lg uppercase text-[10px] tracking-widest font-black">
                    Partner
                  </Badge>
                )}
                {listing.featured && !listing.isSponsored && (
                  <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground border-none">
                    Featured
                  </Badge>
                )}
                <Badge variant="secondary" className="backdrop-blur-md bg-black/40 text-white border-none flex gap-1 items-center font-bold">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {listing.rating}
                </Badge>
              </div>
            </div>
            {listing.isSponsored && listing.sponsoredTagline && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-500/90 to-transparent p-4 pt-8">
                <p className="text-white text-xs font-black uppercase tracking-widest drop-shadow-md">
                  {listing.sponsoredTagline}
                </p>
              </div>
            )}
          </div>
          <CardContent className="pt-4 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg leading-none text-foreground group-hover:text-orange-500 transition-colors">
                {listing.name}
              </h3>
              <span className="text-muted-foreground text-sm font-bold">
                {"$".repeat(listing.priceLevel)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{listing.category}</p>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="text-xs truncate font-medium">{listing.address}</span>
            </div>
          </CardContent>
          <CardFooter className="pb-4 pt-0">
            <p className="text-sm text-muted-foreground line-clamp-2 italic leading-snug">
              "{listing.aiSummary}"
            </p>
          </CardFooter>
        </Card>
      </Link>
      {/* Small floating Claim action for desktop hover */}
      <button 
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border border-border rounded-full p-2 shadow-lg hover:bg-accent text-muted-foreground hover:text-primary z-20"
        onClick={(e) => {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('open-claim-modal', { detail: listing.name }));
        }}
      >
        <ExternalLink className="w-3 h-3" />
      </button>
    </div>
  );
}