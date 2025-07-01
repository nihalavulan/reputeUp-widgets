import styled, { keyframes, css } from "styled-components";

const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOutToBottom = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(20px);
    opacity: 0;
  }
`;

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

export const FlashWrapper = styled.div`
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

export const FlashCard = styled.div`
  width: 320px;
  max-width: calc(100vw - 40px);
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  animation: ${props => props.isTransitioning 
    ? css`${slideOutToBottom} 0.3s ease-out forwards`
    : css`${slideInFromBottom} 0.4s ease-out`
  };
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 280px;
  }
`;

export const FlashContent = styled.div`
  padding: 12px;
  animation: ${props => props.isTransitioning 
    ? css`${fadeOut} 0.3s ease-out forwards`
    : css`${fadeIn} 0.4s ease-out 0.1s both`
  };
`;

export const FlashHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 10px;
`;

export const FlashAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  max-width: 10%;

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

  .author-info {
    min-width: 0;
    flex: 1;
  }

  h4 {
    margin: 0 0 1px 0;
    font-size: 13px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    font-size: 11px;
    color: #666;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
`;

export const FlashText = styled.div`
  margin-bottom: 8px;

  .review-title {
    margin: 0 0 6px 0;
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.3;
  }

  p {
    font-size: 12px;
    line-height: 1.4;
    color: #333;
    margin: 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const FlashFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlashRating = styled.div`
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

export const FlashIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 8px 12px 6px;
  background: rgba(0, 0, 0, 0.02);
`;

export const Indicator = styled.button`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.active ? '#1976d2' : 'rgba(0, 0, 0, 0.2)'};

  &:hover {
    background: ${props => props.active ? '#1565c0' : 'rgba(0, 0, 0, 0.4)'};
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }
`;