import RoomDetailClient from "./RoomDetailClient";
import { rooms as staticRooms } from "@/data/rooms";

export async function generateStaticParams() {
  return staticRooms.map((room: any) => ({
    id: room.id.toString(),
  }));
}

export default function RoomDetailPage() {
  return <RoomDetailClient />;
}
