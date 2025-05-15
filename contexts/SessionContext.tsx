import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import {
  calculateAveragePace,
  calculatePace,
  calculateDistance,
} from "@/helpers";

const LOCATION_TRACKING = "background-location-tracking";
const TIME_UPDATE_INTERVAL = 1000;
const DISTANCE_UPDATE_INTERVAL = 10;

declare global {
  interface Window {
    sessionUpdateCallback?: (location: Location.LocationObject) => void;
  }
}

export interface SessionData {
  startTime: number;
  distance: number;
  pace: number;
  lastLocation?: Location.LocationObject | null;
}

interface FitnessData {
  sessionData: SessionData;
  paceHistory: number[];
  currentKilometerPaces: number[];
}

interface SessionContextType {
  sessionData: SessionData | null;
  startSession: () => Promise<void>;
  endSession: () => Promise<void>;
  getAveragePace: () => number;
  currentOptionIndex: number;
  setCurrentOptionIndex: (index: number) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const handleLocationUpdate = (
  location: Location.LocationObject,
  prevData: FitnessData
): FitnessData => {
  const paceHistory = [...prevData.paceHistory];
  let currentKilometerPaces = [...prevData.currentKilometerPaces];

  const travelledDistance = prevData.sessionData.lastLocation
    ? calculateDistance(
        prevData.sessionData.lastLocation.coords,
        location.coords
      )
    : 0;
  const newDistance = prevData.sessionData.distance + travelledDistance;

  const timeElapsed =
    location.timestamp -
    (prevData.sessionData.lastLocation?.timestamp ??
      prevData.sessionData.startTime);
  const currentPace = calculatePace(travelledDistance, timeElapsed);

  const currentKilometer = Math.floor(newDistance / 1000);
  const lastKilometer = prevData.sessionData.lastLocation
    ? Math.floor(prevData.sessionData.distance / 1000)
    : currentKilometer;

  if (currentKilometer !== lastKilometer) {
    paceHistory.push(calculateAveragePace(currentKilometerPaces));
    currentKilometerPaces = [currentPace];
  } else {
    currentKilometerPaces.push(currentPace);
  }

  return {
    sessionData: {
      ...prevData.sessionData,
      distance: newDistance,
      pace: calculateAveragePace(currentKilometerPaces),
      lastLocation: location,
    },
    paceHistory,
    currentKilometerPaces,
  };
};

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
    if (body.data?.locations[0]) {
      window.sessionUpdateCallback?.(body.data.locations[0]);
    }
  }
);

const createInitialFitnessData = (): FitnessData => ({
  sessionData: {
    startTime: Date.now(),
    distance: 0,
    pace: 0,
    lastLocation: null,
  },
  paceHistory: [],
  currentKilometerPaces: [],
});

const startLocationUpdates = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
    accuracy: Location.Accuracy.High,
    timeInterval: TIME_UPDATE_INTERVAL,
    distanceInterval: DISTANCE_UPDATE_INTERVAL,
    pausesUpdatesAutomatically: false,
    activityType: Location.ActivityType.Fitness,
  });
};

export function SessionProvider({ children }: { children: ReactNode }) {
  const [fitnessData, setFitnessData] = useState<FitnessData | null>(null);
  const [currentOptionIndex, setCurrentOptionIndex] = useState<number>(-1);
  useEffect(() => {
    window.sessionUpdateCallback = (location: Location.LocationObject) => {
      setFitnessData((prev) => {
        if (!prev) return null;
        return handleLocationUpdate(location, prev);
      });
    };

    return () => {
      delete window.sessionUpdateCallback;
    };
  }, []);

  const startSession = async () => {
    setFitnessData(createInitialFitnessData());
    setCurrentOptionIndex(-1);
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
    if (!fitnessData?.currentKilometerPaces) return 0;
    const allPaces = [
      ...fitnessData.currentKilometerPaces,
      calculateAveragePace(fitnessData.currentKilometerPaces),
    ];
    return calculateAveragePace(allPaces);
  };

  return (
    <SessionContext.Provider
      value={{
        sessionData: fitnessData?.sessionData ?? null,
        startSession,
        endSession,
        getAveragePace,
        currentOptionIndex,
        setCurrentOptionIndex,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
