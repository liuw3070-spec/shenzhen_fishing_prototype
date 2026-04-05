import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import StatusBar from "../../components/StatusBar";

const DRIVER_AVATAR =
  "https://images.unsplash.com/photo-1706108318739-5cbd8126e6e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400";

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.88})`,
        background: "rgba(31,45,61,0.86)",
        color: "white",
        borderRadius: "10px",
        padding: "11px 22px",
        fontSize: "14px",
        zIndex: 9999,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.18s ease, transform 0.18s ease",
        backdropFilter: "blur(6px)",
        maxWidth: "210px",
        textAlign: "center",
        lineHeight: 1.5,
        fontWeight: 500,
        whiteSpace: "pre-line",
      }}
    >
      {message}
    </div>
  );
}

function MapPreview({ onViewRoute }: { onViewRoute: () => void }) {
  return (
    <div
      onClick={onViewRoute}
      style={{
        height: "140px",
        background: "linear-gradient(135deg, #E8F4E8 0%, #D4E8D4 50%, #C0DCC0 100%)",
        borderRadius: "12px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 400 140" preserveAspectRatio="none">
        <path d="M0,80 Q100,60 200,85 T400,70" stroke="rgba(0,150,100,0.3)" strokeWidth="2" fill="none" />
        <path d="M0,100 Q150,80 250,95 T400,90" stroke="rgba(0,150,100,0.2)" strokeWidth="1.5" fill="none" />
        <circle cx="80" cy="70" r="6" fill="#00B38A" />
        <circle cx="320" cy="75" r="6" fill="#F56C6C" />
      </svg>
      <div style={{ position: "absolute", bottom: "10px", right: "12px", background: "rgba(255,255,255,0.9)", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", color: "#5A6A7A" }}>
        点击查看路线
      </div>
    </div>
  );
}

function RouteCard() {
  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "14px", marginTop: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00B38A" }} />
        <span style={{ fontSize: "13px", color: "#5A6A7A" }}>深圳大学北门</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "3px", marginBottom: "10px" }}>
        <div style={{ width: "2px", height: "20px", background: "#E0E6ED", marginLeft: "2px" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F56C6C" }} />
        <span style={{ fontSize: "13px", color: "#1F2D3D", fontWeight: 500 }}>深圳湾公园码头</span>
      </div>
      <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #F0F2F5", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "12px", color: "#A0AAB8" }}>出发时间</span>
        <span style={{ fontSize: "13px", color: "#1F2D3D", fontWeight: 500 }}>05月20日 06:00-12:00</span>
      </div>
    </div>
  );
}

function ProfileCard() {
  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img src={DRIVER_AVATAR} alt="车主头像" style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#1F2D3D", marginBottom: "4px" }}>钓鱼达人老王</div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span style={{ fontSize: "13px", color: "#1F2D3D", fontWeight: 500 }}>4.9</span>
            <span style={{ fontSize: "12px", color: "#A0AAB8" }}>· 拼车 38 次</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "11px", color: "#A0AAB8", marginBottom: "2px" }}>距离</div>
          <div style={{ fontSize: "14px", color: "#00B38A", fontWeight: 500 }}>3.2km</div>
        </div>
      </div>
    </div>
  );
}

function VehicleInfo() {
  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ fontSize: "14px", fontWeight: 500, color: "#1F2D3D", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "16px" }}>🚗</span>
        车辆信息
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "13px", color: "#5A6A7A" }}>车型</span>
          <span style={{ fontSize: "13px", color: "#1F2D3D" }}>SUV · 白色</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "13px", color: "#5A6A7A" }}>车牌</span>
          <span style={{ fontSize: "13px", color: "#1F2D3D" }}>粤B·***88</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "13px", color: "#5A6A7A" }}>剩余座位</span>
          <span style={{ fontSize: "13px", color: "#00B38A", fontWeight: 500 }}>2座</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "13px", color: "#5A6A7A" }}>装备类型</span>
          <span style={{ fontSize: "12px", background: "#FEF0F0", color: "#F56C6C", padding: "2px 8px", borderRadius: "4px" }}>可重装</span>
        </div>
      </div>
    </div>
  );
}

function TripReviews() {
  const reviews = [
    { id: 1, user: "钓友小李", rating: 5, comment: "车主很准时，车况很好，推荐！", time: "3天前" },
    { id: 2, user: "海钓达人", rating: 5, comment: "老王人很好，下次还拼他的车", time: "1周前" },
  ];

  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ fontSize: "14px", fontWeight: 500, color: "#1F2D3D", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "16px" }}>⭐</span>
        行程评价
      </div>
      {reviews.map((review) => (
        <div key={review.id} style={{ paddingBottom: "12px", marginBottom: "12px", borderBottom: "1px solid #F0F2F5" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "13px", color: "#1F2D3D", fontWeight: 500 }}>{review.user}</span>
            <div style={{ display: "flex", gap: "2px" }}>
              {[1,2,3,4,5].map((i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= review.rating ? "#FFB800" : "#E0E6ED"}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
          </div>
          <div style={{ fontSize: "12px", color: "#5A6A7A", lineHeight: 1.5 }}>{review.comment}</div>
          <div style={{ fontSize: "11px", color: "#A0AAB8", marginTop: "4px" }}>{review.time}</div>
        </div>
      ))}
    </div>
  );
}

export default function DriverDetailPage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2000);
  };

  const handleBack = () => navigate(-1);

  const handleInvite = () => {
    showToast("已邀请，可在待进行订单中查看");
  };

  return (
    <PageContainer>
      <div style={{ width: '100%', maxWidth: 402, height: '100%', background: '#F0F3F6', position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
        <StatusBar background="#fff" showBatteryPercent={false} />

        <div style={{ flexShrink: 0, height: "52px", background: "white", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", boxShadow: "0 0.5px 0 rgba(0,0,0,0.10)" }}>
          <button onClick={handleBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44 }}>
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M9 1L1 9L9 17" stroke="#1F2D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span style={{ fontSize: "17px", color: "#1F2D3D", fontWeight: 600, letterSpacing: "0.1px" }}>车主详情</span>
          <div style={{ width: 44, height: 44 }} />
        </div>

        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", scrollbarWidth: "thin", scrollbarColor: "rgba(160,170,184,0.35) transparent" }}>
          <div style={{ padding: "12px 16px 0" }}>
            <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "3px", height: "13px", background: "#00B38A", borderRadius: "2px" }} />
              <span style={{ fontSize: "12px", color: "#A0AAB8", letterSpacing: "0.3px" }}>行程路线预览</span>
            </div>
            <MapPreview onViewRoute={() => showToast("展开详细路线")} />
            <RouteCard />
          </div>

          <div style={{ padding: "12px 16px 0" }}>
            <ProfileCard />
          </div>

          <div style={{ padding: "12px 16px 0" }}>
            <VehicleInfo />
          </div>

          <div style={{ padding: "12px 16px 0" }}>
            <TripReviews />
          </div>

          <div style={{ margin: "12px 16px 0", padding: "10px 14px", background: "rgba(245,108,108,0.05)", borderRadius: "10px", border: "1px solid rgba(245,108,108,0.09)", display: "flex", gap: "8px", alignItems: "flex-start" }}>
            <span style={{ fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>⚠️</span>
            <p style={{ fontSize: "11px", color: "#5A6A7A", margin: 0, lineHeight: 1.65 }}>
              出行前请确认对方身份。如遇紧急情况请立即拨打<span style={{ color: "#F56C6C", fontWeight: 600 }}> 110</span>。注意出行安全。
            </p>
          </div>

          <div style={{ height: "14px" }} />
        </div>

        <div style={{ flexShrink: 0, background: "white", padding: "10px 16px 14px", boxShadow: "0 -1px 0 rgba(0,0,0,0.06), 0 -4px 14px rgba(0,0,0,0.04)", display: "flex", gap: "10px" }}>
          <button onClick={handleBack} style={{ flexShrink: 0, height: "44px", borderRadius: "8px", border: "1.5px solid #E0E6ED", background: "white", color: "#5A6A7A", fontSize: "14px", cursor: "pointer", padding: "0 14px", display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 12L4 7L9 2" stroke="#5A6A7A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            返回
          </button>
          <button onClick={handleInvite} style={{ flex: 1, height: "44px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #00C49A 0%, #00A880 100%)", color: "white", fontSize: "15px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(0,179,138,0.36)", letterSpacing: "0.5px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <span style={{ fontSize: "16px" }}>🤝</span>
            邀请拼车
          </button>
        </div>

        <Toast message={toast.message} visible={toast.visible} />
      </div>
    </PageContainer>
  );
}
