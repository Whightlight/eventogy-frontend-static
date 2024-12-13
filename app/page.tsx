import EventCardGrid from "@/components/event-grid";
import { EventsResponse } from "@/lib/types";

export default async function Home() {
  const response = await fetch("https://www.eventogy.com/api/events.json", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const eventsResponse: EventsResponse = await response.json();

  if (!eventsResponse.success) {
    throw new Error("Something went wrong");
  }

  console.log(eventsResponse)

  return <EventCardGrid events={eventsResponse.data.events} />;
}
