import { Redirect, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import SplashScreen from "@/components/loginPage/SplashScreen";
import useAuth from "@/hooks/useAuth";
import auth from "@react-native-firebase/auth";
import { UserType } from "@/state/user/types";

export default function AppLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    let processedUid: string | null = null;
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (!user) {
        setIsInitialized(true);
        return;
      }

      if (processedUid === user.uid) {
        setIsInitialized(true);
        return;
      }

      processedUid = user.uid;
      setIsInitialized(false);
      const userData: UserType = {
        uid: user.uid,
        email: user.email ?? "",
        displayName: user.displayName ?? "",
        photoURL: user.photoURL ?? "",
        providerData: user.providerData,
      };
      login(userData);
      setIsInitialized(true);
    });

    return unsubscribe;
  }, []);

  if (!isInitialized) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
