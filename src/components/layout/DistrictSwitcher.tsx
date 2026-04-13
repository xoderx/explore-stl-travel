import React from 'react';
import { motion } from 'framer-motion';
import { Music, Landmark, Coffee, Heart, Briefcase, Users2 } from 'lucide-react';
import { useDistrictStore } from '@/store/use-district-store';
import type { District } from '@shared/types';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
export function DistrictSwitcher() {
  const currentDistrict = useDistrictStore((s) => s.currentDistrict);
  const setDistrict = useDistrictStore((s) => s.setDistrict);
  const districts: { id: District; label: string; icon: any; color: string }[] = [
    { id: 'stl', label: 'St. Louis', icon: Landmark, color: 'bg-orange-500' },
    { id: 'delmar', label: 'Delmar Loop', icon: Music, color: 'bg-pink-500' },
    { id: 'cwe', label: 'CWE', icon: Coffee, color: 'bg-stone-800' },
    { id: 'grove', label: 'The Grove', icon: Heart, color: 'bg-purple-600' },
    { id: 'downtown', label: 'Downtown', icon: Briefcase, color: 'bg-blue-800' },
    { id: 'ferguson', label: 'Ferguson', icon: Users2, color: 'bg-amber-700' },
  ];
  return (
    <div className="flex max-w-[320px] sm:max-w-none bg-background/60 backdrop-blur-xl p-1 rounded-full border border-border shadow-2xl overflow-hidden">
      <ScrollArea className="w-full">
        <div className="flex gap-1 px-1 py-0.5">
          {districts.map((d) => {
            const isActive = currentDistrict === d.id;
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => setDistrict(d.id)}
                className={cn(
                  "relative px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all flex items-center gap-2 outline-none whitespace-nowrap",
                  isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="district-pill"
                    className={cn("absolute inset-0 rounded-full z-0", d.color)}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">{d.label}</span>
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}