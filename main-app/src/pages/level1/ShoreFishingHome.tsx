import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// ======================== DESIGN TOKENS ========================
const C = {
  primary: '#00B38A',
  warning: '#F56C6C',
  textPrimary: '#1F2D3D',
  textSecondary: '#5A6A7A',
  textHint: '#A0AAB8',
  bg: '#F5F7FA',
  white: '#FFFFFF',
  border: '#EDF1F7',
  cardShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

// ======================== TYPES ========================
type MapMode = 'initial' | 'expanded' | 'compressed';
type ContentTab = '热门钓点' | '拼车大厅' | '我的钓点';
type MapLayer = '标准地图' | '卫星地图' | '热力图';
type RideshareView = '乘客' | '车主';

// ======================== MOCK DATA ========================
const HOT_SPOTS = [
  { id: 1, name: '太湖东岸钓点', distance: '3.2km', tags: ['免费停车', '公厕'], px: 28, py: 42, todayCount: 3, fishType: '鲈鱼·黑鲷', hotIndex: 4.1 },
  { id: 2, name: '青山水库钓场', distance: '5.8km', tags: ['收费停车', '公厕', '餐饮'], px: 62, py: 55, todayCount: 5, fishType: '鲤鱼·草鱼', hotIndex: 4.5 },
  { id: 3, name: '龙潭湖南岸', distance: '1.5km', tags: ['免费停车'], px: 44, py: 30, todayCount: 2, fishType: '罗非鱼', hotIndex: 3.8 },
  { id: 4, name: '锦绣湖垂钓园', distance: '8.1km', tags: ['付费钓场', '公厕', '餐饮'], px: 73, py: 67, todayCount: 7, fishType: '鲈鱼·翘嘴', hotIndex: 4.8 },
];

const DRIVER_CARDS = [
  { id: 1, avatar: '王', name: '钓鱼达人老王', rating: 4.9, tripCount: 38,
    origin: '深圳大学北门', destination: '太湖东岸钓点',
    departTime: '05-20 06:00', returnTime: '12:00',
    seats: 2, gear: '重装', distance: '3.2km' },
  { id: 2, avatar: '李', name: '路亚小李', rating: 4.7, tripCount: 21,
    origin: '南山区地铁口', destination: '青山水库钓场',
    departTime: '05-20 05:30', returnTime: '14:30',
    seats: 1, gear: '轻装', distance: '5.8km' },
  { id: 3, avatar: '张', name: '夜钓专家张叔', rating: 5.0, tripCount: 62,
    origin: '福田区中心广场', destination: '龙潭湖南岸',
    departTime: '05-21 22:00', returnTime: '次日06:00',
    seats: 3, gear: '重装', distance: '1.5km' },
];

const PASSENGER_CARDS = [
  { id: 1, avatar: '明', name: '新手小明', rating: 4.6, tripCount: 5,
    origin: '南山区科技园', destination: '太湖东岸钓点',
    departTime: '05-21 06:00', returnTime: '13:00',
    people: 1, gear: '轻装', distance: '3.2km' },
  { id: 2, avatar: '友', name: '周末钓友', rating: 4.8, tripCount: 17,
    origin: '宝安区翻身地铁站', destination: '锦绣湖垂钓园',
    departTime: '05-24 05:00', returnTime: '15:00',
    people: 2, gear: '重装', distance: '8.1km' },
];

const MY_SPOTS = [
  { id: 1, name: '太湖东岸钓点', distance: '3.2km', lastVisit: '2天前', tags: ['免费停车', '公厕'] },
  { id: 2, name: '龙潭湖南岸', distance: '1.5km', lastVisit: '1周前', tags: ['免费停车'] },
];

// ======================== SMALL COMPONENTS ========================
function InlineTag({ label, color = C.primary }: { label: string; color?: string }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: '11px', padding: '2px 7px',
      borderRadius: '4px', background: color === C.primary ? '#EAF8F4' : '#FEF0F0',
      color, lineHeight: '18px', whiteSpace: 'nowrap'
    }}>{label}</span>
  );
}

function Avatar({ char, size = 36 }: { char: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${C.primary} 0%, #00917A 100%)`,
      color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '14px', fontWeight: 600, flexShrink: 0
    }}>{char}</div>
  );
}

function GearTag({ gear }: { gear: string }) {
  const isHeavy = gear === '重装';
  return <InlineTag label={gear} color={isHeavy ? C.warning : C.primary} />;
}

// ======================== HOT SPOTS LIST ========================
function HotSpotsContent({ onSpotClick }: { onSpotClick: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {HOT_SPOTS.map(spot => (
        <div key={spot.id} onClick={onSpotClick} style={{
          background: C.white, borderRadius: '12px', padding: '12px 14px',
          boxShadow: C.cardShadow, cursor: 'pointer', display: 'flex',
          alignItems: 'center', gap: '12px', border: `1px solid ${C.border}`
        }}>
          {/* Spot icon */}
          <div style={{
            width: 44, height: 44, borderRadius: '10px',
            background: 'linear-gradient(135deg, #EAF8F4 0%, #D0F0E8 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={C.primary}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '15px', fontWeight: 500, color: C.textPrimary }}>{spot.name}</span>
              <span style={{ fontSize: '11px', color: C.textHint }}>📍 {spot.distance}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', color: '#00B38A', fontWeight: 500 }}>👥 今日{spot.todayCount}人前往</span>
              <span style={{ fontSize: '11px', color: '#F56C6C', fontWeight: 500 }}>🎣 {spot.fishType}</span>
              <span style={{ fontSize: '11px', color: '#FFB800', fontWeight: 500 }}>⭐ 爆护{spot.hotIndex}</span>
            </div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '5px' }}>
              {spot.tags.map(t => <InlineTag key={t} label={t} />)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ======================== CARPOOL SECTION ========================
// ---- Route Row ----
function RouteRow({ origin, destination }: { origin: string; destination: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '7px 0 5px' }}>
      {/* Origin dot */}
      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: C.textSecondary, flexShrink: 0 }} />
      <span style={{ fontSize: '12px', color: C.textSecondary, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{origin}</span>
      {/* Arrow */}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <path d="M5 12h14M13 6l6 6-6 6" stroke={C.textHint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* Destination dot */}
      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: C.primary, flexShrink: 0 }} />
      <span style={{ fontSize: '12px', color: C.primary, fontWeight: 500, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{destination}</span>
    </div>
  );
}

// ---- Star Rating Row ----
function RatingRow({ rating, tripCount }: { rating: number; tripCount: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFBB00">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      <span style={{ fontSize: '12px', color: C.textPrimary, fontWeight: 500 }}>{rating.toFixed(1)}</span>
      <span style={{ fontSize: '12px', color: C.textHint }}>· 拼车 {tripCount} 次</span>
    </div>
  );
}

function CarpoolContent({
  view, setView, onDriverCardClick, onPassengerCardClick, onPublish
}: {
  view: RideshareView; setView: (v: RideshareView) => void;
  onDriverCardClick: () => void; onPassengerCardClick: () => void; onPublish: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {/* Switch */}
      <div style={{
        display: 'flex', background: '#F5F7FA', borderRadius: '8px',
        padding: '3px', marginBottom: '12px', gap: '2px'
      }}>
        {(['乘客', '车主'] as RideshareView[]).map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            flex: 1, padding: '7px 0', borderRadius: '6px', border: 'none',
            background: view === v ? C.white : 'transparent',
            color: view === v ? C.primary : C.textSecondary,
            fontWeight: view === v ? 500 : 400, fontSize: '14px',
            cursor: 'pointer',
            boxShadow: view === v ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.2s'
          }}>{v}</button>
        ))}
      </div>

      {/* Sub-label */}
      <div style={{ fontSize: '12px', color: C.textHint, marginBottom: '10px' }}>
        {view === '乘客' ? '🚗 附近车主发布的空座' : '🎣 钓友发布的求车需求'}
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {view === '乘客'
          ? DRIVER_CARDS.map(d => (
            <div key={d.id} onClick={onDriverCardClick} style={{
              background: C.white, borderRadius: '12px', padding: '14px',
              boxShadow: C.cardShadow, cursor: 'pointer', border: `1px solid ${C.border}`
            }}>
              {/* Header: avatar + name/rating + distance */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Avatar char={d.avatar} size={38} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: C.textPrimary }}>{d.name}</span>
                    <span style={{ fontSize: '12px', color: C.textHint }}>{d.distance}</span>
                  </div>
                  <RatingRow rating={d.rating} tripCount={d.tripCount} />
                </div>
              </div>
              {/* Route */}
              <RouteRow origin={d.origin} destination={d.destination} />
              {/* Divider */}
              <div style={{ height: '1px', background: C.border, margin: '8px 0' }} />
              {/* Time + seats + gear + button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', color: C.textHint, marginBottom: '5px' }}>
                    🕐 {d.departTime} <span style={{ color: C.textHint }}>- {d.returnTime}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <GearTag gear={d.gear} />
                    <span style={{ fontSize: '12px', color: C.textHint }}>
                      剩余 <span style={{ color: C.primary, fontWeight: 600 }}>{d.seats}</span> 座
                    </span>
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); onDriverCardClick(); }} style={{
                  flexShrink: 0, padding: '8px 18px', borderRadius: '8px', border: 'none',
                  background: C.primary, color: 'white', fontSize: '13px',
                  fontWeight: 500, cursor: 'pointer'
                }}>拼车</button>
              </div>
            </div>
          ))
          : PASSENGER_CARDS.map(p => (
            <div key={p.id} onClick={onPassengerCardClick} style={{
              background: C.white, borderRadius: '12px', padding: '14px',
              boxShadow: C.cardShadow, cursor: 'pointer', border: `1px solid ${C.border}`
            }}>
              {/* Header: avatar + name/rating + distance */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Avatar char={p.avatar} size={38} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: C.textPrimary }}>{p.name}</span>
                    <span style={{ fontSize: '12px', color: C.textHint }}>{p.distance}</span>
                  </div>
                  <RatingRow rating={p.rating} tripCount={p.tripCount} />
                </div>
              </div>
              {/* Route */}
              <RouteRow origin={p.origin} destination={p.destination} />
              {/* Divider */}
              <div style={{ height: '1px', background: C.border, margin: '8px 0' }} />
              {/* Time + people + gear + button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', color: C.textHint, marginBottom: '5px' }}>
                    🕐 {p.departTime} <span style={{ color: C.textHint }}>- {p.returnTime}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <GearTag gear={p.gear} />
                    <span style={{ fontSize: '12px', color: C.textHint }}>
                      <span style={{ color: C.textPrimary, fontWeight: 600 }}>{p.people}</span> 人出行
                    </span>
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); onPassengerCardClick(); }} style={{
                  flexShrink: 0, padding: '8px 18px', borderRadius: '8px', border: 'none',
                  background: C.warning, color: 'white', fontSize: '13px',
                  fontWeight: 500, cursor: 'pointer'
                }}>接单</button>
              </div>
            </div>
          ))
        }
      </div>

      {/* Publish button */}
      <div style={{ position: 'sticky', bottom: 0, background: 'white', paddingTop: '12px', paddingBottom: '4px', marginTop: '12px' }}>
        <button onClick={onPublish} style={{
          width: '100%', padding: '13px', borderRadius: '8px', border: 'none',
          background: `linear-gradient(135deg, ${C.primary} 0%, #00917A 100%)`,
          color: 'white', fontSize: '15px', fontWeight: 500, cursor: 'pointer',
          boxShadow: `0 4px 12px rgba(0,179,138,0.3)`
        }}>+ 我要发单</button>
      </div>
    </div>
  );
}

// ======================== MY SPOTS LIST ========================
function MySpotsContent({ onSpotClick }: { onSpotClick: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {MY_SPOTS.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: C.textHint, fontSize: '14px' }}>
          暂无收藏钓点
        </div>
      ) : (
        MY_SPOTS.map(spot => (
          <div key={spot.id} onClick={onSpotClick} style={{
            background: C.white, borderRadius: '12px', padding: '14px',
            boxShadow: C.cardShadow, cursor: 'pointer', display: 'flex',
            alignItems: 'center', gap: '12px', border: `1px solid ${C.border}`
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '10px',
              background: 'linear-gradient(135deg, #FFF3F3 0%, #FFE8E8 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill={C.warning}>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '15px', fontWeight: 500, color: C.textPrimary, marginBottom: '4px' }}>{spot.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', color: C.textHint }}>📍 {spot.distance}</span>
                <span style={{ fontSize: '12px', color: C.textHint }}>· 最近到访: {spot.lastVisit}</span>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                {spot.tags.map(t => <InlineTag key={t} label={t} />)}
              </div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onSpotClick(); }} style={{
              flexShrink: 0, padding: '8px 12px', borderRadius: '8px',
              background: 'white', color: C.primary, border: `1px solid ${C.primary}`,
              fontSize: '13px', cursor: 'pointer'
            }}>导航</button>
          </div>
        ))
      )}
    </div>
  );
}

// ======================== SVG ICONS ========================
function IconClose({ color = C.textSecondary }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.5" fill={color} />
    </svg>
  );
}

function IconNavigation({ color = C.textHint }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
      <path d="M12 2L3.5 20.5 12 17 20.5 20.5z" />
    </svg>
  );
}

function IconLayers({ color = C.textSecondary }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7l10 5 10-5z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill={color} fillOpacity="0.15" />
      <path d="M2 12l10 5 10-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M2 17l10 5 10-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconCrosshair({ color = C.primary }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" fill={color} />
      <circle cx="12" cy="12" r="7" stroke={color} strokeWidth="1.8" />
      <line x1="12" y1="2" x2="12" y2="5.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="18.5" x2="12" y2="22" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="2" y1="12" x2="5.5" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="18.5" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconCheck({ color = C.primary }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color}>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

function FishingPin() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%', background: C.primary,
        border: '2.5px solid white', boxShadow: `0 2px 8px rgba(0,179,138,0.45)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
      <div style={{
        width: 0, height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: `6px solid ${C.primary}`,
        marginTop: '-1px'
      }} />
    </div>
  );
}

// ======================== SEARCH BOX COMPONENT ========================
const MAX_INPUT_LENGTH = 50;
const DEBOUNCE_MS = 300;
const SHOW_THRESHOLD = 0.80;

interface SearchBoxProps {
  visible: boolean;
  onSearch: (keyword: string) => void;
}

function FishingSpotSearchBox({ visible, onSearch }: SearchBoxProps) {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<string[]>([
    '太湖东岸钓点', '青山水库钓场', '深圳湾公园', '龙潭湖南岸',
    '锦绣湖垂钓园', '宝安西乡钓场',
  ]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) {
      setIsActive(false);
      setValue('');
      setShowHistory(false);
    }
  }, [visible]);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  useEffect(() => {
    if (showHistory && history.length === 0) {
      setShowHistory(false);
    }
  }, [history, showHistory]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsActive(false);
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        e.preventDefault();
        setIsActive(false);
        setShowHistory(false);
        inputRef.current?.blur();
      }
      if (e.key === 'Enter' && isActive && value.trim()) {
        e.preventDefault();
        executeSearch(value.trim());
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, value]);

  const handleActivate = (e?: React.MouseEvent | React.TouchEvent | React.KeyboardEvent) => {
    if (!visible || isActive) return;
    e?.stopPropagation?.();
    setIsActive(true);
    setShowHistory(history.length > 0);
  };

  const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!visible || isActive) return;
    setIsPressed(true);
  };

  const handleInteractionEnd = () => {
    setIsPressed(false);
  };

  const handleChange = (text: string) => {
    if (text.length > MAX_INPUT_LENGTH) return;
    setValue(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
  };

  const handleClear = () => { setValue(''); inputRef.current?.focus(); };

  const addToHistory = (keyword: string) => {
    setHistory(prev => {
      const filtered = prev.filter(h => h !== keyword);
      return [keyword, ...filtered].slice(0, 10);
    });
  };

  const executeSearch = (keyword: string) => {
    setIsSearching(true);
    addToHistory(keyword);
    setShowHistory(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setIsSearching(false);
      onSearch(keyword);
    }, DEBOUNCE_MS);
  };

  const handleHistoryClick = (item: string) => {
    setValue(item);
    executeSearch(item);
  };

  const handleClearHistory = () => {
    setHistory([]);
    setShowClearConfirm(false);
  };

  const isNearLimit = value.length >= MAX_INPUT_LENGTH - 5;
  const charCountColor = isNearLimit ? C.warning : '#666666';
  const showCharCount = value.length > 0;

  const opacity = visible ? (isActive ? 0.9 : 0.6) : 0;
  const pointerEvents = visible ? 'auto' : 'none';
  const boxWidth = isActive ? '280px' : '200px';

  return (
    <div
      ref={containerRef}
      role="search"
      aria-label="钓点搜索"
      style={{
        position: 'absolute',
        top: '12px',
        left: '50%',
        transform: `translateX(-50%) ${visible ? '' : 'translateX(-16px)'}${!visible || !isActive ? ' translateX(10px)' : ''}`,
        width: boxWidth,
        zIndex: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity,
        pointerEvents,
      }}
    >
      {/* Search Input Row - Full clickable area, no dead zones */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '46px',
          background: (() => {
            if (isActive) return '#fff';
            if (isPressed) return 'rgba(255,255,255,0.98)';
            if (isHovered) return 'rgba(255,255,255,0.96)';
            return 'rgba(255,255,255,0.92)';
          })(),
          borderRadius: isActive ? '10px' : '24px',
          border: `1.5px solid ${isActive ? C.primary : (isHovered && !isActive ? 'rgba(0,179,138,0.35)' : 'transparent')}`,
          boxShadow: (() => {
            if (isActive) return '0 2px 12px rgba(0,179,138,0.22), 0 1px 3px rgba(0,0,0,0.06)';
            if (isPressed) return '0 2px 8px rgba(0,0,0,0.14), inset 0 1px 2px rgba(0,0,0,0.04)';
            if (isHovered) return '0 3px 10px rgba(0,0,0,0.11)';
            return '0 2px 6px rgba(0,0,0,0.08)';
          })(),
          padding: isActive ? '0 14px 0 16px' : '0 14px',
          gap: '8px',
          cursor: !isActive ? 'pointer' : 'default',
          transform: isPressed && !isActive ? 'scale(0.975)' : 'scale(1)',
          transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
          outline: 'none',
        }}
        onClick={handleActivate}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
        onMouseEnter={() => { if (!isActive) setIsHovered(true); }}
        onTouchStart={handleInteractionStart}
        onTouchEnd={(e) => {
          handleInteractionEnd();
          handleActivate(e);
        }}
        onTouchCancel={handleInteractionEnd}
        tabIndex={0}
        aria-label="搜索钓点"
        aria-expanded={isActive}
        role="button"
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleActivate(e);
          }
        }}
        onFocus={(e) => {
          if (!isActive && visible) {
            e.currentTarget.style.boxShadow = isActive ? '' : '0 0 0 2px rgba(0,179,138,0.3), 0 2px 6px rgba(0,0,0,0.08)';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = '';
          setIsHovered(false);
        }}
      >
        {/* Search Icon (left) - visual only, no interaction blocking */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            flexShrink: 0,
            pointerEvents: 'none',
            transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isPressed && !isActive ? 'scale(0.9)' : 'scale(1)',
            opacity: isActive ? 1 : (isHovered ? 1 : 0.85),
          }}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" stroke={isActive ? C.primary : C.textHint} strokeWidth="2" />
          <path d="M16 16l5 5" stroke={isActive ? C.primary : C.textHint} strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Input - full area clickable, no dead zones */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => handleChange(e.target.value)}
          placeholder={isActive ? "调用键盘输入" : "搜索钓点"}
          disabled={!isActive}
          maxLength={MAX_INPUT_LENGTH}
          readOnly={!isActive}
          onClick={(e) => { if (!isActive) { e.preventDefault(); handleActivate(e); } }}
          onMouseDown={(e) => { if (!isActive) { e.preventDefault(); } }}
          onKeyDown={e => {
            if (e.key === 'Enter' && isActive && value.trim()) {
              e.preventDefault();
              executeSearch(value.trim());
            }
          }}
          style={{
            flex: 1,
            height: '100%',
            fontSize: '14px',
            color: '#333333',
            fontWeight: 400,
            outline: 'none',
            border: 'none',
            background: 'transparent',
            caretColor: C.primary,
            '::placeholder': { color: '#999999' },
            minWidth: 0,
            cursor: !isActive ? 'pointer' : 'text',
            pointerEvents: isActive ? 'auto' : 'none',
            WebkitUserSelect: isActive ? 'text' : 'none',
            userSelect: isActive ? 'text' : 'none',
          }}
          aria-label="搜索关键词输入框"
          aria-invalid={value.length > MAX_INPUT_LENGTH - 5 ? 'true' : undefined}
        />

        {/* Clear Button */}
        {isActive && value.length > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); handleClear(); }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F2F3F5'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: 'none',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 0.2s ease',
            }}
            aria-label="清除输入内容"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="#909399" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        )}

        {/* Char Count */}
        {isActive && showCharCount && (
          <span
            style={{
              fontSize: '12px',
              color: charCountColor,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              paddingRight: '2px',
            }}
            aria-live="polite"
          >
            {value.length}/{MAX_INPUT_LENGTH}
          </span>
        )}
      </div>

      {/* History Dropdown */}
      {isActive && showHistory && history.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '54px',
            left: 0,
            right: 0,
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            maxHeight: '280px',
            overflowY: 'auto',
            zIndex: 20,
            animation: 'slideDown 0.22s ease-out forwards',
            transformOrigin: 'top center',
          }}
          role="listbox"
          aria-label="搜索历史记录"
        >
          {history.map((item, idx) => (
            <button
              key={`${item}-${idx}`}
              onClick={() => handleHistoryClick(item)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 16px',
                border: 'none',
                borderBottom: idx < history.length - 1 ? `1px solid ${C.border}` : 'none',
                background: 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F7F8FA'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              role="option"
              aria-selected="false"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="9" stroke="#C0C4CC" strokeWidth="1.6" />
                <polyline points="9 12 11 14 15 10" stroke="#C0C4CC" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span
                style={{
                  flex: 1,
                  fontSize: '13px',
                  color: '#333333',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.45 }}>
                <path d="M9 5l7 7-7 7" stroke="#909399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}

          {/* Clear History Footer */}
          <button
            onClick={() => setShowClearConfirm(true)}
            style={{
              width: '100%',
              padding: '10px 16px',
              border: 'none',
              borderTop: `1px solid ${C.border}`,
              background: 'transparent',
              color: C.warning,
              fontSize: '13px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FEF0F0'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            清空历史
          </button>
        </div>
      )}

      {/* Clear Confirm Dialog */}
      {showClearConfirm && (
        <div
          style={{
            position: 'absolute',
            top: '54px',
            left: 0,
            right: 0,
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            padding: '20px 16px',
            zIndex: 25,
            textAlign: 'center',
            animation: 'slideDown 0.22s ease-out forwards',
          }}
          role="alertdialog"
          aria-modal="false"
          aria-label="确认清空搜索历史"
        >
          <p style={{ fontSize: '14px', color: '#303133', margin: '0 0 16px', lineHeight: 1.5 }}>确定清空所有搜索历史？</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setShowClearConfirm(false)}
              style={{
                flex: 1,
                height: '36px',
                borderRadius: '8px',
                border: `1px solid ${C.border}`,
                background: '#fff',
                color: '#606266',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              取消
            </button>
            <button
              onClick={handleClearHistory}
              style={{
                flex: 1,
                height: '36px',
                borderRadius: '8px',
                border: 'none',
                background: C.warning,
                color: '#fff',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              清空
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px) scaleY(0.95); } to { opacity: 1; transform: translateY(0) scaleY(1); } }
      `}</style>
    </div>
  );
}

// ======================== MAIN APP ========================
export default function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mapMode, setMapMode] = useState<MapMode>('initial');
  const [activeTab, setActiveTab] = useState<ContentTab>((searchParams.get('tab') as ContentTab) || '热门钓点');
  const [mapLayer, setMapLayer] = useState<MapLayer>('标准地图');
  const [rideshareView, setRideshareView] = useState<RideshareView>('乘客');
  const [selectedSpot, setSelectedSpot] = useState<typeof HOT_SPOTS[0] | null>(null);
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [toast, setToast] = useState('');
  const [showDistrictPanel, setShowDistrictPanel] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('南山区');
  const SHENZHEN_DISTRICTS = ['南山区', '福田区', '罗湖区', '宝安区', '龙岗区', '盐田区', '龙华区', '坪山区', '光明区', '大鹏新区'];

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  }, []);

  const handleSearch = useCallback((keyword: string) => {
    showToast(`正在搜索: ${keyword}`);
  }, [showToast]);

  // 页面跳转函数
  const goToFishingSpotDetail = () => navigate('/level2/fishing-spot-detail');
  const goToDriverDetail = () => navigate('/level2/driver-detail');
  const goToPassengerDetail = () => navigate('/level2/passenger-detail');
  const goToCarpoolPost = () => navigate('/level2/carpool-post');
  const goToOngoingOrder = () => navigate('/level3/ongoing-order-detail');
  const goToNewCorrection = () => navigate('/level2/new-correction');

  // Map height ratios (of available middle space)
  const MAP_RATIO: Record<MapMode, number> = { initial: 0.45, expanded: 0.20, compressed: 0.80 };
  const mapRatio = MAP_RATIO[mapMode];
  const contentRatio = 1 - mapRatio;

  const handleMapBgClick = () => {
    if (selectedSpot) { setSelectedSpot(null); return; }
    if (mapMode !== 'compressed') setMapMode('compressed');
  };

  const handleSpotMarkerClick = (spot: typeof HOT_SPOTS[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSpot(spot);
  };

  const handleArrowToggle = () => {
    setMapMode(prev => prev === 'expanded' ? 'initial' : 'expanded');
  };

  const getMapBg = () => {
    if (mapLayer === '卫星地图') return 'linear-gradient(160deg, #233b23 0%, #2e4e2e 35%, #263d30 70%, #1e3025 100%)';
    return 'linear-gradient(160deg, #e6f0e2 0%, #d8e8d0 35%, #cce0c4 70%, #bed8b8 100%)';
  };

  const TABS: ContentTab[] = ['热门钓点', '拼车大厅', '我的钓点'];

  const btnStyle = (active: boolean): React.CSSProperties => ({
    background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 10px',
    position: 'relative', fontSize: '14px',
    fontWeight: active ? 600 : 400,
    color: active ? C.primary : C.textSecondary,
  });

  return (
    <>
      {/* ========== MAIN: MAP + CONTENT ========== */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>

        {/* ===== MAP AREA ===== */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: `${mapRatio * 100}%`,
            transition: 'height 0.38s cubic-bezier(0.4,0,0.2,1)',
            background: getMapBg(), cursor: 'pointer', overflow: 'hidden'
          }}
          onClick={handleMapBgClick}
        >
          {/* Map SVG Decorations */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={C.warning} stopOpacity="0.75" />
                <stop offset="65%" stopColor="#FF8C42" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FF8C42" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="rg2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={C.warning} stopOpacity="0.55" />
                <stop offset="100%" stopColor={C.warning} stopOpacity="0" />
              </radialGradient>
              <radialGradient id="rg3" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFCC00" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFCC00" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="gg1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={C.primary} stopOpacity="0.35" />
                <stop offset="100%" stopColor={C.primary} stopOpacity="0" />
              </radialGradient>
              <radialGradient id="gg2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={C.primary} stopOpacity="0.28" />
                <stop offset="100%" stopColor={C.primary} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Water bodies */}
            <ellipse cx="22" cy="48" rx="16" ry="9" fill="#89CFF0" opacity="0.55" />
            <ellipse cx="67" cy="27" rx="10" ry="6.5" fill="#7BBFE0" opacity="0.45" />
            <path d="M0,76 Q20,73 45,78 T90,74 L100,76 L100,85 L0,85z" fill="#89CFF0" opacity="0.32" />

            {/* Roads */}
            <line x1="0" y1="52" x2="100" y2="47" stroke="white" strokeWidth="4" opacity="0.65" />
            <line x1="0" y1="30" x2="100" y2="33" stroke="white" strokeWidth="2.5" opacity="0.4" />
            <line x1="38" y1="0" x2="40" y2="100" stroke="white" strokeWidth="3" opacity="0.5" />
            <line x1="70" y1="0" x2="72" y2="100" stroke="white" strokeWidth="2" opacity="0.35" />
            <path d="M0,18 Q20,16 38,22 Q55,28 70,20 L100,22" stroke="white" strokeWidth="2" fill="none" opacity="0.3" />

            {/* Green hot zones */}
            <circle cx="28" cy="42" r="16" fill="url(#gg1)" />
            <circle cx="62" cy="55" r="13" fill="url(#gg2)" />

            {/* Red restricted zones */}
            <circle cx="18" cy="37" r="11" fill={C.warning} opacity="0.18" />
            <circle cx="75" cy="57" r="8" fill={C.warning} opacity="0.15" />
            <circle cx="18" cy="37" r="6" fill={C.warning} opacity="0.1" />

            {/* Heatmap overlay */}
            {mapLayer === '热力图' && (
              <>
                <circle cx="28" cy="42" r="20" fill="url(#rg1)" />
                <circle cx="62" cy="55" r="16" fill="url(#rg2)" />
                <circle cx="44" cy="30" r="11" fill="url(#rg3)" />
                <circle cx="73" cy="67" r="9" fill="url(#rg1)" opacity="0.6" />
              </>
            )}

            {/* Satellite texture */}
            {mapLayer === '卫星地图' && (
              <>
                <rect x="0" y="0" width="100" height="100" fill="rgba(0,0,0,0.18)" />
                <path d="M0,22 L38,20 L70,26 L100,23" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="rgba(255,180,80,0.07)" />
                <path d="M0,44 L20,42 L38,48 L60,45 L100,47" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" fill="rgba(80,160,80,0.08)" />
              </>
            )}
          </svg>

          {/* Fishing spot markers */}
          {HOT_SPOTS.map(spot => (
            <div
              key={spot.id}
              style={{
                position: 'absolute', left: `${spot.px}%`, top: `${spot.py}%`,
                transform: 'translate(-50%, -100%)', zIndex: 5
              }}
              onClick={(e) => handleSpotMarkerClick(spot, e)}
            >
              <FishingPin />
            </div>
          ))}

          {/* === TOP-RIGHT CUSTOM ICONS: Nav(left) → Close(right, most prominent) === */}
          <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px', zIndex: 10 }}>
            {/* Location status icon (left of close) */}
            <button
              style={{
                width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.92)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.14)', cursor: 'pointer'
              }}
              onClick={(e) => { e.stopPropagation(); setLocationEnabled(true); showToast('请求定位权限'); }}
            >
              <IconNavigation color={locationEnabled ? C.textPrimary : C.textHint} />
            </button>
            {/* Close mini program button (rightmost) */}
            <button
              style={{
                width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.92)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.14)', cursor: 'pointer'
              }}
              onClick={(e) => { e.stopPropagation(); setShowExitConfirm(true); }}
            >
              <IconClose />
            </button>
          </div>

          {/* === DISTRICT SELECTOR (top-left, same height as right icons) === */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10 }}>
            <button
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                background: 'rgba(255,255,255,0.92)', border: 'none',
                borderRadius: '17px', padding: '7px 12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.14)', cursor: 'pointer',
              }}
              onClick={(e) => { e.stopPropagation(); setShowDistrictPanel(true); }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill={C.textSecondary}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span style={{ fontSize: '14px', color: C.textSecondary, fontWeight: 500 }}>{selectedDistrict}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill={C.textPrimary}>
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
          </div>

          {/* === SEARCH BOX (visible when map >= 80%) === */}
          <FishingSpotSearchBox
            visible={mapMode === 'compressed'}
            onSearch={handleSearch}
          />

          {/* === ACTIVE ORDER CAPSULE (below district selector, left) === */}
          <div style={{ position: 'absolute', top: '58px', left: '12px', zIndex: 10 }}>
            <button
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: 'rgba(255,255,255,0.95)', border: 'none',
                borderRadius: '20px', padding: '7px 12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.14)', cursor: 'pointer',
              }}
              onClick={(e) => { e.stopPropagation(); goToOngoingOrder(); }}
            >
              <span style={{ fontSize: '13px', lineHeight: 1 }}>🚗</span>
              <span style={{ fontSize: '12px', color: C.textPrimary, fontWeight: 500, whiteSpace: 'nowrap' }}>进行中订单</span>
            </button>
          </div>

          {/* === LAYER BUTTON (below close icons) === */}
          <div style={{ position: 'absolute', top: '58px', right: '12px', zIndex: 10 }}>
            <button
              style={{
                width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.92)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.14)', cursor: 'pointer'
              }}
              onClick={(e) => { e.stopPropagation(); setShowLayerPanel(true); }}
            >
              <IconLayers />
            </button>
          </div>

          {/* === LOCATION RETURN BUTTON (bottom-left) === */}
          <div style={{ position: 'absolute', bottom: '24px', left: '12px', zIndex: 10 }}>
            <button
              style={{
                width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.92)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.14)', cursor: 'pointer'
              }}
              onClick={(e) => { e.stopPropagation(); showToast('返回当前位置'); }}
            >
              <IconCrosshair />
            </button>
          </div>

          {/* Map layer badge */}
          <div style={{ position: 'absolute', bottom: '30px', left: '58px', zIndex: 10 }}>
            <div style={{
              background: 'rgba(31,45,61,0.65)', borderRadius: '12px',
              padding: '3px 10px', backdropFilter: 'blur(4px)'
            }}>
              <span style={{ color: 'white', fontSize: '11px' }}>{mapLayer}</span>
            </div>
          </div>

          {/* Compressed state explore hint */}
          {mapMode === 'compressed' && (
            <div style={{
              position: 'absolute', bottom: '24px', left: '50%',
              transform: 'translateX(-50%)', zIndex: 10
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.9)', borderRadius: '16px',
                padding: '6px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
              }}>
                <span style={{ fontSize: '12px', color: C.textSecondary }}>🗺️ 正在浏览地图</span>
              </div>
            </div>
          )}
        </div>

        {/* ===== CONTENT AREA ===== */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: `calc(${contentRatio * 100}% + 16px)`,
            transition: 'height 0.38s cubic-bezier(0.4,0,0.2,1)',
            background: C.white,
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.09)',
            zIndex: 10, display: 'flex', flexDirection: 'column', overflow: 'hidden'
          }}
        >
          {/* Drag handle */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px', paddingBottom: '2px', flexShrink: 0 }}>
            <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: C.border }} />
          </div>

          {/* Tabs header row */}
          <div style={{ padding: '6px 16px 0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '22px' }}>
                {TABS.map(tab => (
                  <button key={tab} style={btnStyle(tab === activeTab)} onClick={() => setActiveTab(tab)}>
                    {tab}
                    {tab === activeTab && (
                      <div style={{
                        position: 'absolute', bottom: 0, left: '8%', right: '8%',
                        height: '2px', borderRadius: '1px', background: C.primary
                      }} />
                    )}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Restore button (only in compressed mode) */}
                {mapMode === 'compressed' && (
                  <button
                    style={{
                      padding: '4px 10px', borderRadius: '12px',
                      border: `1px solid ${C.primary}`, background: '#EAF8F4',
                      color: C.primary, fontSize: '12px', cursor: 'pointer'
                    }}
                    onClick={() => setMapMode('initial')}
                  >恢复</button>
                )}
                {/* Arrow toggle */}
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', lineHeight: 1 }}
                  onClick={handleArrowToggle}
                >
                  {mapMode === 'expanded'
                    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 15l6-6 6 6" stroke={C.textHint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    : <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke={C.textHint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  }
                </button>
              </div>
            </div>
            {/* Divider */}
            <div style={{ height: '1px', background: C.border, marginTop: '0' }} />
          </div>

          {/* Scrollable content body */}
          {mapMode !== 'compressed' ? (
            <div className="thin-scroll" style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 16px' }}>
              {activeTab === '热门钓点' && (
                <HotSpotsContent onSpotClick={goToFishingSpotDetail} />
              )}
              {activeTab === '拼车大厅' && (
                <CarpoolContent
                  view={rideshareView}
                  setView={setRideshareView}
                  onDriverCardClick={goToDriverDetail}
                  onPassengerCardClick={goToPassengerDetail}
                  onPublish={goToCarpoolPost}
                />
              )}
              {activeTab === '我的钓点' && (
                <MySpotsContent onSpotClick={goToFishingSpotDetail} />
              )}
            </div>
          ) : (
            /* Compressed state hint */
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke={C.textHint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: '12px', color: C.textHint }}>下滑或点击「恢复」展开内容</span>
            </div>
          )}
        </div>
      </div>

      {/* ========== OVERLAYS ========== */}

      {/* Spot bottom sheet */}
      {selectedSpot && (
        <div
          style={{ position: 'absolute', inset: 0, zIndex: 30 }}
          onClick={() => { setSelectedSpot(null); }}
        >
          <div
            style={{
              position: 'absolute', left: 0, right: 0, bottom: 0,
              height: '30%',
              background: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%), url("https://images.unsplash.com/photo-1761853448264-031016f334ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800") center/cover no-repeat`,
              borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
              padding: '16px', boxShadow: '0 -8px 32px rgba(0,0,0,0.18)', zIndex: 31,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div>
                    <div style={{ fontSize: '17px', fontWeight: 600, color: '#fff' }}>{selectedSpot.name}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>📍 距您 {selectedSpot.distance}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px', marginBottom: '8px' }}>
                  {selectedSpot.tags.map(t => (
                    <span key={t} style={{ fontSize: '11px', background: 'rgba(255,255,255,0.25)', color: '#fff', padding: '3px 8px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>👥 今日{selectedSpot.todayCount || 3}人前往</span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>🎣 爆护指数 4.1/5.0</span>
                </div>
              </div>
              <button
                style={{
                  flexShrink: 0, padding: '10px 16px', borderRadius: '8px',
                  background: C.primary, color: 'white', border: 'none',
                  fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                  alignSelf: 'center'
                }}
                onClick={goToFishingSpotDetail}
              >查看详情</button>
            </div>
          </div>
        </div>
      )}

      {/* District selection panel */}
      {showDistrictPanel && (
        <div
          style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.42)' }}
          onClick={() => setShowDistrictPanel(false)}
        >
          <div
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: C.white, borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
              padding: '20px 16px 40px'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: C.border }} />
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: C.textPrimary, textAlign: 'center', marginBottom: '20px' }}>
              选择区域
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {SHENZHEN_DISTRICTS.map(district => (
                <button
                  key={district}
                  style={{
                    padding: '9px 16px', borderRadius: '8px', border: 'none',
                    background: selectedDistrict === district ? C.primary : C.border,
                    color: selectedDistrict === district ? 'white' : C.textSecondary,
                    fontSize: '14px', cursor: 'pointer',
                    fontWeight: selectedDistrict === district ? 500 : 400,
                    transition: 'all 0.15s'
                  }}
                  onClick={() => { setSelectedDistrict(district); setShowDistrictPanel(false); showToast(`已切换到${district}`); }}
                >
                  {district}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Layer selection panel */}
      {showLayerPanel && (
        <div
          style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.42)' }}
          onClick={() => setShowLayerPanel(false)}
        >
          <div
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: C.white, borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
              padding: '20px 16px 40px'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: C.border }} />
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: C.textPrimary, textAlign: 'center', marginBottom: '20px' }}>
              切换地图图层
            </div>
            {(['标准地图', '卫星地图', '热力图'] as MapLayer[]).map(layer => (
              <button
                key={layer}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: '10px',
                  border: mapLayer === layer ? `1.5px solid ${C.primary}` : `1.5px solid ${C.border}`,
                  background: mapLayer === layer ? '#EAF8F4' : C.white,
                  color: mapLayer === layer ? C.primary : C.textPrimary,
                  fontSize: '15px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: '10px'
                }}
                onClick={() => { setMapLayer(layer); setShowLayerPanel(false); }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: mapLayer === layer ? `rgba(0,179,138,0.12)` : C.border,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {layer === '标准地图' && <svg width="16" height="16" viewBox="0 0 24 24" fill={mapLayer === layer ? C.primary : C.textSecondary}><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" /></svg>}
                    {layer === '卫星地图' && <svg width="16" height="16" viewBox="0 0 24 24" fill={mapLayer === layer ? C.primary : C.textSecondary}><path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm-1 16.93V18c0-.55-.45-1-1-1H8v-2c0-.55-.45-1-1-1H5.07C5.57 10.19 8.54 7.5 12 7.5c1.64 0 3.15.57 4.35 1.5L15 10.35c-.26.26-.35.63-.24.98l.76 2.27c.11.35.43.58.79.58h1.19c.14 1.09-.06 2.08-.5 2.82z" /></svg>}
                    {layer === '热力图' && <svg width="16" height="16" viewBox="0 0 24 24" fill={mapLayer === layer ? C.primary : C.textSecondary}><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" /></svg>}
                  </div>
                  <span>{layer}</span>
                </div>
                {mapLayer === layer && <IconCheck />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Exit confirm dialog */}
      {showExitConfirm && (
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 50,
            background: 'rgba(0,0,0,0.48)', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}
          onClick={() => setShowExitConfirm(false)}
        >
          <div
            style={{
              background: C.white, borderRadius: '16px',
              padding: '28px 24px 20px', margin: '0 32px',
              width: 'calc(100% - 64px)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Icon */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: '#FEF0F0', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill={C.warning}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '17px', fontWeight: 600, color: C.textPrimary, marginBottom: '8px' }}>
              退出小程序
            </div>
            <div style={{ textAlign: 'center', fontSize: '14px', color: C.textSecondary, marginBottom: '24px' }}>
              确定退出深钓鱼小程序？
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{
                  flex: 1, padding: '12px 0', borderRadius: '8px',
                  border: `1px solid ${C.border}`, background: C.white,
                  color: C.textSecondary, fontSize: '15px', cursor: 'pointer'
                }}
                onClick={() => setShowExitConfirm(false)}
              >取消</button>
              <button
                style={{
                  flex: 1, padding: '12px 0', borderRadius: '8px',
                  border: 'none', background: C.warning,
                  color: 'white', fontSize: '15px', fontWeight: 500, cursor: 'pointer'
                }}
                onClick={() => { setShowExitConfirm(false); showToast('已退出小程序'); }}
              >确定退出</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 60, pointerEvents: 'none'
        }}>
          <div style={{
            background: 'rgba(31,45,61,0.88)', color: 'white',
            padding: '10px 20px', borderRadius: '8px',
            fontSize: '14px', whiteSpace: 'nowrap',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(8px)'
          }}>
            {toast}
          </div>
        </div>
      )}
    </>
  );
}