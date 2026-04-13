import React from "react";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileNav } from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { DistrictSwitcher } from "./DistrictSwitcher";
import { useDistrictStore } from "@/store/use-district-store";
type AppLayoutProps = {
  children: React.ReactNode;
  container?: boolean;
  className?: string;
  contentClassName?: string;
};
export function AppLayout({ children, container = false, className, contentClassName }: AppLayoutProps): JSX.Element {
  const isMobile = useIsMobile();
  const currentDistrict = useDistrictStore(s => s.currentDistrict);
  const getDistrictClass = () => {
    switch (currentDistrict) {
      case 'delmar': return 'district-delmar';
      case 'cwe': return 'district-cwe';
      case 'grove': return 'district-grove';
      case 'downtown': return 'district-downtown';
      case 'ferguson': return 'district-ferguson';
      default: return 'district-stl';
    }
  };
  return (
    <SidebarProvider defaultOpen={false}>
      {!isMobile && <AppSidebar />}
      <SidebarInset className={cn(
        "relative transition-colors duration-500 min-h-screen bg-background",
        className,
        getDistrictClass()
      )}>
        {/* Ferguson-specific subtle overlay */}
        {currentDistrict === 'ferguson' && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.03),transparent_70%)] z-0" />
        )}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-[60]">
          <DistrictSwitcher />
        </div>
        <main className={cn(
          "flex-1 w-full flex flex-col relative z-10",
          isMobile ? "pb-20" : "",
          container ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12" : ""
        , contentClassName)}>
          {children}
        </main>
        {isMobile && <MobileNav />}
      </SidebarInset>
    </SidebarProvider>
  );
}