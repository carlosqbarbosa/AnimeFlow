import { MODES } from "../../lib/defaultScenes";

export default function ModeTabs({ mode, onSwitch }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
      {Object.values(MODES).map((m) => (
        <button
          key={m.key}
          data-cy={`mode-${m.key}`}
          onClick={() => onSwitch(m.key)}
          className="pg-btn"
          style={{
            background: mode === m.key ? m.color : "rgba(255,255,255,0.08)",
            color: mode === m.key ? "#1a1608" : "#F5EFE3",
            fontWeight: mode === m.key ? 600 : 500,
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}