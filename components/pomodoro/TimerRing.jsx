function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function TimerRing({ secondsLeft, totalForMode, color, caption }) {
  const progress = totalForMode > 0 ? 1 - secondsLeft / totalForMode : 0;
  const radius = 92;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);
  const angle = -90 + progress * 360;
  const rad = (angle * Math.PI) / 180;
  const markerX = 110 + radius * Math.cos(rad);
  const markerY = 110 + radius * Math.sin(rad);

  return (
    <div style={{ position: "relative", width: 220, height: 220 }}>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <circle cx="110" cy="110" r={radius} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="8" />
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 110 110)"
          style={{ transition: "stroke-dashoffset 0.9s linear" }}
        />
        <circle cx={markerX} cy={markerY} r="9" fill={color} style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.4))" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 44, fontWeight: 600, lineHeight: 1 }}>{formatTime(secondsLeft)}</div>
        <div style={{ fontSize: 12, color: "#C9CFE6", marginTop: 6 }}>{caption}</div>
      </div>
    </div>
  );
}