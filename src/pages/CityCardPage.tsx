import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Crown, Gift, History, ChevronRight, Info, ChevronDown, CheckCircle2 } from 'lucide-react';
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
    mutationFn: (args: { amount: number, description: string }) => 
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
          <div className="relative aspect-[1.6/1] w-full rounded-3xl bg-gradient-to-br from-slate-900 via-neutral-900 to-black p-6 text-white shadow-2xl overflow-hidden border border-white/10 group cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]" onClick={() => setShowHistory(!showHistory)}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/15 blur-[100px] pointer-events-none group-hover:bg-orange-500/20 transition-colors" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none" />
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-lg italic text-white shadow-lg">S</div>
                  <span className="font-bold tracking-tighter text-lg">EXPLORE STL</span>
                </div>
                <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-orange-400 font-bold px-3 py-1">
                  <Crown className="w-3 h-3 mr-1" /> {card?.tier} Member
                </Badge>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-2.5 rounded-2xl shadow-xl transition-transform group-hover:scale-110">
                  {card?.cardNumber && (
                    <QRCodeSVG
                      value={card.cardNumber}
                      size={100}
                      level="H"
                      includeMargin={false}
                    />
                  )}
                </div>
                <div className="text-center">
                   <p className="font-mono text-sm tracking-[0.3em] opacity-60">{card?.cardNumber}</p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] mb-1 font-bold">Card Holder</p>
                  <p className="font-medium text-sm">Guest Explorer</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] mb-1 font-bold">Balance</p>
                  <p className="font-bold text-2xl text-orange-400">{card?.points?.toLocaleString()} <span className="text-xs opacity-60">PTS</span></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Gift className="w-5 h-5 text-orange-500" />
            Active Rewards
          </h3>
          <Badge variant="outline" className="text-muted-foreground border-border/50">Exclusive for {card?.tier}</Badge>
        </div>
        <div className="space-y-3">
          {rewards.map((reward) => (
            <Card key={reward.id} className="border border-border/40 bg-secondary/20 hover:bg-secondary/40 transition-all group rounded-2xl overflow-hidden">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm group-hover:text-orange-500 transition-colors">{reward.title}</h4>
                  <p className="text-xs text-muted-foreground">{reward.venue}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-white/50 dark:bg-black/50 font-bold border-none">
                    {reward.cost} PTS
                  </Badge>
                  <Button 
                    size="sm" 
                    className="rounded-xl h-8 bg-orange-500 hover:bg-orange-600 text-xs font-bold"
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
        <div className="flex justify-between items-center cursor-pointer group" onClick={() => setShowHistory(!showHistory)}>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <History className="w-5 h-5 text-blue-500" />
            Transaction History
          </h3>
          <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", showHistory ? "rotate-180" : "")} />
        </div>
        {showHistory ? (
          <div className="space-y-1 animate-slide-up">
            {card?.transactions?.length ? (
              card.transactions.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center p-4 rounded-xl hover:bg-secondary/30 transition-colors">
                  <div className="flex gap-3 items-center">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", tx.amount > 0 ? "bg-green-500/10 text-green-600" : "bg-orange-500/10 text-orange-600")}>
                      {tx.amount > 0 ? <CheckCircle2 className="w-4 h-4" /> : <Gift className="w-4 h-4" />}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold">{tx.description}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{format(new Date(tx.timestamp), 'MMM d, h:mm a')}</p>
                    </div>
                  </div>
                  <p className={cn("font-mono font-bold", tx.amount > 0 ? "text-green-500" : "text-orange-500")}>
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-muted-foreground italic text-sm">No transactions yet. Visit some venues to earn points!</div>
            )}
          </div>
        ) : (
          <div className="p-8 bg-secondary/20 rounded-2xl border border-dashed text-center">
            <p className="text-sm text-muted-foreground italic">Tap 'Transaction History' to view your wallet activity.</p>
          </div>
        )}
      </section>
      <Card className="bg-blue-500/5 border-blue-500/10 rounded-2xl">
        <CardContent className="p-4 flex gap-3 items-start">
          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            Points are earned by checking in at participating STL venues. Use them to unlock food vouchers, attraction passes, and exclusive city experiences.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}