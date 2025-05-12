import { formatPace } from "@/helpers";
import DashboardItem from "../DashboardItem";
import { useSession } from "@/contexts/SessionContext";

export default function Pacer() {
  const { sessionData } = useSession();
  const pace = formatPace(sessionData!.pace);

  return <DashboardItem label="pace" value={pace} unit="/km" />;
}
