import CardDeck from '@/Components/CardDeck'
import { getServerReviews } from '@/services/serverReviewService'

export default async function CardDeckPage() {
  const apiId = "1749890233";
  const reviews = await getServerReviews(apiId);
  return <CardDeck reviews={reviews} />
} 