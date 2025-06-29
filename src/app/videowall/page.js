import VideoWall from '@/Components/VideoWall/VideoWall'
import { getServerReviews } from '@/services/serverReviewService'

export default async function VideoWallPage() {
  const apiId = "1749890233";
  const reviews = await getServerReviews(apiId);
  return <VideoWall reviews={reviews} />
} 