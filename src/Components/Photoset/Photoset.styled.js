import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Wrapper = styled.div`
  width: 100vw;
  margin: 1rem 0;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
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
`;

export const ReviewContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  width: 100%;
  padding: 0 40px; /* Space for arrows */
  box-sizing: border-box;
  min-height: 150px;
`;

export const TextAreaContainer = styled.div`
  flex: 1;
  text-align: center;
  position: relative;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const QuoteIcon = styled(Icon)`
  color: #00c78c;
  font-size: 28px;
  position: absolute;
  left: -5px;
  top: 0;
`;

export const QuoteIconRight = styled(Icon)`
  color: #00c78c;
  font-size: 28px;
  position: absolute;
  right: -5px;
  top: 0;
  transform: scaleX(-1);
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
  margin: 0 0 16px 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 12px;
  position: relative;
  width: 100%;
`;

export const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
`;

export const AuthorName = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: #333;
`;

export const ReviewLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #888;
  text-decoration: none;
`;

export const Arrow = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #ccc;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

export const ArrowLeft = styled(Arrow)`
  position: absolute;
  left: 0;
  top: 75px; /* Fixed position to center on text area */
  transform: translateY(-50%);
`;

export const ArrowRight = styled(Arrow)`
  position: absolute;
  right: 0;
  top: 75px; /* Fixed position to center on text area */
  transform: translateY(-50%);
`;

export const PhotoGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const PhotoThumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease, filter 0.3s ease;
  filter: blur(1.5px);

  &.active {
    border-color: #007bff;
    filter: blur(0);
  }
`;

export const ModalImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  min-width: 50vw;
  min-height: 50vh;
  object-fit: contain;
  border-radius: 8px;
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