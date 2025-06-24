import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Wrapper = styled.div`
  width: 100vw;
  margin: 1rem 0;
  padding: 40px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  @media (max-width: 600px) {
    padding: 30px 2px;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 100%;
  background: transparent;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media (max-width: 600px) {
    padding: 12px 0;
  }
`;

export const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  max-width: 1000px;
  padding: 0 60px;
  box-sizing: border-box;
  min-height: 150px;
  @media (max-width: 600px) {
    padding: 0 40px;
    min-height: 120px;
  }
`;

export const TextAreaContainer = styled.div`
  flex: 1;
  text-align: center;
  position: relative;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  @media (max-width: 600px) {
    padding: 0 10px;
  }
`;

export const QuoteIcon = styled(Icon)`
  color: #00c78c;
  font-size: 28px;
  position: absolute;
  left: -15px;
  top: 10px;
  @media (max-width: 600px) {
    font-size: 20px;
    left: -10px;
    top: 8px;
  }
`;

export const QuoteIconRight = styled(Icon)`
  color: #00c78c;
  font-size: 28px;
  position: absolute;
  right: -15px;
  top: 10px;
  transform: scaleX(-1);
  @media (max-width: 600px) {
    font-size: 20px;
    right: -10px;
    top: 8px;
  }
`;

export const ReviewTextContainer = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

export const ReviewTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px 0;
`;

export const ReviewText = styled.div`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin: 20px 0 16px 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  @media (max-width: 600px) {
    font-size: 14px;
    margin: 15px 0 12px 0;
  }
`;

export const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
  @media (max-width: 600px) {
    gap: 4px;
    margin-top: 8px;
  }
`;

export const AuthorName = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: #333;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export const ReviewLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #888;
  text-decoration: none;
  &:hover {
    color: #666;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export const Arrow = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    color: #333;
    transform: scale(1.1);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
  
  @media (max-width: 600px) {
    padding: 8px;
    svg { 
      width: 20px; 
      height: 20px; 
    }
  }
`;

export const ArrowLeft = styled(Arrow)`
  flex-shrink: 0;
`;

export const ArrowRight = styled(Arrow)`
  flex-shrink: 0;
`;

export const PhotoGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
  max-width: 500px;
  @media (max-width: 600px) {
    gap: 5px;
    margin-top: 15px;
    max-width: 300px;
  }
`;

export const PhotoThumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: scale(1.05);
    border-color: #00c78c;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 600px) {
    width: 55px;
    height: 55px;
    border-radius: 6px;
  }
  
  &.active {
    border-color: #007bff;
  }
`;

export const ModalImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  min-width: 50vw;
  min-height: 50vh;
  object-fit: contain;
  border-radius: 8px;
  @media (max-width: 600px) {
    max-width: 98vw;
    max-height: 60vh;
    min-width: 0;
    min-height: 0;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: -40px;
  background: transparent;
  border: none;
  color: white;
  font-size: 32px;
  cursor: pointer;
  line-height: 1;
`;