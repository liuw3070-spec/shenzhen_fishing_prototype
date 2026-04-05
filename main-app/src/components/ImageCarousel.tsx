import { useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1710442995783-3640c50c4ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwYm9hdCUyMHNlYSUyMG9jZWFufGVufDF8fHx8MTc3NDkzOTg3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1604915666686-93382bae0c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGRlZXAlMjBzZWElMjBmaXNoaW5nfGVufDF8fHx8MTc3NDkzOTg3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1754353865561-a074aff9e1e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWElMjBmaXNoaW5nJTIwcm9kJTIwb2NlYW4lMjBzdW5yaXNlfGVufDF8fHx8MTc3NDkzOTg3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
];

export function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  const handleTouchOrDrag = (dir: number) => {
    setCurrent((prev) => (prev + dir + IMAGES.length) % IMAGES.length);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: 200, overflow: "hidden", backgroundColor: "#D0D0D0", cursor: "grab" }}>
      <div
        style={{
          display: "flex",
          width: `${IMAGES.length * 100}%`,
          height: "100%",
          transform: `translateX(-${(current * 100) / IMAGES.length}%)`,
          transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {IMAGES.map((src, i) => (
          <div key={i} style={{ width: `${100 / IMAGES.length}%`, height: "100%", flexShrink: 0 }}>
            <img
              src={src}
              alt={`船班实景 ${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
        }}
      >
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 16 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === current ? "#00B38A" : "rgba(255,255,255,0.7)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.2s ease",
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          backgroundColor: "rgba(0,0,0,0.48)",
          borderRadius: 10,
          padding: "2px 8px",
          color: "#fff",
          fontSize: 12,
        }}
      >
        {current + 1}/{IMAGES.length}
      </div>

      <div
        style={{ position: "absolute", left: 0, top: 0, width: "35%", height: "100%", cursor: "pointer" }}
        onClick={() => handleTouchOrDrag(-1)}
      />
      <div
        style={{ position: "absolute", right: 0, top: 0, width: "35%", height: "100%", cursor: "pointer" }}
        onClick={() => handleTouchOrDrag(1)}
      />
    </div>
  );
}
