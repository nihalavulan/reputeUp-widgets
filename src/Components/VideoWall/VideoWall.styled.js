import styled from "styled-components";

export const VideoWallWrapper = styled.div`
  background-color: ${({ bgColor }) => bgColor || "#1a1a1a"};
  padding: 40px 0;
  font-family: "Inter", sans-serif;
  overflow: hidden;
  position: relative;
  user-select: none;
  touch-action: pan-x;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 200px;
    z-index: 2;
    pointer-events: none;
    transition: width 0.3s;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, ${({ bgColor }) => bgColor || "#1a1a1a"}, transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, ${({ bgColor }) => bgColor || "#1a1a1a"}, transparent);
  }

  @media (max-width: 768px) {
    padding: 20px 0;
    
    &::before,
    &::after {
      width: 50px;
    }
  }
`;

export const VideoWallContainer = styled.div`
  display: flex;
  width: max-content;
  will-change: transform;
  transition: none;
  
  /* Smooth hardware acceleration */
  transform-style: preserve-3d;
  backface-visibility: hidden;
`;

export const VideoCard = styled.div`
  position: relative;
  width: 300px;
  height: 450px;
  margin: 0 15px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  /* Improve touch/swipe performance */
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  
  /* Prevent flickering during interactions */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  &:active {
    cursor: grabbing;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 240px;
    height: 360px;
    margin: 0 10px;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 300px;
    margin: 0 8px;
  }
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  
  /* Optimize video performance */
  will-change: auto;
  backface-visibility: hidden;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 1;
  pointer-events: none;
`;

export const Content = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  color: white;
  z-index: 2;
  pointer-events: none;

  @media (max-width: 480px) {
    bottom: 15px;
    left: 15px;
    right: 15px;
  }
`;

export const Title = styled.h3`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 60px; /* Make room for volume button */
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: white;
  z-index: 2;
  line-height: 1.3;
  pointer-events: none;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 14px;
    top: 15px;
    left: 15px;
    right: 50px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    top: 12px;
    left: 12px;
    right: 45px;
  }
`;

export const Quote = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 13px;
    -webkit-line-clamp: 2;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  opacity: 0.8;
  transition: opacity 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  
  /* Prevent flickering on click */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  pointer-events: auto;

  &:hover {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
    background: rgba(0, 0, 0, 0.5);
  }

  &:active {
    transform: translate(-50%, -50%) scale(0.95);
  }

  ${VideoCard}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    
    &:hover {
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.3);
    }
  }
`;

export const VolumeButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 3;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.2s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  
  /* Prevent flickering on click */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  pointer-events: auto;

  &:hover {
    color: white;
    transform: scale(1.1);
    background: rgba(0, 0, 0, 0.5);
  }

  &:active {
    transform: scale(0.9);
  }

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    width: 28px;
    height: 28px;
    
    &:hover {
      transform: none;
      background: rgba(0, 0, 0, 0.3);
    }
  }

  @media (max-width: 480px) {
    top: 12px;
    right: 12px;
    width: 24px;
    height: 24px;
  }
`;

export const VideoLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 4;
  transition: opacity 0.3s ease;
  
  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;

export const LoaderSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LoaderText = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;