import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  IPHONE_17_PRO_DEVICE_HEIGHT,
  IPHONE_17_PRO_DEVICE_WIDTH,
  PROTOTYPE_STAGE_PADDING,
} from "../constants/device";

type PrototypeScaleContextValue = {
  scale: number;
  shouldScale: boolean;
  isHundredPercent: boolean;
};

const PrototypeScaleContext = createContext<PrototypeScaleContextValue | null>(null);

const padTotal = PROTOTYPE_STAGE_PADDING * 2;

export function PrototypeScaleProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  const calculateScale = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const visualVh = window.visualViewport?.height ?? vh;
    const visualVw = window.visualViewport?.width ?? vw;

    const scaleX = (visualVw - padTotal) / IPHONE_17_PRO_DEVICE_WIDTH;
    const scaleY = (visualVh - padTotal) / IPHONE_17_PRO_DEVICE_HEIGHT;
    const raw = Math.min(scaleX, scaleY, 1);

    setScale(Math.max(0.42, Math.min(raw, 1)));
  }, []);

  useEffect(() => {
    calculateScale();
    window.addEventListener("resize", calculateScale);
    window.addEventListener("orientationchange", calculateScale);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", calculateScale);
    return () => {
      window.removeEventListener("resize", calculateScale);
      window.removeEventListener("orientationchange", calculateScale);
      vv?.removeEventListener("resize", calculateScale);
    };
  }, [calculateScale]);

  const value = useMemo<PrototypeScaleContextValue>(() => {
    const shouldScale = scale < 1;
    return {
      scale,
      shouldScale,
      isHundredPercent: scale >= 0.999,
    };
  }, [scale]);

  return (
    <PrototypeScaleContext.Provider value={value}>{children}</PrototypeScaleContext.Provider>
  );
}

export function usePrototypeScale(): PrototypeScaleContextValue {
  const ctx = useContext(PrototypeScaleContext);
  if (!ctx) {
    throw new Error("usePrototypeScale must be used within PrototypeScaleProvider");
  }
  return ctx;
}
