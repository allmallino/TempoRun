import { ThemeContext } from "@/theme/ThemeContext";
import { Theme } from "@/theme/types";
import { useContext, useMemo } from "react";

export default function useTheme<T>(getStyle: (theme: Theme) => T): T {
  const { theme } = useContext(ThemeContext);

  const style = useMemo(() => getStyle(theme), [theme, getStyle]);

  return style;
}
