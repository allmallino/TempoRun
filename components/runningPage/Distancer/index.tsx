import { useState } from "react";
import DashboardItem from "../DashboardItem";

export default function Distancer() {
  const [distance, setDistance] = useState("0.23");
  return <DashboardItem label={"distance"} value={distance} unit="km" />;
}
