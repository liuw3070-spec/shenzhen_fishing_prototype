import React from "react";

export type StatusBarTone = "dark" | "light";

export interface StatusBarProps {
  /** 图标与文字颜色：dark = 深色（浅底栏），light = 浅色（深底栏） */
  tone?: StatusBarTone;
  background?: string;
  /** 是否在电池旁显示「100%」 */
  showBatteryPercent?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const StatusBar: React.FC<StatusBarProps> = ({
  tone = "dark",
  background = "transparent",
  showBatteryPercent = true,
  className,
  style,
}) => {
  const ink = tone === "dark" ? "#1a1a1a" : "rgba(255,255,255,0.92)";
  const batteryBorder = tone === "dark" ? "#1a1a1a" : "rgba(255,255,255,0.92)";
  const batteryFillMuted = tone === "dark" ? 0.28 : 0.35;

  return (
    <div
      className={className}
      style={{
        height: 44,
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        flexShrink: 0,
        zIndex: 50,
        position: "relative",
        ...style,
      }}
    >
      {/* 左侧：时间（灵动岛机型不在中间堆叠信号） */}
      <div style={{ flex: "0 0 auto", minWidth: 48 }}>
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: ink,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: 0.3,
          }}
        >
          9:41
        </span>
      </div>

      {/* 中间留白，供灵动岛覆盖 */}
      <div style={{ flex: "1 1 auto", minWidth: 96, pointerEvents: "none" }} aria-hidden />

      {/* 右侧：蜂窝 + Wi‑Fi + 电池（统一矢量图标） */}
      <div
        style={{
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 6,
        }}
      >
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden>
          <rect x="0" y="8.5" width="3" height="3.5" rx="0.7" fill={ink} />
          <rect x="4.5" y="6" width="3" height="6" rx="0.7" fill={ink} />
          <rect x="9" y="3" width="3" height="9" rx="0.7" fill={ink} />
          <rect
            x="13.5"
            y="0"
            width="3"
            height="12"
            rx="0.7"
            fill={ink}
            fillOpacity={batteryFillMuted}
          />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
          <circle cx="8" cy="11" r="1.4" fill={ink} />
          <path
            d="M5.0 8.1C6.2 6.9 9.8 6.9 11.0 8.1"
            stroke={ink}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M2.6 5.6C4.9 3.1 11.1 3.1 13.4 5.6"
            stroke={ink}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity={0.6}
          />
          <path
            d="M0.2 3.0C3.5 -0.3 12.5 -0.3 15.8 3.0"
            stroke={ink}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity={0.28}
          />
        </svg>
        {showBatteryPercent && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: ink,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            100%
          </span>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
          <div
            style={{
              width: 25,
              height: 12,
              border: `1.5px solid ${batteryBorder}`,
              borderRadius: 3,
              position: "relative",
              overflow: "hidden",
              opacity: tone === "light" ? 0.95 : 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 1.5,
                left: 1.5,
                bottom: 1.5,
                width: "72%",
                background: ink,
                borderRadius: 1.5,
              }}
            />
          </div>
          <div
            style={{
              width: 2,
              height: 6,
              background: ink,
              opacity: 0.45,
              borderRadius: "0 1.5px 1.5px 0",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
