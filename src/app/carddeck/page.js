import CardDeck from '@/Components/CardDeck'
import { getServerReviews } from '@/services/serverReviewService'

export default async function CardDeckPage() {
  const apiId = "1749890233";
  const { reviews, widget_settings } = await getServerReviews(apiId);
  return <CardDeck reviews={reviews} widget_settings={widget_settings} />
} 