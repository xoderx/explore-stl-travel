import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Crown, Gift, History, ChevronDown, CheckCircle2, Info } from 'lucide-react';
import { api } from '@/lib/api-client';
import type { UserCard } from '@shared/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
export function CityCardPage() {
  const [showHistory, setShowHistory] = useState(false);
  const queryClient = useQueryClient();
  const { data: card, isLoading } = useQuery({
    queryKey: ['card', 'u1'],
    queryFn: () => api<UserCard & { id: string }>('/api/card/u1'),
  });
  const redeemMutation = useMutation({
    mutationFn: (args: { amount: number; description: string }) =>
      api('/api/card/redeem', {
        method: 'POST',
        body: JSON.stringify({ userId: 'u1', ...args })
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['card', 'u1'] });
      toast.success("Reward redeemed successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Redemption failed");
    }
  });
  const rewards = [
    { id: 'r1', title: 'Free Toasted Ravioli', venue: 'Sugarfire Smokehouse', cost: 500 },
    { id: 'r2', title: '50% Off Arch Tram', venue: 'Gateway Arch', cost: 1200 },
    { id: 'r3', title: 'BOGO Cocktail', venue: "Brennan's", cost: 800 },
  ];
  return (
    <div className="space-y-10 animate-fade-in max-w-2xl mx-auto">
      <section className="space-y-4">
        <h1 className="text-3xl font-display font-bold">My 314 Card</h1>
        {isLoading ? (
          <Skeleton className="w-full aspect-[1.6/1] rounded-3xl" />
        ) : (
          <div
            className="relative aspect-[1.6/1] w-full rounded-3xl bg-gradient-to-br from-slate-900 via-neutral-900 to-black p-6 text-white shadow-2xl overflow-hidden border border-white/10 group cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
            onClick={() => setShowHistory(!showHistory)}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/15 blur-[100px] pointer-events-none group-hover:bg-orange-500/25 transition-colors duration-500" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none" />
            <div className="relative h-full flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-lg italic text-white shadow-lg">S</div>
                  <span className="font-bold tracking-tighter text-lg">EXPLORE STL</span>
                </div>
                <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-orange-400 font-bold px-3 py-1">
                  <Crown className="w-3 h-3 mr-1" /> {card?.tier} Member
                </Badge>
              </div>
              <div className="flex flex-col items-center gap-4 py-2">
                <div className="bg-white p-3 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] ring-1 ring-white/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  {card?.cardNumber && (
                    <QRCodeSVG
                      value={card.cardNumber}
                      size={110}
                      level="H"
                      includeMargin={false}
                    />
                  )}
                </div>
                <div className="text-center">
                   <p className="font-mono text-xs tracking-[0.4em] opacity-40 uppercase">Card No. {card?.cardNumber}</p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] mb-1 font-black">Digital Asset Holder</p>
                  <p className="font-bold text-sm tracking-wide">Guest Explorer</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] mb-1 font-black">Verified Balance</p>
                  <p className="font-black text-2xl text-orange-400">
                    {card?.points?.toLocaleString()} <span className="text-xs opacity-50 font-medium">PTS</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Gift className="w-5 h-5 text-orange-500" />
            Active Rewards
          </h3>
          <Badge variant="outline" className="text-muted-foreground border-border/50 text-[10px] font-bold uppercase tracking-widest px-3">
            {card?.tier} Access Only
          </Badge>
        </div>
        <div className="space-y-3">
          {rewards.map((reward) => (
            <Card key={reward.id} className="border border-border/40 bg-secondary/10 hover:bg-secondary/30 transition-all group rounded-2xl overflow-hidden shadow-sm">
              <CardContent className="p-5 flex justify-between items-center">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm group-hover:text-orange-500 transition-colors">{reward.title}</h4>
                  <p className="text-xs text-muted-foreground font-medium">{reward.venue}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-background dark:bg-black/40 font-black border-none text-[10px] py-1 px-3">
                    {reward.cost} PTS
                  </Badge>
                  <Button
                    size="sm"
                    className="rounded-xl h-9 bg-orange-500 hover:bg-orange-600 text-xs font-black uppercase tracking-tighter"
                    disabled={redeemMutation.isPending || (card?.points || 0) < reward.cost}
                    onClick={() => redeemMutation.mutate({ amount: reward.cost, description: reward.title })}
                  >
                    Redeem
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <div
          className="flex justify-between items-center cursor-pointer group px-1"
          onClick={() => setShowHistory(!showHistory)}
        >
          <h3 className="text-xl font-bold flex items-center gap-2">
            <History className="w-5 h-5 text-blue-500" />
            Wallet Activity
          </h3>
          <div className="p-2 rounded-full hover:bg-secondary transition-colors">
            <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", showHistory ? "rotate-180" : "")} />
          </div>
        </div>
        {showHistory ? (
          <div className="space-y-1 animate-slide-up bg-secondary/10 rounded-3xl p-2 border border-border/20">
            {card?.transactions?.length ? (
              card.transactions.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center p-4 rounded-2xl hover:bg-background/80 transition-all duration-200">
                  <div className="flex gap-3 items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
                      tx.amount > 0 ? "bg-green-500/10 text-green-600" : "bg-orange-500/10 text-orange-600"
                    )}>
                      {tx.amount > 0 ? <CheckCircle2 className="w-5 h-5" /> : <Gift className="w-5 h-5" />}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold leading-tight">{tx.description}</p>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{format(new Date(tx.timestamp), 'MMM d, h:mm a')}</p>
                    </div>
                  </div>
                  <p className={cn("font-mono font-black text-sm", tx.amount > 0 ? "text-green-500" : "text-orange-500")}>
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-muted-foreground italic text-sm">No activity recorded. Check in at venues to start earning.</div>
            )}
          </div>
        ) : (
          <div className="p-8 bg-secondary/5 rounded-3xl border border-dashed border-border/50 text-center group hover:bg-secondary/10 transition-colors cursor-pointer" onClick={() => setShowHistory(true)}>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Tap to view full transaction history</p>
          </div>
        )}
      </section>
      <Card className="bg-blue-500/5 border-blue-500/10 rounded-3xl overflow-hidden">
        <CardContent className="p-6 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600/70 dark:text-blue-400/70">Card Information</p>
            <p className="text-xs text-blue-700/80 dark:text-blue-300/80 leading-relaxed font-medium">
              Your 314 City Card is a unique digital identifier. Points are awarded automatically for location-verified check-ins and community engagement. Use points to unlock exclusive local experiences and discounts.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}