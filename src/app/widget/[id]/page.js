import dynamic from 'next/dynamic';
import { getServerReviews } from '@/services/serverReviewService';
import React from 'react';

const widgetComponentMap = {
  wall: dynamic(() => import('@/Components/Wall/Wall'), { ssr: false }),
  grid: dynamic(() => import('@/Components/Grid'), { ssr: false }),
  list: dynamic(() => import('@/Components/List/List'), { ssr: false }),
  flash: dynamic(() => import('@/Components/flash/Flash'), { ssr: false }),
  float: dynamic(() => import('@/Components/float/Float'), { ssr: false }),
  inlineslider: dynamic(() => import('@/Components/InlineSlider/InlineSlider'), { ssr: false }),
  reviewblock: dynamic(() => import('@/Components/ReviewBlock/ReviewBlock'), { ssr: false }),
  videowall: dynamic(() => import('@/Components/VideoWall/VideoWall'), { ssr: false }),
  photoset: dynamic(() => import('@/Components/Photoset/Photoset'), { ssr: false }),
  proofpanel: dynamic(() => import('@/Components/ProofPanel/ProofPanel'), { ssr: false }),
  carddeck: dynamic(() => import('@/Components/CardDeck'), { ssr: false }),
  animatedwall: dynamic(() => import('@/Components/AnimatedWall/AnimatedWall'), { ssr: false }),
};

export default async function WidgetByIdPage({ params }) {
  const { id } = params;
  const { reviews, widget_settings } = await getServerReviews(id);
  const layout = widget_settings?.layout?.toLowerCase();
  const WidgetComponent = widgetComponentMap[layout];

  if (!WidgetComponent) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#e52424' }}>
        <h2>Unknown or unsupported widget layout: {layout}</h2>
        <p>Please check your widget settings or contact support.</p>
      </div>
    );
  }

  return <WidgetComponent reviews={reviews} widget_settings={widget_settings} widgetId={id} />;
} 