import styled, { css } from "styled-components";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 1rem;
`;

export const ListCard = styled.div`
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 20px 18px;
  gap: 18px;
  position: relative;
  min-height: 120px;
  flex-wrap: wrap;

  @media (max-width: 500px) {
    padding: 16px 14px;
  }
`;

export const ListAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #eaeaea;
  flex-shrink: 0;
`;

export const ListContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ListName = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #222;

  @media (max-width: 500px) {
    font-size: 15px;
  }
`;

export const ListText = styled.div`
  font-size: 15px;
  color: #444;
  font-weight: 500;
  line-height: 1.5;
  overflow: hidden;

  ${({ $expanded }) =>
    !$expanded &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    `}

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

export const ReadMoreToggle = styled.span`
  color: #007bff;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
`;

export const ListFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  flex-wrap: wrap;
  gap: 6px;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ListRightMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 500px) {
    gap: 6px;
  }
`;

export const ListStars = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const ListIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: 2px;
`;

export const LoadMoreButton = styled.button`
  margin: 0 auto;
  margin-top: 12px;
  padding: 10px 20px;
  background-color: #d0d0d0;
  border: none;
  border-radius: 8px;
  color: #000000;
  font-weight: 400;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #a3a3a3;
  }
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: #555;
`;
