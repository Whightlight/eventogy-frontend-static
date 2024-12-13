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

function formatDates(dates: string[]): string {
  const parsedDates = dates.map((date) => new Date(date));

  // Sort dates to ensure chronological order
  parsedDates.sort((a, b) => a.getTime() - b.getTime());

  const startDate = parsedDates[0];
  const endDate = parsedDates[parsedDates.length - 1];

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const monthYear = startDate.toLocaleDateString("en-US", options);

  return `from ${startDay} to ${endDay} of ${monthYear}`;
}

export default function EventCard({
  eventDetails,
}: {
  eventDetails: Event;
}): JSX.Element {
  const formattedDates: string | null = eventDetails.data?.scheduled_dates
    ? formatDates(eventDetails.data.scheduled_dates)
    : null;

  return (
    <Card key={eventDetails.id} className="flex flex-col h-[28rem] overflow-clip">
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

    <div className="flex flex-col flex-grow">
      {eventDetails.name ? (
        <CardHeader>
          {
            eventDetails.is_published ? <div className=" text-xs text-green-400">Live</div> : <div className=" text-xs text-zinc-400">Draft</div>
          }
          <CardTitle className="font-light text-xl h-[56px]">
            {eventDetails.name}
          </CardTitle>
        </CardHeader>
      ) : null}

      <CardContent>
        {eventDetails.data ? (
          <div className="flex flex-col space-x-0">
            {eventDetails.data.location_name ? (
              <p>{`${eventDetails.data.location_name}`}</p>
            ) : <div className=" text-sm font-light">Click to add a location!</div>}
            {formattedDates ? (
              <div className="flex flex-col space-x-0 text-sm text-zinc-500">
                <p>{formattedDates}</p>
              </div>
            ) : <div className=" text-sm font-light">Click to add dates!</div>}
          </div>
        ) : <div className=" text-sm font-light">Click to add a location and dates!</div>}
      </CardContent>
    </div>

    <CardFooter className="mt-auto">
      <p className="text-xs text-zinc-300">
        {`Created: ${new Date(eventDetails.created_at).toLocaleDateString()}`}
      </p>
    </CardFooter>
  </Card>
  );
}
