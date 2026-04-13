import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, MapPin, Tag, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ActivityEvent, District } from '@shared/types';
import { cn } from '@/lib/utils';
const INITIAL_EVENTS: ActivityEvent[] = [
  { id: '1', type: 'check-in', message: 'Someone just checked in at Sugarfire Smokehouse', timestamp: 'Just now', district: 'stl' },
  { id: '2', type: 'deal', message: 'New 314 Reward: 20% off at Brennan\'s', timestamp: '2 mins ago', district: 'cwe' },
  { id: '3', type: 'trending', message: 'The Delmar Loop is trending this evening', timestamp: '5 mins ago', district: 'delmar' },
  { id: '4', type: 'event', message: 'Live Music starting at The Pageant', timestamp: '10 mins ago', district: 'delmar' },
];
export function ActivityFeed() {
  const [events, setEvents] = useState<ActivityEvent[]>(INITIAL_EVENTS);
  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        "New check-in at Forest Park",
        "Flash Deal: Free Toasted Ravioli at Broadway Oyster Bar",
        "Ballpark Village is busy tonight",
        "Someone saved $15 using their 314 Card",
        "New review for The Last Hotel"
      ];
      const districts: District[] = ['stl', 'ferguson', 'grove', 'downtown', 'ballpark'];
      const types: ActivityEvent['type'][] = ['check-in', 'deal', 'trending', 'event'];
      const newEvent: ActivityEvent = {
        id: Math.random().toString(),
        type: types[Math.floor(Math.random() * types.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: 'Just now',
        district: districts[Math.floor(Math.random() * districts.length)]
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 5)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  const getIcon = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'check-in': return <MapPin className="w-3 h-3" />;
      case 'deal': return <Tag className="w-3 h-3" />;
      case 'trending': return <TrendingUp className="w-3 h-3" />;
      default: return <Zap className="w-3 h-3" />;
    }
  };
  return (
    <div className="w-full overflow-hidden py-4 border-y border-border/30 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Live Feed</span>
          </div>
          <div className="flex-1 flex gap-4 overflow-x-auto scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-3 shrink-0 bg-background/50 border border-border/50 rounded-full px-4 py-1.5 shadow-sm"
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-white",
                    event.type === 'deal' ? "bg-orange-500" : 
                    event.type === 'check-in' ? "bg-blue-500" : "bg-purple-500"
                  )}>
                    {getIcon(event.type)}
                  </div>
                  <span className="text-xs font-medium whitespace-nowrap">{event.message}</span>
                  <Badge variant="outline" className="text-[8px] h-4 uppercase font-bold border-none bg-muted/50">
                    {event.district}
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}