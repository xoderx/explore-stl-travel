import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { Event } from '@shared/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { format, addDays, startOfToday } from 'date-fns';
import { cn } from '@/lib/utils';
export function EventsPage() {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => api<Event[]>('/api/events'),
  });
  const next7Days = Array.from({ length: 7 }).map((_, i) => addDays(startOfToday(), i));
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-4">
        <h1 className="text-3xl font-display font-bold">What's Happening</h1>
        <ScrollArea className="w-full whitespace-nowrap -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-3 pb-4">
            {next7Days.map((date) => {
              const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
              return (
                <div
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "flex flex-col items-center justify-center min-w-[64px] h-20 rounded-2xl border cursor-pointer transition-all",
                    isSelected 
                      ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105" 
                      : "bg-secondary/50 border-transparent hover:border-muted-foreground/20"
                  )}
                >
                  <span className={cn("text-[10px] font-bold uppercase", isSelected ? "text-orange-100" : "text-muted-foreground")}>
                    {format(date, 'EEE')}
                  </span>
                  <span className="text-lg font-bold">
                    {format(date, 'd')}
                  </span>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </section>
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-widest">
            {format(selectedDate, 'MMMM do, yyyy')}
          </h3>
          <Badge variant="outline" className="rounded-lg">
            {events?.length || 0} Events found
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-32 w-full rounded-2xl bg-secondary animate-pulse" />
            ))
          ) : (
            events?.map((event) => (
              <Card key={event.id} className="overflow-hidden border-none bg-secondary/30 group hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                  <div className="w-full sm:w-40 aspect-video sm:aspect-square shrink-0 overflow-hidden">
                    <img 
                      src={event.imageUrl} 
                      alt={event.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-lg leading-tight group-hover:text-orange-500 transition-colors">
                          {event.name}
                        </h4>
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-none shrink-0">
                          {event.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground pt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.venueName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 flex justify-between items-center">
                      <p className="text-xs text-muted-foreground line-clamp-1 italic max-w-xs">
                        {event.description}
                      </p>
                      <Button variant="outline" size="sm" className="rounded-xl border-orange-500/20 hover:bg-orange-500 hover:text-white transition-colors">
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}