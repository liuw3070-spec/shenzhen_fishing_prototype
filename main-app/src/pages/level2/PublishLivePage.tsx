import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import StatusBar from "../../components/StatusBar";

// ---- Types ----
type TabType = "shore" | "boat";
type AlertType = { message: string; visible: boolean };

// ---- Helpers ----
function now() {
  return "2026-03-31 09:41";
}

// ---- Toast Alert ----
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ pointerEvents: "all" }}
      onClick={onClose}
    >
      <div
        className="px-5 py-3 rounded-xl shadow-xl text-white text-center"
        style={{
          background: "rgba(0,0,0,0.72)",
          fontSize: 14,
          maxWidth: 260,
          lineHeight: "22px",
          backdropFilter: "blur(8px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {message}
        <div className="mt-3">
          <button
            className="px-5 py-1 rounded-lg text-white"
            style={{ background: "#00B38A", fontSize: 13 }}
            onClick={onClose}
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Section Card ----
function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white mx-4 p-4 ${className}`}
      style={{ borderRadius: 12, marginBottom: 8 }}
    >
      {children}
    </div>
  );
}

// ---- Section Label ----
function SectionLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <div className="flex items-center gap-1 mb-3">
      <span style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>{children}</span>
      {required && <span style={{ color: "#F56C6C", fontSize: 14 }}>*</span>}
    </div>
  );
}

// ---- Fish Tags Component ----
const FISH_LIST = ["鲈鱼", "金枪鱼", "黑鲷", "草鱼", "鲫鱼", "带鱼", "马鲛鱼"];

function FishTagsRow({
  selected,
  onToggle,
  custom,
  onCustomChange,
}: {
  selected: string[];
  onToggle: (f: string) => void;
  custom: string;
  onCustomChange: (v: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={scrollRef}
      className="flex items-center gap-2 overflow-x-auto pb-1"
      style={{ scrollbarWidth: "none" }}
    >
      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>
      {FISH_LIST.map((f) => (
        <button
          key={f}
          onClick={() => onToggle(f)}
          className="flex-shrink-0 px-3 py-1 rounded-full transition-all"
          style={{
            fontSize: 12,
            border: selected.includes(f) ? "1.5px solid #00B38A" : "1.5px solid #E4E7ED",
            background: selected.includes(f) ? "#E6F7F3" : "#F5F7FA",
            color: selected.includes(f) ? "#00B38A" : "#606266",
            whiteSpace: "nowrap",
          }}
        >
          {f}
        </button>
      ))}
      <input
        value={custom}
        onChange={(e) => onCustomChange(e.target.value)}
        placeholder="自定义"
        className="flex-shrink-0 outline-none"
        style={{
          fontSize: 12,
          border: "1.5px solid #E4E7ED",
          borderRadius: 20,
          padding: "3px 12px",
          width: 72,
          color: "#606266",
          background: "#F5F7FA",
        }}
      />
    </div>
  );
}

// ---- Situation Tags ----
const SITUATION_TAGS = ["爆箱", "空军", "大物", "涨潮", "泥泞", "停车方便", "人少", "人多"];

function SituationTags({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (t: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {SITUATION_TAGS.map((tag) => {
        const active = selected.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            className="px-3 py-1 rounded-full transition-all"
            style={{
              fontSize: 12,
              border: active ? "1.5px solid #00B38A" : "1.5px solid #E4E7ED",
              background: active ? "#E6F7F3" : "#F5F7FA",
              color: active ? "#00B38A" : "#606266",
            }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

// ---- Main App ----
export default function App() {
  const navigate = useNavigate();

  // Navigation
  const [alert, setAlert] = useState<AlertType>({ message: "", visible: false });

  // Section 1: Association
  const [tab, setTab] = useState<TabType>("shore");
  const [selectedShore, setSelectedShore] = useState("");
  const [selectedBoat, setSelectedBoat] = useState("");

  // Section 2: Media & Text
  const [photos, setPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  // Section 3: Catch info
  const [fishSelected, setFishSelected] = useState<string[]>([]);
  const [fishCustom, setFishCustom] = useState("");
  const [fishCount, setFishCount] = useState(1);
  const [fishWeight, setFishWeight] = useState("");

  // Section 4: Tags
  const [sitTags, setSitTags] = useState<string[]>([]);

  // Section 5: Location
  const [location] = useState("南山区·深圳湾");

  const showAlert = (msg: string) => setAlert({ message: msg, visible: true });
  const hideAlert = () => setAlert({ message: "", visible: false });

  // Validate publish
  const canPublish =
    (tab === "shore" ? selectedShore.length > 0 : selectedBoat.length > 0) &&
    (photos.length > 0 || description.trim().length >= 5);

  const handlePublish = () => {
    const hasAssoc = tab === "shore" ? selectedShore.length > 0 : selectedBoat.length > 0;
    const hasContent = photos.length > 0 || description.trim().length >= 5;
    if (!hasAssoc || !hasContent) {
      showAlert("请选择关联钓点/船班并填写内容");
    } else {
      showAlert("提交成功，审核通过后展示");
    }
  };

  const toggleFish = (f: string) => {
    setFishSelected((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const toggleSit = (t: string) => {
    setSitTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  // Mock photo thumbnails
  const mockColors = ["#B2E8DA", "#FFDDD2", "#D2E8FF"];

  return (
    <PageContainer>
      <div
        className="relative overflow-hidden"
        style={{
          width: "100%",
          maxWidth: 402,
          height: "100%",
          background: "#F5F7FA",
          flexShrink: 0,
          fontFamily:
            '-apple-system, "PingFang SC", "Helvetica Neue", Arial, sans-serif',
          borderRadius: 0,
          boxShadow: '0 0 40px rgba(0,0,0,0.1)',
        }}
      >
      {/* Global scrollbar style */}
      <style>{`
        .mini-scroll::-webkit-scrollbar {
          width: 2px;
          height: 2px;
        }
        .mini-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .mini-scroll::-webkit-scrollbar-thumb {
          background: #E4E7ED;
          border-radius: 2px;
        }
        .mini-scroll {
          scrollbar-width: thin;
          scrollbar-color: #E4E7ED transparent;
        }
        .no-scroll::-webkit-scrollbar { display: none; }
        .no-scroll { scrollbar-width: none; }
        textarea:focus, input:focus { outline: none; }
      `}</style>

      {/* ── Status Bar ── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 30, background: "#FFFFFF" }}>
        <StatusBar />

        {/* ── Navigation Bar ── */}
        <div
          className="flex items-center justify-between px-4"
          style={{
            height: 44,
            background: "#FFFFFF",
            borderBottom: "1px solid #F0F0F0",
          }}
        >
          {/* Left: Back */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            onClick={() => navigate("/publish")}
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M9 1L1 9L9 17" stroke="#1F2D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Center: Title */}
          <span style={{ fontSize: 18, fontWeight: 500, color: "#1C1C1E" }}>发布实况</span>

          {/* Right: Publish */}
          <button
            onClick={handlePublish}
            className="px-3 py-1 rounded-lg transition-all"
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: canPublish ? "#00B38A" : "#C0C4CC",
              background: canPublish ? "#E6F7F3" : "#F5F7FA",
              border: "none",
              cursor: canPublish ? "pointer" : "default",
            }}
          >
            发布
          </button>
        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div
        className="mini-scroll"
        style={{
          position: "absolute",
          top: 88,
          left: 0,
          right: 0,
          bottom: 56,
          overflowY: "auto",
          overflowX: "hidden",
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        {/* ══ 1. 关联对象选择 ══ */}
        <SectionCard>
          <SectionLabel required>关联钓点/船班</SectionLabel>

          {/* Tab switcher */}
          <div
            className="flex mb-3"
            style={{
              background: "#F5F7FA",
              borderRadius: 8,
              padding: 3,
              gap: 3,
            }}
          >
            {(["shore", "boat"] as TabType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-1 transition-all"
                style={{
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  background: tab === t ? "#FFFFFF" : "transparent",
                  color: tab === t ? "#00B38A" : "#909399",
                  boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  border: "none",
                }}
              >
                {t === "shore" ? "岸钓钓点" : "出海船班"}
              </button>
            ))}
          </div>

          {/* Selector */}
          {tab === "shore" ? (
            <button
              className="w-full flex items-center justify-between px-3 py-3 rounded-lg"
              style={{
                background: "#F5F7FA",
                border: selectedShore ? "1.5px solid #00B38A" : "1.5px solid #E4E7ED",
              }}
              onClick={() => {
                showAlert("调起钓点选择页");
                setSelectedShore("深圳湾公园码头");
              }}
            >
              <span style={{ fontSize: 14, color: selectedShore ? "#1C1C1E" : "#C0C4CC" }}>
                {selectedShore || "搜索或地图选点"}
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="#909399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <button
              className="w-full flex items-center justify-between px-3 py-3 rounded-lg"
              style={{
                background: "#F5F7FA",
                border: selectedBoat ? "1.5px solid #00B38A" : "1.5px solid #E4E7ED",
              }}
              onClick={() => {
                showAlert("调起船班列表");
                setSelectedBoat("深海钓鱼号·周六班");
              }}
            >
              <span style={{ fontSize: 14, color: selectedBoat ? "#1C1C1E" : "#C0C4CC" }}>
                {selectedBoat || "选择已参与的船班"}
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="#909399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </SectionCard>

        {/* ══ 2. 图文内容 ══ */}
        <SectionCard>
          <SectionLabel required>图文内容</SectionLabel>

          {/* Upload area */}
          <div className="mb-3">
            <div
              className="flex items-center gap-2 mb-2"
              style={{ fontSize: 12, color: "#909399" }}
            >
              <span>添加图片/视频（最多9张）</span>
              <span style={{ color: photos.length >= 9 ? "#F56C6C" : "#C0C4CC" }}>
                {photos.length}/9
              </span>
            </div>
            <div className="flex items-start gap-2 flex-wrap">
              {/* Thumbnails */}
              {photos.map((_, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0"
                  style={{ width: 72, height: 72, borderRadius: 8, background: mockColors[i % mockColors.length], overflow: "hidden" }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="3" fill="rgba(0,179,138,0.3)"/>
                      <circle cx="8.5" cy="8.5" r="1.5" fill="#00B38A"/>
                      <path d="M3 15L8 10L11 13L14 10L21 17" stroke="#00B38A" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <button
                    className="absolute top-1 right-1 flex items-center justify-center"
                    style={{ width: 16, height: 16, borderRadius: 8, background: "rgba(0,0,0,0.45)" }}
                    onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 1L7 7M7 1L1 7" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              ))}

              {/* Add button */}
              {photos.length < 9 && (
                <button
                  onClick={() => {
                    showAlert("选择图片或视频");
                    if (photos.length < 9) setPhotos((p) => [...p, `photo_${p.length}`]);
                  }}
                  className="flex-shrink-0 flex flex-col items-center justify-center gap-1"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 8,
                    border: "1.5px dashed #C0C4CC",
                    background: "#FAFAFA",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4V16M4 10H16" stroke="#C0C4CC" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: 11, color: "#C0C4CC" }}>添加</span>
                </button>
              )}
            </div>
          </div>

          {/* Text description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="分享今天的渔获、钓点实况、鱼情信息...（至少5个字）"
            className="w-full resize-none"
            style={{
              height: 100,
              fontSize: 14,
              color: "#1C1C1E",
              background: "#F5F7FA",
              border: "1.5px solid #E4E7ED",
              borderRadius: 8,
              padding: "10px 12px",
              lineHeight: "22px",
            }}
          />
          <div className="flex justify-between items-center mt-1">
            {description.length > 0 && description.length < 5 && (
              <span style={{ fontSize: 11, color: "#F56C6C" }}>内容至少需要5个字</span>
            )}
            {!(description.length > 0 && description.length < 5) && <span />}
            <span style={{ fontSize: 11, color: "#C0C4CC" }}>
              {description.length}/500
            </span>
          </div>
        </SectionCard>

        {/* ══ 3. 渔获信息 ══ */}
        <SectionCard>
          <SectionLabel>渔获信息（选填）</SectionLabel>

          {/* Fish species tags */}
          <div className="mb-3">
            <div style={{ fontSize: 12, color: "#909399", marginBottom: 8 }}>选择鱼种</div>
            <FishTagsRow
              selected={fishSelected}
              onToggle={toggleFish}
              custom={fishCustom}
              onCustomChange={setFishCustom}
            />
          </div>

          {/* Count + Weight */}
          <div className="flex items-center gap-4">
            {/* Count stepper */}
            <div className="flex items-center gap-2 flex-1">
              <span style={{ fontSize: 12, color: "#909399", flexShrink: 0 }}>数量</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (fishCount > 0) setFishCount((c) => c - 1);
                  }}
                  className="flex items-center justify-center"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    border: "1.5px solid #E4E7ED",
                    background: fishCount > 0 ? "#FFF" : "#F5F7FA",
                    color: fishCount > 0 ? "#1C1C1E" : "#C0C4CC",
                    fontSize: 18,
                    lineHeight: 1,
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    width: 36,
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#1C1C1E",
                  }}
                >
                  {fishCount}
                </span>
                <button
                  onClick={() => setFishCount((c) => c + 1)}
                  className="flex items-center justify-center"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    border: "1.5px solid #00B38A",
                    background: "#E6F7F3",
                    color: "#00B38A",
                    fontSize: 18,
                    lineHeight: 1,
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Weight */}
            <div className="flex items-center gap-2 flex-1">
              <span style={{ fontSize: 12, color: "#909399", flexShrink: 0 }}>重量</span>
              <div
                className="flex items-center"
                style={{
                  border: "1.5px solid #E4E7ED",
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "#F5F7FA",
                  flex: 1,
                }}
              >
                <input
                  value={fishWeight}
                  onChange={(e) => setFishWeight(e.target.value)}
                  placeholder="0.0"
                  type="number"
                  min="0"
                  step="0.1"
                  className="flex-1 min-w-0"
                  style={{
                    fontSize: 14,
                    color: "#1C1C1E",
                    background: "transparent",
                    border: "none",
                    padding: "5px 8px",
                    width: "100%",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    color: "#909399",
                    paddingRight: 8,
                    flexShrink: 0,
                  }}
                >
                  kg
                </span>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ══ 4. 实况标签 ══ */}
        <SectionCard>
          <SectionLabel>实况标签（选填）</SectionLabel>
          <SituationTags selected={sitTags} onToggle={toggleSit} />
        </SectionCard>

        {/* ══ 5. 位置与时间 ══ */}
        <SectionCard>
          <SectionLabel>位置与时间</SectionLabel>

          {/* Location */}
          <div
            className="flex items-center justify-between py-2 px-3 rounded-lg mb-2"
            style={{ background: "#F5F7FA", border: "1.5px solid #E4E7ED" }}
          >
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C4.79 1 3 2.79 3 5C3 7.5 7 13 7 13C7 13 11 7.5 11 5C11 2.79 9.21 1 7 1ZM7 6.5C6.17 6.5 5.5 5.83 5.5 5C5.5 4.17 6.17 3.5 7 3.5C7.83 3.5 8.5 4.17 8.5 5C8.5 5.83 7.83 6.5 7 6.5Z" fill="#00B38A"/>
              </svg>
              <span style={{ fontSize: 14, color: "#1C1C1E" }}>{location}</span>
            </div>
            <button
              onClick={() => showAlert("重新定位")}
              className="flex items-center justify-center"
              style={{ width: 28, height: 28, borderRadius: 6 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 2.5C12.1 1.1 10.15 0.25 8 0.25C3.72 0.25 0.25 3.72 0.25 8C0.25 12.28 3.72 15.75 8 15.75C11.61 15.75 14.63 13.37 15.52 10.08" stroke="#00B38A" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M13.5 2.5L10.5 5.5M13.5 2.5H10.5V5.5" stroke="#00B38A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Time */}
          <div
            className="flex items-center gap-2 py-2 px-3 rounded-lg"
            style={{ background: "#F5F7FA", border: "1.5px solid #E4E7ED" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#909399" strokeWidth="1.2"/>
              <path d="M7 4V7.5L9 9.5" stroke="#909399" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: 14, color: "#909399" }}>发布时间：{now()}</span>
            <span
              style={{
                marginLeft: "auto",
                fontSize: 11,
                color: "#C0C4CC",
                background: "#EBEEF5",
                borderRadius: 4,
                padding: "1px 6px",
              }}
            >
              自动
            </span>
          </div>
        </SectionCard>

        {/* Spacer */}
        <div style={{ height: 12 }} />
      </div>

      {/* ── Bottom Notice ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          background: "#FFFFFF",
          borderTop: "1px solid #F0F0F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: "#C0C4CC",
            textAlign: "center",
            lineHeight: "16px",
          }}
        >
          发布的实况将显示在钓点详情页和社区大厅，请遵守平台规范。
        </p>
      </div>

      {/* ── Toast ── */}
      {alert.visible && <Toast message={alert.message} onClose={hideAlert} />}
      </div>
    </PageContainer>
  );
}