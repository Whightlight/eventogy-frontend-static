import { Event } from "@/lib/types";
import EventCard from "./event-card";

export default function EventCardGrid({events}:{events: Event[]}) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {events.map((event) => {
            return <EventCard eventDetails={event}/>
        })}
      </div>
    </div>
  );
}
