import React from 'react';
import { motion } from 'framer-motion';
import { Music, Utensils, Heart, Coffee, ShoppingBag, Briefcase, Users2, Sparkles, TrendingUp, HandHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoopNightsModule } from './LoopNightsModule';
export function DistrictModules({ district }: { district: string }) {
  if (district === 'delmar') return <LoopNightsModule />;
  if (district === 'cwe') return <CWEPerfectDayModule />;
  if (district === 'grove') return <GroveWeekendModule />;
  if (district === 'downtown') return <Downtown48HoursModule />;
  if (district === 'ferguson') return <FergusonImpactModules />;
  return null;
}
function FergusonImpactModules() {
  return (
    <div className="space-y-6">
      <section className="bg-amber-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-amber-500/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 blur-[100px]" />
        <div className="relative z-10 space-y-6">
          <Badge className="bg-amber-600 text-white border-none">COMMUNITY FIRST</Badge>
          <h3 className="text-3xl font-display font-bold">Support Ferguson</h3>
          <p className="text-amber-100/70 text-sm max-w-md italic">
            "When you spend local, you build local." - Join our 314 Card initiative tracking impact in Ferguson.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 items-center">
               <HandHeart className="w-6 h-6 text-amber-400" />
               <div>
                 <p className="font-bold text-sm">Black-Owned Directory</p>
                 <p className="text-[10px] opacity-60">Verified local entrepreneurs</p>
               </div>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 items-center">
               <TrendingUp className="w-6 h-6 text-green-400" />
               <div>
                 <p className="font-bold text-sm">Community ROI</p>
                 <p className="text-[10px] opacity-60">Real-time spending impact</p>
               </div>
             </div>
          </div>
          <Button className="w-full h-14 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold border-none shadow-lg">
            View Local Impact
          </Button>
        </div>
      </section>
      <section className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl border border-white/10">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h4 className="text-xl font-bold flex items-center gap-2">
              <Users2 className="w-5 h-5 text-amber-500" />
              Youth Impact
            </h4>
            <p className="text-xs text-muted-foreground">Mentorship & future-focused programs in 63135.</p>
          </div>
          <Badge variant="outline" className="text-amber-400 border-amber-400/30">New</Badge>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
             <span className="text-sm font-medium">Youth Entrepreneurship Workshop</span>
             <Badge className="bg-emerald-500">Jun 12</Badge>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl opacity-60">
             <span className="text-sm font-medium">STEM Mentorship Connect</span>
             <Badge variant="secondary">Upcoming</Badge>
          </div>
        </div>
      </section>
    </div>
  );
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
             <span className="text-[10px] font-bold uppercase">Brunch</span>
           </div>
           <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
             <ShoppingBag className="w-5 h-5 text-stone-400" />
             <span className="text-[10px] font-bold uppercase">Shopping</span>
           </div>
           <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
             <Heart className="w-5 h-5 text-stone-400" />
             <span className="text-[10px] font-bold uppercase">Wellness</span>
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