import { Event } from "@/lib/types";
import EventCard from "./event-card";
import Link from "next/link";

export default function EventCardGrid({ events }: { events: Event[] }) {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {events.map((event) => {
          return (
            <Link href={`event/${event.slug}`}>
              <EventCard eventDetails={event} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
