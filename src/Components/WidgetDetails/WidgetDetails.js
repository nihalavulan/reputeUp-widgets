import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WidgetDetailsWrapper, WidgetHeader, WidgetPreviewSection, WidgetCodeSection, WidgetInstallSection, BackButton, CopyButton, CodeBlock } from './WidgetDetails.styled';
import * as scriptTemplates from '../../services/scriptTemplates';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';

const widgetData = {
  wall: {
    name: 'Wall',
    description: 'A testimonial wall for your site.',
    getScript: scriptTemplates.getWallScript,
  },
  flash: {
    name: 'Flash',
    description: 'Flash testimonials popup.',
    getScript: scriptTemplates.getFlashScript,
  },
  float: {
    name: 'Float',
    description: 'Floating testimonial widget.',
    getScript: scriptTemplates.getFloatScript,
  },
  inlineslider: {
    name: 'InlineSlider',
    description: 'Inline slider for testimonials.',
    getScript: scriptTemplates.getInlineSliderScript,
  },
  list: {
    name: 'List',
    description: 'List view for testimonials.',
    getScript: scriptTemplates.getListScript,
  },
  grid: {
    name: 'Grid',
    description: 'Grid layout for testimonials.',
    getScript: scriptTemplates.getGridScript,
  },
  reviewblock: {
    name: 'ReviewBlock',
    description: 'A block to show average review rating.',
    getScript: scriptTemplates.getReviewBlockScript,
  },
  videowall: {
    name: 'VideoWall',
    description: 'A wall of videos that auto-scrolls.',
    getScript: scriptTemplates.getVideoWallScript,
  },
  photoset: {
    name: 'Photoset',
    description: 'A review slider with a photo gallery.',
    getScript: scriptTemplates.getPhotosetScript,
  },
  proofpanel: {
    name: 'ProofPanel',
    description: 'A modern review panel with source tabs and overall rating.',
    getScript: scriptTemplates.getProofPanelScript,
  },
  carddeck: {
    name: 'CardDeck',
    description: 'A deck of testimonial cards with interactive swapping.',
    getScript: scriptTemplates.getCardDeckScript,
  },
};

const WidgetDetails = () => {
  const { widgetName } = useParams();
  const navigate = useNavigate();
  const widget = widgetData[widgetName];
  const [isCopied, copy] = useCopyToClipboard();
  const [side, setSide] = useState('right');

  if (!widget) {
    return (
      <WidgetDetailsWrapper>
        <WidgetHeader>Widget Not Found</WidgetHeader>
        <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
      </WidgetDetailsWrapper>
    );
  }

  // For widgets with side option (flash, float), allow side selection
  const showSideOption = widgetName === 'flash' || widgetName === 'float';
  const script = showSideOption ? widget.getScript(side) : widget.getScript();

  return (
    <WidgetDetailsWrapper>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <WidgetHeader>{widget.name}</WidgetHeader>
      <p>{widget.description}</p>
      <WidgetPreviewSection>
        {/* No preview button here */}
      </WidgetPreviewSection>
      <WidgetCodeSection>
        <h3>Embed Code</h3>
        {showSideOption && (
          <div style={{marginBottom: 12}}>
            <label style={{marginRight: 8}}>Side:</label>
            <select value={side} onChange={e => setSide(e.target.value)}>
              <option value="right">Right</option>
              <option value="left">Left</option>
            </select>
          </div>
        )}
        <CodeBlock>{script}</CodeBlock>
        <CopyButton onClick={() => copy(script)}>{isCopied ? 'Copied!' : 'Copy Script'}</CopyButton>
      </WidgetCodeSection>
      <WidgetInstallSection>
        <h3>Installation</h3>
        <p>Copy and paste the above script into your website's HTML where you want the widget to appear.</p>
      </WidgetInstallSection>
      <button
        style={{
          marginTop: 28,
          alignSelf: 'center',
          height: 48,
          minWidth: 160,
          background: '#fff',
          color: '#ff6f91',
          border: '2px solid #ff6f91',
          borderRadius: 8,
          fontSize: '1.1rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(255,111,145,0.08)',
          transition: 'background 0.18s, color 0.18s, border 0.18s',
        }}
        onClick={() => window.open(`/${widgetName}`, '_blank')}
      >
        Live Preview
      </button>
    </WidgetDetailsWrapper>
  );
};

export default WidgetDetails; 