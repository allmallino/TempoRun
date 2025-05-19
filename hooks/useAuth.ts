import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/state/user/selectors";
import { UserType } from "@/state/user/types";
import { setUser } from "@/state/user/userSlice";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { revertAll } from "@/state/actions";
import {
  initStreamingStateAsync,
  removeStreamingServiceAsync,
} from "@/state/streaming/streamingSlice";
import {
  initPlaylistsStateAsync,
  removeAllPlaylistsAsync,
} from "@/state/playlists/playlistSlice";
import { initModeStateAsync } from "@/state/mode/modeSlice";
import { AppDispatch } from "@/state/store";
import { setLoaderVisibility } from "@/state/loader/loaderSlice";
import { Alert } from "react-native";
import { deleteUserData } from "@/services/firestoreService";

const signOut = async () => {
  await auth().signOut();
  if (GoogleSignin.hasPreviousSignIn()) {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  }
};
export function useAuth() {
  const user = useSelector(getUser);

  const dispatch = useDispatch<AppDispatch>();
  return {
    userToken: user?.uid,
    user,
    userEmail: user?.email,
    userDisplayName: user?.displayName,
    isAuthenticated: !!user,
    isEmailProvider: user?.providerData.some(
      (provider) => provider.providerId === "password"
    ),
    login: async (user: UserType) => {
      if (user) {
        try {
          dispatch(setLoaderVisibility(true));
          dispatch(setUser(user));
          await dispatch(initModeStateAsync(user.uid));
          await dispatch(initStreamingStateAsync(user.uid));
          await dispatch(initPlaylistsStateAsync(user.uid));
        } catch (error) {
          Alert.alert("Error", "There was an error. Please try login again.");
          dispatch(revertAll());
          await signOut();
        } finally {
          dispatch(setLoaderVisibility(false));
        }
      }
    },
    signOut: async () => {
      dispatch(setLoaderVisibility(true));
      dispatch(revertAll());
      await signOut();
      dispatch(setLoaderVisibility(false));
    },
    changeEmail: async (email: string) => {
      if (!user) return;

      dispatch(setLoaderVisibility(true));
      try {
        await auth().currentUser?.updateEmail(email);
      } catch (error) {
        Alert.alert("Error", "Failed to update email");
        console.error(error);
      } finally {
        dispatch(setLoaderVisibility(false));
      }
    },

    changePassword: async (password: string) => {
      if (!user) return;

      dispatch(setLoaderVisibility(true));
      try {
        await auth().currentUser?.updatePassword(password);
      } catch (error) {
        Alert.alert("Error", "Failed to update password");
        console.error(error);
      } finally {
        dispatch(setLoaderVisibility(false));
      }
    },

    removeSpotifyService: async () => {
      if (!user) return;

      dispatch(setLoaderVisibility(true));
      try {
        await dispatch(removeStreamingServiceAsync(user.uid));
        await dispatch(removeAllPlaylistsAsync(user.uid));
      } catch (error) {
        Alert.alert("Error", "Failed to remove Spotify service");
        console.error(error);
      } finally {
        dispatch(setLoaderVisibility(false));
      }
    },

    deleteAccount: async () => {
      if (!user) return;

      dispatch(setLoaderVisibility(true));
      try {
        await deleteUserData(user.uid);
        await auth().currentUser?.delete();
      } catch (error) {
        Alert.alert("Error", "Failed to delete account");
        console.error(error);
      } finally {
        dispatch(setLoaderVisibility(false));
      }
    },
  };
}

export default useAuth;
