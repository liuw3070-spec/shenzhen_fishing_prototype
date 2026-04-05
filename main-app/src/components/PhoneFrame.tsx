import React from "react";
import PrototypeDeviceStage from "./PrototypeDeviceStage";

interface PhoneFrameProps {
  children: React.ReactNode;
  showStatusBar?: boolean;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, showStatusBar = true }) => (
  <PrototypeDeviceStage mode="main" showStatusBar={showStatusBar}>
    {children}
  </PrototypeDeviceStage>
);

export default PhoneFrame;
