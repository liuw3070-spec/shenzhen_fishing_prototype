import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PhoneFrame from './PhoneFrame';
import TabBar from './TabBar';
import { PROTOTYPE_TAB_BAR_HEIGHT } from '../constants/device';
import { useMainLayoutChrome } from '../context/MainLayoutChromeContext';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hideTabBar } = useMainLayoutChrome();

  // Determine active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/shore')) return 'shore';
    if (path.includes('/sea')) return 'sea';
    if (path.includes('/publish')) return 'publish';
    if (path.includes('/mine')) return 'mine';
    return 'sea'; // Default
  };

  const handleTabChange = (tabId: string) => {
    switch (tabId) {
      case 'shore':
        navigate('/shore');
        break;
      case 'sea':
        navigate('/sea');
        break;
      case 'publish':
        navigate('/publish');
        break;
      case 'mine':
        navigate('/mine');
        break;
      default:
        break;
    }
  };

  return (
    <PhoneFrame showStatusBar={true}>
      <div style={{
        position: 'absolute',
        top: 44,
        left: 0,
        right: 0,
        bottom: hideTabBar ? 0 : PROTOTYPE_TAB_BAR_HEIGHT,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        <Outlet />
      </div>
      {!hideTabBar && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <TabBar activeTab={getActiveTab()} onTabChange={handleTabChange} />
        </div>
      )}
    </PhoneFrame>
  );
};

export default MainLayout;
