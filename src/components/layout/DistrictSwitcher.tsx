import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Music, Landmark } from 'lucide-react';
import { useDistrictStore, type District } from '@/store/use-district-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
export function DistrictSwitcher() {
  const currentDistrict = useDistrictStore((s) => s.currentDistrict);
  const setDistrict = useDistrictStore((s) => s.setDistrict);
  const districts: { id: District; label: string; icon: any; color: string }[] = [
    { id: 'stl', label: 'St. Louis', icon: Landmark, color: 'bg-orange-500' },
    { id: 'delmar', label: 'Delmar Loop', icon: Music, color: 'bg-pink-500' },
  ];
  return (
    <div className="flex bg-secondary/50 p-1 rounded-full border border-border/50 backdrop-blur-md">
      {districts.map((d) => {
        const isActive = currentDistrict === d.id;
        const Icon = d.icon;
        return (
          <button
            key={d.id}
            onClick={() => setDistrict(d.id)}
            className={cn(
              "relative px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 outline-none",
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
  );
}