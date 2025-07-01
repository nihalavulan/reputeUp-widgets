import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Wrapper = styled.div`
  width: 100vw;
  margin: 1rem 0;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 100%;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  border: none;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: ${({ expanded }) => (expanded ? 'auto' : '300px')};

  @media (max-width: 600px) {
    padding: 16px 0;
    min-height: ${({ expanded }) => (expanded ? 'auto' : '220px')};
  }
`;

export const QuoteIcon = styled(Icon)`
  color: #ff8907;
  font-size: 32px;
  position: absolute;
  left: 24px;
  top: 24px;

  @media (max-width: 600px) {
    font-size: 24px;
    left: 16px;
    top: 16px;
  }
`;

export const QuoteIconRight = styled(Icon)`
  color: #ff8907;
  font-size: 32px;
  position: absolute;
  right: 24px;
  top: 24px;
  transform: scaleX(-1);

  @media (max-width: 600px) {
    font-size: 24px;
    right: 16px;
    top: 16px;
  }
`;

export const ReviewText = styled.div`
  font-size: 18px;
  color: #444;
  text-align: center;
  font-style: italic;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 12px;
  line-height: 1.6;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    font-size: 15px;
    padding: 0 8px;
  }
`;

export const FadeOverlay = styled.div`
  content: "";
  position: absolute;
  bottom: 40px;
  height: 3em;
  width: 100%;
  /* background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff); */
  background: none;
  pointer-events: none;
  z-index: 2;

  @media (max-width: 600px) {
    bottom: 36px;
    height: 2.5em;
  }
`;

export const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

export const AuthorName = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #222;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const ReviewLink = styled.a`
  display: flex;
  align-items: center;
  margin-left: 4px;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 600px) {
    width: 28px;
    height: 28px;
  }
`;

export const ArrowButton = styled.button`
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
  z-index: 10;
  color: #888;
  padding: 0;

  &:hover:not(:disabled) {
    color: #ff9000;
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  @media (max-width: 600px) {
    width: 28px;
    height: 28px;
  }
`;

export const ArrowLeft = styled(ArrowButton)`
  left: 8px;
`;

export const ArrowRight = styled(ArrowButton)`
  right: 8px;
`;

export const InnerContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  position: relative;
  box-sizing: border-box;
  min-height: 300px;

  @media (max-width: 600px) {
    padding: 24px 12px;
    min-height: 220px;
  }

  ${QuoteIcon}, ${QuoteIconRight} {
    position: absolute;
    top: 16px;
  }

  ${QuoteIcon} {
    left: 0;
  }

  ${QuoteIconRight} {
    right: 0;
    transform: scaleX(-1);
  }
`
