import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StatusBar from "./StatusBar";

// ──────────────────────────────────────────
// Types
// ──────────────────────────────────────────
type CardStatus = "accepted" | "invited" | "highMatch";

interface Driver {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  trips: number;
  departTime: string;
  departDate: string;
  from: string;
  to: string;
  returnTime?: string;
  carType: string;
  plate: string;
  seats: number;
  gear: string;
  price: number;
  status: CardStatus;
  matchLabel?: string;
}

// ──────────────────────────────────────────
// Toast
// ──────────────────────────────────────────
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.72)",
        color: "#fff",
        borderRadius: 20,
        padding: "8px 20px",
        fontSize: 13,
        whiteSpace: "nowrap",
        zIndex: 999,
        pointerEvents: "none",
        transition: "opacity 0.3s",
        opacity: visible ? 1 : 0,
      }}
    >
      {message}
    </div>
  );
}

// ──────────────────────────────────────────
// Navigation Bar
// ──────────────────────────────────────────
function NavBar({ onBack }: { onBack: () => void }) {
  return (
    <div
      style={{
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        background: "#fff",
        borderBottom: "1px solid #F2F3F5",
        flexShrink: 0,
        position: "relative",
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
        }}
      >
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
          <path d="M9 1L1 9L9 17" stroke="#1F2D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <span
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 18,
          fontWeight: 500,
          color: "#1a1a1a",
        }}
      >
        车主意向列表
      </span>
      <div style={{ width: 56 }} />
    </div>
  );
}

// ──────────────────────────────────────────
// Order Summary Bar
// ──────────────────────────────────────────
function OrderSummaryBar() {
  return (
    <div
      style={{
        background: "#F7F8FA",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 4,
          height: 32,
          background: "#00B38A",
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontSize: 13, color: "#606266", lineHeight: 1.4 }}>当前订单</div>
        <div style={{ fontSize: 13, color: "#303133", fontWeight: 500, lineHeight: 1.5 }}>
          深圳大学北门 — 深圳湾公园码头
        </div>
        <div style={{ fontSize: 12, color: "#909399", lineHeight: 1.4 }}>5月20日 06:00–11:00</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// Driver Card
// ──────────────────────────────────────────
function DriverCard({
  driver,
  onToast,
  onGoOngoingOrderDetail,
}: {
  driver: Driver;
  onToast: (msg: string) => void;
  onGoOngoingOrderDetail: () => void;
}) {
  const isAccepted = driver.status === "accepted";
  const isInvited = driver.status === "invited";
  const isHighMatch = driver.status === "highMatch";

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        margin: "0 12px 12px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Status badge top-left */}
      {isAccepted && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            background: "#00B38A",
            color: "#fff",
            fontSize: 11,
            fontWeight: 500,
            padding: "3px 10px",
            borderRadius: "12px 0 12px 0",
          }}
        >
          已主动接单
        </div>
      )}
      {isInvited && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            background: "#909399",
            color: "#fff",
            fontSize: 11,
            fontWeight: 500,
            padding: "3px 10px",
            borderRadius: "12px 0 12px 0",
          }}
        >
          已邀请
        </div>
      )}
      {isHighMatch && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            background: "rgba(0,179,138,0.12)",
            color: "#00B38A",
            fontSize: 11,
            fontWeight: 500,
            padding: "3px 10px",
            borderRadius: "12px 0 12px 0",
            border: "1px solid rgba(0,179,138,0.25)",
          }}
        >
          高匹配度
        </div>
      )}

      {/* Card body */}
      <div style={{ padding: "36px 14px 14px" }}>
        {/* Top row: avatar + name + rating + action icons */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <img
            src={driver.avatar}
            alt={driver.name}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
              border: "1.5px solid #F2F3F5",
            }}
          />
          <div style={{ marginLeft: 10, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: "#303133" }}>
                {driver.name}
              </span>
              <span style={{ fontSize: 12, color: "#F5A623" }}>⭐ {driver.rating}</span>
              <span style={{ fontSize: 12, color: "#909399" }}>拼车 {driver.trips}次</span>
            </div>
          </div>
          {/* Action icons */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => onToast("联系车主")}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "#F0FBF8",
                border: "1px solid #D0F0E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.333 10.893c0 .26-.056.513-.175.76a2.84 2.84 0 01-.467.707c-.287.32-.607.48-.947.487-.24 0-.5-.06-.78-.187l-1.027-.513a8.43 8.43 0 01-1.22-.793l-.62-.62a8.657 8.657 0 01-.793-1.22L6.8 8.487c-.12-.28-.18-.54-.18-.787 0-.333.153-.647.453-.947.3-.3.627-.453.967-.453.133 0 .267.027.387.08l.4.16c.133.053.253.16.333.307l1.04 1.56a.693.693 0 01.06.64l-.307.613a.2.2 0 00.02.207c.2.36.453.7.747.993l.04.04c.293.293.633.547.993.747a.2.2 0 00.207.02l.613-.307a.68.68 0 01.307-.08c.12 0 .24.027.333.087l1.56 1.04c.147.08.253.2.307.333l.16.4c.053.12.08.253.08.38z" stroke="#00B38A" strokeWidth="1.2" />
              </svg>
            </button>
            <button
              onClick={() => onToast("联系车主")}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "#F0FBF8",
                border: "1px solid #D0F0E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.333 2H2.667C1.933 2 1.333 2.6 1.333 3.333v8c0 .734.6 1.334 1.334 1.334h1.333V14l2.667-1.333h6.666c.734 0 1.334-.6 1.334-1.334v-8C14.667 2.6 14.067 2 13.333 2zM5.333 7.333H4V6h1.333v1.333zm2.667 0H6.667V6H8v1.333zm2.667 0H9.333V6h1.334v1.333z" fill="#00B38A" />
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#F2F3F5", margin: "0 -14px 12px" }} />

        {/* Trip info */}
        <div style={{ marginBottom: 12 }}>
          {/* Timeline */}
          <div style={{ display: "flex", gap: 10 }}>
            {/* Timeline line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 3 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00B38A", flexShrink: 0 }} />
              <div style={{ width: 1.5, flex: 1, background: "#E4E7ED", margin: "3px 0" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F56C6C", flexShrink: 0 }} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <div>
                <div style={{ fontSize: 13, color: "#303133", fontWeight: 500 }}>
                  {driver.departDate} {driver.departTime}
                </div>
                <div style={{ fontSize: 12, color: "#606266" }}>{driver.from}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#303133", fontWeight: 500 }}>
                  {driver.to}
                </div>
                {driver.returnTime && (
                  <div style={{ fontSize: 12, color: "#909399" }}>返程：当天 {driver.returnTime}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#F2F3F5", margin: "0 -14px 12px" }} />

        {/* Vehicle & Price */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          <Tag icon="🚗">{driver.carType} · {driver.plate}</Tag>
          <Tag icon="💺">剩余 {driver.seats} 座</Tag>
          <Tag icon="🎒">{driver.gear}</Tag>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "#FFF8F0",
              border: "1px solid #FFE4BA",
              borderRadius: 6,
              padding: "2px 8px",
            }}
          >
            <span style={{ fontSize: 11, color: "#E6A23C" }}>AA</span>
            <span style={{ fontSize: 12, color: "#E6A23C", fontWeight: 500 }}>
              预估 ¥{driver.price}/人
            </span>
          </div>
        </div>

        {/* Bottom button */}
        {isAccepted && (
          <button
            onClick={() => {
              onToast("订单已成立，进入进行中订单详情页");
              setTimeout(() => onGoOngoingOrderDetail(), 350);
            }}
            style={{
              width: "100%",
              height: 40,
              background: "#00B38A",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            确认拼车
          </button>
        )}
        {isInvited && (
          <button
            disabled
            style={{
              width: "100%",
              height: 40,
              background: "#F2F3F5",
              color: "#C0C4CC",
              border: "none",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 500,
              cursor: "not-allowed",
              letterSpacing: 1,
            }}
          >
            等待接单
          </button>
        )}
        {isHighMatch && (
          <button
            onClick={() => onToast("已发送邀请，等待车主确认")}
            style={{
              width: "100%",
              height: 40,
              background: "#fff",
              color: "#00B38A",
              border: "1.5px solid #00B38A",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            邀请拼车
          </button>
        )}
      </div>
    </div>
  );
}

// Small tag helper
function Tag({ children, icon }: { children: ReactNode; icon?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        background: "#F7F8FA",
        border: "1px solid #EBEDF0",
        borderRadius: 6,
        padding: "2px 8px",
        fontSize: 12,
        color: "#606266",
      }}
    >
      {icon && <span style={{ fontSize: 11 }}>{icon}</span>}
      {children}
    </div>
  );
}

// ──────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────
const DRIVERS: Driver[] = [
  {
    id: 1,
    name: "阿强",
    avatar: "https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHBvcnRyYWl0JTIwYXZhdGFyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NzQ5NjExODB8MA&ixlib=rb-4.1.0&q=80&w=200",
    rating: 4.9,
    trips: 128,
    departDate: "5月20日",
    departTime: "06:00",
    from: "南山区·深圳大学北门",
    to: "深圳湾公园码头",
    returnTime: "12:00",
    carType: "SUV",
    plate: "粤B·8**3",
    seats: 2,
    gear: "可带重装",
    price: 42,
    status: "accepted",
  },
  {
    id: 2,
    name: "老李",
    avatar: "https://images.unsplash.com/photo-1700954343841-2134b33d569d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwbWFuJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDk2MTE4MHww&ixlib=rb-4.1.0&q=80&w=200",
    rating: 4.8,
    trips: 86,
    departDate: "5月20日",
    departTime: "06:00",
    from: "南山区·深圳大学北门",
    to: "深圳湾公园码头",
    returnTime: "12:00",
    carType: "轿车",
    plate: "粤A·6**1",
    seats: 3,
    gear: "可带轻装",
    price: 38,
    status: "invited",
  },
  {
    id: 3,
    name: "小张",
    avatar: "https://images.unsplash.com/photo-1774274372949-2436ad38cce7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBhZ2VkJTIwYXNpYW4lMjBtYW4lMjBvdXRkb29yfGVufDF8fHx8MTc3NDk2MTE4Mnww&ixlib=rb-4.1.0&q=80&w=200",
    rating: 4.7,
    trips: 52,
    departDate: "5月20日",
    departTime: "06:30",
    from: "南山区·深圳大学北门",
    to: "深圳湾公园码头",
    carType: "MPV",
    plate: "粤B·2**7",
    seats: 4,
    gear: "可带重装",
    price: 45,
    status: "highMatch",
    matchLabel: "高匹配度",
  },
  {
    id: 4,
    name: "王哥",
    avatar: "https://images.unsplash.com/photo-1611403119860-57c4937ef987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwbWFuJTIwY2FzdWFsJTIwc21pbGV8ZW58MXx8fHwxNzc0OTYxMTgzfDA&ixlib=rb-4.1.0&q=80&w=200",
    rating: 4.6,
    trips: 34,
    departDate: "5月20日",
    departTime: "06:00",
    from: "南山区·深圳大学北门",
    to: "深圳湾公园码头",
    returnTime: "13:00",
    carType: "SUV",
    plate: "粤C·5**9",
    seats: 2,
    gear: "可带中装",
    price: 40,
    status: "highMatch",
    matchLabel: "高匹配度",
  },
];

export default function IntentOwnerListPage() {
  const [toast, setToast] = useState({ visible: false, message: "" });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const goOngoingOrderDetail = () => {
    const url = orderId
      ? `/level3/ongoing-order-detail?orderId=${encodeURIComponent(orderId)}`
      : "/level3/ongoing-order-detail";
    navigate(url);
  };

  function showToast(msg: string) {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: "" }), 2200);
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 402,
        height: "100%",
        background: "#F7F8FA",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        fontFamily:
          '-apple-system, "SF Pro SC", "SF Pro Text", "PingFang SC", "Helvetica Neue", sans-serif',
      }}
    >
      {/* Status Bar – transparent bg */}
      <div style={{ background: "#fff", flexShrink: 0 }}>
        <StatusBar background="#fff" showBatteryPercent={false} />
      </div>

      {/* Navigation Bar */}
      <NavBar onBack={() => navigate(-1)} />

      {/* Scrollable Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          paddingBottom: 20,
        }}
        className="thin-scrollbar"
      >
        {/* Order Summary */}
        <OrderSummaryBar />

        {/* Section header */}
        <div
          style={{
            padding: "12px 16px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 13, color: "#606266" }}>
            按匹配度排序 · 共 {DRIVERS.length} 位车主
          </span>
          <span style={{ fontSize: 12, color: "#00B38A" }}>筛选</span>
        </div>

        {/* Cards */}
        {DRIVERS.map((d) => (
          <DriverCard
            key={d.id}
            driver={d}
            onToast={showToast}
            onGoOngoingOrderDetail={goOngoingOrderDetail}
          />
        ))}

        {/* Bottom hint */}
        <div style={{ textAlign: "center", padding: "8px 0 4px", fontSize: 12, color: "#C0C4CC" }}>
          — 已显示全部意向车主 —
        </div>
      </div>

      {/* Toast */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}