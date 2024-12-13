import { getEvents } from "@/lib/get-events";

export async function generateStaticParams() {
  const events = await getEvents();

  return events.map((event) => ({
    eventSlug: event.slug,
  }));
}


export default async function EventPage({ params }: { params: { eventSlug: string } }) {
    const events = await getEvents()
    const event = events.find((e) => e.slug === params.eventSlug)
  
    if (!event) {
      return <div>Event not found</div>
    }
  
    return (
      <div>
        <h1>{event.name}</h1>
        <p>{event.photo_description}</p>
        {/* Add more event details here */}
      </div>
    )
  }