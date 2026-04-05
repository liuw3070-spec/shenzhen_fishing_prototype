export function PriceProgressCard() {
  const current = 4;
  const required = 6;
  const percent = Math.round((current / required) * 100);

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{ width: 3, height: 16, backgroundColor: "#00B38A", borderRadius: 2 }} />
        <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>价格明细</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        <PriceRow
          label="定金"
          subLabel="锁位用"
          amount="¥120"
          amountColor="#F56C6C"
          highlight={false}
        />
        <PriceRow
          label="尾款"
          subLabel="登船前支付"
          amount="¥380"
          amountColor="#606266"
          highlight={false}
        />
        <div style={{ height: 1, backgroundColor: "#F5F5F5" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>合计</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#F56C6C" }}>¥500</span>
        </div>
      </div>

      <div style={{ height: 1, backgroundColor: "#F0F0F0", marginBottom: 14 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 3, height: 16, backgroundColor: "#00B38A", borderRadius: 2 }} />
        <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>成行进度</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: "#00B38A" }}>{current}</span>
          <span style={{ fontSize: 12, color: "#909399" }}>/ {required} 人 成团</span>
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#F56C6C",
            backgroundColor: "rgba(245,108,108,0.1)",
            borderRadius: 6,
            padding: "3px 10px",
            fontWeight: 500,
          }}
        >
          差 {required - current} 人成行
        </div>
      </div>

      <div style={{ position: "relative", marginBottom: 8 }}>
        <div
          style={{
            width: "100%",
            height: 10,
            backgroundColor: "#F0F0F0",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percent}%`,
              height: "100%",
              backgroundColor: "#00B38A",
              borderRadius: 5,
              transition: "width 0.6s ease",
              background: "linear-gradient(90deg, #00B38A 0%, #00D4A8 100%)",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {Array.from({ length: required }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: i < current ? "#00B38A" : "#E4E7ED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: i < current ? "2px solid rgba(0,179,138,0.3)" : "2px solid #F0F0F0",
              }}
            >
              {i < current ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="3.5" r="2" fill="rgba(255,255,255,0.9)" />
                  <path d="M1.5 9C1.5 7.07 3.07 5.5 5 5.5S8.5 7.07 8.5 9" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="3.5" r="2" fill="#C0C4CC" />
                  <path d="M1.5 9C1.5 7.07 3.07 5.5 5 5.5S8.5 7.07 8.5 9" stroke="#C0C4CC" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              )}
            </div>
          ))}
          <span style={{ fontSize: 11, color: "#909399", alignSelf: "center", marginLeft: 4 }}>
            {current} 位钓友已报名
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          padding: "8px 12px",
          backgroundColor: "#FFFBF0",
          borderRadius: 8,
          borderLeft: "3px solid #FFB800",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
            <circle cx="7" cy="7" r="6" stroke="#FFB800" strokeWidth="1.3" />
            <path d="M7 4V7.5" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="9.5" r="0.7" fill="#FFB800" />
          </svg>
          <span style={{ fontSize: 11, color: "#8A6D00", lineHeight: 1.6 }}>
            <strong>T-12h规则：</strong>距发船前12小时判定成团，未成团定金全额退回
          </span>
        </div>
      </div>
    </div>
  );
}

function PriceRow({
  label,
  subLabel,
  amount,
  amountColor,
  highlight,
}: {
  label: string;
  subLabel: string;
  amount: string;
  amountColor: string;
  highlight: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14, color: "#1A1A1A" }}>{label}</span>
        <span
          style={{
            fontSize: 11,
            color: "#909399",
            backgroundColor: "#F5F7FA",
            borderRadius: 3,
            padding: "1px 6px",
          }}
        >
          {subLabel}
        </span>
      </div>
      <span style={{ fontSize: 15, fontWeight: 600, color: amountColor }}>{amount}</span>
    </div>
  );
}
