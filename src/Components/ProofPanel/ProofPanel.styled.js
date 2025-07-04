import styled from "styled-components";

export const ProofPanelWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
`;

export const ProofPanelHeader = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const ProofPanelTabsRow = styled.div`
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #e5e7eb;
  width: 100%;
  padding: 0 24px;
  background: #fff;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    padding: 0 48px;
  }
`;

export const ProofPanelTab = styled.button`
  background: none;
  border: none;
  padding: 16px 0;
  font-size: 14px;
  font-weight: ${(props) => (props.active ? 600 : 400)};
  color: ${(props) => (props.active ? "#1f2937" : "#6b7280")};
  border-bottom: 2px solid
    ${(props) => (props.active ? "#ff6b35" : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;

  &:hover {
    color: #1f2937;
  }
`;

export const ProofPanelTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  gap: 20px;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    padding: 32px 48px;
    flex-wrap: nowrap;
  }
`;

export const ProofPanelTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

export const ProofPanelRatingRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  gap: 8px;
`;

export const ProofPanelStars = styled.div`
  display: flex;
  gap: 2px;
`;

export const ProofPanelRatingValue = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-left: 4px;
`;

export const ProofPanelReviewCount = styled.span`
  color: #6b7280;
  font-size: 14px;
  margin-left: 8px;
  align-self: flex-end;
  margin-bottom: 6px;
`;

export const ProofPanelWriteButton = styled.button`
  background: #ff6b35;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e55a2b;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ProofPanelReviewsGrid = styled.div`
  padding: 20px;
  columns: 1;
  column-gap: 20px;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 640px) {
    columns: 2;
  }

  @media (min-width: 1024px) {
    padding: 24px 48px 48px 48px;
    columns: 3;
    column-gap: 24px;
  }

  @media (min-width: 1280px) {
    columns: 4;
  }
`;

export const ProofPanelReviewCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
  break-inside: avoid;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 1024px) {
    margin-bottom: 24px;
  }
`;

export const ProofPanelReviewImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  background: #f3f4f6;
  display: block;
`;

export const ProofPanelReviewContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const ProofPanelReviewText = styled.div`
  color: #1f2937;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
  word-wrap: break-word;
`;

export const ProofPanelReadMore = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  color: #3b82f6;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s ease;
  margin-bottom: 16px;
  text-align: left;

  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

export const ProofPanelStarsContainer = styled.div`
  margin-bottom: 12px;
`;

export const ProofPanelReviewerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`;

export const ProofPanelAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProofPanelReviewerInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ProofPanelReviewerName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #1f2937;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProofPanelReviewerSource = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 1px;
`;

export const ProofPanelError = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #ef4444;
  font-size: 16px;
`;

export const ProofPanelLoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px 20px 48px 20px;

  @media (min-width: 1024px) {
    padding: 40px 48px 60px 48px;
  }
`;

export const ProofPanelLoadMoreButton = styled.button`
  background: #fff;
  color: #374151;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;
