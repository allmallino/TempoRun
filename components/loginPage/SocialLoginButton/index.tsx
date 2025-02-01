import { Colors } from "@/constants/Colors";
import {
  StyleSheet,
  Pressable,
  View,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Image } from "expo-image";
import ThemedText from "@/components/ThemedText";
import { useTranslation } from "react-i18next";

export type SocialLoginButtonProps = PressableProps & {
  type?: "filled" | "outlined" | "text" | "elevated" | "tonal";
  logo?: any;
  title: string;
  backgroundColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export default function SocialLoginButton({
  onPress,
  type = "filled",
  logo,
  title,
  backgroundColor = Colors.neutral[35],
  color = Colors.white,
  style,
  ...rest
}: SocialLoginButtonProps) {
  const { t } = useTranslation();
  const i18nRoot = "auth:login";
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Pressable onPress={onPress} style={styles.button} {...rest}>
        {logo && <Image source={logo} style={styles.logo} />}
        <ThemedText
          type="defaultSemiBold"
          style={styles.text}
          children={`${t(`${i18nRoot}.logInWith`)} ${title}`}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  container: {
    borderRadius: 100,
    overflow: "hidden",
  },
  text: {
    color: Colors.white,
  },
  logo: {
    width: 16,
    height: 16,
  },
});
