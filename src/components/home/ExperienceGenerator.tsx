import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Compass, Save, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { trackEvent } from '@/lib/tracking';
import { toast } from 'sonner';
export function ExperienceGenerator() {
  const [duration, setDuration] = useState('4h');
  const [interest, setInterest] = useState('Culture');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<null | any>(null);
  const generate = () => {
    setIsGenerating(true);
    setResult(null);
    setProgress(0);
    trackEvent('experience_generator_start', { duration, interest });
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 5;
      });
    }, 100);
    setTimeout(() => {
      setResult({
        title: `The ${interest} Sprint`,
        estimate: '$45 - $80',
        stops: ['Soulard Market', 'The Arch Museum', 'Lunch at Salt + Smoke'],
        impact: '+12 Community Points'
      });
      setIsGenerating(false);
      trackEvent('experience_generator_complete');
    }, 2500);
  };
  return (
    <Card className="border-none bg-gradient-to-br from-indigo-950 to-slate-900 text-white overflow-hidden shadow-2xl rounded-3xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] pointer-events-none" />
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-indigo-500 rounded-lg p-1.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <CardTitle className="text-xl">AI Experience Generator</CardTitle>
        </div>
        <p className="text-indigo-200/60 text-sm">Let our OS engine craft your perfect STL itinerary in seconds.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!result && (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-300/50 mb-3 block">Duration</label>
                <div className="grid grid-cols-3 gap-2">
                  {['2h', '4h', 'Full Day'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        duration === d ? "bg-white text-indigo-900 border-white" : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-300/50 mb-3 block">Focus Area</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Food', 'Culture', 'Nightlife'].map((i) => (
                    <button
                      key={i}
                      onClick={() => setInterest(i)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        interest === i ? "bg-white text-indigo-900 border-white" : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {isGenerating ? (
              <div className="space-y-3 py-4">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" /> Analyzing 314 Data...
                  </span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-1 bg-white/10" />
              </div>
            ) : (
              <Button onClick={generate} className="w-full h-14 bg-white text-indigo-950 hover:bg-indigo-50 font-black rounded-2xl gap-2 shadow-lg">
                <Compass className="w-5 h-5" /> Generate My Experience
              </Button>
            )}
          </>
        )}
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
              <h4 className="font-bold text-lg mb-1">{result.title}</h4>
              <p className="text-xs text-indigo-200">Est. Spend: {result.estimate}</p>
              <div className="mt-4 space-y-2">
                {result.stops.map((stop: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{stop}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 rounded-xl border-white/20 bg-transparent text-white hover:bg-white/5" onClick={() => setResult(null)}>
                Try Again
              </Button>
              <Button className="flex-1 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold gap-2" onClick={() => toast.success("Saved to 314 Card!")}>
                <Save className="w-4 h-4" /> Save Plan
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}