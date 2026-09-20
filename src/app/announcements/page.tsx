import { AnnouncementReader } from "@/components/pages/AnnouncementReader";
import { pageMetadata } from "@/data/site";
export const metadata = pageMetadata(
  "Statements & Announcements",
  "Crown Power announcements on internships, intelligent infrastructure and electrical engineering.",
  "/announcements",
);
export default function AnnouncementsPage() {
  return <AnnouncementReader />;
}
