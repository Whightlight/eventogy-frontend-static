import EventCardGrid from "@/components/event-grid";
import { EventsResponse } from "@/lib/types";
import { createApi } from "unsplash-js";


// revalidate page every 2 minutes for new events (and photos..)
export const revalidate = 120

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

  const events = eventsResponse.data.events;

  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    fetch: fetch,
  });

  const photosResponse = await unsplash.photos.getRandom({
    featured: true,
    query: "event",
    count: eventsResponse.data.events.length,
  });

  // Map photos to events
  events.forEach((event, index) => {
    if (photosResponse.response[index]) {
      event.photo_url = photosResponse.response[index].urls.regular;
      event.photo_description =
        photosResponse.response[index].description ||
        photosResponse.response[index].alt_description ||
        "No description available";
    }
  });

  return <EventCardGrid events={events} />;
}
