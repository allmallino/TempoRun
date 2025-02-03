export type ModeType = {
  selectedMode: Mode;
  modsInfo: ModInfoType;
};

export enum Mode {
  TIMER = "timer",
  MAP = "map",
  LENGTH = "length",
  PACE = "pace",
}

export enum MusicTempo {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export type ModInfoType = {
  [key in Mode]: ModeOptionType[] | [];
};

export type ModeOptionType = {
  indicator: string;
  musicTempo: number;
};
