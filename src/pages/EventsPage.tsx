import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar as CalendarIcon, MapPin, Clock, Music } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Event } from '@shared/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { format, addDays, startOfToday } from 'date-fns';
import { useDistrictStore } from '@/store/use-district-store';
import { cn } from '@/lib/utils';
export function EventsPage() {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [liveOnly, setLiveOnly] = useState(false);
  const currentDistrict = useDistrictStore(s => s.currentDistrict);
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => api<Event[]>('/api/events'),
  });
  const filteredEvents = events
    ?.filter(e => e.district === currentDistrict)
    ?.filter(e => !liveOnly || e.isLive);
  const next7Days = Array.from({ length: 7 }).map((_, i) => addDays(startOfToday(), i));
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold">What's Happening</h1>
          <p className="text-muted-foreground">Find local events, concerts, and games.</p>
        </div>
        <ScrollArea className="w-full whitespace-nowrap -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-3 pb-4">
            {next7Days.map((date) => {
              const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
              return (
                <div
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "flex flex-col items-center justify-center min-w-[70px] h-20 rounded-2xl border transition-all cursor-pointer",
                    isSelected
                      ? "bg-primary border-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-secondary/50 border-transparent hover:bg-secondary hover:border-border/50"
                  )}
                >
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider", isSelected ? "opacity-80" : "text-muted-foreground")}>
                    {format(date, 'EEE')}
                  </span>
                  <span className="text-xl font-bold">
                    {format(date, 'd')}
                  </span>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </section>
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-4 border-border/50">
          <h3 className="font-bold text-foreground text-sm uppercase tracking-[0.2em]">
            {format(selectedDate, 'MMMM do, yyyy')}
          </h3>
          <div className="flex gap-2">
            {(currentDistrict === 'delmar' || currentDistrict === 'grove') && (
              <Button
                variant={liveOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setLiveOnly(!liveOnly)}
                className={cn(
                  "rounded-full h-8 px-4 text-xs font-bold transition-all",
                  liveOnly && "bg-pink-500 hover:bg-pink-600 border-none shadow-lg shadow-pink-500/20"
                )}
              >
                Live Music
              </Button>
            )}
            <Badge variant="secondary" className="rounded-lg font-bold h-8 px-3">
              {filteredEvents?.length || 0} Events
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-40 w-full rounded-3xl bg-secondary animate-pulse" />
            ))
          ) : filteredEvents?.length ? (
            filteredEvents.map((event) => (
              <Link key={event.id} to={`/event/${event.id}`} className="block group">
                <Card className="overflow-hidden border-none bg-secondary/20 group hover:bg-secondary/40 hover:shadow-xl transition-all rounded-3xl">
                  <CardContent className="p-0 flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-48 aspect-video md:aspect-square shrink-0 overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors">
                            {event.name}
                          </h4>
                          <Badge className="bg-primary text-primary-foreground border-none shrink-0 font-bold px-3">
                            {event.category}
                          </Badge>
                        </div>
                        {event.isLive && (
                          <div className="flex items-center gap-1.5 text-xs text-pink-500 font-bold uppercase animate-pulse">
                            <Music className="w-3 h-3" /> Live Now
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-medium">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{event.venueName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 flex justify-between items-center">
                        <p className="text-sm text-muted-foreground line-clamp-1 italic max-w-[70%]">
                          {event.description}
                        </p>
                        <Button variant="ghost" size="sm" className="rounded-xl text-primary font-bold gap-1 group/btn">
                          View details <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="text-xl font-bold">No events today</h4>
              <p className="text-muted-foreground max-w-xs mx-auto">Check other dates to see what's coming up in the district.</p>
              <Button variant="outline" onClick={() => setSelectedDate(startOfToday())} className="rounded-xl">Back to Today</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}