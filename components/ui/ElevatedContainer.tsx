import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/theme/ThemeContext";
import { Theme } from "@/theme/types";
import { useContext } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

type ElevationType = 1 | 2 | 3 | 4 | 5;

type ElevatedContainerPropsType = {
  elevation: ElevationType;
} & ViewProps;

export default function ElevatedContainer({
  style,
  children,
  elevation,
}: ElevatedContainerPropsType) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.outerShadow, getOuterShadowStyle(elevation)]}>
      <View style={[styles.innerShadow, getInnerShadowStyle(elevation)]}>
        <View
          style={[
            styles.container,
            { backgroundColor: getContentBackgroundColor(theme, elevation) },
            style,
          ]}
        >
          {children}
        </View>
      </View>
    </View>
  );
}

const getContentBackgroundColor = (theme: Theme, elevation: ElevationType) => {
  switch (elevation) {
    case 1:
      return theme.surfaceContainerLow;
    case 2:
      return theme.surfaceContainer;
    case 3:
      return theme.surfaceContainerHigh;
    case 4:
      return theme.surfaceContainerHigh;
    case 5:
      return theme.surfaceContainerHighest;
  }
};

const getInnerShadowStyle = (elevation: ElevationType) => {
  switch (elevation) {
    case 1:
      return {
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
      };
    case 2:
      return {
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
      };
    case 3:
      return {
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 3,
      };
    case 4:
      return {
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 3,
      };
    case 5:
      return {
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,
        elevation: 4,
      };
  }
};

const getOuterShadowStyle = (elevation: ElevationType) => {
  switch (elevation) {
    case 1:
      return {
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 3,
      };
    case 2:
      return {
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 6,
      };
    case 3:
      return {
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 8,
      };
    case 4:
      return {
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        elevation: 10,
      };
    case 5:
      return {
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 12,
        elevation: 12,
      };
  }
};

const styles = StyleSheet.create({
  outerShadow: {
    shadowColor: Colors.black,
    shadowOpacity: 0.15,
    width: "100%",
    borderRadius: 16,
  },

  innerShadow: {
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
  },

  container: {
    borderRadius: 16,
    alignItems: "center",
  },
});
