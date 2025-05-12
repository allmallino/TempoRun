export type TrackAnalysisType = {
  id: string;
  name: string;
  artists: string[];
  genre: string;
  popularity: number;
  features: {
    tempo: number;
    key: number;
    mode: number;
    key_confidence: number;
    energy: number;
    danceability: number;
    valence: number;
    instrumentalness: number;
    acousticness: number;
    loudness: number;
    segments: {
      count: number;
      average_duration: number;
    };
    beats: {
      count: number;
      regularity: number;
    };
  };
};
