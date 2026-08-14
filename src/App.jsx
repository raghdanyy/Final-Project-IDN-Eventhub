import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { DashboardOverviewPage } from './pages/dashboard/DashboardOverviewPage';
import { EventsListPage } from './pages/events/EventsListPage';
import { EventDetailPage } from './pages/events/EventDetailPage';
import { CreateEventWizardPage } from './pages/events/CreateEventWizardPage';
import { TicketTiersPage } from './pages/tickets/TicketTiersPage';
import { PromoCodesPage } from './pages/tickets/PromoCodesPage';
import { OrdersListPage } from './pages/orders/OrdersListPage';
import { AttendeesListPage } from './pages/attendees/AttendeesListPage';
import { CheckInTerminalPage } from './pages/checkin/CheckInTerminalPage';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { AccountPage } from './pages/account/AccountPage';
import { TeamManagementPage } from './pages/team/TeamManagementPage';
import { BillingSubscriptionPage } from './pages/billing/BillingSubscriptionPage';
import { OrganizationSettingsPage } from './pages/settings/OrganizationSettingsPage';
import { ScreenIndexPage } from './pages/sitemap/ScreenIndexPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Authenticated Dashboard App Routes */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardOverviewPage />} />
            <Route path="/events" element={<EventsListPage />} />
            <Route path="/events/new" element={<CreateEventWizardPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/tickets" element={<TicketTiersPage />} />
            <Route path="/promo-codes" element={<PromoCodesPage />} />
            <Route path="/orders" element={<OrdersListPage />} />
            <Route path="/attendees" element={<AttendeesListPage />} />
            <Route path="/checkin" element={<CheckInTerminalPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/team" element={<TeamManagementPage />} />
            <Route path="/billing" element={<BillingSubscriptionPage />} />
            <Route path="/settings" element={<OrganizationSettingsPage />} />
            <Route path="/screens" element={<ScreenIndexPage />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
