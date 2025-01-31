import { Redirect, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import SplashScreen from "@/components/loginPage/SplashScreen";
import useAuth from "@/hooks/useAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { UserType } from "@/state/user/types";

export default function AppLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setIsInitialized(false);
      if (user) {
        const userData: UserType = {
          uid: user.uid,
          email: user.email ?? "",
          displayName: user.displayName ?? "",
          photoURL: user.photoURL ?? "",
        };
        login(userData);
      }
      setIsInitialized(true);
    });
    return subscriber;
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
