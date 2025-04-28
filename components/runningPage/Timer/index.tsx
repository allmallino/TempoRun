import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import DashboardItem from "../DashboardItem";

export default function Timer() {
  const [time, setTime] = useState(0);
  const startTime = useRef(0);
  useFocusEffect(
    useCallback(() => {
      startTime.current = new Date().getTime() / 1000;

      const interval = setInterval(() => {
        setTime(new Date().getTime() / 1000 - startTime.current);
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }, [])
  );

  return <DashboardItem label="timer" value={getTime(time)} />;
}

const getTime = (time: number) => {
  const hours = Math.floor(time / 3600).toString();
  const minutes = Math.floor((time % 3600) / 60).toString();
  const seconds = Math.floor(time % 60).toString();
  return `${hours.padStart(1, "0")}:${minutes.padStart(
    2,
    "0"
  )}:${seconds.padStart(2, "0")}`;
};
