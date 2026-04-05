import React from "react";
import StatusBar from "./StatusBar";
import IPhone17ProShell from "./IPhone17ProShell";
import { usePrototypeScale } from "./PrototypeScaleContext";
import {
  IPHONE_17_PRO_SCREEN_HEIGHT,
  IPHONE_17_PRO_SCREEN_WIDTH,
  PROTOTYPE_STAGE_PADDING,
} from "../constants/device";

const STAGE_BACKGROUND =
  "linear-gradient(180deg, #d8d8dc 0%, #c4c4c8 45%, #b0b0b6 100%)";

export type PrototypeDeviceStageMode = "main" | "secondary";

export interface PrototypeDeviceStageProps {
  children: React.ReactNode;
  /** main：一级 Tab 布局（默认底色 + 可选状态栏）；secondary：二三级整屏 402×874，内容贴底无黑边 */
  mode: PrototypeDeviceStageMode;
  showStatusBar?: boolean;
}

const PrototypeDeviceStage: React.FC<PrototypeDeviceStageProps> = ({
  children,
  mode,
  showStatusBar = true,
}) => {
  const { scale, shouldScale } = usePrototypeScale();
  const p = PROTOTYPE_STAGE_PADDING;

  const screenInner =
    mode === "secondary" ? (
      <div
        style={{
          width: IPHONE_17_PRO_SCREEN_WIDTH,
          height: IPHONE_17_PRO_SCREEN_HEIGHT,
          background: "#F5F6F8",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children}
      </div>
    ) : (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          background: "#F5F6F8",
          overflow: "hidden",
        }}
      >
        {showStatusBar && <StatusBar />}
        {children}
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100%",
        width: "100%",
        background: STAGE_BACKGROUND,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: p,
        overflow: "auto",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          transform: shouldScale ? `scale(${scale})` : "none",
          transformOrigin: "center center",
          flexShrink: 0,
        }}
      >
        <IPhone17ProShell>{screenInner}</IPhone17ProShell>
      </div>
    </div>
  );
};

export default PrototypeDeviceStage;
