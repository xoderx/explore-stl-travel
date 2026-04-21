import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Wallet, Users, Target, ArrowRight, BarChart3, Heart } from 'lucide-react';
import { api } from '@/lib/api-client';
import { useDistrictStore } from '@/store/use-district-store';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { District } from '@shared/types';
const districtLabels: Record<District, string> = {
  stl: 'St. Louis',
  delmar: 'Delmar Loop',
  cwe: 'Central West End',
  grove: 'The Grove',
  downtown: 'Downtown',
  ferguson: 'Ferguson',
  'south-city': 'South City',
  ballpark: 'Ballpark Village'
};
export function ImpactPreview() {
  const [view, setView] = useState<'economic' | 'community'>('economic');
  const currentDistrict = useDistrictStore(s => s.currentDistrict);
  const { data: impact } = useQuery({
    queryKey: ['analytics', currentDistrict],
    queryFn: () => api<any>(`/api/analytics/${currentDistrict}`),
  });
  const totalFootTraffic = (impact?.footTraffic || []).reduce(
    (acc: number, curr: any) => acc + (Number(curr?.count) || 0),
    0
  );
  const stats = view === 'economic' ? [
    {
      label: 'Total Local Spend',
      value: impact?.spendGenerated ? `$${impact.spendGenerated.toLocaleString()}` : '$0',
      icon: Wallet,
      color: 'text-emerald-500'
    },
    {
      label: 'Verified Foot Traffic',
      value: totalFootTraffic.toLocaleString(),
      icon: Users,
      color: 'text-blue-500'
    },
    {
      label: 'Active Business Deals',
      value: impact?.activeRewards?.toString() || '0',
      icon: Target,
      color: 'text-orange-500'
    }
  ] : [
    { label: 'Community Points', value: '45.2K', icon: Heart, color: 'text-pink-500' },
    { label: 'Districts Supported', value: '8/8', icon: BarChart3, color: 'text-purple-500' },
    { label: 'Volunteer Hours', value: '1,240', icon: Users, color: 'text-amber-500' }
  ];
  const districtDisplayName = districtLabels[currentDistrict] || currentDistrict;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-display font-bold">Live Impact Preview</h3>
          <p className="text-muted-foreground text-sm">
            Real-time data for the <span className="uppercase font-black text-primary tracking-tight">{districtDisplayName}</span> district.
          </p>
        </div>
        <div className="flex bg-secondary/50 rounded-xl p-1 shrink-0 border border-border/20">
          <button
            onClick={() => setView('economic')}
            className={cn(
              "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
              view === 'economic' ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Economic
          </button>
          <button
            onClick={() => setView('community')}
            className={cn(
              "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
              view === 'community' ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Community
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-secondary/20 p-6 rounded-3xl border border-border/10 flex flex-col justify-between group hover:bg-secondary/30 transition-all duration-300 hover:shadow-soft">
            <div className={cn("w-10 h-10 rounded-2xl bg-background shadow-sm flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-black tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <Link to="/dashboard">
          <Button variant="ghost" className="rounded-xl font-bold text-orange-500 hover:text-orange-600 gap-2 group">
            View Full ROI Dashboard 
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}