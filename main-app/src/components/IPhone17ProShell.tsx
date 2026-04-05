import React from "react";
import {
  IPHONE_17_PRO_BEZEL,
  IPHONE_17_PRO_DEVICE_HEIGHT,
  IPHONE_17_PRO_DEVICE_WIDTH,
  IPHONE_17_PRO_DISPLAY_RADIUS,
  IPHONE_17_PRO_ISLAND_HEIGHT,
  IPHONE_17_PRO_ISLAND_TOP,
  IPHONE_17_PRO_ISLAND_WIDTH,
  IPHONE_17_PRO_SCREEN_HEIGHT,
  IPHONE_17_PRO_SCREEN_WIDTH,
  IPHONE_17_PRO_SHELL_RADIUS,
} from "../constants/device";

interface IPhone17ProShellProps {
  children: React.ReactNode;
}

/**
 * iPhone 17 Pro 金属外框 + 屏幕圆角裁切 + 灵动岛（叠在屏幕顶部，不挤占 402×874 布局）
 */
const IPhone17ProShell: React.FC<IPhone17ProShellProps> = ({ children }) => {
  const b = IPHONE_17_PRO_BEZEL;
  const w = IPHONE_17_PRO_DEVICE_WIDTH;
  const h = IPHONE_17_PRO_DEVICE_HEIGHT;

  return (
    <div
      style={{
        position: "relative",
        width: w,
        height: h,
        flexShrink: 0,
        borderRadius: IPHONE_17_PRO_SHELL_RADIUS,
        background:
          "linear-gradient(145deg, #4a4a4f 0%, #2c2c2e 38%, #1c1c1e 55%, #3a3a3e 100%)",
        boxShadow:
          "0 24px 56px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.35)",
      }}
    >
      {/* 左侧按键示意 */}
      <div
        style={{
          position: "absolute",
          left: -3,
          top: 120,
          width: 4,
          height: 36,
          borderRadius: "2px 0 0 2px",
          background: "linear-gradient(90deg, #3d3d42, #252528)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -3,
          top: 168,
          width: 4,
          height: 58,
          borderRadius: "2px 0 0 2px",
          background: "linear-gradient(90deg, #3d3d42, #252528)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -3,
          top: 236,
          width: 4,
          height: 58,
          borderRadius: "2px 0 0 2px",
          background: "linear-gradient(90deg, #3d3d42, #252528)",
        }}
      />
      {/* 右侧电源键 */}
      <div
        style={{
          position: "absolute",
          right: -3,
          top: 186,
          width: 4,
          height: 92,
          borderRadius: "0 2px 2px 0",
          background: "linear-gradient(90deg, #252528, #3d3d42)",
        }}
      />

      {/* 显示区域 */}
      <div
        style={{
          position: "absolute",
          left: b,
          top: b,
          width: IPHONE_17_PRO_SCREEN_WIDTH,
          height: IPHONE_17_PRO_SCREEN_HEIGHT,
          borderRadius: IPHONE_17_PRO_DISPLAY_RADIUS,
          overflow: "hidden",
          background: "#000",
          boxShadow: "inset 0 0 0 1.5px rgba(0,0,0,0.65)",
        }}
      >
        {children}

        {/* 灵动岛 */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: IPHONE_17_PRO_ISLAND_TOP,
            transform: "translateX(-50%)",
            width: IPHONE_17_PRO_ISLAND_WIDTH,
            height: IPHONE_17_PRO_ISLAND_HEIGHT,
            borderRadius: IPHONE_17_PRO_ISLAND_HEIGHT / 2,
            background: "#0a0a0b",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
            zIndex: 200,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

export default IPhone17ProShell;
