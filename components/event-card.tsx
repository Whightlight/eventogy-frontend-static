import { event } from "firebase-functions/v1/analytics";
import { Event } from "../lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

export default function EventCard({
  eventDetails,
}: {
  eventDetails: Event;
}): JSX.Element {
  return (
    <Card key={eventDetails.id} className="flex flex-col  overflow-clip">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            alt={eventDetails.photo_description}
            src={eventDetails.photo_url}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardHeader>
        <CardTitle>{eventDetails.name}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        {eventDetails.data ? (
          <div className="flex flex-col space-x-0">
            {eventDetails.data.location_name && (
              <p>{`Location: ${eventDetails.data.location_name}`}</p>
            )}
            {eventDetails.data.location_address && (
              <p>{`Address: ${eventDetails.data.location_address}`}</p>
            )}

            {eventDetails.data.scheduled_dates &&  (
              <div className="flex flex-col space-x-0 text-sm text-zinc-500">
                {eventDetails.data.scheduled_dates.map((date) => {
                  return <p key={date}>{`${new Date(date).toDateString()}`}</p>;
                })}
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        <p className=" text-xs text-zinc-300">{`Created: ${new Date(
          eventDetails.created_at
        ).toLocaleDateString()}`}</p>
      </CardFooter>
    </Card>
  );
}
