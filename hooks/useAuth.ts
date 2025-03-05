import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/state/user/selectors";
import { UserType } from "@/state/user/types";
import { setUser } from "@/state/user/userSlice";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { revertAll } from "@/state/actions";

export function useAuth() {
  const user = useSelector(getUser);

  const dispatch = useDispatch();
  return {
    userToken: user?.uid,
    user,
    userEmail: user?.email,
    userDisplayName: user?.displayName,
    isAuthenticated: !!user,
    login: (user: UserType) => {
      dispatch(setUser(user));
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
