export const dynamic = "force-dynamic";
import Photoset from '@/Components/Photoset/Photoset'
import { getServerReviews } from '@/services/serverReviewService'

export default async function PhotosetPage() {
  const apiId = "1749890233";
  const { reviews, widget_settings } = await getServerReviews(apiId);
  return <Photoset reviews={reviews} widget_settings={widget_settings} />
} 