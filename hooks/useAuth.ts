import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/state/user/selectors";
import { clearUser } from "@/state/user/userSlice";
import { UserType } from "@/state/user/types";
import { setUser } from "@/state/user/userSlice";
import auth from "@react-native-firebase/auth";

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
    signOut: () => {
      dispatch(clearUser());
      auth().signOut();
    },
  };
}

export default useAuth;
