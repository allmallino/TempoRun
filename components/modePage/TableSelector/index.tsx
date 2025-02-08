import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import RNPickerSelect from "react-native-picker-select";

type TableSelectorProps<T> = {
  value: T;
  items: { label: string; value: T }[];
  onValueChange: (value: T) => void;
};

export default function TableSelector<T>({
  value,
  items,
  onValueChange,
}: TableSelectorProps<T>) {
  const { theme } = useContext(ThemeContext);
  const color = theme.onSurface;

  return (
    <RNPickerSelect
      onValueChange={onValueChange}
      value={value}
      style={{
        inputAndroid: {
          color,
        },
        inputIOS: {
          color,
        },
      }}
      pickerProps={{
        dropdownIconColor: color,
        selectionColor: color,
        mode: "dropdown",
      }}
      darkTheme={theme.dark}
      items={items}
      placeholder={{}}
    />
  );
}
