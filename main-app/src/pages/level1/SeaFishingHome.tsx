import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMainLayoutChrome } from "../../context/MainLayoutChromeContext";

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
      <div style={{ background: bgGradient, padding: "14px 16px 0", position: "relative" }}>
        {!isWarning && (
          <>
            <div style={{
              position: "absolute", top: 14, right: 52, opacity: 0.25,
              width: 48, height: 20,
              background: "#fff", borderRadius: 20,
            }} />
            <div style={{
              position: "absolute", top: 28, right: 20, opacity: 0.18,
              width: 36, height: 15,
              background: "#fff", borderRadius: 15,
            }} />
          </>
        )}
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
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" fill="rgba(255,255,255,0.9)" />
                <circle cx="6" cy="5" r="2" fill="rgba(47,128,237,0.8)" />
              </svg>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>深圳近海</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.15)", padding: "1px 6px", borderRadius: 8 }}>实时</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
              <span style={{ fontSize: 44, fontWeight: 700, color: "#fff", lineHeight: 1, letterSpacing: -2 }}>
                26°
              </span>
              <div style={{ marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
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
        <svg viewBox="0 0 402 18" width="100%" height="18" style={{ display: "block", marginTop: 10 }} preserveAspectRatio="none">
          <path d="M0 18 Q50 4 100 12 Q150 20 200 10 Q250 2 300 14 Q350 22 402 8 L402 18 Z" fill={isWarning ? "rgba(245,108,108,0.08)" : "#F7FBFF"} />
        </svg>
      </div>
      <div style={{ background: isWarning ? "rgba(255,240,240,0.98)" : "#F7FBFF", padding: "10px 0 0" }}>
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

// ─── Boat Trip Card ────────────────────────────────────────────────────────────
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
      }}
    >
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
      <div style={{ width: "100%", height: 160, overflow: "hidden" }}>
        <img
          src={post.image}
          alt="渔获"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
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

// ─── Post Detail View (Inline) ──────────────────────────────────────────────
const IMG_FISH = "https://images.unsplash.com/photo-1667316720967-2636910deb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwb2NlYW4lMjBzZWElMjB0dW5hJTIwY2F0Y2h8ZW58MXx8fHwxNzc1MzA5NjkyfDA&ixlib=rb-4.1.0&q=80&w=800";
const IMG_BOAT = "https://images.unsplash.com/photo-1664546046715-e039cfce393a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWElMjBmaXNoaW5nJTIwYm9hdCUyMGzdW5pc2V8ZW58MXx8fHwxNzc1MzA5NjkyfDA&ixlib=rb-4.1.0&q=80&w=800";

interface PostDetailViewProps {
  post: (typeof FORUM_POSTS)[0] | null;
  visible: boolean;
  onClose: () => void;
}

function PostDetailView({ post, visible, onClose }: PostDetailViewProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(23);
  const [commentText, setCommentText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  if (!post) return null;

  const handleLike = () => {
    setLiked(v => !v);
    setLikeCount(v => liked ? v - 1 : v + 1);
  };

  const handleSend = () => {
    if (!commentText.trim()) return;
    setCommentText("");
  };

  const comments = [
    { id: 1, name: "海浪钓客", color: "#409EFF", time: "1小时前", content: "太厉害了！金枪鱼连竿，光是想想就热血沸腾！", replies: [] },
    { id: 2, name: "珠海渔达人", color: "#E6A23C", time: "45分钟前", content: "南澳这个点我知道！去年在那里也钓过大货。", replies: [] },
    { id: 3, name: "小白钓手", color: "#F56C6C", time: "20分钟前", content: "能问一下出海一天大概费用是多少？", replies: [] },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        background: "#F5F7FA",
        display: "flex",
        flexDirection: "column",
        transform: visible ? "translateX(0)" : "translateX(100%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.25s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Navigation Bar */}
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: "#fff", borderBottom: "1px solid #E4E7ED", flexShrink: 0 }}>
        <button onClick={onClose} style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", borderRadius: 8 }}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9L9 17" stroke="#1F2D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span style={{ fontSize: 18, fontWeight: 500, color: "#303133", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>帖子详情</span>
        <button onClick={() => {}} style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", borderRadius: 8 }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="5.5" r="1.5" fill="#606266" />
            <circle cx="11" cy="11" r="1.5" fill="#606266" />
            <circle cx="11" cy="16.5" r="1.5" fill="#606266" />
          </svg>
        </button>
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "8px 12px 8px" }} className="post-detail-scroll">
        {/* Post Card */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{post.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#303133" }}>{post.username}</div>
              <div style={{ fontSize: 12, color: "#909399" }}>{post.time}</div>
            </div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#303133", marginBottom: 8, lineHeight: 1.4 }}>今天南澳爆箱！金枪鱼群来了 🎣</div>
          <div style={{ fontSize: 14, color: "#606266", lineHeight: 1.6, marginBottom: 10 }}>
            {post.content} 早上6点从南澳码头出发，顺着洋流走了大概20公里，鱼探仪突然显示巨大鱼群！连竿了足足两个小时，钓了十几条蓝鳍金枪鱼，最大一条估计有18公斤！强烈推荐大家趁这两天天气窗口来！🐟🐟
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
            {["#南澳海钓", "#金枪鱼", "#爆箱", "#广东钓鱼"].map(tag => (
              <span key={tag} style={{ fontSize: 12, color: PRIMARY, background: "rgba(0,179,138,0.08)", borderRadius: 4, padding: "2px 6px" }}>{tag}</span>
            ))}
          </div>
          <div style={{ overflowX: "auto", display: "flex", gap: 8, paddingBottom: 2, marginBottom: 12 }} className="hide-scrollbar">
            {[IMG_FISH, IMG_BOAT].map((src, i) => (
              <div key={i} style={{ flexShrink: 0, width: 180, height: 120, borderRadius: 8, overflow: "hidden", background: "#E4E7ED" }}>
                <img src={src} alt={`图${i+1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 0, borderTop: "1px solid #E4E7ED", paddingTop: 10 }}>
            <button onClick={handleLike} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: liked ? WARNING : "#606266", fontSize: 14, padding: "4px 0" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 15.5S2 11.2 2 6.5C2 4.5 3.5 3 5.5 3c1.1 0 2.1.55 2.7 1.4L9 5.5l.8-1.1C10.4 3.55 11.4 3 12.5 3 14.5 3 16 4.5 16 6.5c0 4.7-7 9-7 9z" stroke={liked ? WARNING : "#606266"} strokeWidth="1.5" strokeLinejoin="round" fill={liked ? WARNING : "none"} />
              </svg>
              <span style={{ fontWeight: liked ? 500 : 400 }}>{likeCount}</span>
            </button>
            <button onClick={() => inputRef.current?.focus()} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: "#606266", fontSize: 14, padding: "4px 0" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15 2H3a1 1 0 00-1 1v9a1 1 0 001 1h2v3l4-3h6a1 1 0 001-1V3a1 1 0 00-1-1z" stroke="#606266" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              <span>8</span>
            </button>
            <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: "#606266", fontSize: 14, padding: "4px 0" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="14" cy="4" r="2" stroke="#606266" strokeWidth="1.5"/><circle cx="4" cy="9" r="2" stroke="#606266" strokeWidth="1.5"/><circle cx="14" cy="14" r="2" stroke="#606266" strokeWidth="1.5"/><path d="M6 8L12 5M6 10L12 13" stroke="#606266" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span>分享</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div style={{ fontSize: 14, fontWeight: 500, color: "#606266", marginTop: 12, marginBottom: 4, paddingLeft: 2 }}>全部评论（8）</div>
        <div style={{ background: "#fff", borderRadius: 12, padding: "0 12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 8 }}>
          {comments.map(c => (
            <div key={c.id} style={{ padding: "10px 0", borderBottom: c.id !== comments[comments.length - 1].id ? "1px solid #E4E7ED" : "none" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontSize: 13 }}>{c.name[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#303133" }}>{c.name}</span>
                    <span style={{ fontSize: 12, color: "#909399" }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 14, color: "#606266", lineHeight: 1.55, marginBottom: 6 }}>{c.content}</div>
                  <button style={{ fontSize: 12, color: "#909399", background: "none", border: "none", cursor: "pointer", padding: 0 }}>回复</button>
                </div>
              </div>
            </div>
          ))}
          <div style={{ textAlign: "center", padding: "10px 0", fontSize: 12, color: "#909399" }}>— 共 8 条评论，已显示 3 条 —</div>
        </div>
      </div>

      {/* Bottom Input */}
      <div style={{ height: 56, flexShrink: 0, borderTop: "1px solid #E4E7ED", background: "#fff", display: "flex", alignItems: "center", padding: "0 12px", gap: 8 }}>
        <div style={{ flex: 1, height: 36, borderRadius: 18, background: "#F5F7FA", border: "1px solid #E4E7ED", display: "flex", alignItems: "center", padding: "0 12px" }}>
          <input ref={inputRef} value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder="写下你的评论..." style={{ width: "100%", background: "none", border: "none", outline: "none", fontSize: 14, color: "#303133" }} />
        </div>
        <button onClick={handleSend} style={{ flexShrink: 0, padding: "0 14px", height: 36, borderRadius: 8, border: "none", background: commentText.trim() ? PRIMARY : "#E4E7ED", color: commentText.trim() ? "#fff" : "#909399", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>发送</button>
      </div>

      <style>{`
        .post-detail-scroll::-webkit-scrollbar { width: 2px; }
        .post-detail-scroll::-webkit-scrollbar-track { background: transparent; }
        .post-detail-scroll::-webkit-scrollbar-thumb { background: #E4E7ED; border-radius: 2px; }
      `}</style>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "fixed",
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

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function SeaFishingHome() {
  const navigate = useNavigate();
  const { setHideTabBar } = useMainLayoutChrome();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"boats" | "forum">("boats");
  const [isWarning] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [selectedPost, setSelectedPost] = useState<(typeof FORUM_POSTS)[0] | null>(null);
  const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);
  const [savedScrollY, setSavedScrollY] = useState(0);

  const showToast = (msg: string) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2000);
  };

  // 页面跳转函数
  const goToBoatDetail = () => navigate('/level2/boat-detail');

  const openPostDetail = (post: (typeof FORUM_POSTS)[0]) => {
    setSavedScrollY(scrollContainerRef.current?.scrollTop ?? 0);
    setSelectedPost(post);
    setIsPostDetailOpen(true);
    window.history.pushState({ postDetail: true }, "");
  };

  const closePostDetail = () => {
    setIsPostDetailOpen(false);
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = savedScrollY;
      }
      setSelectedPost(null);
    }, 50);
    if (window.history.state?.postDetail) {
      window.history.back();
    }
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (isPostDetailOpen && !e.state?.postDetail) {
        closePostDetail();
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isPostDetailOpen]);

  useEffect(() => {
    setHideTabBar(isPostDetailOpen);
    return () => setHideTabBar(false);
  }, [isPostDetailOpen, setHideTabBar]);

  return (
    <div style={{ flex: 1, position: "relative", width: "100%", height: "100%" }}>
      {/* ── Scrollable Content ── */}
      <div
        ref={scrollContainerRef}
        style={{
          width: "100%",
          height: "100%",
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
                  onDetail={goToBoatDetail}
                />
              ))}
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
                  onTap={() => openPostDetail(post)}
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

      {/* ── Post Detail View (Inline Overlay) ── */}
      <PostDetailView
        post={selectedPost}
        visible={isPostDetailOpen}
        onClose={closePostDetail}
      />

      {/* ── Toast ── */}
      <Toast message={toast.message} visible={toast.visible} />

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
