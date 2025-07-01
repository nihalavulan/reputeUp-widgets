import WidgetDetails from '@/Components/WidgetDetails/WidgetDetails'
import { getServerReviews } from '@/services/serverReviewService'

export default async function WidgetDetailsPage({ params }) {
  const apiId = "1749890233";
  const { reviews, widget_settings } = await getServerReviews(apiId);
  return <WidgetDetails widgetName={params.widgetName} reviews={reviews} widget_settings={widget_settings} />
} 