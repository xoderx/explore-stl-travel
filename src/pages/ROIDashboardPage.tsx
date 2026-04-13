import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Wallet, Target, ArrowUpRight, Filter, Loader2, HeartPulse } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { useDistrictStore } from '@/store/use-district-store';
import { cn } from '@/lib/utils';
export function ROIDashboardPage() {
  const currentDistrict = useDistrictStore(s => s.currentDistrict);
  const { data: impactData, isLoading } = useQuery({
    queryKey: ['analytics', currentDistrict],
    queryFn: () => api<any>(`/api/analytics/${currentDistrict}`),
  });
  const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'];
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  const footTrafficTotal = impactData?.footTraffic?.reduce((acc: number, curr: any) => acc + (curr.count || 0), 0) ?? 0;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-display font-black tracking-tight uppercase">Economic Hub</h1>
            <p className="text-muted-foreground font-medium">District metrics for <span className="text-primary font-bold uppercase">{currentDistrict}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-2xl border border-emerald-500/20 text-emerald-600">
              <HeartPulse className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Health Score: {impactData?.districtHealth || 0}%</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/50 p-2 rounded-2xl">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Spend Generated', value: `$${impactData?.spendGenerated?.toLocaleString() ?? '0'}`, icon: Wallet, color: 'text-emerald-500', change: '+12%' },
            { label: 'Foot Traffic', value: footTrafficTotal.toLocaleString(), icon: Users, color: 'text-blue-500', change: '+8%' },
            { label: 'Verified Venues', value: impactData?.businessesSupported ?? 0, icon: Target, color: 'text-amber-500', change: 'Live' },
            { label: 'Active Deals', value: impactData?.activeRewards ?? 0, icon: TrendingUp, color: 'text-purple-500', change: '+5' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-soft bg-secondary/20 rounded-3xl group hover:bg-secondary/40 transition-colors">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className={cn("p-2.5 rounded-2xl bg-background shadow-sm transition-transform group-hover:scale-110", stat.color)}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] font-black border-none bg-green-500/10 text-green-600 px-2">
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-6">
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-none shadow-soft bg-card rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center justify-between">
                Weekly Engagement
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Real-time sync</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[380px] p-6 pt-0">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={impactData?.footTraffic || []} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="border-none shadow-soft bg-card rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-xl font-black uppercase tracking-tight">Category Mix</CardTitle>
            </CardHeader>
            <CardContent className="h-[380px] p-8 flex flex-col justify-center">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={impactData?.categories || []}
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {impactData?.categories?.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-8 space-y-3">
                {impactData?.categories?.map((cat: any, i: number) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-xs font-bold text-muted-foreground">{cat.name}</span>
                    </div>
                    <span className="text-xs font-black">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-primary border-none rounded-[3rem] overflow-hidden shadow-2xl">
          <CardContent className="p-12 flex flex-col md:flex-row items-center gap-12 text-primary-foreground">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h3 className="text-4xl font-black tracking-tight leading-none">Advanced ROI Engine.</h3>
              <p className="text-primary-foreground/70 text-lg font-medium">Claim your venue to access heatmaps, customer demographic profiles, and point conversion analytics.</p>
              <Button className="rounded-2xl h-14 px-10 font-black bg-white text-primary hover:bg-white/90 gap-2">
                Claim Your Business <ArrowUpRight className="w-5 h-5" />
              </Button>
            </div>
            <div className="w-full md:w-80 aspect-video bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8">
               <TrendingUp className="w-24 h-24 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}