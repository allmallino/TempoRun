import { Colors } from "@/constants/Colors";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Image } from "expo-image";
import ThemedText from "@/components/ThemedText";
import { useTranslation } from "react-i18next";

export type SocialLoginButtonProps = TouchableOpacityProps & {
  logo?: ImageSourcePropType;
  title: string;
  backgroundColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export default function SocialLoginButton({
  onPress,
  logo,
  title,
  backgroundColor = Colors.neutral[35],
  style,
  ...rest
}: SocialLoginButtonProps) {
  const { t } = useTranslation();
  const i18nRoot = "auth:login";
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <TouchableOpacity onPress={onPress} style={styles.button} {...rest}>
        {logo && <Image source={logo} style={styles.logo} />}
        <ThemedText type="defaultSemiBold" style={styles.text}>
          {`${t(`${i18nRoot}.logInWith`)} ${title}`}
        </ThemedText>
      </TouchableOpacity>
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
