import { useState } from "react";
import DashboardItem from "../DashboardItem";

export default function Pacer() {
  const [pace, setPace] = useState("00:00");
  return <DashboardItem label="pace" value={pace} />;
}
