export function CancellationCard() {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}
    >
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{ width: 3, height: 16, backgroundColor: "#00B38A", borderRadius: 2 }} />
        <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>退改规则与不可抗力说明</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Personal Cancel */}
        <div
          style={{
            backgroundColor: "#FFF7F0",
            borderRadius: 8,
            padding: "10px 12px",
            borderLeft: "3px solid #E6A23C",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#E6A23C" strokeWidth="1.3" />
              <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="#E6A23C" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#E6A23C" }}>个人原因取消</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <RuleItem
              icon="✓"
              iconColor="#00B38A"
              text="距发船 >48h：退还 50% 定金 + 全额尾款"
            />
            <RuleItem
              icon="✗"
              iconColor="#F56C6C"
              text="距发船 ≤48h：定金不退，尾款全退"
            />
          </div>
        </div>

        {/* Force Majeure */}
        <div
          style={{
            backgroundColor: "#F0FFF9",
            borderRadius: 8,
            padding: "10px 12px",
            borderLeft: "3px solid #00B38A",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#00B38A" strokeWidth="1.3" />
              <path d="M4.5 7L6.5 9L9.5 5" stroke="#00B38A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#00B38A" }}>不可抗力</span>
            <span style={{ fontSize: 11, color: "#909399" }}>（天气 / 海事封港 / 台风）</span>
          </div>
          <RuleItem
            icon="✓"
            iconColor="#00B38A"
            text="定金 + 尾款 + 保费 — 全额原路退回"
          />
        </div>

        {/* Additional note */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6, padding: "0 4px" }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
            <circle cx="6.5" cy="6.5" r="5.5" stroke="#C0C4CC" strokeWidth="1.2" />
            <path d="M6.5 4.5V6.5" stroke="#C0C4CC" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="6.5" cy="8.5" r="0.6" fill="#C0C4CC" />
          </svg>
          <span style={{ fontSize: 11, color: "#C0C4CC", lineHeight: 1.6 }}>
            退款处理时间1-3个工作日，节假日顺延。如有争议以平台最终裁定为准。
          </span>
        </div>
      </div>
    </div>
  );
}

function RuleItem({
  icon,
  iconColor,
  text,
}: {
  icon: string;
  iconColor: string;
  text: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
      <span style={{ fontSize: 12, color: iconColor, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
        {icon}
      </span>
      <span style={{ fontSize: 12, color: "#606266", lineHeight: 1.65 }}>{text}</span>
    </div>
  );
}
