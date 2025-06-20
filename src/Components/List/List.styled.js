import styled from "styled-components";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  background: none;
  border-radius: 0;
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
`;

export const ListText = styled.div`
  font-size: 15px;
  color: #444;
  margin-bottom: 6px;
  font-weight: 500;
`;

export const ListFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`;

export const ListRightMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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