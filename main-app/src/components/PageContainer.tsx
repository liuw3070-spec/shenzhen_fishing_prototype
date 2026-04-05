import React from "react";
import PrototypeDeviceStage from "./PrototypeDeviceStage";

interface PageContainerProps {
  children: React.ReactNode;
  /** 已废弃：舞台背景已统一为与一级相同的渐变，传入无效 */
  backgroundColor?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => (
  <PrototypeDeviceStage mode="secondary">{children}</PrototypeDeviceStage>
);

export default PageContainer;
