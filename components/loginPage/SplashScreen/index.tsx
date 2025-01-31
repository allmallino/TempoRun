import { Images } from "@/constants/Images";
import useLogo from "@/hooks/useLogo";
import useTheme from "@/hooks/useTheme";
import { Theme } from "@/theme/types";
import { Image } from "expo-image";
import { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSequence,
} from "react-native-reanimated";

export default function SplashScreen({ loaded = false }: { loaded?: boolean }) {
  const topValue = useSharedValue(300);
  const styles = useTheme(getStyle);
  const logo = useLogo();
  // const opacityValue = useSharedValue(1);

  useEffect(() => {
    topValue.value = withTiming(45 + (StatusBar.currentHeight || 0), {
      duration: 500,
    });
  }, []);

  // const containerAnimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: 1,
  //   };
  // });

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: topValue.value,
    };
  });

  return (
    <Animated.View style={[styles.container]}>
      <Animated.Image source={logo} style={[styles.logo, logoAnimatedStyle]} />
      <Image source={Images.splashScreen.loading} style={styles.loading} />
    </Animated.View>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.surfaceContainerLow,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    },
    logo: {
      height: 80,
      width: 323,
      position: "absolute",
    },
    loading: {
      height: 50,
      width: 50,
      position: "absolute",
      alignSelf: "center",
    },
  });
