import { useState, useEffect, useRef, useCallback } from "react";
import { DEFAULT_SETTINGS } from "../lib/defaultScenes";
import { playChime } from "../lib/chime";

const SETTINGS_KEY = "pomodoro:settings";

function loadSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved
      ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
      : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function usePomodoroTimer() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SETTINGS.focus * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const intervalRef = useRef(null);

  const totalForMode = settings[mode] * 60;

  useEffect(() => {
    const loadedSettings = loadSettings();
    setSettings(loadedSettings);
    setSecondsLeft(loadedSettings.focus * 60);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings, hydrated]);

  const handleSessionEnd = useCallback(() => {
    playChime();
    setIsRunning(false);

    setMode((currentMode) => {
      if (currentMode === "focus") {
        let nextMode = "short";

        setCompletedFocusSessions((count) => {
          const next = count + 1;

          if (next % settings.cyclesUntilLong === 0) {
            nextMode = "long";
          }

          return next;
        });

        return nextMode;
      }

      return "focus";
    });
  }, [settings.cyclesUntilLong]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          handleSessionEnd();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, handleSessionEnd]);

  useEffect(() => {
    if (!hydrated) return;

    if (!isRunning) {
      setSecondsLeft(settings[mode] * 60);
    }
  }, [mode, settings, isRunning, hydrated]);

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(settings[mode] * 60);
  };

  const updateSetting = (key, value) => {
    const minutes = Math.max(1, Math.min(180, Number(value) || 1));

    setSettings((prev) => ({
      ...prev,
      [key]: minutes,
    }));
  };

  const updateCycles = (value) => {
    const cycles = Math.max(1, Number(value) || 1);

    setSettings((prev) => ({
      ...prev,
      cyclesUntilLong: cycles,
    }));
  };

  return {
    settings,
    mode,
    secondsLeft,
    isRunning,
    totalForMode,
    completedFocusSessions,
    setIsRunning,
    switchMode,
    resetTimer,
    updateSetting,
    updateCycles,
  };
}