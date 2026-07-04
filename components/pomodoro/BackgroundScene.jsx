import { buildYoutubeEmbedUrl } from "../../lib/youtube";

export default function BackgroundScene({ scene, onVideoEnded }) {
  return (
    <div key={scene.id} className="pg-fade" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      {scene.type === "gradient" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(160deg, ${scene.colors[0]}, ${scene.colors[1]}, ${scene.colors[2]})`,
          }}
        />
      )}
      {scene.type === "image" && (
        <img src={scene.url} alt={scene.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      )}
      {scene.type === "video" && (
        <video
          src={scene.url}
          autoPlay
          muted
          loop
          playsInline
          onEnded={onVideoEnded}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {scene.type === "youtube" && (
        <iframe
          src={buildYoutubeEmbedUrl(scene.youtubeId)}
          title={scene.name}
          allow="autoplay; encrypted-media"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            transform: "scale(1.35)",
            pointerEvents: "none",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(10,12,25,0.35) 0%, rgba(10,12,25,0.55) 55%, rgba(10,12,25,0.75) 100%)",
        }}
      />
    </div>
  );
}