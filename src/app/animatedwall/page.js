import AnimatedWall from '@/Components/AnimatedWall/AnimatedWall'
import { getServerReviews } from '@/services/serverReviewService'

export default async function AnimatedWallPage() {
  const apiId = "1749890233";
  const { reviews, widget_settings } = await getServerReviews(apiId);
  return <AnimatedWall reviews={reviews} widget_settings={widget_settings} />
} 