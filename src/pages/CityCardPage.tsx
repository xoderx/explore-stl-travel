import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { QrCode, Crown, Gift, History, ChevronRight } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { UserCard } from '@shared/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
export function CityCardPage() {
  const { data: card, isLoading } = useQuery({
    queryKey: ['card', 'u1'],
    queryFn: () => api<UserCard & { id: string }>('/api/card/u1'),
  });
  return (
    <div className="space-y-10 animate-fade-in">
      <section className="space-y-4">
        <h1 className="text-3xl font-display font-bold">My 314 Card</h1>
        {isLoading ? (
          <Skeleton className="w-full aspect-[1.6/1] rounded-3xl" />
        ) : (
          <div className="relative aspect-[1.6/1] w-full rounded-3xl bg-gradient-to-br from-slate-900 via-neutral-900 to-black p-6 text-white shadow-2xl overflow-hidden border border-white/10 group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none" />
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-lg italic">S</div>
                  <span className="font-bold tracking-tighter text-lg">EXPLORE STL</span>
                </div>
                <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-orange-400 font-bold">
                  <Crown className="w-3 h-3 mr-1" /> {card?.tier} Member
                </Badge>
              </div>
              <div className="space-y-4">
                <div className="flex justify-center py-2">
                   <div className="bg-white p-2 rounded-xl shadow-inner">
                      <QrCode className="w-24 h-24 text-black" />
                   </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Card Holder</p>
                    <p className="font-mono text-sm tracking-widest">{card?.cardNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Balance</p>
                    <p className="font-bold text-xl">{card?.points.toLocaleString()} PTS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Gift className="w-5 h-5 text-orange-500" />
          Active Rewards
        </h3>
        <div className="space-y-3">
          {[
            { title: 'Free Toasted Ravioli', venue: 'Sugarfire Smokehouse', cost: 500 },
            { title: '50% Off Arch Tram', venue: 'Gateway Arch', cost: 1200 },
          ].map((reward, i) => (
            <Card key={i} className="border-none bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm">{reward.title}</h4>
                  <p className="text-xs text-muted-foreground">{reward.venue}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 font-bold">
                    {reward.cost} PTS
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <History className="w-5 h-5 text-blue-500" />
          Recent Activity
        </h3>
        <div className="text-center py-10 bg-secondary/20 rounded-2xl border border-dashed">
          <p className="text-sm text-muted-foreground">No recent redemptions. Get exploring!</p>
        </div>
      </section>
    </div>
  );
}