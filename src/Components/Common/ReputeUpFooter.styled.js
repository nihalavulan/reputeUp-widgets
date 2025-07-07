import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ small }) => (small ? '4px' : '8px')};
  padding: ${({ small }) => (small ? '6px 10px' : '16px')};
  font-size: ${({ small }) => (small ? '9px' : '12px')};
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
  position: relative;
  z-index: 1000;
`;

export const FooterLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ small }) => (small ? '2px' : '4px')};
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
  svg {
    width: ${({ small }) => (small ? '11px' : '14px')};
    height: ${({ small }) => (small ? '11px' : '14px')};
  }
`; 