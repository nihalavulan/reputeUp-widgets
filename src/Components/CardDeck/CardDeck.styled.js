import styled, { css } from "styled-components";

export const CardDeckWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  min-height: 450px;
  margin: 20px auto;
  max-width: 1400px;
`;

export const CardDeckContainer = styled.div`
  position: relative;
  width: 700px;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardDeckCard = styled.div`
  position: absolute;
  width: 480px;
  height: 300px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;

  /* Center card positioning */
  ${(props) =>
    props.position === "center" &&
    css`
      z-index: 10;
      transform: translateY(-8px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18);
      cursor: default;
      border: 2px solid #667eea;
    `}

  /* Left cards positioning - fan out to the left with more spacing */
  ${(props) =>
    props.position === "left" &&
    css`
      z-index: ${9 - props.index};
      transform: translateX(${-50 - props.index * 25}px) 
                 translateY(${props.index * 8}px) 
                 rotate(${-8 - props.index * 4}deg);
      opacity: ${0.9 - props.index * 0.1};
      
      &:hover {
        border: 2px solid #667eea;
      }
    `}

  /* Right cards positioning - fan out to the right with more spacing */
  ${(props) =>
    props.position === "right" &&
    css`
      z-index: ${9 - props.index};
      transform: translateX(${50 + props.index * 25}px) 
                 translateY(${props.index * 8}px) 
                 rotate(${8 + props.index * 4}deg);
      opacity: ${0.9 - props.index * 0.1};
      
      &:hover {
        border: 2px solid #667eea;
      }
    `}
`;

export const CardDeckReviewText = styled.div`
  font-size: 16px;
  color: #2d3748;
  font-weight: 500;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  flex-grow: 1;
  margin-bottom: 16px;
`;

export const CardDeckAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #4a5568;
  font-weight: 600;
  margin-top: auto;
  
  span {
    color: #2d3748;
  }
`;

export const CardDeckAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  border: 2px solid rgba(102, 126, 234, 0.2);
`;

export const CardDeckLoading = styled.div`
  padding: 60px;
  text-align: center;
  color: #4a5568;
  font-size: 18px;
  font-weight: 500;
`;

export const CardDeckError = styled.div`
  padding: 60px;
  text-align: center;
  color: #e53e3e;
  font-size: 18px;
  font-weight: 500;
`;