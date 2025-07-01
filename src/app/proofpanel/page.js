import ProofPanel from '@/Components/ProofPanel/ProofPanel'
import { getServerReviews } from '@/services/serverReviewService'

export default async function ProofPanelPage() {
  const apiId = "1749890233";
  const { reviews, widget_settings } = await getServerReviews(apiId);
  return <ProofPanel reviews={reviews} widget_settings={widget_settings} />
} 