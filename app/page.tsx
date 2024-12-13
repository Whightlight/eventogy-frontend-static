import EventCardGrid from "@/components/event-grid";
import { getEvents } from "@/lib/get-events";

// revalidate page every 2 minutes for new events (and photos..)
export const revalidate = 120;

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="flex flex-col space-x-0 space-y-3">
      <h1 className="text-7xl font-bold">Your Events</h1>
      <EventCardGrid events={events} />
    </div>
  );
}
