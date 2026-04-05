import { useState } from "react";

export function ComplianceCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#FFF7F7",
        borderRadius: 8,
        padding: 12,
        border: "1px solid #FFE0E0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5L14 4V9C14 12 11 14.5 8 15C5 14.5 2 12 2 9V4L8 1.5Z" stroke="#F56C6C" strokeWidth="1.4" fill="rgba(245,108,108,0.1)" strokeLinejoin="round" />
            <path d="M8 5V8.5" stroke="#F56C6C" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="10.5" r="0.7" fill="#F56C6C" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#F56C6C" }}>合规与保险提示</span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        >
          <path d="M4 6L8 10L12 6" stroke="#F56C6C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {!expanded && (
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
          <ComplianceItem text="必须购买《单日海钓意外险》" />
          <ComplianceItem text="需签署《平台拼船对赌协议与不可抗力免责》" />
        </div>
      )}

      {expanded && (
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <ComplianceItem text="必须购买《单日海钓意外险》" />
            <div
              style={{
                padding: "8px 12px",
                backgroundColor: "#fff",
                borderRadius: 6,
                border: "1px dashed #F5C6CB",
              }}
            >
              <p style={{ fontSize: 12, color: "#909399", margin: 0, lineHeight: 1.7 }}>
                保险金额：个人意外伤害 20万元，医疗费用 2万元。保险公司：中国平安。
              </p>
            </div>
            <ComplianceItem text="需签署《平台拼船对赌协议与不可抗力免责》" />
            <div
              style={{
                padding: "8px 12px",
                backgroundColor: "#fff",
                borderRadius: 6,
                border: "1px dashed #F5C6CB",
              }}
            >
              <p style={{ fontSize: 12, color: "#909399", margin: 0, lineHeight: 1.7 }}>
                协议包含：出行风险告知、平台责任边界说明、不可抗力条款（台风/封港/海事管制等）。
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ComplianceItem({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: "#F56C6C",
          marginTop: 5,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 12, color: "#606266", lineHeight: 1.6 }}>{text}</span>
    </div>
  );
}
