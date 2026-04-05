import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Types ───────────────────────────────────────────────────────────────────
type ModalType = "rideshar" | "boat" | "poi" | "post" | "tab" | "auth" | null;

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({
  visible,
  title,
  message,
  onClose,
  showAuth,
  onAuthConfirm,
}: {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  showAuth?: boolean;
  onAuthConfirm?: () => void;
}) {
  if (!visible) return null;
  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 300,
          background: "#fff",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ padding: "20px 20px 0" }}>
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#1C1C1E",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: 14,
              color: "#606266",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            {message}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            borderTop: "0.5px solid #E4E7ED",
          }}
        >
          {showAuth && onAuthConfirm ? (
            <>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "13px 0",
                  fontSize: 16,
                  color: "#606266",
                  background: "none",
                  border: "none",
                  borderRight: "0.5px solid #E4E7ED",
                  cursor: "pointer",
                  fontWeight: 400,
                }}
              >
                取消
              </button>
              <button
                onClick={onAuthConfirm}
                style={{
                  flex: 1,
                  padding: "13px 0",
                  fontSize: 16,
                  color: "#00B38A",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                去认证
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "13px 0",
                fontSize: 16,
                color: "#00B38A",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              知道了
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Function Card ────────────────────────────────────────────────────────────
function FunctionCard({
  icon,
  title,
  subtitle,
  iconBg,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  iconBg: string;
  onClick: () => void;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 16,
        boxShadow: pressed
          ? "0 1px 4px rgba(0,0,0,0.10)"
          : "0 2px 12px rgba(0,0,0,0.08)",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.12s ease, box-shadow 0.12s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 10,
        cursor: "pointer",
        border: "none",
        outline: "none",
        textAlign: "left",
        width: "100%",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#1C1C1E",
            lineHeight: 1.4,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: 12,
            color: "#909399",
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </span>
      </div>
    </button>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const CarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 11l2-5h10l2 5"
      stroke="#00B38A"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="2" y="11" width="20" height="7" rx="2" stroke="#00B38A" strokeWidth="1.8" />
    <circle cx="7" cy="18" r="2" fill="#00B38A" />
    <circle cx="17" cy="18" r="2" fill="#00B38A" />
    <path d="M2 14h20" stroke="#00B38A" strokeWidth="1" />
    <path d="M9 11v3M15 11v3" stroke="#00B38A" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const BoatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 18s2-2 4.5-2 4.5 2 4.5 2 2-2 4.5-2 4.5 2 4.5 2"
      stroke="#1D7FE8"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M5 14l2-6h10l2 6H5z"
      stroke="#1D7FE8"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 8V4" stroke="#1D7FE8" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 4l5 4" stroke="#1D7FE8" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="18" cy="7" r="1.5" fill="#1D7FE8" />
  </svg>
);

const PinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C8.69 2 6 4.69 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6z"
      stroke="#F5A623"
      strokeWidth="1.8"
    />
    <circle cx="12" cy="8" r="2.5" stroke="#F5A623" strokeWidth="1.8" />
    <path d="M18 5h2M19 4v2" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 3l-1.5 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.5L15 3H9z"
      stroke="#9B59B6"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="11" r="3.5" stroke="#9B59B6" strokeWidth="1.8" />
    <circle cx="18.5" cy="8.5" r="1" fill="#9B59B6" />
  </svg>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function PublishPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<{
    visible: boolean;
    title: string;
    message: string;
    showAuth?: boolean;
    onAuthConfirm?: () => void;
  }>({ visible: false, title: "", message: "" });

  const closeModal = () =>
    setModal({ visible: false, title: "", message: "" });

  // 页面跳转函数
  const goToCarpoolPost = () => navigate('/level2/carpool-post');
  const goToNewCorrection = () => navigate('/level2/new-correction');
  const goToPublishLive = () => navigate('/level2/publish-live');

  const handleRideshare = () => {
    goToCarpoolPost();
  };

  const handleBoat = () => {
    const isCertified = false;
    if (isCertified) {
      setModal({
        visible: true,
        title: "发布船班",
        message: "进入船班发布表单",
      });
    } else {
      setModal({
        visible: true,
        title: "权限不足",
        message: "需完成船东/商家企业认证，是否前往认证？",
        showAuth: true,
        onAuthConfirm: () => {
          closeModal();
          setTimeout(() => {
            setModal({
              visible: true,
              title: "前往认证",
              message: "正在跳转至认证中心，请完成船东/商家企业认证…",
            });
          }, 200);
        },
      });
    }
  };

  const handlePOI = () => {
    goToNewCorrection();
  };

  const handlePost = () => {
    goToPublishLive();
  };

  return (
    <div style={{ flex: 1, position: "relative", width: "100%", height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Page Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "#E4E7ED transparent",
        }}
        className="publish-scroll"
      >
        {/* Page Header */}
        <div
          style={{
            padding: "20px 16px 8px",
            background: "#fff",
            borderBottom: "0.5px solid #F0F2F5",
          }}
        >
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#1C1C1E",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            发布内容
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#00B38A",
              marginTop: 4,
              lineHeight: 1.4,
            }}
          >分享你的钓鱼旅程</p>
        </div>

        {/* Section label */}
        <div style={{ padding: "16px 16px 0" }}>
          <span
            style={{
              fontSize: 12,
              color: "#909399",
              letterSpacing: 0.5,
            }}
          >
            选择发布类型
          </span>
        </div>

        {/* 2x2 Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            padding: "12px 16px 24px",
          }}
        >
          <FunctionCard
            icon={<CarIcon />}
            title="发顺风车"
            subtitle="车主找人 / 乘客找车"
            iconBg="#E8F9F5"
            onClick={handleRideshare}
          />
          <FunctionCard
            icon={<BoatIcon />}
            title="发布海钓船班"
            subtitle="仅认证船东可发布"
            iconBg="#EAF2FD"
            onClick={handleBoat}
          />
          <FunctionCard
            icon={<PinIcon />}
            title="新建/纠错钓点"
            subtitle="补充新钓点或反馈问题"
            iconBg="#FEF5E7"
            onClick={handlePOI}
          />
          <FunctionCard
            icon={<CameraIcon />}
            title="发布实况/战报"
            subtitle="分享渔获、鱼情、基建"
            iconBg="#F3EAF9"
            onClick={handlePost}
          />
        </div>

        {/* Tips Section */}
        <div
          style={{
            margin: "0 16px 16px",
            background: "#fff",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <div
              style={{
                width: 3,
                height: 14,
                background: "#00B38A",
                borderRadius: 2,
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1E" }}>
              发布须知
            </span>
          </div>
          {[
            "顺风车：请确保行程信息真实，合法合规",
            "船班：需完成船东认证后方可发布",
            "钓点：贡献的POI数据将经审核后入库",
            "实况：请遵守平台规范，禁止发布违规内容",
          ].map((tip, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 6,
                marginBottom: i < 3 ? 8 : 0,
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#F0FAF6",
                  color: "#00B38A",
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: 12, color: "#606266", lineHeight: 1.5 }}>
                {tip}
              </span>
            </div>
          ))}
        </div>

        {/* Certification Banner */}
        <div
          style={{
            margin: "0 16px 24px",
            background: "linear-gradient(135deg, #00B38A 0%, #00C99B 100%)",
            borderRadius: 12,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={() =>
            setModal({
              visible: true,
              title: "船东认证",
              message: "前往完成船东/商家企业认证，开启船班发布权限",
            })
          }
        >
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: 0 }}>
              🚢 申请船东认证
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 3 }}>
              认证后可发布海钓船班信息
            </p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.25)",
              borderRadius: 8,
              padding: "6px 12px",
            }}
          >
            <span style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>
              去认证 →
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
        showAuth={modal.showAuth}
        onAuthConfirm={modal.onAuthConfirm}
      />

      {/* Custom scrollbar style */}
      <style>{`
        .publish-scroll::-webkit-scrollbar {
          width: 2px;
        }
        .publish-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .publish-scroll::-webkit-scrollbar-thumb {
          background: #E4E7ED;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
