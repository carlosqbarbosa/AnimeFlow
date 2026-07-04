import { useState } from "react";

export default function AddMediaModal({ onClose, onAddByUrl, onAddByUpload }) {
  const [source, setSource] = useState("url");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("image");
  const [name, setName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onAddByUpload(file, name);
    e.target.value = "";
  };

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 10, background: "rgba(6,8,18,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 320, background: "rgba(18,20,38,0.96)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 14, padding: 20 }}>
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 16, marginBottom: 6 }}>Adicionar cenário</div>
        <div style={{ fontSize: 12, color: "#9AA6C6", marginBottom: 14 }}>
          Dica: arquivos salvos em <code>public/media/</code> aparecem sozinhos, sem precisar deste modal.
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <button className="pg-btn" style={{ flex: 1, background: source === "url" ? "rgba(255,255,255,0.22)" : undefined }} onClick={() => setSource("url")}>
            Link (URL)
          </button>
          <button className="pg-btn" style={{ flex: 1, background: source === "upload" ? "rgba(255,255,255,0.22)" : undefined }} onClick={() => setSource("upload")}>
            Do computador
          </button>
        </div>

        {source === "url" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button
                className="pg-btn"
                style={{ flex: 1, background: type === "image" ? "#F0A857" : undefined, color: type === "image" ? "#1a1608" : undefined }}
                onClick={() => setType("image")}
              >
                Imagem
              </button>
              <button
                className="pg-btn"
                style={{ flex: 1, background: type === "video" ? "#F0A857" : undefined, color: type === "video" ? "#1a1608" : undefined }}
                onClick={() => setType("video")}
              >
                Vídeo
              </button>
            </div>
            <input
              className="pg-input"
              style={{ width: "100%", marginBottom: 10, boxSizing: "border-box" }}
              placeholder="Cole a URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <input
              className="pg-input"
              style={{ width: "100%", marginBottom: 16, boxSizing: "border-box" }}
              placeholder="Nome (opcional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="pg-btn" onClick={onClose}>
                Cancelar
              </button>
              <button
                className="pg-btn pg-btn-primary"
                onClick={() => {
                  onAddByUrl({ url, type, name });
                  onClose();
                }}
              >
                Adicionar
              </button>
            </div>
          </>
        )}

        {source === "upload" && (
          <>
            <input
              className="pg-input"
              style={{ width: "100%", marginBottom: 10, boxSizing: "border-box" }}
              placeholder="Nome (opcional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="pg-btn" style={{ display: "block", textAlign: "center", marginBottom: 16, cursor: "pointer" }}>
              Escolher arquivo (imagem ou vídeo)
              <input type="file" accept="image/*,video/*" onChange={handleFileUpload} style={{ display: "none" }} />
            </label>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="pg-btn" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}