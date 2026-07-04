"use client";

import { useState, useRef } from "react";
import { usePomodoroTimer } from "../hooks/usePomodoroTimer";
import { useMediaLibrary } from "../hooks/useMediaLibrary";
import BackgroundScene from "../components/pomodoro/BackgroundScene";
import TimerRing from "../components/pomodoro/TimerRing";
import ModeTabs from "../components/pomodoro/ModeTabs";
import SettingsPanel from "../components/pomodoro/SettingsPanel";
import MediaStrip from "../components/pomodoro/MediaStrip";
import AddMediaModal from "../components/pomodoro/AddMediaModal";
import { MODES } from "../lib/defaultScenes";

export default function PomodoroPage() {
  const timer = usePomodoroTimer();
  const media = useMediaLibrary();
  const [showSettings, setShowSettings] = useState(false);
  const [showAddMedia, setShowAddMedia] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const modeColor = MODES[timer.mode as keyof typeof MODES].color;
  const isBreak = timer.mode !== "focus";

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        color: "#F5EFE3",
        isolation: "isolate",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Inter:wght@400;500;600&display=swap');
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .pg-fade { animation: fadeIn 1.1s ease; }
        .pg-btn {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.22);
          color: #F5EFE3;
          border-radius: 12px;
          padding: 9px 16px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .pg-btn:hover { background: rgba(255,255,255,0.18); }
        .pg-btn-primary {
          background: ${modeColor};
          border: 1px solid ${modeColor};
          color: #1a1608;
          font-weight: 600;
        }
        .pg-btn-primary:hover { filter: brightness(1.08); }
        .pg-input {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          color: #F5EFE3;
          border-radius: 8px;
          padding: 6px 10px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          width: 64px;
        }
        .pg-thumb {
          width: 52px; height: 38px; border-radius: 8px; cursor: pointer;
          border: 2px solid rgba(255,255,255,0.25);
          flex-shrink: 0; position: relative; overflow: hidden;
        }
        .pg-thumb.active { border-color: #F5EFE3; }
        .pg-thumb img, .pg-thumb video { width: 100%; height: 100%; object-fit: cover; }
      `}</style>

      <BackgroundScene scene={media.current} onVideoEnded={() => media.setActiveIndex((i) => (i + 1) % media.scenes.length)} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px" }}>
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 18, fontWeight: 600 }}>{media.current.name}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="pg-btn" onClick={() => setShowSettings((v) => !v)}>
            Ajustes
          </button>
          <button className="pg-btn" onClick={toggleFullscreen}>
            Tela cheia
          </button>
        </div>
      </div>

      {showSettings && (
        <SettingsPanel
          settings={timer.settings}
          onUpdateSetting={timer.updateSetting}
          onUpdateCycles={timer.updateCycles}
          autoAdvance={media.autoAdvance}
          onToggleAutoAdvance={media.setAutoAdvance}
        />
      )}

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 0 10px" }}>
        <ModeTabs mode={timer.mode} onSwitch={timer.switchMode} />

        <TimerRing
          secondsLeft={timer.secondsLeft}
          totalForMode={timer.totalForMode}
          color={modeColor}
          caption={isBreak ? "Respire um pouco" : `Ciclo ${timer.completedFocusSessions + 1}`}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <button className="pg-btn pg-btn-primary" onClick={() => timer.setIsRunning((v) => !v)} style={{ minWidth: 96 }}>
            {timer.isRunning ? "Pausar" : "Iniciar"}
          </button>
          <button className="pg-btn" onClick={timer.resetTimer}>
            Reiniciar
          </button>
        </div>
      </div>

      <MediaStrip
        scenes={media.scenes}
        activeIndex={media.activeIndex}
        onSelect={media.setActiveIndex}
        onRemove={media.removeMedia}
        onAddClick={() => setShowAddMedia(true)}
      />

      {showAddMedia && <AddMediaModal onClose={() => setShowAddMedia(false)} onAddByUrl={media.addByUrl} onAddByUpload={media.addByUpload} />}
    </div>
  );
}