import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import StatusBar from "../../components/StatusBar";

// Toast notification component
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "80px",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "20px"})`,
        opacity: visible ? 1 : 0,
        transition: "all 0.3s ease",
        background: "rgba(0,0,0,0.75)",
        color: "#fff",
        padding: "8px 20px",
        borderRadius: "20px",
        fontSize: "13px",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        zIndex: 999,
      }}
    >
      {message}
    </div>
  );
}

// Navigation Bar
function NavBar({ onBack, onService }: { onBack: () => void; onService: () => void }) {
  return (
    <div
      style={{
        height: "44px",
        width: "100%",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid #F0F0F0",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          width: 44,
          height: 44,
        }}
      >
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
          <path d="M9 1L1 9L9 17" stroke="#1F2D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Title */}
      <span
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "18px",
          fontWeight: 500,
          color: "#1a1a1a",
        }}
      >
        拼车邀请
      </span>

      {/* Service icon */}
      <button
        onClick={onService}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="10" stroke="#00B38A" strokeWidth="1.5" />
          <path d="M8 8.5C8 6.84 9.34 5.5 11 5.5S14 6.84 14 8.5C14 10.16 12.66 11.5 11 11.5V13" stroke="#00B38A" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="11" cy="15.5" r="1" fill="#00B38A" />
        </svg>
      </button>
    </div>
  );
}

// Combined: Passenger Info + Trip Detail + Invite info
function PassengerAndTripCard({ onContact }: { onContact: () => void }) {
  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "14px 14px 12px", marginBottom: "12px" }}>

      {/* Invite banner */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F0FDF8", borderRadius: "6px", padding: "6px 10px", marginBottom: "12px", border: "1px solid #C8F0E6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#00B38A" }} />
          <span style={{ fontSize: "12px", color: "#00B38A", fontWeight: 500 }}>乘客邀请你拼车</span>
        </div>
        <span style={{ fontSize: "11px", color: "#909399" }}>2026年5月20日 10:30</span>
      </div>

      {/* Passenger profile row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            background: "linear-gradient(135deg, #B0D9D0, #7CC8B8)",
            display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
          }}>
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="13" r="7" fill="#fff" fillOpacity="0.8" />
              <path d="M4 28C4 22.48 9.37 18 16 18S28 22.48 28 28" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ position: "absolute", bottom: "1px", right: "1px", width: "10px", height: "10px", borderRadius: "50%", background: "#00B38A", border: "2px solid #fff" }} />
        </div>

        {/* Name + stats */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3px" }}>
            <span style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a" }}>钓鱼小白</span>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={onContact} style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#F0FDF8", border: "1px solid #D0F0E8", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M2 3C2 2.45 2.45 2 3 2H13C13.55 2 14 2.45 14 3V10C14 10.55 13.55 11 13 11H5L2 14V3Z" stroke="#00B38A" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </button>
              <button onClick={onContact} style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#F0FDF8", border: "1px solid #D0F0E8", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M14 10.67C14 11 13.87 11.31 13.62 11.56C13.19 12.03 12.71 12.25 12.19 12.25C11.96 12.25 11.71 12.2 11.45 12.09L9.37 11.29C8.58 10.97 7.7 11.1 7.04 11.61L6.74 11.84C5.79 12.56 4.44 12.46 3.62 11.62L3.38 11.38C2.54 10.56 2.44 9.21 3.16 8.26L3.39 7.96C3.9 7.3 4.03 6.42 3.71 5.63L2.91 3.55C2.59 2.73 3.06 1.8 3.92 1.59C4.05 1.56 4.19 1.5 4.33 1.5C4.76 1.5 5.17 1.72 5.42 2.1L6.64 4C7.15 4.78 7.13 5.79 6.59 6.56L6.41 6.82C6.13 7.22 6.16 7.76 6.48 8.13C7.09 8.84 8.16 8.87 8.81 8.19L9.44 7.41C10.21 6.87 11.22 6.85 12 7.36L13.9 8.58C14.28 8.83 14.5 9.24 14.5 9.67L14 10.67Z" stroke="#00B38A" strokeWidth="1.3" />
                </svg>
              </button>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
            <span style={{ fontSize: "12px" }}>⭐</span>
            <span style={{ fontSize: "12px", color: "#FF9800", fontWeight: 500 }}>4.8</span>
            <span style={{ fontSize: "11px", color: "#E4E7ED" }}>|</span>
            <span style={{ fontSize: "11px", color: "#606266" }}>拼车 36次</span>
            <span style={{ fontSize: "11px", color: "#E4E7ED" }}>|</span>
            <span style={{ fontSize: "11px", color: "#909399" }}>活跃 10:28</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "11px", color: "#00B38A", background: "#F0FDF8", border: "1px solid #B8EEE2", borderRadius: "4px", padding: "1px 6px" }}>轻装</span>
            <span style={{ fontSize: "11px", color: "#606266", background: "#F5F7FA", border: "1px solid #E4E7ED", borderRadius: "4px", padding: "1px 6px" }}>1人出行</span>
            <span style={{ fontSize: "11px", color: "#E6A23C", background: "#FEF9EC", border: "1px solid #F5DAA0", borderRadius: "4px", padding: "1px 6px" }}>守时</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#F5F5F5", margin: "0 0 10px" }} />

      {/* Trip route — compact inline */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px", flexShrink: 0 }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00B38A" }} />
          <div style={{ width: "1.5px", height: "22px", background: "repeating-linear-gradient(to bottom, #00B38A 0, #00B38A 3px, transparent 3px, transparent 6px)", margin: "2px 0" }} />
          <div style={{ width: "7px", height: "7px", borderRadius: "2px", background: "#F56C6C" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "6px" }}>
            <span style={{ fontSize: "11px", color: "#909399" }}>出发 06:00　</span>
            <span style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: 500 }}>南山区·深圳大学西门</span>
          </div>
          <div>
            <span style={{ fontSize: "11px", color: "#909399" }}>到达　　　</span>
            <span style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: 500 }}>深圳湾公园码头</span>
          </div>
        </div>
      </div>

      {/* Return + Distance — single compact row */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "5px", background: "#FFFBF0", borderRadius: "6px", padding: "5px 8px", border: "1px solid #FAECD8" }}>
          <span style={{ fontSize: "12px" }}>🔄</span>
          <span style={{ fontSize: "11px", color: "#E6A23C", fontWeight: 500 }}>返程</span>
          <span style={{ fontSize: "11px", color: "#606266" }}>当天 12:00</span>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "5px", background: "#F5F7FA", borderRadius: "6px", padding: "5px 8px" }}>
          <span style={{ fontSize: "12px" }}>📍</span>
          <span style={{ fontSize: "11px", color: "#909399" }}>距你</span>
          <span style={{ fontSize: "11px", color: "#00B38A", fontWeight: 500 }}>3.2 km </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#F5F5F5", margin: "0 0 10px" }} />

      {/* Match info — 3 compact rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {/* Row 1: match % with bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "12px", color: "#909399" }}>与乘客行程匹配度</span>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "60px", height: "4px", background: "#E4E7ED", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: "92%", height: "100%", background: "linear-gradient(90deg, #00B38A, #00C99A)", borderRadius: "2px" }} />
            </div>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#00B38A" }}>92%</span>
            <span style={{ fontSize: "11px", color: "#909399" }}>顺路</span>
          </div>
        </div>
        {/* Row 2 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "12px", color: "#909399" }}>出发时间差</span>
          <span style={{ fontSize: "12px", color: "#1a1a1a" }}>5分钟内 <span style={{ color: "#00B38A" }}>高度吻合</span></span>
        </div>
        {/* Row 3 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "12px", color: "#909399" }}>路线匹配</span>
          <span style={{ fontSize: "12px", color: "#1a1a1a" }}>起点/终点基本一致</span>
        </div>
      </div>
    </div>
  );
}

// Combined: Trip Summary + Match Detail
function TripSummaryAndMatchCard() {
  const matchItems = [
    { label: "顺路程度", value: "92% 顺路", icon: "🛣️" },
    { label: "时间吻合", value: "出发时间一致", icon: "⏰" },
    { label: "路线匹配", value: "起点/终点均顺路", icon: "🗺️" },
  ];

  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "14px", marginBottom: "12px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px" }}>
        <div style={{
          background: "linear-gradient(135deg, #00B38A, #00C99A)",
          borderRadius: "7px", width: "24px", height: "24px",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L10 5.5H15L11 8.5L12.5 13L8 10L3.5 13L5 8.5L1 5.5H6L8 1Z" fill="#fff" />
          </svg>
        </div>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}>你的行程摘要</span>
      </div>

      {/* Compact route + time block */}
      <div style={{ background: "#F7FFFE", borderRadius: "8px", padding: "10px 12px", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "7px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1, minWidth: 0 }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00B38A", flexShrink: 0 }} />
            <span style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>深圳大学西门</span>
          </div>
          <svg width="14" height="9" viewBox="0 0 16 10" fill="none" style={{ flexShrink: 0 }}>
            <path d="M1 5H14M10 1L14 5L10 9" stroke="#C0C4CC" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1, minWidth: 0, justifyContent: "flex-end" }}>
            <span style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "right" }}>深圳湾公园码头</span>
            <div style={{ width: "7px", height: "7px", borderRadius: "2px", background: "#F56C6C", flexShrink: 0 }} />
          </div>
        </div>
        <div style={{ height: "1px", background: "#E8F8F4", margin: "0 -2px 7px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <svg width="12" height="12" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="6.5" cy="6.5" r="5.5" stroke="#00B38A" strokeWidth="1.2" />
            <path d="M6.5 3.5V6.5L8.5 8" stroke="#00B38A" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: "12px", color: "#1a1a1a", fontWeight: 500 }}>06:00</span>
          <span style={{ fontSize: "11px", color: "#C0C4CC" }}>出发</span>
          <span style={{ fontSize: "11px", color: "#C0C4CC", margin: "0 1px" }}>—</span>
          <svg width="12" height="12" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="6.5" cy="6.5" r="5.5" stroke="#909399" strokeWidth="1.2" />
            <path d="M6.5 3.5V6.5L8.5 8" stroke="#909399" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: "12px", color: "#606266", fontWeight: 500 }}>12:00</span>
          <span style={{ fontSize: "11px", color: "#C0C4CC" }}>返程</span>
          <span style={{ marginLeft: "auto", fontSize: "11px", color: "#00B38A", background: "#F0FDF8", border: "1px solid #C8F0E6", borderRadius: "4px", padding: "1px 6px" }}>一日往返</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#F5F5F5", margin: "0 0 10px" }} />

      {/* Match detail section */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
        <span style={{ fontSize: "12px", fontWeight: 500, color: "#606266" }}>匹配度详细说明</span>
        <span style={{ fontSize: "11px", color: "#00B38A", background: "#F0FDF8", border: "1px solid #B8EEE2", borderRadius: "10px", padding: "1px 7px" }}>优质匹配</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {matchItems.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div style={{ width: "22px", height: "22px", borderRadius: "5px", background: "#F0FDF8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", flexShrink: 0 }}>
              {item.icon}
            </div>
            <span style={{ fontSize: "12px", color: "#909399", flex: 1 }}>{item.label}</span>
            <span style={{ fontSize: "12px", color: "#00B38A", fontWeight: 500 }}>{item.value}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: "11px", color: "#C0C4CC", lineHeight: "1.5", margin: "8px 0 0" }}>
        匹配度基于出发时间、起终点距离及路线重合度综合计算。
      </p>
    </div>
  );
}

// Fee & Space Card
function FeeSpaceCard() {
  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "16px", marginBottom: "12px" }}>
      <div style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a", marginBottom: "12px" }}>费用与空间</div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        {/* Fee */}
        <div style={{ flex: 1, background: "#F0FDF8", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", color: "#909399", marginBottom: "4px" }}>AA预估费用</div>
          <div style={{ fontSize: "22px", color: "#00B38A", fontWeight: 600, letterSpacing: "-0.5px" }}>¥42</div>
          <div style={{ fontSize: "11px", color: "#909399" }}>/ 人（乘客预估）</div>
        </div>

        {/* Seats */}
        <div style={{ flex: 1, background: "#F5F7FA", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", color: "#909399", marginBottom: "4px" }}>你的空座数</div>
          <div style={{ fontSize: "22px", color: "#1a1a1a", fontWeight: 600 }}>2</div>
          <div style={{ fontSize: "11px", color: "#909399" }}>座位可用</div>
        </div>
      </div>

      {/* Equipment match */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F7FFFE", borderRadius: "8px", padding: "10px 14px", border: "1px solid #C8F0E6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>🎒</span>
          <div>
            <div style={{ fontSize: "12px", color: "#909399" }}>装备匹配</div>
            <div style={{ fontSize: "13px", color: "#606266" }}>乘客"轻装" · 后备箱可容纳</div>
          </div>
        </div>
        <span style={{
          fontSize: "12px", color: "#00B38A", background: "#00B38A20",
          border: "1px solid #00B38A40", borderRadius: "4px", padding: "3px 10px", fontWeight: 500
        }}>匹配 ✓</span>
      </div>

      {/* Tip */}
      <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "5px" }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <circle cx="6.5" cy="6.5" r="6" stroke="#C0C4CC" strokeWidth="1" />
          <path d="M6.5 5.5V9" stroke="#C0C4CC" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="6.5" cy="4" r="0.7" fill="#C0C4CC" />
        </svg>
        <span style={{ fontSize: "11px", color: "#C0C4CC" }}>实际费用以行程结束后AA结算为准</span>
      </div>
    </div>
  );
}

function MatchRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: "13px", color: "#909399" }}>{label}</span>
      {children}
    </div>
  );
}

// Bottom action bar
function BottomBar({ onReject, onAccept }: { onReject: () => void; onAccept: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "72px",
        background: "#fff",
        borderTop: "1px solid #F0F0F0",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: "8px",
        flexShrink: 0,
      }}
    >
      <button
        onClick={onReject}
        style={{
          flex: 1,
          height: "44px",
          borderRadius: "8px",
          background: "#fff",
          border: "1.5px solid #F56C6C",
          color: "#F56C6C",
          fontSize: "16px",
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          transition: "all 0.2s",
        }}
        onMouseDown={e => (e.currentTarget.style.background = "#FEF0F0")}
        onMouseUp={e => (e.currentTarget.style.background = "#fff")}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M3 3L12 12M12 3L3 12" stroke="#F56C6C" strokeWidth="2" strokeLinecap="round" />
        </svg>
        拒绝
      </button>
      <button
        onClick={onAccept}
        style={{
          flex: 1.8,
          height: "44px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #00B38A, #00C99A)",
          border: "none",
          color: "#fff",
          fontSize: "16px",
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          boxShadow: "0 4px 12px rgba(0,179,138,0.3)",
          transition: "all 0.2s",
        }}
        onMouseDown={e => (e.currentTarget.style.opacity = "0.85")}
        onMouseUp={e => (e.currentTarget.style.opacity = "1")}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 8L6.5 12.5L14 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        接受拼车
      </button>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message }), 2500);
  };

  const handleAccept = () => {
    showToast("拼车成功！进入进行中订单详情页 🎉");

    const url = orderId
      ? `/level3/ongoing-order-detail?orderId=${encodeURIComponent(orderId)}`
      : "/level3/ongoing-order-detail";

    // 让成功 toast 有机会先露一下，再跳转
    setTimeout(() => navigate(url), 350);
  };

  return (
    <PageContainer>
      {/* Phone frame */}
      <div
        style={{
          width: '100%',
          maxWidth: 402,
          height: '100%',
          background: '#F5F6FA',
          borderRadius: 0,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          boxShadow: '0 0 40px rgba(0,0,0,0.1)',
        }}
      >
        <StatusBar />
        <NavBar
          onBack={() => navigate(-1)}
          onService={() => showToast("正在连接客服...")}
        />

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px 16px 84px",
            scrollbarWidth: "thin",
            scrollbarColor: "#E4E7ED transparent",
          }}
          className="custom-scroll"
        >
          <PassengerAndTripCard onContact={() => showToast("联系乘客")} />
          <FeeSpaceCard />
          <TripSummaryAndMatchCard />
        </div>

        <BottomBar
          onReject={() => showToast("已拒绝该拼车邀请")}
          onAccept={handleAccept}
        />

        <Toast message={toast.message} visible={toast.visible} />
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #E4E7ED;
          border-radius: 2px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #C0C4CC;
        }
      `}</style>
    </PageContainer>
  );
}