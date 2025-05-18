import { useEffect, useMemo, useRef } from "react";
import { Mode, MusicTempo } from "@/state/mode/types";
import { useState } from "react";
import { useSession } from "@/contexts/SessionContext";
import { useSelector } from "react-redux";
import {
  getSelectedMode,
  getSelectedOptionByIndex,
  getSelectedOptionsLength,
} from "@/state/mode/selectors";
import { convertDictionary, groupBy, randomizeArray } from "@/helpers";
import { getActivatedPlaylist } from "@/state/playlists/selectors";
import { getTracksByIds } from "@/state/tracks/selectors";
import { useStreamingServiceToken } from "./useStreamingServiceToken";
import { setPlayback } from "@/services/spotifyService";

const INTERVAL_DELAY = 1000;

export function useAlgorithm() {
  const [currentTempo, setCurrentTempo] = useState<MusicTempo | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { sessionData, currentOptionIndex, setCurrentOptionIndex } =
    useSession();
  const totalOptions = useSelector(getSelectedOptionsLength);
  const mode = useSelector(getSelectedMode);

  const { getToken } = useStreamingServiceToken();

  const activePlaylist = useSelector(getActivatedPlaylist);
  const activeTrackIds =
    activePlaylist?.tracks
      ?.filter((track) => track.active)
      .map((track) => track.id) ?? [];

  const tracks = useSelector(getTracksByIds(activeTrackIds));
  const tracksByTempo = groupBy(tracks, (track) => track.info.tempo);

  const nextOptionIndex = Math.min(currentOptionIndex + 1, totalOptions - 1);
  const nextOption = useSelector(getSelectedOptionByIndex(nextOptionIndex));
  const convert = useMemo(() => convertDictionary[mode], [mode]);

  const updateTempoAndTrack = async (tempo: MusicTempo) => {
    setCurrentTempo(tempo);
    setCurrentOptionIndex(nextOptionIndex);
    if (tempo === currentTempo) return;

    const token = await getToken();
    if (!token) return;

    const trackQueue = randomizeArray(
      tracksByTempo[tempo]?.map((track) => track.id) ?? activeTrackIds
    );
    await setPlayback(token, trackQueue);
  };

  useEffect(() => {
    const isLastOption = currentOptionIndex === totalOptions - 1;
    if (isLastOption && mode !== Mode.PACE) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const checkAndUpdateTempo = () => {
      if (!sessionData) return;

      const tempo = convert(sessionData, nextOption);
      if (tempo) {
        updateTempoAndTrack(tempo);
      }
    };

    intervalRef.current = setInterval(checkAndUpdateTempo, INTERVAL_DELAY);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [sessionData, currentOptionIndex]);

  return {
    currentOptionIndex,
    currentTempo,
    totalOptions,
    mode,
  };
}
