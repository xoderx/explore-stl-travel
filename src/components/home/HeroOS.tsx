import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Map, Gift, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/tracking';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
const subheadlines = [
  "Plan your perfect night out.",
  "Discover hidden gems in the 314.",
  "Support local Black-owned businesses.",
  "Maximize your rewards with the 314 Card."
];
export function HeroOS() {
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % subheadlines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    trackEvent('hero_ai_search', { query });
    navigate(`/directory?q=${encodeURIComponent(query)}`);
  };
  return (
    <section className="relative pt-8 pb-12 space-y-8">
      <div className="space-y-4 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border/30 text-xs font-bold uppercase tracking-widest animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 scale-125"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
          </span>
          <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-blue-400">
            4,281 people exploring now
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.1]">
          Explore St. Louis <br />
          <span className="text-muted-foreground/60">The City OS</span>
        </h1>
        <div className="h-8 md:h-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg md:text-xl text-muted-foreground font-medium"
            >
              {subheadlines[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
      <form onSubmit={handleSearch} className="max-w-2xl relative group">
        <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative flex items-center bg-secondary/40 backdrop-blur-xl border border-border/50 rounded-3xl p-1.5 shadow-2xl focus-within:ring-2 ring-orange-500/20 transition-all">
          <Search className="ml-4 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Try 'Late night drinks in Delmar' or 'Best family parks'..."
            className="border-none bg-transparent focus-visible:ring-0 text-lg h-12 shadow-none placeholder:text-muted-foreground/50"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" className="rounded-2xl h-11 px-6 bg-orange-500 hover:bg-orange-600 font-bold gap-2 shadow-lg shadow-orange-500/20">
            <Sparkles className="w-4 h-4" /> AI Search
          </Button>
        </div>
      </form>
      <div className="flex flex-wrap gap-3">
        {[
          { icon: Map, label: 'Explore Map', to: '/directory', color: 'text-blue-500' },
          { icon: Sparkles, label: 'Plan Trip', to: '/concierge', color: 'text-purple-500' },
          { icon: Gift, label: 'Daily Deals', to: '/card', color: 'text-orange-500' },
          { icon: TrendingUp, label: 'City Stats', to: '/dashboard', color: 'text-emerald-500' },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.to}
            onClick={() => trackEvent('hero_quick_cta', { label: item.label })}
          >
            <Button variant="outline" className="rounded-2xl h-12 gap-2 border-border/40 hover:bg-secondary/80 font-bold px-5">
              <item.icon className={cn(item.color, "w-4 h-4")} />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </section>
  );
}