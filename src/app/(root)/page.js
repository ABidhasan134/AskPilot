import HomeBannar from "@/components/home/homeBannar";
import PastInterviews from "@/components/home/pastInterview";
import RouteStorageCleaner from "@/components/interview/routeStorageCleaner";

export default function Home() {
  return (
    <div>
      <HomeBannar></HomeBannar>
      <PastInterviews></PastInterviews>
      <RouteStorageCleaner></RouteStorageCleaner>
    </div>
  );
}
