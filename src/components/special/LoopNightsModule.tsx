import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Music, Utensils, GlassWater, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const vibes = [
  { id: 'chill', label: 'Chill & Lowkey', icon: GlassWater, color: 'from-blue-500 to-cyan-500' },
  { id: 'music', label: 'Live Music Fan', icon: Music, color: 'from-pink-500 to-purple-500' },
  { id: 'foodie', label: 'Late Night Foodie', icon: Utensils, color: 'from-orange-500 to-red-500' },
];
export function LoopNightsModule() {
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<any[] | null>(null);
  const generatePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setPlan([
        { time: '6:30 PM', activity: 'Fitz\'s Root Beer', desc: 'Dinner & Craft Soda', icon: Utensils },
        { time: '8:00 PM', activity: 'The Pageant', desc: 'Live Local Showcase', icon: Music },
        { time: '11:00 PM', activity: 'Blueberry Hill', desc: 'Drinks & Darts', icon: GlassWater },
      ]);
      setIsGenerating(false);
    }, 1500);
  };
  return (
    <section className="bg-slate-950 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-pink-500/20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[100px]" />
      <div className="relative z-10 space-y-6">
        <div className="space-y-2">
          <Badge className="bg-pink-500 text-white border-none">AI POWERED</Badge>
          <h3 className="text-3xl font-display font-bold">Loop Nights</h3>
          <p className="text-slate-400 text-sm max-w-md">Tell us your vibe and we'll craft the perfect walking itinerary for your night out on the Loop.</p>
        </div>
        {!plan ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {vibes.map((vibe) => (
                <button
                  key={vibe.id}
                  onClick={() => setSelectedVibe(vibe.id)}
                  className={cn(
                    "p-4 rounded-2xl border transition-all text-left space-y-3",
                    selectedVibe === vibe.id
                      ? `bg-gradient-to-br ${vibe.color} border-white/20 shadow-lg`
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  )}
                >
                  <vibe.icon className="w-6 h-6" />
                  <span className="text-xs font-bold block">{vibe.label}</span>
                </button>
              ))}
            </div>
            <Button
              disabled={!selectedVibe || isGenerating}
              onClick={generatePlan}
              className="w-full h-14 rounded-2xl bg-white text-black hover:bg-slate-200 font-bold text-lg border-none"
            >
              {isGenerating ? "Consulting the Stars..." : "Generate My Night"}
            </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {plan.map((step, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-500 shrink-0">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">{step.time}</p>
                  <h4 className="font-bold">{step.activity}</h4>
                  <p className="text-xs text-slate-400">{step.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </motion.div>
            ))}
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" className="flex-1 text-slate-400" onClick={() => setPlan(null)}>Reset</Button>
              <Button className="flex-1 bg-pink-500 hover:bg-pink-600 border-none rounded-xl font-bold">Add to 314 Card</Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
import { cn } from '@/lib/utils';