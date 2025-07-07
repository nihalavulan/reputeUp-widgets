import React from 'react';
import Image from 'next/image';
import { Icon } from "@iconify/react";
import { FooterContainer, FooterLink, FooterIcon } from './ReputeUpFooter.styled';

const ReputeUpFooter = ({ widget_settings = {}, size, widgetId }) => {
  // Only show footer if show_reputo_logo is enabled
  if (!widget_settings.show_reputo_logo) {
    return null;
  }

  const txtColor = widget_settings.footer_txt_color || widget_settings.txt_color || '#666';
  const fontFamily = widget_settings.font_family || undefined;
  const linkColor = widget_settings.footer_link_color || 'inherit';
  const small = size === 'small';

  // Choose logo based on size, with fallbacks
  const logoSrc = small
    ? widget_settings.mini_logo || widget_settings.logo || "https://reputeup.ai/images/new/favicon.png"
    : widget_settings.logo || "https://reputeup.ai/images/new/logo.svg";

  // Build tracking URL client-side
  const [trackingUrl, setTrackingUrl] = React.useState('https://track.reputeup.ai');
  React.useEffect(() => {
    if (typeof window !== 'undefined' && widgetId) {
      const utm_widget = encodeURIComponent(widgetId);
      const utm_source = encodeURIComponent(window.location.hostname);
      const utm_medium = 'widget';
      const isMobile = /Mobi|Android/i.test(window.navigator.userAgent);
      const utm_content = isMobile ? 'mobile' : 'desktop';
      setTrackingUrl(
        `https://track.reputeup.ai?utm_widget=${utm_widget}&utm_source=${utm_source}&utm_medium=${utm_medium}&utm_content=${utm_content}`
      );
    }
  }, [widgetId]);

  return (
    <FooterContainer 
      txtColor={txtColor} 
      fontFamily={fontFamily}
      small={small}
    >
      <span>Powered by</span>
      <FooterLink 
        href={trackingUrl}
        target="_blank" 
        rel="noopener noreferrer"
        linkColor={linkColor}
        small={small}
      >
        <Image
          src={logoSrc}
          alt="ReputeUp"
          width={small ? 54 : 80}
          height={small ? 12 : 16}
          style={{ objectFit: 'contain' }}
        />
        <FooterIcon small={small}>
          <Icon 
            icon="material-symbols:open-in-new" 
            width={small ? 11 : 14}
            height={small ? 11 : 14}
          />
        </FooterIcon>
      </FooterLink>
    </FooterContainer>
  );
};

export default ReputeUpFooter; 