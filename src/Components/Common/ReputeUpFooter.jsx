import React from 'react';
import Image from 'next/image';
import { Icon } from "@iconify/react";
import { FooterContainer, FooterLink, FooterIcon } from './ReputeUpFooter.styled';

const ReputeUpFooter = ({ widget_settings = {}, size }) => {
  // Only show footer if show_reputo_logo is enabled
  if (!widget_settings.show_reputo_logo) {
    return null;
  }

  const txtColor = widget_settings.footer_txt_color || widget_settings.txt_color || '#666';
  const fontFamily = widget_settings.font_family || undefined;
  const linkColor = widget_settings.footer_link_color || 'inherit';
  const small = size === 'small';

  return (
    <FooterContainer 
      txtColor={txtColor} 
      fontFamily={fontFamily}
      small={small}
    >
      <span>Powered by</span>
      <FooterLink 
        href="https://reputeup.ai/" 
        target="_blank" 
        rel="noopener noreferrer"
        linkColor={linkColor}
        small={small}
      >
        <Image
          src="https://reputeup.ai/images/new/logo.svg"
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