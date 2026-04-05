import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import StatusBar from "../../components/StatusBar";

// ─── Toast / Alert Modal ────────────────────────────────────────────────────
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.45)",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "20px 24px",
          margin: "0 32px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          textAlign: "center",
          minWidth: 200,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p style={{ fontSize: 15, color: "#303133", marginBottom: 16, lineHeight: 1.6 }}>
          {message}
        </p>
        <button
          onClick={onClose}
          style={{
            background: "#00B38A",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 32px",
            fontSize: 14,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          确定
        </button>
      </div>
    </div>
  );
}

// ─── Navigation Bar ──────────────────────────────────────────────────────────
function NavBar({ onBack, onMore }: { onBack: () => void; onMore: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        left: 0,
        right: 0,
        height: 44,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        zIndex: 90,
        borderBottom: "1px solid #F2F3F5",
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px 4px 4px 0",
          display: "flex",
          alignItems: "center",
          color: "#303133",
        }}
      >
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
          <path d="M9 1L1 9L9 17" stroke="#1F2D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <span
        style={{
          fontSize: 18,
          fontWeight: 500,
          color: "#303133",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        进行中订单
      </span>
      <button
        onClick={onMore}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px 0 4px 4px",
          display: "flex",
          alignItems: "center",
          color: "#606266",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="5.5" r="1.5" fill="#606266" />
          <circle cx="11" cy="11" r="1.5" fill="#606266" />
          <circle cx="11" cy="16.5" r="1.5" fill="#606266" />
        </svg>
      </button>
    </div>
  );
}

// ─── 1. 订单状态卡片 ───────────────────────────────────────────────────────────
function OrderStatusCard() {
  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ background: "rgba(0,179,138,0.1)", color: "#00B38A", borderRadius: 6, padding: "3px 10px", fontSize: 13, fontWeight: 500 }}>
            已匹配成功
          </span>
          <span style={{ background: "rgba(245,108,108,0.08)", color: "#F56C6C", borderRadius: 6, padding: "3px 10px", fontSize: 13, fontWeight: 500 }}>
            待出发
          </span>
        </div>
        <span style={{ fontSize: 12, color: "#909399" }}>GC20260520001</span>
      </div>

      {/* Countdown */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(0,179,138,0.08) 0%, rgba(0,179,138,0.03) 100%)",
          borderRadius: 8,
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8.5" stroke="#00B38A" strokeWidth="1.4" />
          <path d="M10 5.5V10.5L13.5 12.5" stroke="#00B38A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <span style={{ fontSize: 14, color: "#303133", fontWeight: 500 }}>距离出发还有 </span>
          <span style={{ fontSize: 16, color: "#00B38A", fontWeight: 600 }}>12分钟</span>
        </div>
      </div>

      <p style={{ fontSize: 12, color: "#909399", marginTop: 8, marginBottom: 0 }}>
        📍 请提前10分钟到达集合地点，避免影响行程
      </p>
    </div>
  );
}

// ─── 2. 车主信息 + 实时位置（合并卡片）────────────────────────────────────────
function DriverAndLocationCard({ onContact }: { onContact: () => void }) {
  return (
    <div style={cardStyle}>

      {/* ── 车主信息部分（压缩为一行式布局）── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
            }}
          >
            👨‍✈️
          </div>
          <div style={{
            position: "absolute", bottom: 0, right: -2,
            width: 12, height: 12, borderRadius: "50%",
            background: "#00B38A", border: "2px solid #fff",
          }} />
        </div>

        {/* Name + rating + car */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#303133" }}>阿强</span>
            <span style={{ fontSize: 10, color: "#fff", background: "#00B38A", borderRadius: 3, padding: "1px 5px", flexShrink: 0 }}>老司机</span>
            <span style={{ fontSize: 12, color: "#F5A623", marginLeft: 2 }}>★ 4.9</span>
            <span style={{ fontSize: 11, color: "#909399" }}>（128次）</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 12, color: "#606266" }}>SUV · 粤B·F8333</span>
            <span style={{ fontSize: 11, color: "#909399" }}>· 可带重装</span>
          </div>
        </div>

        {/* Contact buttons */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
          <button
            onClick={onContact}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              border: "1.5px solid #00B38A", background: "rgba(0,179,138,0.05)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 14,
            }}
          >📞</button>
          <button
            onClick={onContact}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              border: "1.5px solid #00B38A", background: "rgba(0,179,138,0.05)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 14,
            }}
          >💬</button>
        </div>
      </div>

      {/* Seat info — compact inline */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, padding: "6px 10px", background: "#F7F8FA", borderRadius: 7 }}>
        <span style={{ fontSize: 12, color: "#606266" }}>剩余空座</span>
        <span style={{ fontSize: 13, color: "#00B38A", fontWeight: 600 }}>2座</span>
        <span style={{ fontSize: 11, color: "#909399", marginLeft: "auto" }}>含你共3人</span>
      </div>

      {/* ── 实时位置部分 ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#303133" }}>实时位置</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00B38A" }} />
          <span style={{ fontSize: 12, color: "#00B38A" }}>更新中</span>
        </div>
      </div>

      {/* Map placeholder — taller */}
      <div
        style={{
          height: 148,
          background: "linear-gradient(135deg, #E8F5F2 0%, #F0F9F7 50%, #E4EDF5 100%)",
          borderRadius: 8,
          position: "relative",
          overflow: "hidden",
          marginBottom: 10,
          border: "1px solid #E4E7ED",
        }}
      >
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.3 }} viewBox="0 0 370 148" preserveAspectRatio="none">
          {[25, 50, 75, 100, 125].map((y) => (
            <line key={y} x1="0" y1={y} x2="370" y2={y} stroke="#7EC8B8" strokeWidth="0.5" />
          ))}
          {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="148" stroke="#7EC8B8" strokeWidth="0.5" />
          ))}
          <path d="M0 85 Q80 60 185 72 Q280 85 370 66" stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M0 85 Q80 60 185 72 Q280 85 370 66" stroke="#C8E6DF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M100 0 Q112 45 124 85 Q135 118 145 148" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M100 0 Q112 45 124 85 Q135 118 145 148" stroke="#C8E6DF" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M220 0 Q228 35 235 70 Q242 105 248 148" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M220 0 Q228 35 235 70 Q242 105 248 148" stroke="#C8E6DF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        {/* Car marker */}
        <div style={{ position: "absolute", top: "40%", left: "30%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#00B38A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 2px 10px rgba(0,179,138,0.45)" }}>
            🚗
          </div>
          <div style={{ width: 10, height: 10, background: "rgba(0,179,138,0.25)", borderRadius: "50%", marginTop: -3 }} />
        </div>
        {/* Destination marker */}
        <div style={{ position: "absolute", top: "12%", right: "16%", fontSize: 22 }}>�</div>
        {/* Start marker */}
        <div style={{ position: "absolute", bottom: "12%", left: "12%", display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00B38A", boxShadow: "0 0 0 3px rgba(0,179,138,0.25)" }} />
          <span style={{ fontSize: 10, color: "#606266", background: "rgba(255,255,255,0.85)", padding: "1px 5px", borderRadius: 3 }}>上车点</span>
        </div>
        {/* Label */}
        <div style={{ position: "absolute", bottom: 6, right: 8, fontSize: 10, color: "#909399", background: "rgba(255,255,255,0.85)", padding: "2px 6px", borderRadius: 4 }}>
          实时位置示意
        </div>
      </div>

      {/* ETA info */}
      <div
        style={{
          padding: "9px 12px",
          background: "rgba(0,179,138,0.05)",
          borderRadius: 8,
          border: "1px solid rgba(0,179,138,0.15)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 15 }}>🚗</span>
        <div>
          <p style={{ fontSize: 13, color: "#303133", margin: 0 }}>
            车主距上车点约 <strong style={{ color: "#00B38A" }}>1.2km</strong>，预计
            <strong style={{ color: "#00B38A" }}> 5分钟</strong>到达
          </p>
          <p style={{ fontSize: 12, color: "#909399", margin: "3px 0 0 0" }}>
            当前位于：南山大道与白石路交叉口附近
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── 3. 行程进度 + 行程信息（合并卡片，进度在上）────────────────────────────
function TripInfoAndProgressCard({ onMapClick }: { onMapClick: () => void }) {
  const stages = [
    { label: "等待集合", icon: "⏳", done: true },
    { label: "去程", icon: "🚗", done: false, active: true },
    { label: "钓鱼中", icon: "🎣", done: false },
    { label: "返程", icon: "🏠", done: false },
  ];

  return (
    <div style={cardStyle}>

      {/* ── 行程进度部分（上方）── */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1 8h14M8 1l7 7-7 7" stroke="#00B38A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: 15, fontWeight: 500, color: "#303133" }}>行程进度</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        {stages.map((stage, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < stages.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: stage.done ? "#00B38A" : stage.active ? "rgba(0,179,138,0.15)" : "#F5F7FA",
                  border: stage.active ? "2px solid #00B38A" : stage.done ? "none" : "2px solid #E4E7ED",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                  boxShadow: stage.active ? "0 0 0 3px rgba(0,179,138,0.2)" : "none",
                }}
              >
                {stage.done ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span>{stage.icon}</span>
                )}
              </div>
              <span style={{ fontSize: 11, color: stage.done || stage.active ? "#00B38A" : "#909399", fontWeight: stage.active ? 500 : 400, whiteSpace: "nowrap" }}>
                {stage.label}
              </span>
            </div>
            {i < stages.length - 1 && (
              <div style={{ flex: 1, height: 2, background: stage.done ? "#00B38A" : "#E4E7ED", margin: "0 6px", marginBottom: 22, borderRadius: 2 }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: "8px 12px", background: "#F7F8FA", borderRadius: 8, marginBottom: 0 }}>
        <p style={{ fontSize: 12, color: "#606266", margin: 0 }}><strong style={{ color: "#00B38A" }}>等待集合</strong> · 待车主到达上车点出发
        </p>
      </div>

      {/* ── 分割线 ── */}
      <div style={{ height: 1, background: "#F2F3F5", margin: "14px 0" }} />

      {/* ── 行程信息部分（下方，去除标题）── */}

      {/* Route path */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, padding: "10px 12px", background: "#F7F8FA", borderRadius: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00B38A", border: "2px solid #fff", boxShadow: "0 0 0 1.5px #00B38A" }} />
          <div style={{ width: 1.5, height: 20, background: "#DCDFE6", borderRadius: 2 }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F56C6C", border: "2px solid #fff", boxShadow: "0 0 0 1.5px #F56C6C" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#303133" }}>深圳大学北门</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#303133" }}>深圳湾公园码头</span>
        </div>
        <div style={{ fontSize: 12, color: "#00B38A", fontWeight: 500, background: "rgba(0,179,138,0.08)", padding: "3px 8px", borderRadius: 4 }}>
          约18km
        </div>
      </div>

      {/* Time & place info */}
      <div style={infoRowStyle}>
        <span style={infoLabelStyle}>出发时间</span>
        <span style={infoValueStyle}>2026年5月20日 06:00</span>
      </div>
      <div style={infoRowStyle}>
        <span style={infoLabelStyle}>返程时间</span>
        <span style={infoValueStyle}>2026年5月20日 12:00</span>
      </div>
      <div style={{ ...infoRowStyle, borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
        <span style={infoLabelStyle}>集合地点</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, justifyContent: "flex-end" }}>
          <span style={{ fontSize: 14, color: "#303133", textAlign: "right" }}>南山区·深圳大学北门</span>
          <button
            onClick={onMapClick}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1.5C6.38 1.5 4 3.73 4 6.6 4 10.35 9 16.5 9 16.5s5-6.15 5-9.9C14 3.73 11.62 1.5 9 1.5z" stroke="#00B38A" strokeWidth="1.3" fill="rgba(0,179,138,0.1)" />
              <circle cx="9" cy="6.5" r="2" stroke="#00B38A" strokeWidth="1.3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Shared Styles ───────────────────────────────────────────────────────────
const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
};

const infoRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: 10,
  marginBottom: 10,
  borderBottom: "1px dashed #F2F3F5",
};

const infoLabelStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#909399",
  flexShrink: 0,
};

const infoValueStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#303133",
  fontWeight: 400,
};

// ─── Main Component ──────────────────────────────────────────────────────────
export default function OngoingOrderDetailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => setToast(msg);
  const closeToast = () => setToast(null);

  return (
    <PageContainer>
      <div
        style={{
          width: "100%",
          maxWidth: 402,
          height: "100%",
          background: "#F7F8FA",
          position: "relative",
          overflow: "hidden",
          fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", Arial, sans-serif',
          flexShrink: 0,
        }}
      >
      <StatusBar
        style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 100 }}
        background="transparent"
      />
      <NavBar
        onBack={() => navigate(-1)}
        onMore={() => showToast("订单问题反馈")}
      />

      {/* Scrollable content */}
      <div
        style={{
          position: "absolute",
          top: 88,
          left: 0,
          right: 0,
          bottom: 72,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "12px 16px 0",
          scrollbarWidth: "thin",
          scrollbarColor: "#E4E7ED transparent",
        }}
        className="custom-scrollbar"
      >
        {/* 1. 订单状态卡片 */}
        <OrderStatusCard />

        {/* 2. 车主信息 + 实时位置（合并卡片） */}
        <DriverAndLocationCard onContact={() => showToast("联系对方")} />

        {/* 3. 行程进度 + 行程信息（合并卡片） */}
        <TripInfoAndProgressCard onMapClick={() => showToast("查看上车点详情")} />

        <div style={{ height: 12 }} />
      </div>

      {/* Fixed Bottom Buttons — 待出发状态 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 72,
          background: "#fff",
          borderTop: "1px solid #F2F3F5",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 16px 8px",
        }}
      >
        <button
          onClick={() => showToast("确认取消订单？")}
          style={{
            flex: 1,
            height: 44,
            borderRadius: 8,
            border: "1.5px solid #F56C6C",
            background: "#fff",
            color: "#F56C6C",
            fontSize: 15,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          取消订单
        </button>
        <button
          onClick={() => showToast("联系对方")}
          style={{
            flex: 1,
            height: 44,
            borderRadius: 8,
            border: "none",
            background: "#00B38A",
            color: "#fff",
            fontSize: 15,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 3px 12px rgba(0,179,138,0.35)",
          }}
        >
          联系对方
        </button>
      </div>

      {toast && <Toast message={toast} onClose={closeToast} />}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E4E7ED; border-radius: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #C0C4CC; }
      `}</style>
      </div>
    </PageContainer>
  );
}
