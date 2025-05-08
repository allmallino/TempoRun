export type ModeType = {
  selectedMode: Mode;
  currentOptionIndex: number;
  modsInfo: ModInfoType;
};

export enum Mode {
  TIMER = "timer",
  MAP = "map",
  LENGTH = "length",
  PACE = "pace",
}

export enum MusicTempo {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export type ModInfoType = {
  [key in Mode]: ModeOptionType[] | [];
};

export type ModeOptionType = {
  indicator: string;
  musicTempo: MusicTempo;
};
