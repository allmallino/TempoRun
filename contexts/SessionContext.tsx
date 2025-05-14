import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { calculateAveragePace, calculatePace } from "@/helpers/Session";
import { calculateDistance } from "@/helpers/Session";

const LOCATION_TRACKING = "background-location-tracking";
const TIME_UPDATE_INTERVAL = 1000;
const DISTANCE_UPDATE_INTERVAL = 10;

declare global {
  interface Window {
    sessionUpdateCallback?: (location: Location.LocationObject) => void;
  }
}

interface SessionData {
  startTime: number;
  distance: number;
  pace: number;
  currentOptionIndex: number;
}

interface FitnessData {
  sessionData: SessionData;
  paceHistory: number[];
  currentKilometerPaces: number[];
  lastLocation?: Location.LocationObject | null;
}

interface SessionContextType {
  sessionData: SessionData | null;
  startSession: () => void;
  endSession: () => void;
  getAveragePace: () => number;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

TaskManager.defineTask(
  LOCATION_TRACKING,
  async (
    body: TaskManager.TaskManagerTaskBody<{
      locations: Location.LocationObject[];
    } | null>
  ) => {
    if (body.error) {
      console.error(body.error);
      return;
    }
    if (body.data) {
      const { locations } = body.data;
      const location = locations[0];
      if (location) {
        window.sessionUpdateCallback?.(location);
      }
    }
  }
);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [fitnessData, setFitnessData] = useState<FitnessData | null>(null);

  useEffect(() => {
    window.sessionUpdateCallback = (location: Location.LocationObject) => {
      setFitnessData((prev) => {
        if (!prev) return null;

        const paceHistory = [...prev.paceHistory];
        let currentKilometerPaces = [...prev.currentKilometerPaces];

        const travelledDistance = prev.lastLocation
          ? calculateDistance(prev.lastLocation, location)
          : 0;
        const newDistance = prev.sessionData.distance + travelledDistance;

        const timeElapsed =
          location.timestamp -
          (prev.lastLocation?.timestamp ?? prev.sessionData.startTime);
        const currentPace = calculatePace(travelledDistance, timeElapsed);

        const currentKilometer = Math.floor(newDistance / 1000);
        const lastKilometer = prev.lastLocation
          ? Math.floor(prev.sessionData.distance / 1000)
          : currentKilometer;

        if (currentKilometer !== lastKilometer) {
          paceHistory.push(calculateAveragePace(currentKilometerPaces));
          currentKilometerPaces = [currentPace];
        } else {
          currentKilometerPaces.push(currentPace);
        }

        return {
          ...prev,
          sessionData: {
            ...prev.sessionData,
            distance: newDistance,
            pace: calculateAveragePace(currentKilometerPaces),
          },
          paceHistory,
          currentKilometerPaces,
          lastLocation: location,
        };
      });
    };

    return () => {
      delete window.sessionUpdateCallback;
    };
  }, []);

  const startLocationUpdates = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.High,
      timeInterval: TIME_UPDATE_INTERVAL,
      distanceInterval: DISTANCE_UPDATE_INTERVAL,
      pausesUpdatesAutomatically: false,
      activityType: Location.ActivityType.Fitness,
    });
  };

  const startSession = async () => {
    setFitnessData({
      sessionData: {
        startTime: Date.now(),
        distance: 0,
        pace: 0,
        currentOptionIndex: 0,
      },
      paceHistory: [],
      currentKilometerPaces: [],
      lastLocation: null,
    });

    await startLocationUpdates();
  };

  const endSession = async () => {
    try {
      await Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
    } catch (error) {
      console.error("Error stopping location updates:", error);
    }
  };

  const getAveragePace = () => {
    return calculateAveragePace([
      ...(fitnessData?.currentKilometerPaces ?? []),
      calculateAveragePace(fitnessData?.currentKilometerPaces ?? []),
    ]);
  };

  return (
    <SessionContext.Provider
      value={{
        sessionData: fitnessData?.sessionData ?? null,
        startSession,
        endSession,
        getAveragePace,
      }}
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
