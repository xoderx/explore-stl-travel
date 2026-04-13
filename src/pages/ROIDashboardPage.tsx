import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Wallet, Target, ArrowUpRight, Filter, Loader2 } from 'lucide-react';
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
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8 animate-fade-in pb-20">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-display font-bold">Business ROI Dashboard</h1>
            <p className="text-muted-foreground">Economic impact and foot traffic for <span className="text-primary font-bold uppercase">{currentDistrict}</span></p>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-xl">
            <Filter className="w-4 h-4 ml-3 text-muted-foreground" />
            <span className="text-xs font-bold mr-2 uppercase tracking-tighter">Live View</span>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Spend Generated', value: `$${impactData?.spendGenerated?.toLocaleString() || '0'}`, icon: Wallet, color: 'text-emerald-500', change: '+12%' },
            { label: 'Foot Traffic', value: impactData?.footTraffic?.reduce((acc: number, curr: any) => acc + curr.count, 0).toLocaleString() || '0', icon: Users, color: 'text-blue-500', change: '+8%' },
            { label: 'Businesses', value: impactData?.businessesSupported || 0, icon: Target, color: 'text-amber-500', change: 'Live' },
            { label: 'Active Deals', value: impactData?.activeRewards || 0, icon: TrendingUp, color: 'text-purple-500', change: '+5' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-soft bg-secondary/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className={cn("p-2 rounded-xl bg-background shadow-sm", stat.color)}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold border-none bg-green-500/10 text-green-600">
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-none shadow-soft bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center justify-between">
                Weekly Foot Traffic
                <span className="text-xs font-normal text-muted-foreground">Updated hourly</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactData?.footTraffic || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="border-none shadow-soft bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Category Impact</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex flex-col justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={impactData?.categories || []}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {impactData?.categories?.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {impactData?.categories?.map((cat: any, i: number) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-xs font-medium">{cat.name}</span>
                    </div>
                    <span className="text-xs font-bold">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-primary/5 border-primary/10 border-none rounded-3xl overflow-hidden">
          <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-bold">Unlock Advanced Analytics</h3>
              <p className="text-muted-foreground text-sm max-w-md">Claim your business listing today to see real-time customer demographics, redemption heatmaps, and ROI projections.</p>
              <Button className="rounded-2xl h-12 px-8 font-bold gap-2">
                Claim Your Business <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="w-full md:w-64 aspect-video bg-gradient-to-br from-primary/20 to-primary/40 rounded-2xl flex items-center justify-center">
               <TrendingUp className="w-16 h-16 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}