import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StatusBar from "../../components/StatusBar";
import PageContainer from "../../components/PageContainer";

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute", bottom: 80, left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.72)", color: "#fff",
        padding: "8px 18px", borderRadius: 20, fontSize: 13,
        whiteSpace: "nowrap", pointerEvents: "none", transition: "opacity 0.25s",
        opacity: visible ? 1 : 0, zIndex: 999,
      }}
    >
      {message}
    </div>
  );
}

export default function SeaFishingOngoingOrderPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [toast, setToast] = useState({ message: "", visible: false });

  function showToast(msg: string) {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2000);
  }

  return (
    <PageContainer>
      <div
        style={{
          width: "100%", maxWidth: 402, height: "100%",
          background: "#F5F5F5", position: "relative",
          display: "flex", flexDirection: "column", overflow: "hidden",
          fontFamily: '-apple-system, "PingFang SC", "Helvetica Neue", Arial, sans-serif',
          flexShrink: 0,
        }}
      >
      {/* Status Bar */}
      <StatusBar />

      {/* Navigation Bar */}
      <div
        style={{
          height: 44, display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 16px",
          background: "#fff", borderBottom: "1px solid #f0f0f0", flexShrink: 0,
        }}
      >
        <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", padding: "4px 4px 4px 0", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9L9 17" stroke="#1F2D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: 16, color: "#1a1a1a" }}>返回</span>
        </button>

        <span style={{ fontSize: 16, fontWeight: 500, color: "#1a1a1a", letterSpacing: 0.3 }}>出海订单</span>

        <button onClick={() => showToast("订单问题反馈")} style={{ background: "none", border: "none", padding: "4px 0 4px 4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="22" height="6" viewBox="0 0 22 6" fill="none">
            <circle cx="3" cy="3" r="2.5" fill="#1a1a1a" />
            <circle cx="11" cy="3" r="2.5" fill="#1a1a1a" />
            <circle cx="19" cy="3" r="2.5" fill="#1a1a1a" />
          </svg>
        </button>
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 90 }} className="scroll-area">

        {/* Order Status Bar */}
        <div style={{ padding: "8px 12px 6px" }}>
          <div style={{ background: "#FFF3E0", borderRadius: 4, padding: "7px 12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#F56C6C" }}>⚠️ 待支付尾款，请在 23:59 前完成支付</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00B38A", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#333", fontWeight: 500 }}>已成团</span>
            <span style={{ color: "#ccc", fontSize: 13 }}>·</span>
            <span style={{ fontSize: 13, color: "#333", fontWeight: 500 }}>待登船</span>
          </div>
        </div>

        {/* Vessel & Captain Card */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 12, margin: "0 12px 6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #00B38A22 0%, #00B38A55 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>👨‍✈️</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>老张船长</span>
                <span style={{ fontSize: 12, color: "#FF9800" }}>⭐ 4.95</span>
              </div>
              <span style={{ fontSize: 11, color: "#888" }}>已出海 328 次</span>
            </div>
            <button onClick={() => showToast("联系船长")} style={{ width: 36, height: 36, borderRadius: "50%", background: "#00B38A12", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>📞</button>
          </div>

          <div style={{ height: 1, background: "#f2f2f2", margin: "10px 0" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>深海猎人号</span>
              {["金枪鱼", "鱿鱼"].map(tag => (
                <span key={tag} style={{ fontSize: 11, color: "#00B38A", background: "#00B38A14", padding: "2px 7px", borderRadius: 4 }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 12, color: "#888" }}>🗺️</span><span style={{ fontSize: 12, color: "#555" }}>三门岛外海</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 12, color: "#888" }}>⚓</span><span style={{ fontSize: 12, color: "#555" }}>南澳渔港集合</span>
              </div>
            </div>
            <div style={{ background: "#F8FFFE", borderRadius: 6, padding: "7px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 11, color: "#aaa", marginBottom: 1 }}>发船时间</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#00B38A" }}>2026.05.22&nbsp;&nbsp;06:00</div>
              </div>
              <span style={{ fontSize: 16, color: "#ccc" }}>→</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#aaa", marginBottom: 1 }}>返程时间</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#333" }}>当日&nbsp;&nbsp;16:00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Card */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 12, margin: "0 12px 6px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a" }}>费用明细</span>
            <span style={{ fontSize: 11, color: "#00B38A", background: "#00B38A14", padding: "2px 8px", borderRadius: 4, fontWeight: 500 }}>已满员</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <div style={{ flex: 1, background: "#F8F8F8", borderRadius: 8, padding: "9px 10px" }}>
              <div style={{ fontSize: 11, color: "#aaa", marginBottom: 3 }}>定金</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a" }}>¥120</div>
              <div style={{ fontSize: 11, color: "#00B38A", background: "#00B38A14", display: "inline-block", padding: "1px 6px", borderRadius: 3, marginTop: 3 }}>已支付</div>
            </div>
            <div style={{ flex: 1, background: "#FFF5F5", borderRadius: 8, padding: "9px 10px", border: "1px solid #F56C6C22" }}>
              <div style={{ fontSize: 11, color: "#aaa", marginBottom: 3 }}>尾款</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#F56C6C" }}>¥380</div>
              <div style={{ fontSize: 11, color: "#F56C6C", background: "#F56C6C14", display: "inline-block", padding: "1px 6px", borderRadius: 3, marginTop: 3 }}>待支付</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#555" }}>成行进度</span>
            <span style={{ fontSize: 12, color: "#1a1a1a", fontWeight: 500 }}>已拼 <span style={{ color: "#00B38A" }}>6</span> 人 / 最低成行 6 人</span>
          </div>
          <div style={{ height: 6, background: "#F0F0F0", borderRadius: 3, overflow: "hidden", marginBottom: 7 }}>
            <div style={{ width: "100%", height: "100%", background: "#00B38A", borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, color: "#999" }}>🎉 T-12h 已判定成团，定金已划扣</div>
        </div>

        {/* Weather Card */}
        <div style={{ background: "#F4FAF8", borderRadius: 8, padding: "10px 12px", margin: "0 12px 6px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "#555" }}>🌊 浪高 0.8m</span>
              <span style={{ color: "#ddd", fontSize: 12 }}>|</span>
              <span style={{ fontSize: 12, color: "#555" }}>💨 风力 4 级</span>
              <span style={{ color: "#ddd", fontSize: 12 }}>|</span>
              <span style={{ fontSize: 12, color: "#00B38A", fontWeight: 500 }}>✅ 适合出海</span>
            </div>
          </div>
        </div>

        {/* Order Info Card */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 12, margin: "0 12px 6px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {[
              { label: "订单编号", value: "HY20260522-00839" },
              { label: "下单时间", value: "2026-04-03  18:26" },
              { label: "出行人数", value: "1 位（成人）" },
              { label: "钓具租赁", value: "已选，¥30/套" },
              { label: "保险费", value: "已选，¥10/人" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#999" }}>{item.label}</span>
                <span style={{ fontSize: 12, color: "#333" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 8 }} />
      </div>

      {/* Bottom Button */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #f0f0f0", padding: "8px 12px 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: "#999" }}>待支付尾款</span>
          <span style={{ fontSize: 17, fontWeight: 600, color: "#F56C6C" }}>¥380</span>
        </div>
        <button onClick={() => showToast("跳转支付页完成尾款支付")} style={{ width: "100%", height: 44, background: "#00B38A", color: "#fff", fontSize: 15, fontWeight: 500, border: "none", borderRadius: 8, cursor: "pointer", letterSpacing: 0.5 }}>
          支付尾款 ¥380
        </button>
      </div>

      <Toast message={toast.message} visible={toast.visible} />

      <style>{`
        .scroll-area::-webkit-scrollbar { width: 2px; }
        .scroll-area::-webkit-scrollbar-thumb { background: #E4E7ED; border-radius: 2px; }
        .scroll-area::-webkit-scrollbar-track { background: transparent; }
      `}</style>
      </div>
    </PageContainer>
  );
}
