import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/state/user/selectors";
import { UserType } from "@/state/user/types";
import { setUser } from "@/state/user/userSlice";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { revertAll } from "@/state/actions";
import { initStreamingStateAsync } from "@/state/streaming/streamingSlice";
import { initPlaylistsStateAsync } from "@/state/playlists/playlistSlice";
import { initModeStateAsync } from "@/state/mode/modeSlice";
import { AppDispatch } from "@/state/store";
import { setLoaderVisibility } from "@/state/loader/loaderSlice";
import { Alert } from "react-native";

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
  };
}

export default useAuth;
