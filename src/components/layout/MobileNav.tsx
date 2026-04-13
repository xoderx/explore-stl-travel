import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Map, Sparkles, Wallet, Calendar, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
const navItems = [
  { icon: Compass, label: 'Discover', to: '/' },
  { icon: Map, label: 'Directory', to: '/directory' },
  { icon: Sparkles, label: 'Concierge', to: '/concierge' },
  { icon: Wallet, label: '314 Card', to: '/card' },
  { icon: Calendar, label: 'Events', to: '/events' },
  { icon: BarChart3, label: 'ROI', to: '/dashboard' },
];
export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t pb-safe">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-1">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center space-y-1 w-full h-full transition-colors",
                isActive ? "text-orange-500" : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[9px] font-bold uppercase tracking-tighter">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}