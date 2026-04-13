import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Music, Utensils, GlassWater, ArrowRight, ShoppingBag, Coffee, Heart, Briefcase, Hotel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LoopNightsModule } from './LoopNightsModule';
export function DistrictModules({ district }: { district: string }) {
  if (district === 'delmar') return <LoopNightsModule />;
  if (district === 'cwe') return <CWEPerfectDayModule />;
  if (district === 'grove') return <GroveWeekendModule />;
  if (district === 'downtown') return <Downtown48HoursModule />;
  return null;
}
function CWEPerfectDayModule() {
  return (
    <section className="bg-stone-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-stone-700">
      <div className="absolute top-0 right-0 w-64 h-64 bg-stone-500/10 blur-[100px]" />
      <div className="relative z-10 space-y-6">
        <Badge className="bg-stone-700 text-stone-200 border-none">LUXURY AI</Badge>
        <h3 className="text-3xl font-display font-bold">CWE Perfect Day</h3>
        <p className="text-stone-400 text-sm max-w-md">Brunch, Boutiques, and Bliss. We've curated the most elegant way to spend your Saturday.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 opacity-60">
           <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
             <Coffee className="w-5 h-5 text-stone-400" />
             <span className="text-[10px] font-bold">BRUNCH</span>
           </div>
           <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
             <ShoppingBag className="w-5 h-5 text-stone-400" />
             <span className="text-[10px] font-bold">SHOPPING</span>
           </div>
           <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
             <Heart className="w-5 h-5 text-stone-400" />
             <span className="text-[10px] font-bold">WELLNESS</span>
           </div>
        </div>
        <Button className="w-full h-14 rounded-2xl bg-stone-200 text-black hover:bg-stone-300 font-bold border-none">
          Draft My Itinerary
        </Button>
      </div>
    </section>
  );
}
function GroveWeekendModule() {
  return (
    <section className="bg-purple-950 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-pink-500/20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 blur-[100px]" />
      <div className="relative z-10 space-y-6">
        <Badge className="bg-pink-600 text-white border-none">VIBRANT AI</Badge>
        <h3 className="text-3xl font-display font-bold">Grove Weekend</h3>
        <p className="text-purple-200 text-sm max-w-md">Find the beat. We track the best pride events, live sets, and late-night eats.</p>
        <Button className="w-full h-14 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold border-none shadow-lg">
          Explore The Scene
        </Button>
      </div>
    </section>
  );
}
function Downtown48HoursModule() {
  return (
    <section className="bg-blue-950 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-amber-500/20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px]" />
      <div className="relative z-10 space-y-6">
        <Badge className="bg-amber-500 text-white border-none">BUSINESS AI</Badge>
        <h3 className="text-3xl font-display font-bold">48 Hours Downtown</h3>
        <p className="text-blue-200 text-sm max-w-md">Perfect for conventions. Stay near America Center and find the best meeting spots.</p>
        <div className="flex gap-4">
          <Button variant="secondary" className="flex-1 rounded-2xl h-12">Convention Sync</Button>
          <Button className="flex-1 rounded-2xl h-12 bg-amber-500 hover:bg-amber-600 text-white border-none">Build Stay</Button>
        </div>
      </div>
    </section>
  );
}