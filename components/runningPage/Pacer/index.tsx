import { useState } from "react";
import DashboardItem from "../DashboardItem";

export default function Pacer() {
  const [pace, setPace] = useState("05:50");
  return <DashboardItem label="pace" value={pace} unit="/km" />;
}
