export default function MediaStrip({ scenes, activeIndex, onSelect, onRemove, onAddClick }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 20px",
        background: "linear-gradient(180deg, transparent, rgba(6,8,18,0.55))",
        overflowX: "auto",
      }}
    >
      {scenes.map((s, i) => (
        <div key={s.id} className={`pg-thumb ${i === activeIndex ? "active" : ""}`} onClick={() => onSelect(i)} title={s.name}>
          {s.type === "gradient" && (
            <div style={{ width: "100%", height: "100%", background: `linear-gradient(160deg, ${s.colors[0]}, ${s.colors[2]})` }} />
          )}
          {s.type === "image" && <img src={s.url} alt={s.name} />}
          {s.type === "video" && <video src={s.url} muted />}
          {s.type === "youtube" && (
            <img src={`https://img.youtube.com/vi/${s.youtubeId}/mqdefault.jpg`} alt={s.name} />
          )}
          {(s.id.startsWith("m-") || s.id.startsWith("local-")) && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onRemove(s.id);
              }}
              style={{
                position: "absolute",
                top: 1,
                right: 1,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                fontSize: 10,
                lineHeight: "14px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              ×
            </span>
          )}
        </div>
      ))}
      <button
        className="pg-thumb"
        onClick={onAddClick}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.08)", fontSize: 20, border: "2px dashed rgba(255,255,255,0.3)" }}
      >
        +
      </button>
    </div>
  );
}