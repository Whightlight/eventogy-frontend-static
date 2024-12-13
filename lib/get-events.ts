"server only";
import { createApi } from "unsplash-js";
import { EventsResponse } from "./types";
import { unstable_cache } from "next/cache";

// using unstable_cache here instead of adopting nextjs 15 caching mechanisms for brevity!
export const getEvents = unstable_cache(
  async () => {
    try {
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
        count: events.length,
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

      return events;
    } catch {
      throw new Error("Something went wrong");
    }
  },
  [],
  { revalidate: 120 }
);
