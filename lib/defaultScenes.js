export const DEFAULT_SCENES = [
  {
    id: "s1",
    type: "image",
    name: "Haikyuu",
    url: "/media/haikyuu.jpg",
  },
  {
    id: "s2",
    type: "image",
    name: "Izuku Midoriya",
    url: "/media/IzukuMidoriya.jpg",
  },
  {
    id: "s3",
    type: "image",
    name: "Maomao",
    url: "/media/maomao.jpg",
  },
  {
    id: "s4",
    type: "image",
    name: "Studio Ghibli",
    url: "/media/StudioGhibli.png",
  },
];

export const MODES = {
  focus: { label: "Foco", key: "focus", color: "#F0A857" },
  short: { label: "Pausa Curta", key: "short", color: "#6FB7B0" },
  long: { label: "Pausa Longa", key: "long", color: "#7FA0E0" },
};

export const DEFAULT_SETTINGS = {
  focus: 25,
  short: 5,
  long: 15,
  cyclesUntilLong: 4,
};