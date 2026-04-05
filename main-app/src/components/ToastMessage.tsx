interface ToastMessageProps {
  message: string;
}

export function ToastMessage({ message }: ToastMessageProps) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0,0,0,0.75)",
        color: "#fff",
        borderRadius: 8,
        padding: "9px 18px",
        fontSize: 13,
        whiteSpace: "nowrap",
        maxWidth: 300,
        textAlign: "center",
        zIndex: 100,
        pointerEvents: "none",
        animation: "fadeInUp 0.2s ease",
        lineHeight: 1.5,
      }}
    >
      {message}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
