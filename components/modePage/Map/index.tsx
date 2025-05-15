import { Theme } from "@/theme/types";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-maps";
import { useEffect, useState, useMemo } from "react";
import * as Location from "expo-location";
import React from "react";
import { useSelector } from "react-redux";
import { getSelectedOptions } from "@/state/mode/selectors";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { changeIndicatorAsync } from "@/state/mode/modeSlice";
import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import ThemedText from "@/components/ThemedText";

export default function Map() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const locations = useSelector(getSelectedOptions).map((option) => {
    const [latitude, longitude] = option.indicator.split(",");
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
  });

  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      setCurrentLocation(location);
      setIsLoading(false);
    };

    requestLocation();
  }, []);

  const markers = useMemo(
    () =>
      locations.length > 0
        ? locations.map((location, index) => {
            const coordinate =
              !location.latitude && !location.longitude
                ? {
                    latitude: currentLocation?.coords.latitude ?? 0,
                    longitude: currentLocation?.coords.longitude ?? 0,
                  }
                : location;

            const title = String.fromCharCode(64 + index);

            return index !== 0 ? (
              <View key={title + "-marker"}>
                <Marker
                  coordinate={coordinate}
                  title={title}
                  draggable={index !== 0}
                  onDragEnd={(e) => {
                    const indicator = `${e.nativeEvent.coordinate.latitude},${e.nativeEvent.coordinate.longitude}`;
                    dispatch(changeIndicatorAsync({ index, indicator }));
                  }}
                />
                <Circle
                  center={coordinate}
                  radius={100}
                  strokeColor="rgba(0, 26, 255, 0.5)"
                  strokeWidth={2}
                  fillColor="rgba(0, 132, 255, 0.1)"
                />
              </View>
            ) : null;
          })
        : null,
    [locations]
  );

  return (
    <View style={styles.container}>
      {isLoading || error ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
        </View>
      ) : (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          toolbarEnabled={false}
          showsPointsOfInterest={false}
          showsBuildings={false}
          initialRegion={{
            latitude: currentLocation?.coords.latitude ?? 0,
            longitude: currentLocation?.coords.longitude ?? 0,
            latitudeDelta: 0.011,
            longitudeDelta: 0.011,
          }}
        >
          {markers}
        </MapView>
      )}
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: 300,
      backgroundColor: theme.surface,
    },
    loadingContainer: {
      flex: 1,
      gap: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      color: theme.error,
    },
    map: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
  });
