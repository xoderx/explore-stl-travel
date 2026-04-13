import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Wallet, Target, ArrowUpRight, Filter, Loader2, HeartPulse, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { useDistrictStore } from '@/store/use-district-store';
import { cn } from '@/lib/utils';
export function ROIDashboardPage() {
  const currentDistrict = useDistrictStore(s => s.currentDistrict);
  const queryClient = useQueryClient();
  const { data: impactData, isLoading, isRefetching } = useQuery({
    queryKey: ['analytics', currentDistrict],
    queryFn: () => api<any>(`/api/analytics/${currentDistrict}`),
    staleTime: 60000,
  });
  const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'];
  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['analytics', currentDistrict] });
  };
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        <p className="text-muted-foreground font-black uppercase tracking-widest text-xs animate-pulse">Syncing District Core...</p>
      </div>
    );
  }
  const footTrafficTotal = (impactData?.footTraffic || []).reduce(
    (acc: number, curr: any) => acc + (Number(curr?.count) || 0), 
    0
  );
  const hasCategoryData = impactData?.categories && impactData.categories.length > 0;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-orange-500 text-white border-none text-[10px] font-black uppercase tracking-widest">Live Engine</Badge>
              {isRefetching && <RefreshCw className="w-3 h-3 animate-spin text-muted-foreground" />}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight uppercase">Economic Hub</h1>
            <p className="text-muted-foreground font-medium">Real-time metrics for <span className="text-primary font-bold uppercase">{currentDistrict}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-2xl border border-emerald-500/20 text-emerald-600 shadow-sm">
              <HeartPulse className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Health: {impactData?.districtHealth || 0}%</span>
            </div>
            <Button variant="outline" size="icon" className="rounded-2xl h-10 w-10 border-border/50 bg-secondary/30" onClick={refreshData}>
              <RefreshCw className={cn("w-4 h-4 text-muted-foreground", isRefetching && "animate-spin")} />
            </Button>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Spend Generated', value: `$${impactData?.spendGenerated?.toLocaleString() ?? '0'}`, icon: Wallet, color: 'text-emerald-500', bg: 'bg-emerald-500/5', change: '+12.4%' },
            { label: 'Foot Traffic', value: footTrafficTotal.toLocaleString(), icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/5', change: '+8.2%' },
            { label: 'Verified Venues', value: impactData?.businessesSupported ?? 0, icon: Target, color: 'text-amber-500', bg: 'bg-amber-500/5', change: 'Active' },
            { label: 'Active Deals', value: impactData?.activeRewards ?? 0, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/5', change: '+5 New' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-soft bg-card/60 backdrop-blur-md rounded-3xl group hover:bg-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110 shadow-sm", stat.bg, stat.color)}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[9px] font-black border-none bg-green-500/10 text-green-600 px-2.5 py-0.5 rounded-full">
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-8">
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black mt-1 tracking-tighter">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-soft bg-card/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-border/10">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center justify-between">
                Weekly Engagement
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  Live Sync
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] p-8 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactData?.footTraffic || []} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                    contentStyle={{
                      borderRadius: '16px',
                      border: 'none',
                      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                      fontWeight: '800',
                      fontSize: '12px',
                      backgroundColor: 'hsl(var(--background))'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))', marginBottom: '4px' }}
                  />
                  <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="border-none shadow-soft bg-card/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-border/10">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-xl font-black uppercase tracking-tight">Category Mix</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] p-8 flex flex-col justify-center">
              {hasCategoryData ? (
                <>
                  <div className="relative">
                    <ResponsiveContainer width="100%" height={260}>
                      <PieChart>
                        <Pie
                          data={impactData.categories}
                          innerRadius={70}
                          outerRadius={95}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {impactData.categories.map((_: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', fontWeight: 'bold' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <p className="text-2xl font-black leading-none">Mix</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Report</p>
                    </div>
                  </div>
                  <div className="mt-8 space-y-3">
                    {impactData.categories.map((cat: any, i: number) => (
                      <div key={i} className="flex justify-between items-center bg-secondary/20 p-2 rounded-xl border border-border/5">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">{cat.name}</span>
                        </div>
                        <span className="text-[11px] font-black">{cat.value}%</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 opacity-40 py-12">
                   <Target className="w-12 h-12" />
                   <p className="text-xs font-black uppercase tracking-widest text-center">No Category Data <br /> For This District</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Card className="bg-primary text-primary-foreground border-none rounded-[3.5rem] overflow-hidden shadow-2xl relative group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 blur-[150px] -z-0 pointer-events-none group-hover:bg-orange-500/30 transition-colors" />
          <CardContent className="p-12 md:p-16 flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest">
                Business Intelligence v2.0
              </div>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none italic">Advanced <br /> ROI Engine.</h3>
              <p className="text-primary-foreground/70 text-lg md:text-xl font-medium max-w-xl">
                Claim your venue to access heatmaps, customer demographics, and point conversion analytics built for the modern city.
              </p>
              <Button className="rounded-[2rem] h-16 px-10 font-black bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all gap-2 text-lg shadow-2xl">
                Claim Your Business <ArrowUpRight className="w-6 h-6" />
              </Button>
            </div>
            <div className="w-full md:w-96 aspect-square bg-white/5 rounded-[4rem] border border-white/10 flex flex-col items-center justify-center p-12 space-y-6 backdrop-blur-xl shadow-inner">
               <div className="relative">
                 <TrendingUp className="w-32 h-32 text-orange-400 drop-shadow-glow opacity-60" />
                 <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 animate-pulse" />
               </div>
               <div className="text-center">
                 <p className="text-sm font-black uppercase tracking-widest opacity-40">System Status</p>
                 <p className="text-xl font-bold">Optimized for Growth</p>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}