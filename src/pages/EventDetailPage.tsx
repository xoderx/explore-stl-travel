import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Ticket } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Event } from '@shared/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format, parseISO } from 'date-fns';
import { toast } from 'sonner';
export function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => api<Event>(`/api/events/${id}`),
    enabled: !!id,
  });
  const handleTickets = () => {
    toast.success("Redirecting to ticketing partner...");
  };
  if (isLoading) return (
    <div className="space-y-6 animate-fade-in">
      <Skeleton className="aspect-video w-full rounded-3xl" />
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
  if (error || !event) return (
    <div className="text-center py-20 space-y-4">
      <p className="text-muted-foreground">Event not found.</p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="relative">
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute top-4 left-4 z-10 rounded-full bg-black/20 backdrop-blur-md text-white border-white/20"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="aspect-video overflow-hidden rounded-3xl shadow-xl border bg-muted">
          <img 
            src={event.imageUrl} 
            alt={event.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <Badge className="bg-blue-500 hover:bg-blue-600 border-none">{event.category}</Badge>
            <h1 className="text-4xl font-display font-bold">{event.name}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {event.description}
            </p>
          </div>
          <div className="flex gap-4">
             <Button onClick={handleTickets} className="flex-1 rounded-2xl h-14 gap-2 bg-orange-500 hover:bg-orange-600 text-white border-none shadow-lg">
               <Ticket className="w-5 h-5" /> Get Tickets
             </Button>
             <Button variant="outline" size="icon" className="w-14 h-14 rounded-2xl">
               <Share2 className="w-5 h-5" />
             </Button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-3xl p-6 border border-border/50 space-y-6">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Date</p>
                <p className="font-bold">{format(parseISO(event.date), 'MMMM do, yyyy')}</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Time</p>
                <p className="font-bold">{event.time}</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Venue</p>
                <p className="font-bold">{event.venueName}</p>
              </div>
            </div>
          </div>
          <Button variant="link" className="w-full text-muted-foreground" onClick={() => toast.info("Syncing with calendar...")}>
            Add to My Calendar
          </Button>
        </div>
      </div>
    </div>
  );
}