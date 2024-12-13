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
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
