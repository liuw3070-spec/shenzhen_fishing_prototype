interface NavBarProps {
  onBack: () => void;
  onShare: () => void;
}

export function NavBar({ onBack, onShare }: NavBarProps) {
  return (
    <div
      style={{
        height: 44,
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 8px",
        borderBottom: "1px solid #F0F0F0",
        position: "relative",
        zIndex: 10,
        flexShrink: 0,
      }}
    >
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          width: 44,
          height: 44,
          minWidth: 44,
        }}
      >
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
          <path
            d="M9 1L1 9L9 17"
            stroke="#1F2D3D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <span
        style={{
          fontSize: 18,
          fontWeight: 500,
          color: "#1A1A1A",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        船班详情
      </span>

      <button
        onClick={onShare}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "6px 8px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          borderRadius: 6,
          minWidth: 60,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="17" cy="4.5" r="2.5" stroke="#00B38A" strokeWidth="1.8" />
          <circle cx="17" cy="17.5" r="2.5" stroke="#00B38A" strokeWidth="1.8" />
          <circle cx="5" cy="11" r="2.5" stroke="#00B38A" strokeWidth="1.8" />
          <line x1="7.35" y1="9.88" x2="14.65" y2="5.62" stroke="#00B38A" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="7.35" y1="12.12" x2="14.65" y2="16.38" stroke="#00B38A" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
