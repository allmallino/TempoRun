import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from "react";

const UPDATE_INTERVAL = 500;

interface SessionData {
  startTime: number;
  distance: number;
  pace: number;
  currentOptionIndex: number;
}

interface SessionContextType {
  sessionData: SessionData | null;
  startSession: () => void;
  endSession: () => void;
  getAveragePace: () => number;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [paceHistory, setPaceHistory] = useState<number[]>([]);
  const interval = useRef<NodeJS.Timeout | null>(null);

  const updateSessionData = () => {
    setSessionData((prev) => {
      if (!prev) return null;
      // console.log("sessionUpdate");
      return {
        ...prev,
        distance: prev.distance + 10,
        pace: 0,
        currentOptionIndex: 0,
      };
    });
  };

  const startSession = () => {
    // console.log("startSession");
    setSessionData({
      startTime: Date.now(),
      distance: 0,
      pace: 0,
      currentOptionIndex: 0,
    });
    setPaceHistory([]);

    interval.current = setInterval(updateSessionData, UPDATE_INTERVAL);
  };

  const endSession = () => {
    // console.log("endSession");
    if (interval.current) {
      clearInterval(interval.current);
    }
  };

  const getAveragePace = () => {
    if (paceHistory.length === 0) return 0;
    const totalPace = paceHistory.reduce((sum, pace) => sum + pace, 0);
    return totalPace / paceHistory.length;
  };

  return (
    <SessionContext.Provider
      value={{ sessionData, startSession, endSession, getAveragePace }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
