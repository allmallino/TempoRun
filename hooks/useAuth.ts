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
        dispatch(setUser(user));
        await dispatch(initModeStateAsync(user.uid));
        await dispatch(initStreamingStateAsync(user.uid));
        await dispatch(initPlaylistsStateAsync(user.uid));
      }
    },
    signOut: async () => {
      dispatch(revertAll());
      await auth().signOut();
      if (GoogleSignin.hasPreviousSignIn()) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
    },
  };
}

export default useAuth;
