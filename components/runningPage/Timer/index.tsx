import { formatTime } from "@/helpers";
import DashboardItem from "../DashboardItem";
import { useSession } from "@/contexts/SessionContext";

export default function Timer() {
  const { sessionData } = useSession();

  const time = formatTime((Date.now() - sessionData!.startTime) / 1000);

  return <DashboardItem label="timer" value={time} />;
}
