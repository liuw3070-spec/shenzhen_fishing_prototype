interface CoreInfoCardProps {
  onLocationClick: () => void;
  onCallClick: () => void;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1L7.35 4.27L11 4.65L8.5 6.97L9.18 10.5L6 8.77L2.82 10.5L3.5 6.97L1 4.65L4.65 4.27L6 1Z"
        fill={filled ? "#FFB800" : "#E4E7ED"}
        stroke={filled ? "#FFB800" : "#E4E7ED"}
        strokeWidth="0.5"
      />
    </svg>
  );
}

export function CoreInfoCard({ onLocationClick, onCallClick }: CoreInfoCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A" }}>深海猎人号</span>
        <span
          style={{
            fontSize: 11,
            color: "#00B38A",
            backgroundColor: "rgba(0,179,138,0.1)",
            borderRadius: 4,
            padding: "2px 8px",
            fontWeight: 500,
          }}
        >
          招募中
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <InfoRow
          icon={<DestIcon />}
          label="目的地"
          value={
            <span style={{ fontSize: 14, fontWeight: 600, color: "#00B38A" }}>
              三门岛外海
            </span>
          }
        />

        <InfoRow
          icon={<FishIcon />}
          label="目标鱼种"
          value={
            <div style={{ display: "flex", gap: 6 }}>
              {["金枪鱼", "鱿鱼", "石斑"].map((f) => (
                <span
                  key={f}
                  style={{
                    fontSize: 12,
                    color: "#606266",
                    backgroundColor: "#F5F7FA",
                    borderRadius: 4,
                    padding: "2px 8px",
                    border: "1px solid #EBEEF5",
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          }
        />

        <InfoRow
          icon={<DockIcon />}
          label="集合码头"
          value={
            <button
              onClick={onLocationClick}
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "#1A1A1A",
                fontSize: 14,
              }}
            >
              <span>南澳渔港</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1C5.07 1 3.5 2.57 3.5 4.5C3.5 7.25 7 12 7 12C7 12 10.5 7.25 10.5 4.5C10.5 2.57 8.93 1 7 1Z"
                  fill="#00B38A"
                />
                <circle cx="7" cy="4.5" r="1.5" fill="#fff" />
              </svg>
            </button>
          }
        />

        <InfoRow
          icon={<ClockIcon />}
          label="发船时间"
          value={
            <span style={{ fontSize: 14, color: "#1A1A1A" }}>
              2026年5月18日 06:00–18:00
            </span>
          }
        />

        <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "4px 0" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="https://images.unsplash.com/photo-1759668559019-d3fbb18fb369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoZXJtYW4lMjBjYXB0YWluJTIwcG9ydHJhaXQlMjBtYW58ZW58MXx8fHwxNzc0OTM5ODc3fDA&ixlib=rb-4.1.0&q=80&w=200"
            alt="船长头像"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #E4E7ED",
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>老张船长</span>
              <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} filled={true} />
                ))}
              </div>
              <span style={{ fontSize: 12, color: "#FFB800", fontWeight: 600 }}>4.95</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#909399" }}>出海 <strong style={{ color: "#1A1A1A" }}>328</strong> 次</span>
              <span style={{ fontSize: 12, color: "#C0C4CC" }}>|</span>
              <span style={{ fontSize: 12, color: "#909399" }}>好评率 <strong style={{ color: "#00B38A" }}>98.2%</strong></span>
            </div>
          </div>
          <button
            onClick={onCallClick}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 12px",
              backgroundColor: "rgba(0,179,138,0.1)",
              border: "1px solid rgba(0,179,138,0.3)",
              borderRadius: 8,
              cursor: "pointer",
              color: "#00B38A",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 2.5H5.5L6.5 5.5L5 6.5C5.8 8.1 5.9 8.2 7.5 9L8.5 7.5L11.5 8.5V11.5C11.5 12 11 12.5 10.5 12.5C5 12 2 7 1.5 3.5C1.5 3 2 2.5 2.5 2.5Z"
                fill="#00B38A"
              />
            </svg>
            联系船长
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 20, display: "flex", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
      <span style={{ fontSize: 12, color: "#909399", width: 56, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1 }}>{value}</div>
    </div>
  );
}

function DestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5L14.5 8L8 14.5L1.5 8L8 1.5Z" stroke="#00B38A" strokeWidth="1.5" fill="none" />
      <circle cx="8" cy="8" r="2" fill="#00B38A" />
    </svg>
  );
}

function FishIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M9.5 8C9.5 9.38 8.38 10.5 7 10.5C5.62 10.5 4.5 9.38 4.5 8C4.5 6.62 5.62 5.5 7 5.5C8.38 5.5 9.5 6.62 9.5 8Z" stroke="#606266" strokeWidth="1.3" />
      <path d="M9.5 8L14 5V11L9.5 8Z" stroke="#606266" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function DockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 12H14" stroke="#606266" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 4V12" stroke="#606266" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 7H12" stroke="#606266" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="5.5" y="3" width="5" height="4" rx="1" stroke="#606266" strokeWidth="1.3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#606266" strokeWidth="1.5" />
      <path d="M8 5V8.5L10.5 10" stroke="#606266" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
