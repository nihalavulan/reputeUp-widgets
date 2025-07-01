export const dynamic = "force-dynamic";
import InlineSlider from '@/Components/InlineSlider/InlineSlider'
import { getServerReviews } from '@/services/serverReviewService'

export default async function InlineSliderPage() {
  // Fetch reviews server-side
  const apiId = "1749890233"; // Using the default API ID
  const { reviews, widget_settings } = await getServerReviews(apiId);

  return <InlineSlider reviews={reviews} widget_settings={widget_settings} />
} 