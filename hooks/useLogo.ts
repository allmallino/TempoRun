import { Images } from "@/constants/Images";
import { ThemeContext } from "@/theme/ThemeContext";
import { useContext, useMemo } from "react";

export default function useLogo() {
  const { theme } = useContext(ThemeContext);
  const logo = useMemo(
    () => (theme.dark ? Images.tempoRun.logo : Images.tempoRun.logoBlack),
    [theme]
  );
  return logo;
}
