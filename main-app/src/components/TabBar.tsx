import React from 'react';
import { PROTOTYPE_TAB_BAR_HEIGHT } from '../constants/device';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const PRIMARY = '#00B38A';
const GRAY = '#BDBDBD';

const TABS = [
  {
    id: 'shore',
    label: '岸钓',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 20c3-4 6-6 9-6s6 2 9 6"
          stroke={active ? PRIMARY : GRAY}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 14V6"
          stroke={active ? PRIMARY : GRAY}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 6c0-2 3-3 3-3"
          stroke={active ? PRIMARY : GRAY}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="11" r="1.5" fill={active ? PRIMARY : GRAY} />
      </svg>
    ),
  },
  {
    id: 'sea',
    label: '海钓',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 14c2-1 4-1.5 5-1 0 0 2-6 8-7-2 3-2 6-1 7 1.5 0 3.5-.5 5 1-2 1-4 1.5-6 1.5C11 18 9 19 7 18c-1.5-.5-2.5-2-4-4z"
          stroke={active ? PRIMARY : GRAY}
          strokeWidth="1.5"
          fill={active ? `${PRIMARY}20` : 'none'}
          strokeLinejoin="round"
        />
        <path
          d="M3 19c4-2 10-2 14 0"
          stroke={active ? PRIMARY : GRAY}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'publish',
    label: '发布',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill={active ? PRIMARY : GRAY} />
        <path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'mine',
    label: '我的',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.5" stroke={active ? PRIMARY : GRAY} strokeWidth="1.5" fill="none" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={active ? PRIMARY : GRAY} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
];

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div
      style={{
        height: `${PROTOTYPE_TAB_BAR_HEIGHT}px`,
        background: '#fff',
        borderTop: '1px solid #EBEBEB',
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: '8px',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
        zIndex: 100,
      }}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            {tab.icon(isActive)}
            <span
              style={{
                fontSize: '10px',
                color: isActive ? PRIMARY : GRAY,
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TabBar;
