import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileNav } from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { DistrictSwitcher } from "./DistrictSwitcher";
import { useDistrictStore } from "@/store/use-district-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
type AppLayoutProps = {
  children: React.ReactNode;
  container?: boolean;
  className?: string;
  contentClassName?: string;
};
export function AppLayout({
  children,
  container = false,
  className,
  contentClassName,
}: AppLayoutProps): JSX.Element {
  const isMobile = useIsMobile();
  const currentDistrict = useDistrictStore((s) => s.currentDistrict);
  const [claimVenue, setClaimVenue] = useState<string | null>(null);
  useEffect(() => {
    const handler = (e: any) => setClaimVenue(e.detail);
    window.addEventListener("open-claim-modal", handler);
    return () => window.removeEventListener("open-claim-modal", handler);
  }, []);
  const handleClaimSubmit = () => {
    toast.success(
      "Claim request sent! Our verification team will reach out within 24 hours."
    );
    setClaimVenue(null);
  };
  const getDistrictClass = () => {
    switch (currentDistrict) {
      case "delmar":
        return "district-delmar";
      case "cwe":
        return "district-cwe";
      case "grove":
        return "district-grove";
      case "downtown":
        return "district-downtown";
      case "ferguson":
        return "district-ferguson";
      default:
        return "district-stl";
    }
  };
  return (
    <SidebarProvider defaultOpen={false}>
      {!isMobile && <AppSidebar />}
      <SidebarInset
        className={cn(
          "relative transition-colors duration-500 min-h-screen bg-background",
          className,
          getDistrictClass()
        )}
      >
        {currentDistrict === "ferguson" && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.03),transparent_70%)] z-0" />
        )}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-[40]">
          <DistrictSwitcher />
        </div>
        <main
          className={cn(
            "flex-1 w-full flex flex-col relative z-10",
            isMobile ? "pb-20" : "",
            container ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12" : "",
            contentClassName
          )}
        >
          {children}
        </main>
        {isMobile && <MobileNav />}
        <Dialog open={!!claimVenue} onOpenChange={() => setClaimVenue(null)}>
          <DialogContent className="sm:max-w-[500px] rounded-3xl border-none shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">
                Claim Your Venue
              </DialogTitle>
              <DialogDescription>
                Verify ownership of <b>{claimVenue}</b> to access the ROI
                Dashboard and create custom deals.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Business Email
                </label>
                <Input
                  placeholder="owner@venue.com"
                  className="h-12 rounded-xl bg-secondary/50 border-none focus-visible:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Verification Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="rounded-xl h-12 text-xs font-bold border-border/50"
                  >
                    Phone Call
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl h-12 text-xs font-bold border-border/50"
                  >
                    Tax ID
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-secondary/50 p-4 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Claimed venues receive 5,000 "Boost" points to promote their
                  first event.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                className="w-full h-14 rounded-2xl bg-primary font-black shadow-lg"
                onClick={handleClaimSubmit}
              >
                Submit Claim Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  );
}