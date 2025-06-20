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
        {/* Widget preview placeholder */}
        <div style={{height: 180, background: '#f8fafc', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa'}}>Widget Preview</div>
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
    </WidgetDetailsWrapper>
  );
};

export default WidgetDetails; 