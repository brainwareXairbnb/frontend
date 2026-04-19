import ListingDetailClient from "./ListingDetailClient";

export async function generateStaticParams() {
  // Return a placeholder for build - actual listings are loaded dynamically
  return [{ id: 'placeholder' }];
}

export default function AdminListingDetailPage() {
  return <ListingDetailClient />;
}
