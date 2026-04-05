import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import StatusBar from "../../components/StatusBar";

const PRIMARY = "#00B38A";

// ─── Toast ──────────────────────────────────────────────────────────────────
function ToastMessage({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(0,0,0,0.72)",
        color: "#fff",
        padding: "10px 22px",
        borderRadius: 10,
        fontSize: 14,
        zIndex: 200,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.28s",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        letterSpacing: 0.3,
      }}
    >
      {message}
    </div>
  );
}

function useToast() {
  const [toast, setToast] = useState({ visible: false, message: "" });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = useCallback((message: string) => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ visible: true, message });
    timer.current = setTimeout(() => setToast({ visible: false, message: "" }), 1800);
  }, []);
  return { toast, showToast };
}

// ─── Navigation Bar ──────────────────────────────────────────────────────────
function NavBar({ onBack, onMenuAction }: { onBack: () => void; onMenuAction: (action: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuAction = (action: string) => {
    setMenuOpen(false);
    onMenuAction(action);
  };

  return (
    <div
      style={{
        height: 44,
        background: "#fff",
        borderBottom: "1px solid #F2F2F2",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 4px",
        flexShrink: 0,
        position: "relative",
        zIndex: 50,
      }}
    >
      <button
        onClick={onBack}
        style={{
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
          <path d="M9 1L1 9L9 17" stroke="#1F2D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <span style={{ fontSize: 18, fontWeight: 500, color: "#1F2D3D", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
        钓点详情
      </span>

      {/* Three-dot button + dropdown */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {/* Vertical three dots */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="4.5" r="1.6" fill="#1F2D3D" />
            <circle cx="10" cy="10" r="1.6" fill="#1F2D3D" />
            <circle cx="10" cy="15.5" r="1.6" fill="#1F2D3D" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <>
            {/* Backdrop to close */}
            <div
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 90,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 46,
                right: 8,
                background: "#fff",
                borderRadius: 10,
                boxShadow: "0 6px 24px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.07)",
                overflow: "hidden",
                minWidth: 130,
                zIndex: 100,
              }}
            >
              {/* Arrow tip */}
              <div
                style={{
                  position: "absolute",
                  top: -7,
                  right: 14,
                  width: 14,
                  height: 14,
                  background: "#fff",
                  transform: "rotate(45deg)",
                  boxShadow: "-2px -2px 5px rgba(0,0,0,0.05)",
                  borderRadius: 2,
                }}
              />
              <button
                onClick={() => handleMenuAction("分享钓点")}
                style={{
                  width: "100%",
                  padding: "13px 18px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: 14,
                  color: "#1F2D3D",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderBottom: "1px solid #F5F5F5",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="12" cy="3" r="2" stroke="#1F2D3D" strokeWidth="1.3" />
                  <circle cx="4" cy="8" r="2" stroke="#1F2D3D" strokeWidth="1.3" />
                  <circle cx="12" cy="13" r="2" stroke="#1F2D3D" strokeWidth="1.3" />
                  <path d="M5.8 9L10.2 11.8" stroke="#1F2D3D" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M10.2 4.2L5.8 7" stroke="#1F2D3D" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                分享钓点
              </button>
              <button
                onClick={() => handleMenuAction("进入商家认领页")}
                style={{
                  width: "100%",
                  padding: "13px 18px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: 14,
                  color: "#1F2D3D",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="6" width="12" height="8" rx="1.5" stroke="#1F2D3D" strokeWidth="1.3" />
                  <path d="M5 6V4.5a3 3 0 016 0V6" stroke="#1F2D3D" strokeWidth="1.3" strokeLinecap="round" />
                  <circle cx="8" cy="10" r="1.2" fill="#1F2D3D" />
                </svg>
                商家认领
              </button>
              <button
                onClick={() => handleMenuAction("纠错钓点")}
                style={{
                  width: "100%",
                  padding: "13px 18px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: 14,
                  color: "#1F2D3D",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M11.5 1.5L14.5 4.5M2 8.5L5 11.5L14 2.5" stroke="#1F2D3D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="10" cy="12" r="3" stroke="#1F2D3D" strokeWidth="1.3" fill="none" />
                </svg>
                纠错钓点
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Carousel ────────────────────────────────────────────────────────────────
const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1761853448264-031016f334ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "https://images.unsplash.com/photo-1748529860634-9ce2b9ff0a0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "https://images.unsplash.com/photo-1626256132401-a2bf912a346a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const prev = () => setCurrent((c) => (c - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  const next = () => setCurrent((c) => (c + 1) % CAROUSEL_IMAGES.length);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  const onMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  return (
    <div
      style={{ height: 200, position: "relative", overflow: "hidden", cursor: "grab", userSelect: "none" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {/* Slides */}
      <div
        style={{
          display: "flex",
          width: `${CAROUSEL_IMAGES.length * 100}%`,
          height: "100%",
          transform: `translateX(-${(current / CAROUSEL_IMAGES.length) * 100}%)`,
          transition: "transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        {CAROUSEL_IMAGES.map((src, i) => (
          <div key={i} style={{ width: `${100 / CAROUSEL_IMAGES.length}%`, height: "100%", flexShrink: 0 }}>
            <img src={src} alt={`钓点照片${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} draggable={false} />
          </div>
        ))}
      </div>

      {/* Gradient overlay bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Dots indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}
      >
        {CAROUSEL_IMAGES.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 16 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? "#fff" : "rgba(255,255,255,0.5)",
              transition: "width 0.3s, background 0.3s",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* Page counter */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 12,
          background: "rgba(0,0,0,0.45)",
          color: "#fff",
          fontSize: 12,
          padding: "2px 8px",
          borderRadius: 10,
        }}
      >
        {current + 1}/{CAROUSEL_IMAGES.length}
      </div>
    </div>
  );
}

// ─── Info Card ───────────────────────────────────────────────────────────────
const TAGS = ["免费停车", "公共厕所", "观景台", "泥泞路", "夜钓可行", "近海区域"];

function InfoCard() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        margin: "8px 8px 0",
        padding: 16,
      }}
    >
      {/* Name + rating */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 500, color: "#1F2D3D" }}>深圳湾公园码头</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" fill={PRIMARY} />
              <circle cx="6" cy="5" r="2" fill="#fff" />
            </svg>
            <span style={{ fontSize: 12, color: "#8A9BB0" }}>距你 3.2 km</span>
          </div>
        </div>
        {/* Rating stars */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill={s <= 4 ? "#FFB800" : "#E0E0E0"}>
                <path d="M7 1l1.54 3.09L12 4.63l-2.5 2.45.59 3.42L7 8.77l-3.09 1.73.59-3.42L2 4.63l3.46-.54L7 1z" />
              </svg>
            ))}
          </div>
          <span style={{ fontSize: 12, color: "#8A9BB0", marginTop: 2 }}>4.0 (128条评价)</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#F5F5F5", margin: "12px 0" }} />

      {/* Info row */}
      <div style={{ display: "flex", gap: 16 }}>
        <InfoItem icon="🌊" label="水深" value="2~5m" />
        <InfoItem icon="🐟" label="鱼种" value="鲈鱼/黄花" />
        <InfoItem icon="📍" label="底质" value="沙泥底" />
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#F5F5F5", margin: "12px 0" }} />

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {TAGS.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 12,
              color: "#5A6B7E",
              background: "#F2F4F6",
              borderRadius: 6,
              padding: "3px 10px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div style={{ fontSize: 16 }}>{icon}</div>
      <div style={{ fontSize: 12, color: "#8A9BB0", marginTop: 2 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 500, color: "#1F2D3D", marginTop: 1 }}>{value}</div>
    </div>
  );
}

// ─── Waterfall Section ───────────────────────────────────────────────────────
const AVATAR_MALE = "https://images.unsplash.com/photo-1749003659562-a1beba85eee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100";
const AVATAR_FEMALE = "https://images.unsplash.com/photo-1634552516330-ab1ccc0f605e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100";

const CARDS_LEFT = [
  {
    id: 1,
    avatar: AVATAR_MALE,
    nickname: "老王钓鱼",
    time: "2小时前",
    image: "https://images.unsplash.com/photo-1576330383200-2bf325cfec52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    desc: "今天上了三条鲈鱼，运气不错！钓组：路亚竿+铁板",
    likes: 32,
    comments: 8,
    imageHeight: 130,
  },
  {
    id: 3,
    avatar: AVATAR_MALE,
    nickname: "大师兄钓鱼",
    time: "昨天",
    image: "https://images.unsplash.com/photo-1649181641527-b25f64f2cf14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    desc: "凌晨出发赶潮水，黄花鱼三条，满载而归～",
    likes: 18,
    comments: 5,
    imageHeight: 100,
  },
];

const CARDS_RIGHT = [
  {
    id: 2,
    avatar: AVATAR_FEMALE,
    nickname: "海边小妹",
    time: "5小时前",
    image: "https://images.unsplash.com/photo-1629293403472-3c468f54da07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    desc: "黑鲷一条2斤，钓了整整两小时",
    likes: 56,
    comments: 14,
    imageHeight: 110,
  },
  {
    id: 4,
    avatar: AVATAR_FEMALE,
    nickname: "钓鱼佬小李",
    time: "2天前",
    image: "https://images.unsplash.com/photo-1576330383200-2bf325cfec52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    desc: "夕阳下的收获，马鲛鱼上钩，这个钓点真的不错！",
    likes: 41,
    comments: 9,
    imageHeight: 135,
  },
];

function WaterfallCard({
  card,
  onClick,
}: {
  card: (typeof CARDS_LEFT)[0];
  onClick: () => void;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 8,
        cursor: "pointer",
      }}
    >
      {/* Fish catch image */}
      <img
        src={card.image}
        alt="渔获"
        style={{ width: "100%", height: card.imageHeight, objectFit: "cover", display: "block" }}
      />
      <div style={{ padding: 8 }}>
        {/* User row */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <img
            src={card.avatar}
            alt={card.nickname}
            style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover" }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#1F2D3D", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {card.nickname}
            </div>
            <div style={{ fontSize: 11, color: "#B0BFCC" }}>{card.time}</div>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 12, color: "#5A6B7E", lineHeight: 1.5, margin: "0 0 8px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {card.desc}
        </p>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
            style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill={liked ? "#F56C6C" : "none"} stroke={liked ? "#F56C6C" : "#B0BFCC"} strokeWidth="1.3">
              <path d="M7 12.5S1 8.5 1 4.5C1 2.6 2.6 1 4.5 1c.9 0 1.8.4 2.5 1.1C7.7 1.4 8.6 1 9.5 1 11.4 1 13 2.6 13 4.5c0 4-6 8-6 8z" />
            </svg>
            <span style={{ fontSize: 11, color: liked ? "#F56C6C" : "#B0BFCC" }}>{card.likes + (liked ? 1 : 0)}</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#B0BFCC" strokeWidth="1.3">
              <path d="M12 2H2C1.4 2 1 2.4 1 3v6c0 .6.4 1 1 1h2l2 2 2-2h4c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1z" />
            </svg>
            <span style={{ fontSize: 11, color: "#B0BFCC" }}>{card.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WaterfallSection({ onCardClick, onMore }: { onCardClick: () => void; onMore: () => void }) {
  return (
    <div style={{ margin: "8px 8px 0", paddingBottom: 4 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 3, height: 16, background: PRIMARY, borderRadius: 2 }} />
          <span style={{ fontSize: 16, fontWeight: 500, color: "#1F2D3D" }}>钓友实况</span>
          <span style={{ fontSize: 12, color: "#8A9BB0", background: "#F2F4F6", borderRadius: 10, padding: "1px 8px" }}>128条</span>
        </div>
        <button
          onClick={onMore}
          style={{ fontSize: 13, color: PRIMARY, background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}
        >
          查看更多 &rsaquo;
        </button>
      </div>

      {/* Two-column waterfall */}
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          {CARDS_LEFT.map((card) => (
            <WaterfallCard key={card.id} card={card} onClick={onCardClick} />
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {CARDS_RIGHT.map((card) => (
            <WaterfallCard key={card.id} card={card} onClick={onCardClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Buttons ──────────────────────────────────────────────────────────
function BottomBar({
  onFav,
  onTeam,
  onNav,
}: {
  onFav: () => void;
  onTeam: () => void;
  onNav: () => void;
}) {
  return (
    <div
      style={{
        flexShrink: 0,
        background: "#fff",
        borderTop: "1px solid #F2F2F2",
        padding: "10px 16px 14px",
        display: "flex",
        gap: 8,
      }}
    >
      {/* Collect */}
      <button
        onClick={onFav}
        style={{
          flex: 1,
          height: 44,
          background: "#fff",
          border: `1.5px solid ${PRIMARY}`,
          borderRadius: 8,
          color: PRIMARY,
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke={PRIMARY} strokeWidth="1.4">
          <path d="M7.5 13S1.5 9 1.5 5C1.5 2.8 3.3 1 5.5 1c.9 0 1.8.4 2 1.1C7.7 1.4 8.6 1 9.5 1c2.2 0 4 1.8 4 4 0 4-6 8-6 8z" />
        </svg>
        收藏
      </button>

      {/* Team up */}
      <button
        onClick={onTeam}
        style={{
          flex: 1,
          height: 44,
          background: "#fff",
          border: `1.5px solid ${PRIMARY}`,
          borderRadius: 8,
          color: PRIMARY,
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke={PRIMARY} strokeWidth="1.4">
          <circle cx="5.5" cy="5" r="2.5" />
          <circle cx="10.5" cy="5" r="2.5" />
          <path d="M1 13c0-2.5 2-4 4.5-4" strokeLinecap="round" />
          <path d="M7 13c0-2.5 1.5-4 3.5-4s3.5 1.5 3.5 4" strokeLinecap="round" />
        </svg>
        组队前往
      </button>

      {/* Navigate */}
      <button
        onClick={onNav}
        style={{
          flex: 1.2,
          height: 44,
          background: PRIMARY,
          border: "none",
          borderRadius: 8,
          color: "#fff",
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#fff" strokeWidth="1.4">
          <path d="M13 7.5L2 2l2.5 5.5L2 13l11-5.5z" strokeLinejoin="round" />
        </svg>
        导航直达
      </button>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  const handleBack = () => navigate(-1);

  return (
    <PageContainer>
      <style>{`
        .scroll-area::-webkit-scrollbar {
          width: 3px;
        }
        .scroll-area::-webkit-scrollbar-track {
          background: transparent;
        }
        .scroll-area::-webkit-scrollbar-thumb {
          background: #D8DEE6;
          border-radius: 3px;
        }
        .scroll-area::-webkit-scrollbar-thumb:hover {
          background: #B0BFCC;
        }
      `}</style>

      {/* Phone frame */}
      <div
        style={{
          width: "100%",
          maxWidth: 402,
          height: "100%",
          background: "#F5F7FA",
          borderRadius: 0,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Status bar */}
        <StatusBar />

        {/* Nav bar */}
        <NavBar
          onBack={handleBack}
          onMenuAction={(action) => {
            if (action === "纠错钓点") {
              navigate("/level2/new-correction");
            } else {
              showToast(action);
            }
          }}
        />

        {/* Scrollable content */}
        <div
          className="scroll-area"
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Carousel />
          <InfoCard />
          <WaterfallSection
            onCardClick={() => showToast("查看详情")}
            onMore={() => showToast("查看更多实况")}
          />
          {/* Bottom spacer */}
          <div style={{ height: 16 }} />
        </div>

        {/* Bottom fixed buttons */}
        <BottomBar
          onFav={() => showToast("钓点已收藏")}
          onTeam={() => navigate('/level2/carpool-post')}
          onNav={() => showToast("唤起第三方地图导航")}
        />

        {/* Toast */}
        <ToastMessage message={toast.message} visible={toast.visible} />
      </div>
    </PageContainer>
  );
}