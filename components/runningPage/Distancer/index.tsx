import { useState } from "react";
import DashboardItem from "../DashboardItem";

export default function Distancer() {
  const [distance, setDistance] = useState("0.00");
  return <DashboardItem label={"distance"} value={distance} />;
}
