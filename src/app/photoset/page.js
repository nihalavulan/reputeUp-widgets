import Photoset from '@/Components/Photoset/Photoset'
import { getServerReviews } from '@/services/serverReviewService'

export default async function PhotosetPage() {
  const apiId = "1749890233";
  const reviews = await getServerReviews(apiId);
  return <Photoset reviews={reviews} />
} 