import { useState } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────
const PRIMARY = "#00B38A";
const WARNING = "#F56C6C";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const BOAT_TRIPS = [
  {
    id: 1,
    name: "深海猎人号",
    targetFish: "金枪鱼、鱿鱼",
    targetArea: "三门岛外海",
    harbor: "南澳渔港",
    departTime: "05-18 06:00",
    returnTime: "18:00",
    joined: 4,
    minRequired: 6,
    deposit: 120,
    balance: 380,
  },
  {
    id: 2,
    name: "蓝鲸探钓号",
    targetFish: "马鲛鱼、石斑鱼",
    targetArea: "大辣甲沉船区",
    harbor: "盐田渔港",
    departTime: "05-19 05:30",
    returnTime: "17:30",
    joined: 5,
    minRequired: 8,
    deposit: 150,
    balance: 480,
  },
  {
    id: 3,
    name: "海王星号",
    targetFish: "大眼金枪、旗鱼",
    targetArea: "三门岛外海油井",
    harbor: "大鹏渔港",
    departTime: "05-20 06:30",
    returnTime: "19:00",
    joined: 2,
    minRequired: 6,
    deposit: 100,
    balance: 420,
  },
  {
    id: 4,
    name: "浪里白条号",
    targetFish: "鲷鱼、带鱼",
    targetArea: "担杆列岛",
    harbor: "南澳渔港",
    departTime: "05-21 07:00",
    returnTime: "18:30",
    joined: 6,
    minRequired: 6,
    deposit: 130,
    balance: 320,
  },
];

const FORUM_POSTS = [
  {
    id: 1,
    avatar: "🎣",
    username: "海上老司机",
    time: "2小时前",
    image:
      "https://images.unsplash.com/photo-1766998112674-42ff3abd609d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    content: "今天南澳爆箱！金枪鱼群来了，连竿不断，最大的有40斤！大家赶紧约！",
    likes: 128,
    comments: 34,
  },
  {
    id: 2,
    avatar: "🐟",
    username: "钓鱼达人小王",
    time: "5小时前",
    image:
      "https://images.unsplash.com/photo-1771056547690-251aa5185c93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    content: "大鹏湾鱿鱼季开始了，昨晚出海收获满满，带了两桶回来。渔获分享~",
    likes: 76,
    comments: 18,
  },
  {
    id: 3,
    avatar: "⚓",
    username: "蓝海探钓者",
    time: "8小时前",
    image:
      "https://images.unsplash.com/photo-1768154460635-3660206eccb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    content: "清晨五点出发，盐田港日出太美了。马鲛鱼没咬，但风景值回票价！",
    likes: 210,
    comments: 52,
  },
  {
    id: 4,
    avatar: "🦈",
    username: "深水炸弹",
    time: "1天前",
    image:
      "https://images.unsplash.com/photo-1761393296187-ca24a3490182?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    content: "周末深海船钓总结：旗鱼1条、大眼金枪2条，船友们配合默契，下次继续！",
    likes: 165,
    comments: 41,
  },
];

// ─── iOS Status Bar ───────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div
      style={{ height: 44, zIndex: 50 }}
      className="flex items-center justify-between px-4 bg-transparent"
    >
      {/* Time */}
      <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", letterSpacing: 0.3 }}>
        9:41
      </span>

      {/* Center: Signal + WiFi */}
      <div className="flex items-center gap-1">
        {/* Cellular bars */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.8" fill="#1a1a1a" />
          <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.8" fill="#1a1a1a" />
          <rect x="9" y="2" width="3" height="10" rx="0.8" fill="#1a1a1a" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="#1a1a1a" opacity="0.35" />
        </svg>
        {/* WiFi icon */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="#1a1a1a" />
          <path
            d="M4.5 7.2A4.9 4.9 0 0 1 8 5.8a4.9 4.9 0 0 1 3.5 1.4"
            stroke="#1a1a1a"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1.5 4.5A8.1 8.1 0 0 1 8 2a8.1 8.1 0 0 1 6.5 2.5"
            stroke="#1a1a1a"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Battery */}
      <div className="flex items-center gap-1">
        <div
          style={{
            width: 27,
            height: 13,
            border: "1.5px solid #1a1a1a",
            borderRadius: 3,
            padding: "1.5px",
            position: "relative",
          }}
        >
          <div style={{ width: "78%", height: "100%", background: "#1a1a1a", borderRadius: 1 }} />
          <div
            style={{
              position: "absolute",
              right: -5,
              top: "50%",
              transform: "translateY(-50%)",
              width: 3,
              height: 6,
              background: "#1a1a1a",
              borderRadius: "0 1px 1px 0",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Weather Card ─────────────────────────────────────────────────────────────
interface WeatherCardProps {
  isWarning: boolean;
  onRefresh: () => void;
}
function WeatherCard({ isWarning, onRefresh }: WeatherCardProps) {
  const bgGradient = isWarning
    ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
    : "linear-gradient(135deg, #56CCF2 0%, #2F80ED 60%, #1a6fc4 100%)";

  return (
    <div
      style={{
        margin: "8px 16px 0",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        position: "relative",
        border: isWarning ? `1.5px solid ${WARNING}` : "none",
      }}
    >
      {/* Background gradient sky */}
      <div style={{ background: bgGradient, padding: "14px 16px 0", position: "relative" }}>

        {/* Decorative clouds */}
        {!isWarning && (
          <>
            {/* Cloud 1 */}
            <div style={{
              position: "absolute", top: 14, right: 52, opacity: 0.25,
              width: 48, height: 20,
              background: "#fff", borderRadius: 20,
            }} />
            
            {/* Cloud 2 */}
            <div style={{
              position: "absolute", top: 28, right: 20, opacity: 0.18,
              width: 36, height: 15,
              background: "#fff", borderRadius: 15,
            }} />
          </>
        )}

        {/* Sun decoration */}
        {!isWarning && (
          <div style={{ position: "absolute", top: -8, right: -8, opacity: 0.22 }}>
            
          </div>
        )}

        {/* Rain decoration */}
        {isWarning && (
          <div style={{ position: "absolute", top: 4, right: 12, opacity: 0.3 }}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <ellipse cx="28" cy="20" rx="18" ry="12" fill="#fff" />
              <ellipse cx="18" cy="24" rx="12" ry="9" fill="#fff" />
              <ellipse cx="38" cy="22" rx="14" ry="10" fill="#fff" />
              {[16,24,32,40].map((x, i) => (
                <line key={x} x1={x} y1={38 + i * 1} x2={x - 4} y2={50 + i} stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              ))}
            </svg>
          </div>
        )}

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          {/* Left: location + weather + temp */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" fill="rgba(255,255,255,0.9)" />
                <circle cx="6" cy="5" r="2" fill="rgba(47,128,237,0.8)" />
              </svg>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>深圳近海</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.15)", padding: "1px 6px", borderRadius: 8 }}>实时</span>
            </div>

            {/* Temperature + condition */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
              <span style={{ fontSize: 44, fontWeight: 700, color: "#fff", lineHeight: 1, letterSpacing: -2 }}>
                26°
              </span>
              <div style={{ marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {/* Weather icon */}
                  {!isWarning ? (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="5" fill="#FFE066" />
                      {[0,60,120,180,240,300].map((deg) => (
                        <line key={deg}
                          x1={10 + 6.5 * Math.cos((deg * Math.PI) / 180)}
                          y1={10 + 6.5 * Math.sin((deg * Math.PI) / 180)}
                          x2={10 + 8.5 * Math.cos((deg * Math.PI) / 180)}
                          y2={10 + 8.5 * Math.sin((deg * Math.PI) / 180)}
                          stroke="#FFE066" strokeWidth="2" strokeLinecap="round"
                        />
                      ))}
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <ellipse cx="10" cy="8" rx="6" ry="4" fill="rgba(255,255,255,0.8)" />
                      <ellipse cx="7" cy="10" rx="4" ry="3" fill="rgba(255,255,255,0.7)" />
                      {[6,10,14].map((x) => (
                        <line key={x} x1={x} y1={14} x2={x - 2} y2={18} stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
                      ))}
                    </svg>
                  )}
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>
                    {isWarning ? "暴雨" : "晴"}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
                  体感 24° · 湿度 72%
                </div>
              </div>
            </div>
          </div>

          {/* Right: refresh */}
          <button
            onClick={onRefresh}
            style={{ padding: 6, borderRadius: 8, border: "none", background: "rgba(255,255,255,0.2)", cursor: "pointer", backdropFilter: "blur(4px)", marginTop: 2 }}
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M3 9a6 6 0 1 0 1-3.3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 4.5V9H7.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Wave separator */}
        <svg viewBox="0 0 402 18" width="100%" height="18" style={{ display: "block", marginTop: 10 }} preserveAspectRatio="none">
          <path d="M0 18 Q50 4 100 12 Q150 20 200 10 Q250 2 300 14 Q350 22 402 8 L402 18 Z" fill={isWarning ? "rgba(245,108,108,0.08)" : "#F7FBFF"} />
        </svg>
      </div>

      {/* Bottom: metrics on white bg */}
      <div style={{ background: isWarning ? "rgba(255,240,240,0.98)" : "#F7FBFF", padding: "10px 0 0" }}>
        {/* Metric row */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {[
            { icon: "💨", label: "风力", value: "4-5级" },
            { icon: "🌊", label: "浪高", value: "0.8m" },
            { icon: "🌙", label: "潮汐", value: "涨潮 10:30" },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRight: i < 2 ? "1px solid #E8EDF2" : "none",
                padding: "0 8px 10px",
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 11, color: "#92A0B0", marginTop: 2 }}>{item.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#2C3E50", marginTop: 2 }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Footer status bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "8px 16px",
            background: isWarning ? "rgba(245,108,108,0.1)" : `${PRIMARY}12`,
            borderTop: `1px solid ${isWarning ? "rgba(245,108,108,0.2)" : `${PRIMARY}22`}`,
          }}
        >
          
          <span style={{
            fontSize: 12,
            fontWeight: 600,
            color: isWarning ? WARNING : PRIMARY,
          }}>
            {isWarning ? "当前风力/浪高超标，出海请谨慎" : "天气良好，适宜出海"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Tab Switcher ─────────────────────────────────────────────────────────────
interface TabSwitcherProps {
  active: "boats" | "forum";
  onChange: (tab: "boats" | "forum") => void;
}
function TabSwitcher({ active, onChange }: TabSwitcherProps) {
  return (
    <div
      style={{
        height: 44,
        display: "flex",
        alignItems: "stretch",
        margin: "8px 16px 0",
        background: "#F5F5F5",
        borderRadius: 10,
        padding: 3,
      }}
    >
      {(["boats", "forum"] as const).map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            style={{
              flex: 1,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? PRIMARY : "#888",
              background: isActive ? "#fff" : "transparent",
              boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            {tab === "boats" ? "⛵ 船班" : "💬 论坛"}
          </button>
        );
      })}
    </div>
  );
}

// ─── Boat Trip Card ──────────────────────────────��────────────────────────────
interface BoatCardProps {
  trip: (typeof BOAT_TRIPS)[0];
  isWarning: boolean;
  onDetail: () => void;
}
function BoatCard({ trip, isWarning, onDetail }: BoatCardProps) {
  const progress = Math.min(trip.joined / trip.minRequired, 1);
  const isFull = trip.joined >= trip.minRequired;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 16,
        margin: "0 16px 12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        border: "1px solid #F0F0F0",
        opacity: isWarning ? 0.55 : 1,
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between" style={{ marginBottom: 8 }}>
        <div>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a" }}>{trip.name}</span>
            {isFull && (
              <span
                style={{
                  fontSize: 11,
                  background: `${PRIMARY}20`,
                  color: PRIMARY,
                  padding: "1px 6px",
                  borderRadius: 4,
                  fontWeight: 600,
                }}
              >
                已成行
              </span>
            )}
          </div>
          <div className="flex items-center gap-1" style={{ marginTop: 3 }}>
            <span style={{ fontSize: 12 }}>🎯</span>
            <span style={{ fontSize: 12, color: "#666" }}>{trip.targetFish}</span>
          </div>
        </div>
        {/* Price block */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
            <span style={{ fontSize: 11, color: "#999" }}>定金</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: WARNING }}>¥{trip.deposit}</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
            <span style={{ fontSize: 11, color: "#999" }}>尾款</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>¥{trip.balance}</span>
          </div>
          <div style={{ fontSize: 10, color: "#BBB" }}>合计 ¥{trip.deposit + trip.balance}</div>
        </div>
      </div>

      {/* Info row — harbor + area + time */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 0", marginBottom: 10 }}>
        <div className="flex items-center gap-1" style={{ marginRight: 10 }}>
          <span style={{ fontSize: 12 }}>📍</span>
          <span style={{ fontSize: 12, color: "#666" }}>{trip.harbor}</span>
        </div>
        <div style={{ width: 1, height: 14, background: "#E0E0E0", alignSelf: "center", marginRight: 10 }} />
        <div className="flex items-center gap-1" style={{ marginRight: 10 }}>
          <span style={{ fontSize: 12 }}>🗺️</span>
          <span style={{ fontSize: 12, color: PRIMARY, fontWeight: 500 }}>{trip.targetArea}</span>
        </div>
        <div style={{ width: 1, height: 14, background: "#E0E0E0", alignSelf: "center", marginRight: 10 }} />
        <div className="flex items-center gap-1">
          <span style={{ fontSize: 12 }}>🕕</span>
          <span style={{ fontSize: 12, color: "#666" }}>
            {trip.departTime} — {trip.returnTime}
          </span>
        </div>
      </div>

      {/* Progress row */}
      <div style={{ marginBottom: 12 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 5 }}>
          <span style={{ fontSize: 12, color: "#666" }}>
            已拼 <span style={{ color: PRIMARY, fontWeight: 600 }}>{trip.joined}</span> 人 / 最低成行{" "}
            <span style={{ fontWeight: 600 }}>{trip.minRequired}</span> 人
          </span>
          <span style={{ fontSize: 12, color: isFull ? PRIMARY : "#F5A623", fontWeight: 600 }}>
            {isFull ? "✓ 已成行" : `还差${trip.minRequired - trip.joined}人`}
          </span>
        </div>
        <div
          style={{
            height: 6,
            background: "#F0F0F0",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: isFull ? PRIMARY : `linear-gradient(90deg, ${PRIMARY}99, ${PRIMARY})`,
              borderRadius: 3,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Action row */}
      <div className="flex justify-end">
        <button
          onClick={isWarning ? undefined : onDetail}
          style={{
            padding: "7px 16px",
            borderRadius: 8,
            border: `1.5px solid ${isWarning ? "#CCC" : PRIMARY}`,
            background: "transparent",
            color: isWarning ? "#BBB" : PRIMARY,
            fontSize: 13,
            fontWeight: 600,
            cursor: isWarning ? "not-allowed" : "pointer",
          }}
        >
          查看详情
        </button>
      </div>
    </div>
  );
}

// ─── Forum Card ───────────────────────────────────────────────────────────────
interface ForumCardProps {
  post: (typeof FORUM_POSTS)[0];
  onTap: () => void;
}
function ForumCard({ post, onTap }: ForumCardProps) {
  return (
    <div
      onClick={onTap}
      style={{
        background: "#fff",
        borderRadius: 12,
        margin: "0 16px 12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        border: "1px solid #F0F0F0",
        overflow: "hidden",
        cursor: "pointer",
        active: { opacity: 0.9 },
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3" style={{ padding: "12px 16px 8px" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: `${PRIMARY}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {post.avatar}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{post.username}</div>
          <div style={{ fontSize: 12, color: "#999", marginTop: 1 }}>{post.time}</div>
        </div>
      </div>

      {/* Image */}
      <div style={{ width: "100%", height: 160, overflow: "hidden" }}>
        <img
          src={post.image}
          alt="渔获"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "10px 16px 12px" }}>
        <p style={{ fontSize: 14, color: "#333", lineHeight: 1.6, margin: 0, marginBottom: 10 }}>
          {post.content}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2.5C8 2.5 2 6.5 2 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0C14 6.5 8 2.5 8 2.5z"
                stroke="#F56C6C"
                strokeWidth="1.3"
                fill="none"
              />
            </svg>
            <span style={{ fontSize: 13, color: "#888" }}>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5l-3 2V3z"
                stroke="#999"
                strokeWidth="1.3"
                fill="none"
              />
            </svg>
            <span style={{ fontSize: 13, color: "#888" }}>{post.comments}</span>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <span style={{ fontSize: 12, color: PRIMARY }}>查看详情 →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Tab Bar ───────────────────────────────────────────────────────────
const TABS = [
  {
    id: "shore",
    label: "岸钓",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 20c3-4 6-6 9-6s6 2 9 6"
          stroke={active ? PRIMARY : "#BDBDBD"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 14V6"
          stroke={active ? PRIMARY : "#BDBDBD"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 6c0-2 3-3 3-3"
          stroke={active ? PRIMARY : "#BDBDBD"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="11" r="1.5" fill={active ? PRIMARY : "#BDBDBD"} />
      </svg>
    ),
  },
  {
    id: "sea",
    label: "海钓",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 14c2-1 4-1.5 5-1 0 0 2-6 8-7-2 3-2 6-1 7 1.5 0 3.5-.5 5 1-2 1-4 1.5-6 1.5C11 18 9 19 7 18c-1.5-.5-2.5-2-4-4z"
          stroke={active ? PRIMARY : "#BDBDBD"}
          strokeWidth="1.5"
          fill={active ? `${PRIMARY}20` : "none"}
          strokeLinejoin="round"
        />
        <path
          d="M3 19c4-2 10-2 14 0"
          stroke={active ? PRIMARY : "#BDBDBD"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "publish",
    label: "发布",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="9"
          fill={active ? PRIMARY : "#BDBDBD"}
        />
        <path
          d="M12 8v8M8 12h8"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "mine",
    label: "我的",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="8"
          r="3.5"
          stroke={active ? PRIMARY : "#BDBDBD"}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke={active ? PRIMARY : "#BDBDBD"}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
];

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? 0 : 10}px)`,
        background: "rgba(0,0,0,0.72)",
        color: "#fff",
        padding: "9px 20px",
        borderRadius: 22,
        fontSize: 13,
        whiteSpace: "nowrap",
        opacity: visible ? 1 : 0,
        transition: "all 0.25s ease",
        pointerEvents: "none",
        zIndex: 999,
      }}
    >
      {message}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<"boats" | "forum">("boats");
  const [activeNavTab, setActiveNavTab] = useState("sea");
  const [isWarning] = useState(false); // Set to true to test warning state
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = (msg: string) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#E8E8E8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      {/* Phone frame — no shell, just the screen */}
      <div
        style={{
          width: 402,
          height: 874,
          background: "#F5F6F8",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
          borderRadius: 0,
        }}
      >
        {/* ── Status Bar ── */}
        <StatusBar />

        {/* ── Scrollable Content ── */}
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 0,
            right: 0,
            bottom: 83,
            overflowY: "auto",
            overflowX: "hidden",
          }}
          className="hide-scrollbar"
        >
          {/* Decorative header gradient */}
          <div
            style={{
              height: 90,
              background: `linear-gradient(160deg, ${PRIMARY} 0%, #00C99B 100%)`,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 0,
            }}
          />

          {/* Page header */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "12px 16px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>🌊 海钓频道</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>
                发现更多深海钓点
              </div>
            </div>
            <button
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: 20,
                padding: "6px 12px",
                cursor: "pointer",
                color: "#fff",
                fontSize: 12,
                backdropFilter: "blur(4px)",
              }}
              onClick={() => showToast("搜索功能开发中")}
            >
              🔍 搜索
            </button>
          </div>

          {/* Weather Card */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <WeatherCard
              isWarning={isWarning}
              onRefresh={() => showToast("刷新气象数据")}
            />
          </div>

          {/* Fusing warning banner */}
          {isWarning && (
            <div
              style={{
                margin: "8px 16px 0",
                background: "#FFF0F0",
                border: `1px solid ${WARNING}`,
                borderRadius: 8,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                position: "relative",
                zIndex: 1,
              }}
            >
              <span>❌</span>
              <span style={{ fontSize: 13, color: WARNING, fontWeight: 500 }}>
                因天气原因，出海发单已暂停
              </span>
            </div>
          )}

          {/* Tab Switcher */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <TabSwitcher active={activeTab} onChange={setActiveTab} />
          </div>

          {/* Content */}
          <div style={{ paddingTop: 8, paddingBottom: 16, position: "relative", zIndex: 1 }}>
            {activeTab === "boats" ? (
              <>
                {BOAT_TRIPS.map((trip) => (
                  <BoatCard
                    key={trip.id}
                    trip={trip}
                    isWarning={isWarning}
                    onDetail={() => showToast("进入船班详情")}
                  />
                ))}
                {/* Load more */}
                <div
                  style={{
                    textAlign: "center",
                    padding: "8px 0 4px",
                    color: "#BBB",
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: "spin 1.5s linear infinite" }}>
                    <path d="M7 1v3M7 10v3M1 7h3M10 7h3M2.6 2.6l2.1 2.1M9.3 9.3l2.1 2.1M2.6 11.4l2.1-2.1M9.3 4.7l2.1-2.1" stroke="#BBB" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  更多船班加载中
                </div>
              </>
            ) : (
              <>
                {FORUM_POSTS.map((post) => (
                  <ForumCard
                    key={post.id}
                    post={post}
                    onTap={() => showToast("查看帖子详情")}
                  />
                ))}
                <div
                  style={{
                    textAlign: "center",
                    padding: "8px 0 4px",
                    color: "#BBB",
                    fontSize: 13,
                  }}
                >
                  已显示全部内容
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Bottom Tab Bar ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 83,
            background: "#fff",
            borderTop: "1px solid #EBEBEB",
            display: "flex",
            alignItems: "flex-start",
            paddingTop: 8,
            boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
            zIndex: 100,
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeNavTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id !== "sea") {
                    showToast(`切换到${tab.label}页面`);
                  }
                  setActiveNavTab(tab.id);
                }}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: "4px 0",
                }}
              >
                {tab.icon(isActive)}
                <span
                  style={{
                    fontSize: 10,
                    color: isActive ? PRIMARY : "#BDBDBD",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Toast ── */}
        <Toast message={toast.message} visible={toast.visible} />
      </div>

      {/* Spinning animation + scrollbar hide */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: transparent;
          border-radius: 2px;
        }
        .hide-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(0,179,138,0.25);
        }
        .hide-scrollbar {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}