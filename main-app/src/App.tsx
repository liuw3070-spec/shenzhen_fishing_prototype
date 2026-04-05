import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';

// Pages - Level 1
import ShoreFishingHome from './pages/level1/ShoreFishingHome';
import SeaFishingHome from './pages/level1/SeaFishingHome';
import PublishPage from './pages/level1/PublishPage';
import ProfilePage from './pages/level1/ProfilePage';

// Pages - Level 2
import BoatDetailPage from './pages/level2/BoatDetailPage';
import CarpoolPostPage from './pages/level2/CarpoolPostPage';
import FishingSpotDetailPage from './pages/level2/FishingSpotDetailPage';
import NewCorrectionFishingSpotPage from './pages/level2/NewCorrectionFishingSpotPage';
import OrderListPage from './pages/level2/OrderListPage';
import DriverDetailPage from './pages/level2/DriverDetailPage';
import PassengerDetailPage from './pages/level2/PassengerDetailPage';
import PublishLivePage from './pages/level2/PublishLivePage';
import SeaFishingPostDetailPage from './pages/level2/SeaFishingPostDetailPage';
import MessagesPage from './pages/level2/MessagesPage';
import SettingsPage from './pages/level2/SettingsPage';

// Pages - Level 3
import DriverIntentConfirmPage from './pages/level3/DriverIntentConfirmPage';
import PassengerIntentConfirmPage from './pages/level3/PassengerIntentConfirmPage';
import OngoingOrderDetailPage from './pages/level3/OngoingOrderDetailPage';
import SeaFishingCrowdfundingPage from './pages/level3/SeaFishingCrowdfundingPage';
import SeaFishingOngoingOrderPage from './pages/level3/SeaFishingOngoingOrderPage';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Tabbed Layout for Level 1 pages */}
      <Route element={<MainLayout />}>
        <Route path="/shore" element={<ShoreFishingHome />} />
        <Route path="/sea" element={<SeaFishingHome />} />
        <Route path="/publish" element={<PublishPage />} />
        <Route path="/mine" element={<ProfilePage />} />
        <Route path="/" element={<Navigate to="/shore" replace />} />
      </Route>

      {/* Direct routes for Level 2 & 3 pages */}
      <Route path="/level2/boat-detail" element={<BoatDetailPage />} />
      <Route path="/level2/carpool-post" element={<CarpoolPostPage />} />
      <Route path="/level2/fishing-spot-detail" element={<FishingSpotDetailPage />} />
      <Route path="/level2/new-correction" element={<NewCorrectionFishingSpotPage />} />
      <Route path="/level2/order-list" element={<OrderListPage />} />
      <Route path="/level2/driver-detail" element={<DriverDetailPage />} />
      <Route path="/level2/passenger-detail" element={<PassengerDetailPage />} />
      <Route path="/level2/publish-live" element={<PublishLivePage />} />
      <Route path="/level2/sea-post-detail" element={<SeaFishingPostDetailPage />} />
      <Route path="/level2/messages" element={<MessagesPage />} />
      <Route path="/level2/settings" element={<SettingsPage />} />

      <Route path="/level3/driver-intent" element={<DriverIntentConfirmPage />} />
      <Route path="/level3/passenger-intent" element={<PassengerIntentConfirmPage />} />
      <Route path="/level3/ongoing-order-detail" element={<OngoingOrderDetailPage />} />
      <Route path="/level3/crowdfunding" element={<SeaFishingCrowdfundingPage />} />
      <Route path="/level3/sea-ongoing-order" element={<SeaFishingOngoingOrderPage />} />
    </Routes>
  );
};

export default App;
