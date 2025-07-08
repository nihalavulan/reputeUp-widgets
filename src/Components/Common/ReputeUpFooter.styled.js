import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ small }) => (small ? '8px' : '12px')};
  padding: ${({ small }) => (small ? '6px 14px' : '8px 16px')};
  font-size: ${({ small }) => (small ? '10px' : '13px')};
  color: ${props => props.txtColor || '#666'};
  font-family: ${props => props.fontFamily || 'inherit'};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ small }) => (small ? '12px' : '24px')};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  width: fit-content;
  line-height: 1.2;
  
  /* Conditional positioning based on absolute prop */
  ${({ absolute, small }) => {
    if (absolute) {
      return `
        position: absolute;
        right: 10px;
        bottom: 10px;
        z-index: 9999;
      `;
    } else if (small) {
      return `
        position: absolute;
        right: 8px;
        bottom: 8px;
        z-index: 9999;
      `;
    } else {
      return `
        position: relative;
        margin: 20px 16px 20px auto;
        align-self: flex-end;
        z-index: 9999;
      `;
    }
  }}
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${({ small, isMiniLogo }) => {
    if (isMiniLogo) return '3px';
    return small ? '4px' : '6px';
  }};
  min-width: ${({ small, isMiniLogo }) => {
    if (isMiniLogo) return '14px';
    return small ? '54px' : '80px';
  }};
  height: ${({ small, isMiniLogo }) => {
    if (isMiniLogo) return '14px';
    return small ? '12px' : '16px';
  }};
  
  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }
`;

export const FooterLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ small }) => (small ? '4px' : '8px')};
  text-decoration: none;
  color: ${props => props.linkColor || 'inherit'};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const FooterIcon = styled.div`
  opacity: 0.7;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: ${({ small }) => (small ? '11px' : '14px')};
    height: ${({ small }) => (small ? '11px' : '14px')};
  }
`;

export const PoweredByText = styled.span`
  white-space: nowrap;
`;