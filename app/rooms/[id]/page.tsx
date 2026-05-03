import RoomDetailClient from "./RoomDetailClient";

export async function generateStaticParams() {
  // Return a placeholder for build - actual rooms are loaded dynamically
  return [{ id: 'placeholder' }];
}

export default function RoomDetailPage() {
  return <RoomDetailClient />;
}
