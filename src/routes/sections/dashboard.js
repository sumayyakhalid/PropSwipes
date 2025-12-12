import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import { UserCreateView, UserListView } from 'src/sections/subscriber/view';
import UserDetailPage from 'src/pages/dashboard/subscriber/subscriber-detail';
import PropertyListView from 'src/sections/property-management/property-list-view';
import PropertyDetailPage from 'src/pages/dashboard/property-management/property-detail';
import FlaggedConversationsListView from 'src/sections/flagged-conversation/flagged-conversation-list-view';
import { AccountView } from 'src/sections/account/view';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { path: '/dashboard', element: <IndexPage />, index: true },

      {
        path: 'subscriber-management',
        children: [
          { element: <UserListView />, index: true },
          { path: 'new', element: <UserCreateView /> },
          { path: ':id/subscriber-detail', element: <UserDetailPage /> },
        ],
      },

      {
        path: 'flagged-conversations',
        children: [{ element: <FlaggedConversationsListView />, index: true }],
      },
      {
        path: 'property-management',
        children: [
          { element: <PropertyListView />, index: true },
          { path: ':id/property-detail', element: <PropertyDetailPage /> },
        ],
      },
      {
        path: '/dashboard/user/account',
        children: [{ element: <AccountView />, index: true }],
      },
    ],
  },
];
