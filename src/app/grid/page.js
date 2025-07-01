export const dynamic = "force-dynamic";
import Grid from '@/Components/Grid'
import { getServerReviews } from '@/services/serverReviewService'

export default async function GridPage() {
  // Fetch reviews server-side
  const apiId = "1749890233"; // Using the default API ID
  const { reviews, widget_settings } = await getServerReviews(apiId);

  return <Grid reviews={reviews} widget_settings={widget_settings} />
} 