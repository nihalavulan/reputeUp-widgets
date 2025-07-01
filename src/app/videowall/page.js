export const dynamic = "force-dynamic";
import VideoWall from '@/Components/VideoWall/VideoWall'
import { getServerReviews } from '@/services/serverReviewService'

export default async function VideoWallPage() {
  const apiId = "1749890233";
  const { reviews, widget_settings } = await getServerReviews(apiId);
  return <VideoWall reviews={reviews} widget_settings={widget_settings} />
} 