import AnimatedWall from '@/Components/AnimatedWall/AnimatedWall'
import { getServerReviews } from '@/services/serverReviewService'

export default async function AnimatedWallPage() {
  const apiId = "1749890233";
  const reviews = await getServerReviews(apiId);
  return <AnimatedWall reviews={reviews} />
} 