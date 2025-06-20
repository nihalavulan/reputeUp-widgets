import styled from "styled-components";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 8px 48px 8px;
`;

export const GridCard = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 180px;
  aspect-ratio: auto;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.18s, transform 0.18s;
  cursor: pointer;
  padding: 16px;
  &:hover {
    box-shadow: 0 8px 32px rgba(255,169,169,0.18), 0 2px 8px rgba(0,0,0,0.10);
    transform: translateY(-4px) scale(1.02);
  }
`;

export const CardContentRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const CardText = styled.p`
  font-size: 15px;
  color: #444;
  text-align: left;
  font-weight: 500;
  word-break: break-word;
  display: inline;
  margin: 0;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 15px;
`;

export const CardRating = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const CardAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  font-weight: 500;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.32);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  max-width: 420px;
  width: 90vw;
  padding: 32px 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
`;

export const QuoteIconWrap = styled.div`
  margin-top: 2px;
`;

export const GridReviewDate = styled.div`
  font-size: 0.78rem;
  color: #888;
  margin-top: 2px;
  font-weight: 500;
  margin-bottom: 2px;
`;
