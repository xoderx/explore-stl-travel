import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
const venues = [
  { id: 1, x: 20, y: 50, name: 'The Pageant', rating: 4.9, status: 'Live Music' },
  { id: 2, x: 45, y: 45, name: 'Moonrise Hotel', rating: 4.7, status: 'Rooftop Bar' },
  { id: 3, x: 75, y: 55, name: 'Blueberry Hill', rating: 4.8, status: 'Food & Drinks' },
];
export function WalkableMap() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-end px-1">
        <h3 className="text-xl font-bold">Street Discovery</h3>
        <div className="flex items-center gap-1.5 text-xs text-green-500 font-bold">
          <Navigation className="w-3 h-3 fill-green-500" />
          Walk Score: 98
        </div>
      </div>
      <div className="relative h-48 w-full bg-slate-900 rounded-3xl border border-border/50 overflow-hidden group">
        {/* Simple Street Representation */}
        <div className="absolute top-1/2 left-0 right-0 h-12 bg-slate-800 -translate-y-1/2 flex items-center px-8">
          <div className="w-full border-t border-dashed border-slate-700" />
        </div>
        <div className="absolute bottom-4 left-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Delmar Boulevard</div>
        {venues.map((v) => (
          <motion.div
            key={v.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute z-10 cursor-pointer"
            style={{ left: `${v.x}%`, top: `${v.y}%` }}
          >
            <div className="relative group/pin">
              <div className="absolute inset-0 bg-pink-500 rounded-full blur-md animate-pulse opacity-50" />
              <div className="relative w-4 h-4 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              {/* Tooltip on Hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-black/90 backdrop-blur-md border border-white/20 p-2 rounded-xl text-white min-w-[120px] shadow-2xl">
                  <p className="font-bold text-xs truncate">{v.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[8px] text-pink-400 font-bold uppercase">{v.status}</span>
                    <div className="flex items-center gap-0.5 text-[8px]">
                      <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                      {v.rating}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}