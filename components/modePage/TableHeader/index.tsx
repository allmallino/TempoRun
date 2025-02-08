import ThemedText from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

type TableHeaderProps = {
  titles: string[];
};

export default function TableHeader({ titles }: TableHeaderProps) {
  const { t } = useTranslation();
  const i18nRoot = "app:mode:table:header";

  return (
    <View style={styles.container}>
      {titles.map((title, index) => (
        <View
          key={index}
          style={[styles.titleContainer, { flex: 1 + index / 2 }]}
        >
          <ThemedText type="defaultSemiBold">
            {t(`${i18nRoot}.${title}`)}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
