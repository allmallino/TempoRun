import { Soundstat } from "@/constants/API";
import { TrackAnalysisType } from "@/types/soundstatAPI";

export async function getTrackAnalysisFeatures(
  trackId: string
): Promise<TrackAnalysisType["features"] | null> {
  try {
    const response = await fetch(
      `${Soundstat.url.apiV1Endpoint}/track/${trackId}`,
      {
        headers: {
          Accept: "application/json",
          "x-api-key": Soundstat.env.apiKey,
        },
      }
    );
    if (response.status === 202) {
      console.error(
        "Fetching track analysis is in progress, trackId:",
        trackId
      );
      return null;
    }
    const res: TrackAnalysisType = await response.json();

    return res.features;
  } catch (error) {
    console.error("Failed to fetch track analysis:", error);
    return null;
  }
}
