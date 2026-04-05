import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "./StatusBar";

type Identity = "driver" | "passenger";
type EquipmentType = "heavy" | "light" | null;

interface ToastState {
  visible: boolean;
  message: string;
}

export function CarpoolPostPage() {
  const navigate = useNavigate();
  const [identity, setIdentity] = useState<Identity>("driver");
  const [departureLocation, setDepartureLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [equipment, setEquipment] = useState<EquipmentType>(null);
  const [seats, setSeats] = useState(1);
  const [passengers, setPassengers] = useState(1);
  const [carModel, setCarModel] = useState("");
  const [carPlate, setCarPlate] = useState("");
  const [cost, setCost] = useState("");
  const [remark, setRemark] = useState("");
  const [toast, setToast] = useState<ToastState>({ visible: false, message: "" });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  const handleBack = () => navigate(-1);

  const handleIdentitySwitch = (newIdentity: Identity) => {
    setIdentity(newIdentity);
  };

  const handleSeatsChange = (delta: number) => {
    setSeats(prev => Math.min(6, Math.max(1, prev + delta)));
  };

  const handlePassengersChange = (delta: number) => {
    setPassengers(prev => Math.min(6, Math.max(1, prev + delta)));
  };

  const handlePublish = () => {
    showToast("已发布，可在待进行订单中查看");
  };

  return (
    <div className="relative flex flex-col" style={{ height: "100%", background: "#F7F8FA", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* Toast */}
      {toast.visible && (
        <div
          className="absolute left-1/2 z-50 px-4 py-3 rounded-xl text-white text-center"
          style={{
            top: "68px",
            transform: "translateX(-50%)",
            background: "rgba(31,45,61,0.88)",
            fontSize: "13px",
            maxWidth: "300px",
            width: "max-content",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            lineHeight: "1.5",
            backdropFilter: "blur(4px)",
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Status Bar */}
      <StatusBar />

      {/* Navigation Bar */}
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{
          height: "44px",
          background: "#ffffff",
          borderBottom: "1px solid #F0F2F5",
        }}
      >
        <button
          className="flex items-center justify-center"
          style={{ width: "44px", height: "44px", background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
          onClick={handleBack}
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9L9 17" stroke="#1F2D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span style={{ fontSize: "18px", fontWeight: 500, color: "#1F2D3D", letterSpacing: "0.5px" }}>
          发布拼车
        </span>

        <button
          className="flex items-center justify-center rounded-full"
          style={{ width: "36px", height: "36px", background: "#F7F8FA" }}
          onClick={() => showToast("更多操作")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="12" r="1.5" fill="#5A6A7A" />
            <circle cx="12" cy="12" r="1.5" fill="#5A6A7A" />
            <circle cx="19" cy="12" r="1.5" fill="#5A6A7A" />
          </svg>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-32" style={{ overscrollBehavior: "contain" }}>

        {/* Identity Switcher */}
        <div className="px-4 pt-4">
          <div
            className="flex p-1 rounded-xl"
            style={{ background: "#F0F2F5", gap: "4px" }}
          >
            <button
              className="flex-1 flex items-center justify-center rounded-lg transition-all"
              style={{
                height: "40px",
                fontSize: "15px",
                fontWeight: 500,
                background: identity === "driver" ? "#00B38A" : "transparent",
                color: identity === "driver" ? "#ffffff" : "#5A6A7A",
                boxShadow: identity === "driver" ? "0 2px 8px rgba(0,179,138,0.25)" : "none",
                transition: "all 0.2s ease",
              }}
              onClick={() => handleIdentitySwitch("driver")}
            >
              🚗 我是车主
            </button>
            <button
              className="flex-1 flex items-center justify-center rounded-lg transition-all"
              style={{
                height: "40px",
                fontSize: "15px",
                fontWeight: 500,
                background: identity === "passenger" ? "#00B38A" : "transparent",
                color: identity === "passenger" ? "#ffffff" : "#5A6A7A",
                boxShadow: identity === "passenger" ? "0 2px 8px rgba(0,179,138,0.25)" : "none",
                transition: "all 0.2s ease",
              }}
              onClick={() => handleIdentitySwitch("passenger")}
            >
              🎣 我是乘客
            </button>
          </div>
          <p style={{ fontSize: "12px", color: "#A0AAB8", marginTop: "8px", textAlign: "center" }}>
            {identity === "driver" ? "车主：发布空余座位，分担出行费用" : "乘客：寻找顺路车主，一起去钓点"}
          </p>
        </div>

        {/* Form Card */}
        <div className="mx-4 mt-4 rounded-xl overflow-hidden" style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>

          {/* Departure Location */}
          <button
            className="w-full flex items-center px-4"
            style={{ height: "56px", borderBottom: "1px solid #F5F6F8" }}
            onClick={() => showToast("调起地图选点（获取当前位置或手动选择）")}
          >
            <div className="flex items-center justify-center mr-3 rounded-lg" style={{ width: "32px", height: "32px", background: "#E8FBF6", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="10" r="3" stroke="#00B38A" strokeWidth="2" />
                <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" stroke="#00B38A" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div style={{ fontSize: "13px", color: "#A0AAB8", marginBottom: "1px" }}>出发地点 <span style={{ color: "#F56C6C" }}>*</span></div>
              <div style={{ fontSize: "14px", color: departureLocation ? "#1F2D3D" : "#C0C8D4" }}>
                {departureLocation || "点击选择上车点"}
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#A0AAB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Divider with arrow */}
          <div className="flex items-center px-4 py-1" style={{ background: "#FAFBFC" }}>
            <div className="flex items-center justify-center mr-3" style={{ width: "32px", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="#C0C8D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ height: "1px", flex: 1, background: "#F0F2F5" }} />
          </div>

          {/* Destination */}
          <button
            className="w-full flex items-center px-4"
            style={{ height: "56px", borderBottom: "1px solid #F5F6F8" }}
            onClick={() => showToast("调起地图选点（含POI静默裂变机制）")}
          >
            <div className="flex items-center justify-center mr-3 rounded-lg" style={{ width: "32px", height: "32px", background: "#FFF0F0", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#F56C6C" strokeWidth="2" />
                <circle cx="12" cy="10" r="3" stroke="#F56C6C" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div style={{ fontSize: "13px", color: "#A0AAB8", marginBottom: "1px" }}>目的地钓点 <span style={{ color: "#F56C6C" }}>*</span></div>
              <div style={{ fontSize: "14px", color: destination ? "#1F2D3D" : "#C0C8D4" }}>
                {destination || "选择目标钓场 / 野钓点"}
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#A0AAB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Recent fishing spots */}
          <div className="px-4 py-3" style={{ background: "#FAFBFC", borderBottom: "1px solid #F5F6F8" }}>
            <div style={{ fontSize: "12px", color: "#A0AAB8", marginBottom: "8px" }}>最近钓点</div>
            <div className="flex gap-2 flex-wrap">
              {["南山渔乐园", "观澜湖钓场", "铁岗水库"].map((spot) => (
                <button
                  key={spot}
                  className="px-3 py-1 rounded-full"
                  style={{
                    fontSize: "12px",
                    color: "#00B38A",
                    background: "#E8FBF6",
                    border: "1px solid #B3EAD9",
                  }}
                  onClick={() => {
                    setDestination(spot);
                    showToast(`已选择钓点：${spot}`);
                  }}
                >
                  📍 {spot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Departure & Return Time */}
        <div className="mx-4 mt-3 rounded-xl overflow-hidden" style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>

          {/* Card Header */}
          <div
            className="flex items-center px-4"
            style={{ height: "44px", borderBottom: "1px solid #F5F6F8", background: "#FAFBFC" }}
          >
            <div className="flex items-center justify-center mr-2 rounded-lg" style={{ width: "24px", height: "24px", background: "#EEF3FF", flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="3" stroke="#5B8AF5" strokeWidth="2" />
                <path d="M16 2v4M8 2v4M3 10h18" stroke="#5B8AF5" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 14h.01M12 14h.01M16 14h.01" stroke="#5B8AF5" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#1F2D3D" }}>出发往返时间</span>
            <span style={{ fontSize: "13px", color: "#F56C6C", marginLeft: "2px" }}>*</span>
            <span style={{ fontSize: "12px", color: "#A0AAB8", marginLeft: "6px" }}>支持设置返程时间</span>
          </div>

          {/* Timeline Layout */}
          <div className="flex" style={{ padding: "0" }}>
            {/* Left timeline track */}
            <div className="flex flex-col items-center" style={{ width: "48px", paddingTop: "18px", paddingBottom: "18px", flexShrink: 0 }}>
              {/* Go dot */}
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#00B38A", flexShrink: 0 }} />
              {/* Connecting line */}
              <div style={{
                flex: 1,
                width: "2px",
                background: isRoundTrip ? "linear-gradient(to bottom, #00B38A, #5B8AF5)" : "#E4E7ED",
                margin: "4px 0",
                minHeight: "28px",
                borderRadius: "1px",
              }} />
              {/* Return dot */}
              <div style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: isRoundTrip ? "#5B8AF5" : "#E4E7ED",
                flexShrink: 0,
                border: isRoundTrip ? "none" : "2px dashed #C0C8D4",
              }} />
            </div>

            {/* Right content */}
            <div className="flex-1" style={{ paddingRight: "0" }}>
              {/* Departure time row */}
              <button
                className="w-full flex items-center"
                style={{ height: "56px", paddingRight: "16px", borderBottom: "1px solid #F5F6F8" }}
                onClick={() => showToast("调起日期时间选择器（出发时间）")}
              >
                <div className="flex-1 text-left">
                  <div style={{ fontSize: "12px", color: "#A0AAB8", marginBottom: "2px" }}>
                    出发时间 <span style={{ color: "#F56C6C" }}>*</span>
                  </div>
                  <div style={{ fontSize: "14px", color: departureTime ? "#1F2D3D" : "#C0C8D4" }}>
                    {departureTime || "选择出发日期和时间"}
                  </div>
                </div>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="#A0AAB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Return time row */}
              <div
                className="flex items-center"
                style={{ height: "56px", paddingRight: "16px" }}
              >
                <div className="flex-1">
                  <div style={{ fontSize: "12px", color: "#A0AAB8", marginBottom: "2px" }}>
                    返程时间
                    <span style={{ fontSize: "11px", color: "#B3EAD9", marginLeft: "4px" }}>可选</span>
                  </div>
                  <button
                    style={{
                      fontSize: "14px",
                      color: isRoundTrip ? (returnTime ? "#1F2D3D" : "#C0C8D4") : "#C0C8D4",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    onClick={() => {
                      if (isRoundTrip) {
                        showToast("调起日期时间选择器（返程时间）");
                      } else {
                        showToast("请先开启返程时间");
                      }
                    }}
                  >
                    {isRoundTrip ? (returnTime || "选择返程日期和时间") : "暂不设置返程"}
                  </button>
                </div>
                {/* Toggle switch */}
                <button
                  style={{ flexShrink: 0, background: "none", border: "none", padding: 0, cursor: "pointer" }}
                  onClick={() => {
                    setIsRoundTrip(prev => !prev);
                    if (isRoundTrip) setReturnTime("");
                  }}
                  aria-label="开启返程"
                >
                  <div
                    style={{
                      width: "40px",
                      height: "22px",
                      borderRadius: "11px",
                      background: isRoundTrip ? "#00B38A" : "#D0D7E0",
                      position: "relative",
                      transition: "background 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: "#ffffff",
                        position: "absolute",
                        top: "3px",
                        left: isRoundTrip ? "21px" : "3px",
                        transition: "left 0.2s ease",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                      }}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Duration hint — only when both times set */}
          {isRoundTrip && (
            <div
              className="flex items-center gap-2 mx-4 mb-3 px-3 py-2 rounded-lg"
              style={{ background: "#F0FBF8", border: "1px solid #C8EFE5" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#00B38A" strokeWidth="2" />
                <path d="M12 7v5l3 3" stroke="#00B38A" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: "12px", color: "#00916E" }}>
                已开启返程 · 车主将在钓点接回乘客
              </span>
            </div>
          )}
        </div>

        {/* Equipment Volume */}
        <div className="mx-4 mt-3 rounded-xl p-4" style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center mb-3">
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#1F2D3D" }}>装备体积</span>
            <span style={{ fontSize: "14px", color: "#F56C6C", marginLeft: "2px" }}>*</span>
            <span style={{ fontSize: "12px", color: "#A0AAB8", marginLeft: "8px" }}>选择您的装备体积</span>
          </div>
          <div className="flex gap-3">
            <button
              className="flex-1 flex flex-col items-center justify-center rounded-xl py-3"
              style={{
                border: `2px solid ${equipment === "heavy" ? "#00B38A" : "#E4E7ED"}`,
                background: equipment === "heavy" ? "#00B38A" : "#ffffff",
                transition: "all 0.2s ease",
              }}
              onClick={() => setEquipment("heavy")}
            >
              <span style={{ fontSize: "22px", marginBottom: "4px" }}>🧳</span>
              <span style={{ fontSize: "14px", fontWeight: 500, color: equipment === "heavy" ? "#ffffff" : "#1F2D3D" }}>重装</span>
              <span style={{ fontSize: "11px", color: equipment === "heavy" ? "rgba(255,255,255,0.8)" : "#A0AAB8", marginTop: "2px" }}>带钓箱</span>
            </button>
            <button
              className="flex-1 flex flex-col items-center justify-center rounded-xl py-3"
              style={{
                border: `2px solid ${equipment === "light" ? "#00B38A" : "#E4E7ED"}`,
                background: equipment === "light" ? "#00B38A" : "#ffffff",
                transition: "all 0.2s ease",
              }}
              onClick={() => setEquipment("light")}
            >
              <span style={{ fontSize: "22px", marginBottom: "4px" }}>🎒</span>
              <span style={{ fontSize: "14px", fontWeight: 500, color: equipment === "light" ? "#ffffff" : "#1F2D3D" }}>轻装</span>
              <span style={{ fontSize: "11px", color: equipment === "light" ? "rgba(255,255,255,0.8)" : "#A0AAB8", marginTop: "2px" }}>仅竿包</span>
            </button>
          </div>
        </div>

        {/* Driver-specific or Passenger-specific fields */}
        <div
          style={{
            transition: "all 0.3s ease",
            overflow: "hidden",
          }}
        >
          {identity === "driver" ? (
            <div className="mx-4 mt-3 rounded-xl overflow-hidden" style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              {/* Remaining Seats */}
              <div className="px-4 py-4" style={{ borderBottom: "1px solid #F5F6F8" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "#1F2D3D" }}>
                      剩余空座数 <span style={{ color: "#F56C6C" }}>*</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#A0AAB8", marginTop: "2px" }}>可接送的乘客人数</div>
                  </div>
                  <div className="flex items-center" style={{ gap: "12px" }}>
                    <button
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: "32px", height: "32px",
                        border: "1.5px solid #E4E7ED",
                        background: seats <= 1 ? "#F7F8FA" : "#ffffff",
                        color: seats <= 1 ? "#C0C8D4" : "#1F2D3D",
                      }}
                      onClick={() => handleSeatsChange(-1)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                    <span style={{ fontSize: "20px", fontWeight: 600, color: "#00B38A", minWidth: "24px", textAlign: "center" }}>
                      {seats}
                    </span>
                    <button
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: "32px", height: "32px",
                        border: "1.5px solid #E4E7ED",
                        background: seats >= 6 ? "#F7F8FA" : "#ffffff",
                        color: seats >= 6 ? "#C0C8D4" : "#1F2D3D",
                      }}
                      onClick={() => handleSeatsChange(1)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Car Model */}
              <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid #F5F6F8" }}>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "#1F2D3D", marginBottom: "8px" }}>
                  车型
                  <span style={{ fontSize: "12px", fontWeight: 400, color: "#A0AAB8", marginLeft: "6px" }}>可选</span>
                </div>
                <input
                  className="w-full px-3 outline-none"
                  style={{
                    height: "44px",
                    border: "1px solid #E4E7ED",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#1F2D3D",
                    background: "#FAFBFC",
                  }}
                  placeholder="车型（如 SUV / 轿车 / MPV）"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                />
              </div>

              {/* Car Plate */}
              <div className="px-4 pt-3 pb-4">
                <div style={{ fontSize: "14px", fontWeight: 500, color: "#1F2D3D", marginBottom: "8px" }}>
                  车牌号
                  <span style={{ fontSize: "12px", fontWeight: 400, color: "#A0AAB8", marginLeft: "6px" }}>可选，显示时自动脱敏</span>
                </div>
                <input
                  className="w-full px-3 outline-none"
                  style={{
                    height: "44px",
                    border: "1px solid #E4E7ED",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#1F2D3D",
                    background: "#FAFBFC",
                  }}
                  placeholder="车牌（如 粤B·1234，展示时显示粤B·**34）"
                  value={carPlate}
                  onChange={(e) => setCarPlate(e.target.value)}
                />
                <div style={{ fontSize: "11px", color: "#A0AAB8", marginTop: "4px" }}>
                  🔒 仅展示后两位，保护您的隐私
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-4 mt-3 rounded-xl p-4" style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#1F2D3D" }}>
                    出行人数 <span style={{ color: "#F56C6C" }}>*</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#A0AAB8", marginTop: "2px" }}>包含您本人在内的出行人数</div>
                </div>
                <div className="flex items-center" style={{ gap: "12px" }}>
                  <button
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: "32px", height: "32px",
                      border: "1.5px solid #E4E7ED",
                      background: passengers <= 1 ? "#F7F8FA" : "#ffffff",
                      color: passengers <= 1 ? "#C0C8D4" : "#1F2D3D",
                    }}
                    onClick={() => handlePassengersChange(-1)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <span style={{ fontSize: "20px", fontWeight: 600, color: "#00B38A", minWidth: "24px", textAlign: "center" }}>
                    {passengers}
                  </span>
                  <button
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: "32px", height: "32px",
                      border: "1.5px solid #E4E7ED",
                      background: passengers >= 6 ? "#F7F8FA" : "#ffffff",
                      color: passengers >= 6 ? "#C0C8D4" : "#1F2D3D",
                    }}
                    onClick={() => handlePassengersChange(1)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AA Cost */}
        <div className="mx-4 mt-3 rounded-xl p-4" style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: "14px", fontWeight: 500, color: "#1F2D3D", marginBottom: "8px" }}>
            AA费用预估 <span style={{ color: "#F56C6C" }}>*</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center flex-1"
              style={{
                height: "44px",
                border: "1px solid #E4E7ED",
                borderRadius: "8px",
                background: "#FAFBFC",
                paddingLeft: "12px",
                paddingRight: "8px",
              }}
            >
              <span style={{ fontSize: "16px", color: "#5A6A7A", marginRight: "4px", fontWeight: 500 }}>¥</span>
              <input
                className="flex-1 outline-none bg-transparent"
                style={{ fontSize: "14px", color: "#1F2D3D" }}
                placeholder="输入金额"
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
              <span style={{ fontSize: "12px", color: "#A0AAB8" }}>元/人</span>
            </div>
            <button
              className="flex items-center justify-center rounded-lg px-3"
              style={{
                height: "44px",
                background: "#E8FBF6",
                border: "1px solid #B3EAD9",
                color: "#00B38A",
                fontSize: "13px",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
              onClick={() => showToast("显示附近拼车均价：深圳南山→铁岗水库 约¥28-45")}
            >
              参考均价
            </button>
          </div>
          <div className="flex items-center mt-2 gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#A0AAB8" strokeWidth="2" />
              <path d="M12 8v4M12 16h.01" stroke="#A0AAB8" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: "12px", color: "#A0AAB8" }}>建议参考平台均价：¥25-50 / 人</span>
          </div>
        </div>

        {/* Remark */}
        <div className="mx-4 mt-3 mb-2 rounded-xl p-4" style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: "14px", fontWeight: 500, color: "#1F2D3D", marginBottom: "8px" }}>
            备注
            <span style={{ fontSize: "12px", fontWeight: 400, color: "#A0AAB8", marginLeft: "6px" }}>可选</span>
          </div>
          <textarea
            className="w-full outline-none resize-none"
            style={{
              height: "80px",
              border: "1px solid #E4E7ED",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#1F2D3D",
              background: "#FAFBFC",
              padding: "10px 12px",
              fontFamily: "inherit",
            }}
            placeholder="如：可带路亚竿、集合点具体位置、注意事项等…"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
          <div style={{ textAlign: "right", fontSize: "11px", color: "#C0C8D4", marginTop: "4px" }}>
            {remark.length}/200
          </div>
        </div>

      </div>

      {/* Bottom Fixed Area */}
      <div
        className="flex-shrink-0 px-4 pt-3 pb-5"
        style={{
          background: "#ffffff",
          borderTop: "1px solid #F0F2F5",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
        }}
      >
        {/* Pre-authorization notice */}
        <div
          className="flex items-center justify-center gap-1 mb-3 px-4 py-2 rounded-lg"
          style={{ background: "#FFF8F0", border: "1px solid #FDEBD0" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#E6A23C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#E6A23C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: "11px", color: "#B07A2A", lineHeight: "1.4" }}>
            该笔资金仅为<strong>预授权冻结</strong>，未成行自动退回，无需担心
          </span>
        </div>

        {/* Publish Button */}
        <button
          className="w-full flex items-center justify-center rounded-xl"
          style={{
            height: "48px",
            background: "linear-gradient(135deg, #00C99A, #00B38A)",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: 600,
            letterSpacing: "1px",
            boxShadow: "0 4px 16px rgba(0,179,138,0.35)",
            border: "none",
          }}
          onClick={handlePublish}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: "8px" }}>
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {identity === "driver" ? "发布空座" : "发布需求"}
        </button>
      </div>
    </div>
  );
}