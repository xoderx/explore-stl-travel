import React from 'react';
import { Star, MapPin } from 'lucide-react';
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
    <Card className={cn("overflow-hidden group hover:shadow-glow transition-all duration-300 border-none bg-secondary/30", className)}>
      <div className="relative aspect-video overflow-hidden">
        <img
          src={listing.imageUrl}
          alt={listing.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {listing.featured && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none">
              Featured
            </Badge>
          )}
          <Badge variant="secondary" className="backdrop-blur-md bg-black/40 text-white border-none flex gap-1 items-center">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {listing.rating}
          </Badge>
        </div>
      </div>
      <CardContent className="pt-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg leading-none text-foreground">{listing.name}</h3>
          <span className="text-muted-foreground text-sm font-medium">
            {"$".repeat(listing.priceLevel)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{listing.category}</p>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span className="text-xs truncate">{listing.address}</span>
        </div>
      </CardContent>
      <CardFooter className="pb-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 italic">
          "{listing.aiSummary}"
        </p>
      </CardFooter>
    </Card>
  );
}