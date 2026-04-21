import './lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { DirectoryPage } from '@/pages/DirectoryPage'
import { ConciergePage } from '@/pages/ConciergePage'
import { CityCardPage } from '@/pages/CityCardPage'
import { EventsPage } from '@/pages/EventsPage'
import { ListingDetailPage } from '@/pages/ListingDetailPage'
import { EventDetailPage } from '@/pages/EventDetailPage'
import { ROIDashboardPage } from '@/pages/ROIDashboardPage'
import { AppLayout } from '@/components/layout/AppLayout'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout container><HomePage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/directory",
    element: <AppLayout container><DirectoryPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/listing/:id",
    element: <AppLayout container><ListingDetailPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/concierge",
    element: <AppLayout><ConciergePage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/card",
    element: <AppLayout container><CityCardPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/events",
    element: <AppLayout container><EventsPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/event/:id",
    element: <AppLayout container><EventDetailPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: <AppLayout container><ROIDashboardPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)