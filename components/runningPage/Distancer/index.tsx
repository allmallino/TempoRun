import { formatDistance } from "@/helpers";
import DashboardItem from "../DashboardItem";
import { useSession } from "@/contexts/SessionContext";

export default function Distancer() {
  const { sessionData } = useSession();
  const distance = formatDistance(sessionData!.distance);

  return <DashboardItem label="distance" value={distance} unit="km" />;
}
