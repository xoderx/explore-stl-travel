import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileNav } from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";
type AppLayoutProps = {
  children: React.ReactNode;
  container?: boolean;
  className?: string;
  contentClassName?: string;
};
export function AppLayout({ children, container = false, className, contentClassName }: AppLayoutProps): JSX.Element {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider defaultOpen={false}>
      {!isMobile && <AppSidebar />}
      <SidebarInset className={className}>
        <ThemeToggle className="absolute top-4 right-4" />
        <main className={cn(
          "flex-1 w-full min-h-screen",
          isMobile ? "pb-20" : "",
          container ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12" : ""
        ) + (contentClassName ? ` ${contentClassName}` : "")}>
          {children}
        </main>
        {isMobile && <MobileNav />}
      </SidebarInset>
    </SidebarProvider>
  );
}
import { cn } from "@/lib/utils";