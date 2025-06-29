import ProofPanel from '@/Components/ProofPanel/ProofPanel'
import { getServerReviews } from '@/services/serverReviewService'

export default async function ProofPanelPage() {
  const apiId = "1749890233";
  const reviews = await getServerReviews(apiId);
  return <ProofPanel reviews={reviews} />
} 