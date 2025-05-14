import { useEffect, useMemo, useRef } from "react";
import { MusicTempo } from "@/state/mode/types";
import { useState } from "react";
import { useSession } from "@/contexts/SessionContext";
import { useSelector } from "react-redux";
import {
  getSelectedMode,
  getSelectedOptionByIndex,
  getSelectedOptionsLength,
} from "@/state/mode/selectors";
import { convertDictionary } from "@/helpers";

const INTERVAL_DELAY = 1000;

export function useAlgorithm() {
  const [currentTempo, setCurrentTempo] = useState<MusicTempo>(
    MusicTempo.MEDIUM
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { sessionData, currentOptionIndex, setCurrentOptionIndex } =
    useSession();
  const totalOptions = useSelector(getSelectedOptionsLength);
  const mode = useSelector(getSelectedMode);

  const nextIndex = Math.min(currentOptionIndex + 1, totalOptions - 1);
  const currentOption = useSelector(getSelectedOptionByIndex(nextIndex));
  const convert = useMemo(() => convertDictionary[mode], [mode]);

  useEffect(() => {
    const checkAndUpdateTempo = () => {
      if (!sessionData) return;

      const tempo = convert(sessionData, currentOption);

      if (tempo) {
        setCurrentTempo(tempo);
        setCurrentOptionIndex(nextIndex);
      }
    };

    intervalRef.current = setInterval(checkAndUpdateTempo, INTERVAL_DELAY);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sessionData, currentOption, nextIndex, convert]);

  useEffect(() => {
    if (currentOptionIndex >= 0) {
      console.log("Music tempo has changed, new tempo:", currentTempo);
    }
  }, [currentTempo]);

  return {
    currentOptionIndex,
    currentTempo,
    totalOptions,
    mode,
  };
}
