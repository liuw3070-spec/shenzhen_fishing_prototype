import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  ChevronRight,
  ChevronDown,
  Package,
  Shield,
  MapPin,
  MessageSquare,
  Fish,
  Anchor,
  User,
  Clock,
  Play,
  Star,
  List,
  BadgeCheck,
  FileText,
  Lock,
  Car,
} from "lucide-react";

// ── Toast Component ──────────────────────────────────────────────
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.85})`,
        background: "rgba(0,0,0,0.72)",
        color: "#fff",
        padding: "10px 22px",
        borderRadius: 10,
        fontSize: 14,
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
        transition: "opacity 0.22s, transform 0.22s",
        whiteSpace: "nowrap",
        maxWidth: 280,
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
}

// ── User Info Card ───────────────────────────────────────────────
function UserInfoCard({ onToast, onMySpotsClick, onMessagesClick, onSettingsClick }: { onToast: (msg: string) => void; onMySpotsClick: () => void; onMessagesClick: () => void; onSettingsClick: () => void }) {
  return (
    <div
      style={{
        background: "rgba(0,179,138,0.13)",
        borderRadius: 12,
        padding: 16,
        margin: "8px 12px 0",
        position: "relative",
      }}
    >
      <button
        onClick={onSettingsClick}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
        }}
      >
        <Settings size={20} color="#00B38A" strokeWidth={1.8} />
      </button>

      <div
        style={{ display: "flex", alignItems: "center", gap: 14 }}
        onClick={() => onToast("进入个人资料编辑")}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #c8f0e8 0%, #a0d8cc 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            cursor: "pointer",
            border: "2.5px solid rgba(0,179,138,0.3)",
          }}
        >
          <User size={36} color="#00B38A" strokeWidth={1.5} />
        </div>

        <div style={{ flex: 1, cursor: "pointer" }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "#1a1a1a",
              marginBottom: 5,
            }}
          >
            钓鱼老张
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span
              style={{
                background: "linear-gradient(90deg, #00B38A, #00d4a8)",
                color: "#fff",
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 20,
                fontWeight: 500,
              }}
            >
              LV3
            </span>
            <span style={{ fontSize: 13, color: "#00B38A", fontWeight: 500 }}>
              海钓达人
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Star size={13} color="#F5A623" fill="#F5A623" />
            <span style={{ fontSize: 12, color: "#606266" }}>
              积分 <span style={{ fontWeight: 600, color: "#1a1a1a" }}>98</span>
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 14,
          paddingTop: 12,
          borderTop: "1px solid rgba(0,179,138,0.2)",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.65)",
            borderRadius: 8,
            padding: "8px 6px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 600, color: "#00B38A" }}>12</div>
          <div style={{ fontSize: 10, color: "#909399", marginTop: 2 }}>已拼车（次）</div>
        </div>
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.65)",
            borderRadius: 8,
            padding: "8px 6px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 600, color: "#00B38A" }}>8</div>
          <div style={{ fontSize: 10, color: "#909399", marginTop: 2 }}>发布实况（次）</div>
        </div>
        <button
          onClick={onMySpotsClick}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.65)",
            borderRadius: 8,
            padding: "8px 6px",
            textAlign: "center",
            border: "none",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MapPin size={16} color="#F56C6C" strokeWidth={1.8} />
          </div>
          <div style={{ fontSize: 10, color: "#909399", marginTop: 4 }}>我的钓点</div>
        </button>
        <button
          onClick={onMessagesClick}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.65)",
            borderRadius: 8,
            padding: "8px 6px",
            textAlign: "center",
            border: "none",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MessageSquare size={16} color="#E6A23C" strokeWidth={1.8} />
            <span
              style={{
                position: "absolute",
                top: 6,
                right: 10,
                background: "#F56C6C",
                color: "#fff",
                fontSize: 9,
                fontWeight: 600,
                borderRadius: 8,
                padding: "1px 4px",
                lineHeight: 1.4,
                minWidth: 14,
                textAlign: "center",
              }}
            >
              3
            </span>
          </div>
          <div style={{ fontSize: 10, color: "#909399", marginTop: 4 }}>我的消息</div>
        </button>
      </div>
    </div>
  );
}

// ── Order Entry ──────────────────────────────────────────────────
function OrderEntry({ onOrderClick }: { onOrderClick: (status: string) => void }) {
  const entries = [
    { icon: Clock, label: "待出发", color: "#409EFF", bg: "#EBF4FF", tab: "pending" },
    { icon: Play, label: "进行中", color: "#00B38A", bg: "#E6F7F3", tab: "ongoing" },
    { icon: Star, label: "待评价", color: "#F5A623", bg: "#FEF6E7", tab: "to-review" },
    { icon: List, label: "全部订单", color: "#909399", bg: "#F2F3F5", tab: "all" },
  ];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "14px 16px",
        margin: "10px 12px 0",
      }}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: "#1a1a1a",
          marginBottom: 14,
        }}
      >
        我的订单
      </div>
      <div style={{ display: "flex", gap: 0 }}>
        {entries.map(({ icon: Icon, label, color, bg, tab }) => (
          <button
            key={label}
            onClick={() => onOrderClick(tab)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 0",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={22} color={color} strokeWidth={1.8} />
            </div>
            <span style={{ fontSize: 12, color: "#606266" }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Equipment Preset Card ────────────────────────────────────────
function EquipmentCard({ onToast }: { onToast: (msg: string) => void }) {
  const presets = [
    { label: "重装（带钓箱）", active: true },
    { label: "轻装出行", active: false },
  ];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "14px 16px",
        margin: "10px 12px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Package size={16} color="#00B38A" strokeWidth={1.8} />
          <span style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a" }}>装备预设</span>
        </div>
        <button
          onClick={() => onToast("修改装备预设")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: "#00B38A",
            fontWeight: 500,
            padding: "2px 0",
          }}
        >
          编辑
        </button>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {presets.map(({ label, active }) => (
          <span
            key={label}
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: active ? 500 : 400,
              background: active ? "rgba(0,179,138,0.1)" : "#F5F7FA",
              color: active ? "#00B38A" : "#909399",
              border: active ? "1px solid rgba(0,179,138,0.3)" : "1px solid #E4E7ED",
            }}
          >
            {active ? "✓ " : ""}{label}
          </span>
        ))}
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 11,
          color: "#C0C4CC",
          lineHeight: 1.5,
        }}
      >
        当前预设将在拼车报名时自动填写装备信息
      </div>
    </div>
  );
}

// ── My Car/Boat Card ─────────────────────────────────────────────
function MyVehicleCard({ onToast }: { onToast: (msg: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        margin: "10px 12px 0",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "14px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Car size={16} color="#00B38A" strokeWidth={1.8} />
          <span style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a" }}>我的车 / 船</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {!expanded && (
            <span style={{ fontSize: 12, color: "#909399" }}>特斯拉 Model Y</span>
          )}
          <ChevronDown
            size={16}
            color="#C0C4CC"
            strokeWidth={1.8}
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
            }}
          />
        </div>
      </button>

      {expanded && (
        <div
          style={{
            borderTop: "1px solid #F2F3F5",
            padding: "12px 16px 16px",
          }}
        >
          <div
            onClick={() => onToast("进入我的车辆详情")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#F7FFFE",
              borderRadius: 10,
              padding: "10px 12px",
              border: "1px solid rgba(0,179,138,0.15)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 110,
                height: 68,
                borderRadius: 8,
                overflow: "hidden",
                flexShrink: 0,
                background: "#EEF9F6",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1669625397150-7069a15b8f9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUZXNsYSUyME1vZGVsJTIwWSUyMFNVViUyMHdoaXRlJTIwcmVuZGVyJTIwc2lkZSUyMHZpZXd8ZW58MXx8fHwxNzc0OTQ5NzUwfDA&ixlib=rb-4.1.0&q=80&w=400"
                alt="特斯拉 Model Y"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 4 }}>
                特斯拉 Model Y
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                <span
                  style={{
                    fontSize: 11,
                    color: "#00B38A",
                    background: "rgba(0,179,138,0.08)",
                    border: "1px solid rgba(0,179,138,0.2)",
                    borderRadius: 4,
                    padding: "2px 6px",
                  }}
                >
                  SUV
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "#606266",
                    background: "#F5F7FA",
                    border: "1px solid #E4E7ED",
                    borderRadius: 4,
                    padding: "2px 6px",
                  }}
                >
                  可载 4 人
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "#606266",
                    background: "#F5F7FA",
                    border: "1px solid #E4E7ED",
                    borderRadius: 4,
                    padding: "2px 6px",
                  }}
                >
                  大后备箱
                </span>
              </div>
            </div>
            <ChevronRight size={15} color="#C0C4CC" strokeWidth={1.8} />
          </div>

          <button
            onClick={() => onToast("添加新车辆或船只")}
            style={{
              marginTop: 10,
              width: "100%",
              padding: "9px 0",
              borderRadius: 8,
              border: "1px dashed #C0C4CC",
              background: "none",
              fontSize: 13,
              color: "#909399",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
            添加车辆 / 船只
          </button>
        </div>
      )}
    </div>
  );
}

// ── Section List Item ────────────────────────────────────────────
function ListItem({
  icon: Icon,
  iconColor,
  iconBg,
  label,
  badge,
  badgeColor,
  onClick,
  last,
}: {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  label: string;
  badge?: string;
  badgeColor?: string;
  onClick: () => void;
  last?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "12px 0",
        borderBottom: last ? "none" : "1px solid #F2F3F5",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={17} color={iconColor} strokeWidth={1.8} />
      </div>
      <span
        style={{ flex: 1, fontSize: 14, color: "#1a1a1a", textAlign: "left" }}
      >
        {label}
      </span>
      {badge && (
        <span
          style={{
            fontSize: 12,
            color: badgeColor || "#909399",
            marginRight: 4,
            fontWeight: 400,
          }}
        >
          {badge}
        </span>
      )}
      <ChevronRight size={16} color="#C0C4CC" strokeWidth={1.8} />
    </button>
  );
}

// ── Compliance & Safety Card ─────────────────────────────────────
function ComplianceCard({ onToast }: { onToast: (msg: string) => void }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "6px 16px",
        margin: "10px 12px 0",
      }}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: "#1a1a1a",
          padding: "10px 0 4px",
          display: "flex",
          alignItems: "center",
          gap: 7,
          borderBottom: "1px solid #F2F3F5",
          marginBottom: 0,
        }}
      >
        <Shield size={16} color="#00B38A" strokeWidth={1.8} />
        合规与安全
      </div>
      <ListItem
        icon={BadgeCheck}
        iconColor="#00B38A"
        iconBg="#E6F7F3"
        label="实名认证"
        badge="已认证"
        badgeColor="#00B38A"
        onClick={() => onToast("进入实名认证页面")}
      />
      <ListItem
        icon={FileText}
        iconColor="#409EFF"
        iconBg="#EBF4FF"
        label="免责协议库"
        onClick={() => onToast("进入协议库页面")}
      />
      <ListItem
        icon={Lock}
        iconColor="#909399"
        iconBg="#F5F7FA"
        label="隐私设置"
        onClick={() => onToast("进入隐私设置页面")}
        last
      />
    </div>
  );
}

// ── Other Functions Card ─────────────────────────────────────────
function OtherFunctionsCard({ onToast }: { onToast: (msg: string) => void }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "6px 16px",
        margin: "10px 12px 0",
      }}
    >
      <ListItem
        icon={MessageSquare}
        iconColor="#909399"
        iconBg="#F5F7FA"
        label="客服与帮助"
        onClick={() => onToast("联系客服")}
        last
      />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function ProfilePage() {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  let toastTimer: ReturnType<typeof setTimeout> | null = null;

  const showToast = (msg: string) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToastMsg(msg);
    setToastVisible(true);
    toastTimer = setTimeout(() => setToastVisible(false), 1800);
  };

  const goToOrderList = (tab: string) => {
    navigate(`/level2/order-list?tab=${tab}`);
  };

  return (
    <div style={{ flex: 1, position: "relative", width: "100%", height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Scrollable Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
        className="custom-scrollbar"
      >
        <UserInfoCard onToast={showToast} onMySpotsClick={() => navigate("/shore?tab=我的钓点")} onMessagesClick={() => navigate("/level2/messages")} onSettingsClick={() => navigate("/level2/settings")} />
        <OrderEntry onOrderClick={goToOrderList} />
        <MyVehicleCard onToast={showToast} />
        <EquipmentCard onToast={showToast} />
        <ComplianceCard onToast={showToast} />
        <OtherFunctionsCard onToast={showToast} />

        <div
          style={{
            textAlign: "center",
            padding: "20px 0 16px",
            fontSize: 12,
            color: "#C0C4CC",
          }}
        >
          深钓鱼 V1.0.0
        </div>
      </div>

      <Toast message={toastMsg} visible={toastVisible} />

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
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #E4E7ED transparent;
        }
      `}</style>
    </div>
  );
}
