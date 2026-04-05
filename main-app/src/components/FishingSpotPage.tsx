import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "./StatusBar";

// ─── Toast / Alert ───────────────────────────────────────────────────────────
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "10px",
        fontSize: "14px",
        maxWidth: "280px",
        textAlign: "center",
        lineHeight: "1.5",
        whiteSpace: "pre-line",
        pointerEvents: "auto",
      }}
      onClick={onClose}
    >
      {message}
    </div>
  );
}

// ─── Nav Bar ──────────────────────────────────────────────────────────────────
function NavBar({
  mode,
  onBack,
  onToggleMode,
}: {
  mode: "new" | "correct";
  onBack: () => void;
  onToggleMode: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "44px",
        left: 0,
        right: 0,
        height: "44px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid #F2F2F2",
        zIndex: 90,
      }}
    >
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          width: 44,
          height: 44,
        }}
      >
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
          <path d="M9 1L1 9L9 17" stroke="#1F2D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Title */}
      <span style={{ fontSize: "18px", fontWeight: 500, color: "#1a1a1a" }}>钓点反馈</span>

      {/* Toggle */}
      <button
        onClick={onToggleMode}
        style={{
          background: "none",
          border: `1px solid #00B38A`,
          borderRadius: "6px",
          color: "#00B38A",
          fontSize: "12px",
          padding: "4px 8px",
          cursor: "pointer",
          minWidth: "60px",
          whiteSpace: "nowrap",
        }}
      >
        {mode === "new" ? "纠错钓点" : "新建钓点"}
      </button>
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
      <span style={{ fontSize: "14px", fontWeight: 500, color: "#303133" }}>{text}</span>
      {required && (
        <span style={{ fontSize: "14px", color: "#F56C6C", fontWeight: 500 }}>*</span>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function FishingSpotPage() {
  const navigate = useNavigate();
  const PRIMARY = "#00B38A";
  const BORDER = "#E4E7ED";
  const WARNING = "#F56C6C";

  // State
  const [mode, setMode] = useState<"new" | "correct">("new");
  const [toast, setToast] = useState<string | null>(null);
  const [spotName, setSpotName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [spotType, setSpotType] = useState("野钓水域");
  const [infraTags, setInfraTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [manualInfra, setManualInfra] = useState("");
  const [mockImages] = useState([
    { id: 1, color: "#B2DFDB" },
    { id: 2, color: "#80CBC4" },
    { id: 3, color: "#4DB6AC" },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const spotTypes = ["野钓水域", "收费黑坑", "海钓码头", "水库大坝"];
  const infraOptions = ["免费停车", "公共厕所", "小卖部", "充电桩", "遮阳棚", "夜间照明", "泥泞路", "需步行"];

  const toggleInfra = (tag: string) => {
    setInfraTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (!spotName.trim()) {
      showToast("请填写钓点名称");
      return;
    }
    if (!selectedLocation) {
      showToast("请选择钓点位置");
      return;
    }
    if (!spotType) {
      showToast("请选择钓点类型");
      return;
    }
    showToast("提交成功，感谢您的贡献！\n审核后上线");
  };

  const handleLocationTap = () => {
    setSelectedLocation("深圳湾公园·南山区");
    showToast("调起地图选点（支持POI静默裂变）");
  };

  const handleBack = () => navigate(-1);
  const handleToggleMode = () => {
    const next = mode === "new" ? "correct" : "new";
    setMode(next);
    showToast(next === "correct" ? "切换至纠错模式" : "切换至新建模式");
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 402,
        height: "100%",
        background: "#F5F7FA",
        borderRadius: "0px",
        position: "relative",
        overflow: "hidden",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", Arial, sans-serif',
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      }}
    >
      {/* Status Bar */}
      <StatusBar
        style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 100 }}
        showBatteryPercent={false}
      />

      {/* Nav Bar */}
      <NavBar mode={mode} onBack={handleBack} onToggleMode={handleToggleMode} />

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          top: "88px",
          left: 0,
          right: 0,
          bottom: "72px",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "12px 16px",
          scrollbarWidth: "thin",
          scrollbarColor: "#E4E7ED transparent",
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            width: 2px;
          }
          div::-webkit-scrollbar-track {
            background: transparent;
          }
          div::-webkit-scrollbar-thumb {
            background: #E4E7ED;
            border-radius: 2px;
          }
          textarea::-webkit-scrollbar {
            width: 2px;
          }
          textarea::-webkit-scrollbar-thumb {
            background: #E4E7ED;
            border-radius: 2px;
          }
        `}</style>

        {/* ① Mode Description Card */}
        <div
          style={{
            background: mode === "new" ? "#E8F8F4" : "#FFF3F3",
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "12px",
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            border: `1px solid ${mode === "new" ? "#B2E8DB" : "#FFCDD2"}`,
          }}
        >
          <span style={{ fontSize: "18px", marginTop: "0px" }}>
            {mode === "new" ? "📍" : "✏️"}
          </span>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 500, color: mode === "new" ? PRIMARY : WARNING, marginBottom: "2px" }}>
              {mode === "new" ? "新建模式" : "纠错模式"}
            </div>
            <div style={{ fontSize: "12px", color: "#606266", lineHeight: "1.6" }}>
              {mode === "new"
                ? "添加一个全新的钓点，帮助更多钓友。"
                : "选择已有钓点并提交修正信息。"}
            </div>
          </div>
        </div>

        {/* ─── 纠错专用字段（纠错模式） ─── */}
        {mode === "correct" && (
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "12px",
            }}
          >
            <FieldLabel text="选择要纠错的钓点" required />
            <div
              onClick={() => showToast("搜索已有钓点或地图选点")}
              style={{
                height: "44px",
                border: `1px solid ${BORDER}`,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 12px",
                cursor: "pointer",
                color: "#909399",
                fontSize: "14px",
                marginBottom: "16px",
              }}
            >
              <span>搜索钓点名称或地图选点</span>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1 1L7 7L1 13" stroke="#C0C4CC" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <FieldLabel text="纠错内容" required />
            <textarea
              placeholder="请描述需要纠正的信息，例如：位置偏移、名称错误等"
              style={{
                width: "100%",
                height: "80px",
                border: `1px solid ${BORDER}`,
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "14px",
                color: "#303133",
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
                lineHeight: "1.6",
              }}
            />
          </div>
        )}

        {/* ② Spot Name */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "12px",
          }}
        >
          <FieldLabel text="钓点名称" required />
          <input
            type="text"
            value={spotName}
            onChange={(e) => setSpotName(e.target.value)}
            placeholder="例如：深圳湾公园码头"
            style={{
              width: "100%",
              height: "44px",
              border: `1px solid ${spotName ? PRIMARY : BORDER}`,
              borderRadius: "8px",
              padding: "0 12px",
              fontSize: "14px",
              color: "#303133",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
              background: "#fff",
            }}
            onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
            onBlur={(e) => (e.target.style.borderColor = spotName ? PRIMARY : BORDER)}
          />
        </div>

        {/* ③ Spot Location */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "12px",
          }}
        >
          <FieldLabel text="钓点位置" required />
          <div
            onClick={handleLocationTap}
            style={{
              height: "44px",
              border: `1px solid ${selectedLocation ? PRIMARY : BORDER}`,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 12px",
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1C5.24 1 3 3.24 3 6C3 9.5 8 15 8 15C8 15 13 9.5 13 6C13 3.24 10.76 1 8 1ZM8 7.75C7.03 7.75 6.25 6.97 6.25 6C6.25 5.03 7.03 4.25 8 4.25C8.97 4.25 9.75 5.03 9.75 6C9.75 6.97 8.97 7.75 8 7.75Z"
                  fill={selectedLocation ? PRIMARY : "#C0C4CC"}
                />
              </svg>
              <span
                style={{
                  fontSize: "14px",
                  color: selectedLocation ? "#303133" : "#909399",
                }}
              >
                {selectedLocation || "点击地图选点"}
              </span>
            </div>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M1 1L7 7L1 13" stroke="#C0C4CC" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          {selectedLocation && (
            <div
              style={{
                marginTop: "8px",
                fontSize: "12px",
                color: "#909399",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>📐</span>
              <span>经度：114.035°E &nbsp; 纬度：22.513°N</span>
            </div>
          )}
        </div>

        {/* ④ Spot Type */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "12px",
          }}
        >
          <FieldLabel text="钓点类型" required />
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "4px",
              scrollbarWidth: "none",
            }}
          >
            <style>{`.type-scroll::-webkit-scrollbar{display:none}`}</style>
            {spotTypes.map((type) => {
              const active = spotType === type;
              return (
                <button
                  key={type}
                  onClick={() => setSpotType(type)}
                  style={{
                    flexShrink: 0,
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: `1px solid ${active ? PRIMARY : BORDER}`,
                    background: active ? PRIMARY : "#fff",
                    color: active ? "#fff" : "#606266",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontWeight: active ? 500 : 400,
                    transition: "all 0.15s",
                  }}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* ⑤ Infrastructure Tags */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "12px",
          }}
        >
          <FieldLabel text="基础设施（可多选）" />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            {infraOptions.map((tag) => {
              const active = infraTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleInfra(tag)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    border: `1px solid ${active ? PRIMARY : BORDER}`,
                    background: active ? "#E8F8F4" : "#F5F7FA",
                    color: active ? PRIMARY : "#606266",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontWeight: active ? 500 : 400,
                    transition: "all 0.15s",
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          {/* Manual Input */}
          <div>
            <div style={{ fontSize: "12px", color: "#909399", marginBottom: "6px" }}>
              手动输入其他设施（可选）
            </div>
            <input
              type="text"
              value={manualInfra}
              onChange={(e) => setManualInfra(e.target.value)}
              placeholder="例如：烧烤台、观景台"
              style={{
                width: "100%",
                height: "36px",
                border: `1px solid ${BORDER}`,
                borderRadius: "8px",
                padding: "0 12px",
                fontSize: "13px",
                color: "#303133",
                outline: "none",
                boxSizing: "border-box",
                background: "#F5F7FA",
              }}
              onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
              onBlur={(e) => (e.target.style.borderColor = BORDER)}
            />
          </div>
        </div>

        {/* ⑥ Description */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "12px",
          }}
        >
          <FieldLabel text="钓点描述（可选）" />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="描述钓点环境、鱼情、注意事项等..."
            style={{
              width: "100%",
              height: "80px",
              border: `1px solid ${BORDER}`,
              borderRadius: "8px",
              padding: "10px 12px",
              fontSize: "14px",
              color: "#303133",
              outline: "none",
              resize: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
              lineHeight: "1.6",
              background: "#fff",
            }}
            onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
            onBlur={(e) => (e.target.style.borderColor = BORDER)}
          />
          <div style={{ textAlign: "right", fontSize: "12px", color: "#C0C4CC", marginTop: "4px" }}>
            {description.length}/200
          </div>
        </div>

        {/* ⑦ Image Upload */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <FieldLabel text="钓点照片（最多9张）" />
            <span style={{ fontSize: "12px", color: "#909399" }}>{mockImages.length}/9</span>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {/* Existing mock images */}
            {mockImages.map((img) => (
              <div
                key={img.id}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  background: img.color,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15L16 10L11 15M3 21H21M3 21V3H21V21M8.5 8.5C8.5 9.33 7.83 10 7 10S5.5 9.33 5.5 8.5 6.17 7 7 7 8.5 7.67 8.5 8.5Z" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* Delete badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    width: "18px",
                    height: "18px",
                    background: "rgba(0,0,0,0.5)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 1L9 9M9 1L1 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            ))}
            {/* Upload button */}
            {mockImages.length < 9 && (
              <div
                onClick={() => showToast("选择图片（相册/拍照）")}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  border: `1.5px dashed ${BORDER}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  gap: "4px",
                  background: "#FAFAFA",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor = PRIMARY)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor = BORDER)
                }
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="#C0C4CC" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: "11px", color: "#C0C4CC" }}>添加照片</span>
              </div>
            )}
          </div>
          <div style={{ fontSize: "12px", color: "#C0C4CC", marginTop: "8px" }}>
            支持 JPG、PNG，单张不超过 5MB
          </div>
        </div>

        {/* Bottom Padding for fixed button */}
        <div style={{ height: "8px" }} />
      </div>

      {/* ─── Fixed Bottom Button ─── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "14px 16px",
          background: "#fff",
          borderTop: "1px solid #F2F2F2",
        }}
      >
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            height: "44px",
            background: PRIMARY,
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            transition: "opacity 0.15s",
          }}
          onMouseDown={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
          onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          提交反馈
        </button>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
