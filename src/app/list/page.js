import List from '@/Components/List/List'
import { getServerReviews } from '@/services/serverReviewService'

export default async function ListPage() {
  // Fetch reviews server-side
  const apiId = "1749890233"; // Using the default API ID
  const reviews = await getServerReviews(apiId);

  return <List reviews={reviews} />
} 