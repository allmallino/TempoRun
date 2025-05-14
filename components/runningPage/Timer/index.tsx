import { formatTime } from "@/helpers";
import DashboardItem from "../DashboardItem";
import { useSession } from "@/contexts/SessionContext";
import { useState, useEffect, useRef, useCallback } from "react";

type TimerProps = {
  updateInterval?: number;
};

export default function Timer({ updateInterval = 1000 }: TimerProps) {
  const { sessionData } = useSession();
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);

  const updateElapsedTime = useCallback(() => {
    if (startTimeRef.current) {
      setElapsedTime((Date.now() - startTimeRef.current) / 1000);
    }
  }, []);

  const resetTimer = useCallback(() => {
    startTimeRef.current = null;
    setElapsedTime(0);
  }, []);

  useEffect(() => {
    if (!sessionData) {
      resetTimer();
      return;
    }

    if (startTimeRef.current !== sessionData.startTime) {
      startTimeRef.current = sessionData.startTime;
      setElapsedTime(0);
    }

    const interval = setInterval(updateElapsedTime, updateInterval);

    return () => clearInterval(interval);
  }, [sessionData?.startTime, updateInterval, updateElapsedTime, resetTimer]);

  return <DashboardItem label="timer" value={formatTime(elapsedTime)} />;
}
