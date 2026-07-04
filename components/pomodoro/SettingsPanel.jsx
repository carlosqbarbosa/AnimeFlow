export default function SettingsPanel({ settings, onUpdateSetting, onUpdateCycles, autoAdvance, onToggleAutoAdvance }) {
  const fields = [
    { key: "focus", label: "Foco" },
    { key: "short", label: "Pausa curta" },
    { key: "long", label: "Pausa longa" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 64,
        right: 22,
        zIndex: 5,
        width: 260,
        background: "rgba(15,18,35,0.88)",
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: 14,
        padding: 18,
        backdropFilter: "blur(6px)",
      }}
    >
      <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 15, marginBottom: 12 }}>Duração (minutos)</div>
      {fields.map((f) => (
        <div key={f.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: "#C9CFE6" }}>{f.label}</span>
          <input
            className="pg-input"
            type="number"
            min={1}
            max={180}
            value={settings[f.key]}
            onChange={(e) => onUpdateSetting(f.key, e.target.value)}
          />
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: "#C9CFE6" }}>Ciclos até pausa longa</span>
        <input className="pg-input" type="number" min={1} max={12} value={settings.cyclesUntilLong} onChange={(e) => onUpdateCycles(e.target.value)} />
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 13, color: "#C9CFE6", cursor: "pointer" }}>
        <input type="checkbox" checked={autoAdvance} onChange={(e) => onToggleAutoAdvance(e.target.checked)} />
        Trocar cenário automaticamente
      </label>
    </div>
  );
}