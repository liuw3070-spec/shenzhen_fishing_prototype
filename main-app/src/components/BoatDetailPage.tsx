import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "./StatusBar";
import { NavBar } from "./NavBar";
import { ImageCarousel } from "./ImageCarousel";
import { CoreInfoCard } from "./CoreInfoCard";
import { PriceProgressCard } from "./PriceProgressCard";
import { ComplianceCard } from "./ComplianceCard";
import { CancellationCard } from "./CancellationCard";
import { ToastMessage } from "./ToastMessage";

export function BoatDetailPage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleBack = () => navigate(-1);
  const handleShare = () => showToast("分享船班");

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 402,
        height: "100%",
        borderRadius: 0,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#F5F6FA',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", Arial, sans-serif',
        boxShadow: '0 0 40px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Status Bar */}
      <StatusBar />

      {/* Nav Bar */}
      <NavBar onBack={handleBack} onShare={handleShare} />

      {/* Scrollable Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          paddingBottom: 72,
          scrollbarWidth: "thin",
          scrollbarColor: "#E4E7ED transparent",
        }}
        className="custom-scrollbar"
      >
        <ImageCarousel />

        <div style={{ padding: "12px 12px 0 12px", display: "flex", flexDirection: "column", gap: 12 }}>
          <CoreInfoCard onLocationClick={() => showToast("查看码头位置")} onCallClick={() => showToast("联系船长：138-XXXX-8888")} />
          <PriceProgressCard />
          <ComplianceCard />
          <CancellationCard />
          <div style={{ height: 4 }} />
        </div>
      </div>

      {/* Bottom Fixed Button */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 16px 16px 16px",
          backgroundColor: "#F5F6FA",
          borderTop: "1px solid #EBEEF5",
        }}
      >
        <button
          onClick={() => {
            showToast("进入支付定金页面");
            setTimeout(() => navigate("/level3/crowdfunding"), 300);
          }}
          style={{
            width: "100%",
            height: 44,
            backgroundColor: "#00B38A",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: 0.5,
            transition: "opacity 0.15s",
          }}
          onMouseDown={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseUp={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          立即支付定金（¥120）
        </button>
      </div>

      {/* Toast */}
      {toast && <ToastMessage message={toast} />}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E4E7ED;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
