import ThemedButton from "@/components/ThemedButton";
import ThemedInput from "@/components/ThemedInput";
import IconButton from "@/components/ui/IconButton";
import { useCallback, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import SocialLoginButton from "../SocialLoginButton";
import { Images } from "@/constants/Images";
import { FirebaseError } from "@firebase/app";
import { auth } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { router } from "expo-router";
import useForm from "@/hooks/useForm";
import { getFirebaseErrorMessage, validateAuthForm } from "@/helpers/Auth";
import { useTranslation } from "react-i18next";

export default function LoginInputs() {
  const [isBlured, setBlured] = useState(true);
  const { values, errors, handleChange, handleSubmit, setError } = useForm(
    {
      email: "",
      password: "",
    },
    validateAuthForm
  );

  const [isLoading, setLoading] = useState(false);

  const iconButton = useCallback(
    (color: string, style: StyleProp<ViewStyle>) => (
      <IconButton
        icon={isBlured ? "eye.slash.fill" : "eye.fill"}
        color={color}
        style={style}
        onPress={() => setBlured(!isBlured)}
      />
    ),
    [isBlured]
  );
  const { t } = useTranslation();
  const i18nRoot = "auth:login";

  const handleLoginClick = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.replace("/");
    } catch (err) {
      const error = err as FirebaseError;
      const { field, message } = getFirebaseErrorMessage(error.code);
      setError(field, message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationClick = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      router.replace("/");
    } catch (err) {
      const error = err as FirebaseError;
      const { field, message } = getFirebaseErrorMessage(error.code);
      setError(field, message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedInput
        value={values.email}
        onChangeText={handleChange("email")}
        state={errors.email ? "error" : "default"}
        label={t(`${i18nRoot}.email`)}
        textContentType="emailAddress"
        keyboardType="email-address"
        supportingText={t(errors.email)}
        autoCapitalize="none"
      />

      <ThemedInput
        state={errors.password ? "error" : "default"}
        label={t(`${i18nRoot}.password`)}
        value={values.password}
        onChangeText={handleChange("password")}
        secureTextEntry={isBlured}
        textContentType="password"
        trailingIcon={iconButton}
        supportingText={t(errors.password)}
      />

      <View style={styles.buttonContainer}>
        <ThemedButton
          title={t(`${i18nRoot}.signUp`)}
          onPress={() => handleSubmit(handleRegistrationClick)}
          type="outlined"
          style={styles.button}
        />
        <ThemedButton
          title={t(`${i18nRoot}.logIn`)}
          onPress={() => handleSubmit(handleLoginClick)}
          type="filled"
          style={styles.button}
        />
      </View>
      <View style={styles.buttonContainer}>
        <SocialLoginButton
          title="Google"
          style={styles.button}
          logo={Images.social.google.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    gap: 36,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
  },
  button: {
    flex: 1,
  },
});
