import styled, { keyframes, css } from "styled-components";

// const slideInFromBottom = keyframes`
//   from {
//     transform: translateY(100%);
//     opacity: 0;
//   }
//   to {
//     transform: translateY(0);
//     opacity: 1;
//   }
// `;

// const slideOutToBottom = keyframes`
//   from {
//     transform: translateY(0);
//     opacity: 1;
//   }
//   to {
//     transform: translateY(20px);
//     opacity: 0;
//   }
// `;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
`;

// Horizontal slide animations
const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutToLeft = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutToRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const FloatWrapper = styled.div`
  position: relative;
  width: 320px;
  height: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  
  @media (max-width: 768px) {
    width: 280px;
  }
`;

export const FloatCard = styled.div`
  width: 400px;
  margin: 0 1.5rem ;
  padding: 0 1rem;
  max-width: calc(100vw - 40px);
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: visible;
  position: relative;
  animation: ${({ isTransitioning, transitionDirection }) => {
    if (!isTransitioning) {
      return transitionDirection === 'left'
        ? css`${slideInFromLeft} 0.4s ease-out`
        : css`${slideInFromRight} 0.4s ease-out`;
    } else {
      return transitionDirection === 'left'
        ? css`${slideOutToRight} 0.3s ease-out forwards`
        : css`${slideOutToLeft} 0.3s ease-out forwards`;
    }
  }};
  transition: all 0.3s ease;
  border-top: 4px solid #ff9000;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 350px;
    max-width: calc(100vw - 24px);
  }
`;

export const FloatContent = styled.div`
display: flex;
  padding: 12px;
  animation: ${props => props.isTransitioning 
    ? css`${fadeOut} 0.3s ease-out forwards`
    : css`${fadeIn} 0.4s ease-out 0.1s both`
  };
`;

export const FloatHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 10px;
`;

export const FloatAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;

  img, .avatar-placeholder {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .avatar-placeholder {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 12px;
  }
`;

export const FloatText = styled.div`
  margin-bottom: 8px;

  .review-title {
    margin: 0 0 6px 0;
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.3;
  }

  p {
    font-size: 15px;
    line-height: 1.4;
    color: #333;
    margin: 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
    text-align: left;
    font-weight: 500;
    word-break: break-word;

    ${({ isExpanded }) =>
      !isExpanded &&
      css`
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      `}
  }
`;


export const FloatFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FloatRating = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

export const StyledReviewLinkWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    transition: opacity 0.2s ease;
  }

  &:hover img {
    opacity: 0.8;
  }
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.02);
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.6)'};

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.8);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const NavigationArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border: 1px solid #eee;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: pointer;
  z-index: 1000;
  transition: box-shadow 0.2s;
  color: #888;
  padding: 0;
  pointer-events: auto;
  &:hover:not(:disabled) {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    color: #ff9000;
  }
  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

export const NavigationArrowLeft = styled(NavigationArrow)`
  left: -16px;
`;

export const NavigationArrowRight = styled(NavigationArrow)`
  right: -16px;
`;

export const FloatTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const QuoteIconWrap = styled.div`
  color: #ff9000;
  font-size: 28px;
  margin-right: 4px;
  margin-top: 2px;
`;

export const ActionIcons = styled.div`
  display: flex;
  gap: 4px;
`;

// styled js