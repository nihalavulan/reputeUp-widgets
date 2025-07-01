import styled, { keyframes, createGlobalStyle } from "styled-components";

// Theme definitions
export const lightTheme = {
  background: '#ffffff',
  cardBackground: '#ffffff',
  textPrimary: '#1a1a1a',
  textSecondary: '#333333',
  textMuted: '#666666',
  border: 'rgba(0, 0, 0, 0.06)',
  borderHover: 'rgba(0, 0, 0, 0.1)',
  shadow: 'rgba(0, 0, 0, 0.08)',
  shadowHover: 'rgba(0, 0, 0, 0.12)',
  authorBorder: 'rgba(0, 0, 0, 0.08)',
  authorShadow: 'rgba(0, 0, 0, 0.1)',
  gradientTop: `linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.9) 30%,
    rgba(255, 255, 255, 0.7) 60%,
    rgba(255, 255, 255, 0) 100%
  )`,
  gradientBottom: `linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.9) 30%,
    rgba(255, 255, 255, 0.7) 60%,
    rgba(255, 255, 255, 0) 100%
  )`,
};

export const darkTheme = {
  background: '#0f0f0f',
  cardBackground: '#1a1a1a',
  textPrimary: '#ffffff',
  textSecondary: '#e5e5e5',
  textMuted: '#a3a3a3',
  border: 'rgba(255, 255, 255, 0.1)',
  borderHover: 'rgba(255, 255, 255, 0.2)',
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowHover: 'rgba(0, 0, 0, 0.5)',
  authorBorder: 'rgba(255, 255, 255, 0.15)',
  authorShadow: 'rgba(0, 0, 0, 0.3)',
  gradientTop: `linear-gradient(
    180deg,
    rgba(15, 15, 15, 1) 0%,
    rgba(15, 15, 15, 0.9) 30%,
    rgba(15, 15, 15, 0.7) 60%,
    rgba(15, 15, 15, 0) 100%
  )`,
  gradientBottom: `linear-gradient(
    0deg,
    rgba(15, 15, 15, 1) 0%,
    rgba(15, 15, 15, 0.9) 30%,
    rgba(15, 15, 15, 0.7) 60%,
    rgba(15, 15, 15, 0) 100%
  )`,
};

// Global styles for theme transitions
export const GlobalStyle = createGlobalStyle`
  * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }
`;

// Animation keyframes
const scrollUp = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
`;

const scrollDown = keyframes`
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
`;

// Theme toggle button
export const ThemeToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 2px solid ${props => props.theme.border};
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.textPrimary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 4px 12px ${props => props.theme.shadow};
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px ${props => props.theme.shadowHover};
    border-color: ${props => props.theme.borderHover};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 767px) {
    width: 45px;
    height: 45px;
    top: 15px;
    right: 15px;
    font-size: 18px;
  }
`;

export const AnimatedWallMainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${({ bgColor }) => bgColor || '#fff'};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20vh;
    background: ${({ bgColor }) => `linear-gradient(180deg, ${bgColor || '#fff'} 0%, ${bgColor || '#fff'}E6 30%, ${bgColor || '#fff'}B3 60%, ${bgColor || '#fff'}00 100%)`};
    z-index: 10;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20vh;
    background: ${({ bgColor }) => `linear-gradient(0deg, ${bgColor || '#fff'} 0%, ${bgColor || '#fff'}E6 30%, ${bgColor || '#fff'}B3 60%, ${bgColor || '#fff'}00 100%)`};
    z-index: 10;
    pointer-events: none;
  }
`;

export const AnimatedWallContainer = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 2;
  justify-content: center;

  @media (max-width: 1023px) {
    gap: 16px;
    padding: 0 20px;
  }

  @media (max-width: 767px) {
    gap: 12px;
    padding: 0 16px;
  }
`;

export const AnimatedWallRow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${props => props.direction === 'up' ? scrollUp : scrollDown} 30s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }

  @media (max-width: 1023px) {
    gap: 16px;
  }

  @media (max-width: 767px) {
    gap: 12px;
  }
`;

export const AnimatedWallCard = styled.div`
  width: 100%;
  max-width: 400px;
  min-height: ${({ expanded }) => (expanded ? 'unset' : '200px')};
  height: auto;
  background: ${props => props.theme.cardBackground};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 32px ${props => props.theme.shadowHover};
    border-color: ${props => props.theme.borderHover};
  }

  @media (max-width: 1023px) {
    max-width: 350px;
    padding: 18px;
    border-radius: 10px;
  }

  @media (max-width: 767px) {
    max-width: 100%;
    padding: 16px;
    border-radius: 8px;
    min-height: ${({ expanded }) => (expanded ? 'unset' : '180px')};
  }

  @media (max-width: 480px) {
    padding: 14px;
    min-height: ${({ expanded }) => (expanded ? 'unset' : '160px')};
  }
`;

export const AnimatedWallAuthorImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.theme.authorBorder};
  box-shadow: 0 2px 8px ${props => props.theme.authorShadow};

  @media (max-width: 767px) {
    width: 36px;
    height: 36px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

export const AnimatedWallAuthorDetails = styled.div`
  flex: 1;
`;

export const AnimatedWallAuthorName = styled.h3`
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
  line-height: 1.2;

  @media (max-width: 767px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const AnimatedWallAuthorDesignation = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${props => props.theme.textMuted};
  font-weight: 400;

  @media (max-width: 767px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const AnimatedWallStarsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin: 16px 0 16px 0;
  
  svg {
    width: 18px;
    height: 18px;
    color: #ffd700;
  }

  @media (max-width: 767px) {
    margin: 14px 0 14px 0;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 480px) {
    margin: 12px 0 12px 0;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const AnimatedWallReviewText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: ${props => props.theme.textSecondary};
  flex: 1;
  font-weight: 400;

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.4;
  }
`;

export const AnimatedWallLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: ${props => props.theme.textSecondary};
  font-weight: 500;

  @media (max-width: 767px) {
    font-size: 20px;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    padding: 0 16px;
  }
`;

export const AnimatedWallErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: ${props => props.theme.textMuted};
  text-align: center;
  padding: 20px;

  @media (max-width: 767px) {
    font-size: 16px;
    padding: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 12px;
  }
`;