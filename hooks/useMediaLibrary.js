import { useState, useEffect, useRef } from "react";
import { DEFAULT_SCENES } from "../lib/defaultScenes";
import { getYouTubeId } from "../lib/youtube";

const SCENES_KEY = "pomodoro:customScenes";

function loadSavedScenes() {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(SCENES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

function persistableScenes(scenes) {
  return scenes.filter((s) => s.id.startsWith("m-") && s.type !== "upload-only");
}

export function useMediaLibrary() {
  const [scenes, setScenes] = useState(DEFAULT_SCENES);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const slideshowRef = useRef(null);

  useEffect(() => {
  const saved = loadSavedScenes();

  if (saved.length) {
    setScenes(prev => [...prev, ...saved]);
  }
}, []);

  useEffect(() => {
    const toSave = persistableScenes(scenes).filter((s) => s.type === "image" || s.type === "video" || s.type === "youtube");
    const safeToSave = toSave.filter((s) => !s.url?.startsWith("blob:"));
    localStorage.setItem(SCENES_KEY, JSON.stringify(safeToSave));
  }, [scenes]);

  const addByUrl = ({ url, type, name }) => {
    if (!url.trim()) return;
    const youtubeId = getYouTubeId(url.trim());
    const finalType = youtubeId ? "youtube" : type;
    const item = {
      id: `m-${Date.now()}`,
      type: finalType,
      url: url.trim(),
      youtubeId: youtubeId || undefined,
      name: name.trim() || (finalType === "youtube" ? "Vídeo do YouTube" : finalType === "video" ? "Vídeo" : "Imagem"),
    };
    setScenes((prev) => [...prev, item]);
    setActiveIndex(scenes.length);
  };

  const addByUpload = (file, name) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    const type = file.type.startsWith("video/") ? "video" : "image";
    const item = { id: `m-${Date.now()}`, type, url: objectUrl, name: name.trim() || file.name };
    setScenes((prev) => [...prev, item]);
    setActiveIndex(scenes.length);
  };

  const removeMedia = (id) => {
    setScenes((prev) => {
      const next = prev.filter((s) => s.id !== id);
      return next.length ? next : DEFAULT_SCENES;
    });
    setActiveIndex(0);
  };

  useEffect(() => {
    if (!autoAdvance || scenes.length <= 1) return;
    const current = scenes[activeIndex];
    if (current?.type === "video" || current?.type === "youtube") return;
    slideshowRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % scenes.length);
    }, 12000);
    return () => clearInterval(slideshowRef.current);
  }, [autoAdvance, activeIndex, scenes]);

  return {
    scenes,
    activeIndex,
    setActiveIndex,
    autoAdvance,
    setAutoAdvance,
    addByUrl,
    addByUpload,
    removeMedia,
    current: scenes[activeIndex] || scenes[0],
  };
}