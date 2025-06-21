import styled from 'styled-components';

export const ReviewBlockWrapper = styled.div`
  max-width: 350px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
`;

export const ReviewBlockContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ReviewBlockAvatars = styled.div`
  display: flex;
  
  & > *:not(:first-child) {
    margin-left: -15px;
  }
`;

export const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  object-fit: cover;
`;

export const ReviewBlockStars = styled.div`
  display: flex;
  gap: 2px;
  
  svg {
    width: 20px;
    height: 20px;
    color: #f3c625;
  }
`;

export const ReviewBlockText = styled.p`
  margin: 4px 0 0;
  color: #555;
  font-size: 14px;
`;

export const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-family: sans-serif;
`; 