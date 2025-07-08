import styled from "styled-components";

export const CardDeckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  min-height: 450px;
  margin: 20px auto;
  max-width: 1400px;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 20px 10px;
    min-height: 350px;
  }
  
  @media (max-width: 400px) {
    padding: 15px 5px;
    margin: 10px auto;
    min-height: 320px;
  }
`;

export const CardDeckContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  
  @media (max-width: 768px) {
    height: 320px;
    max-width: 280px;
  }
  
  @media (max-width: 400px) {
    height: 300px;
    max-width: 100%;
  }

  /* Swiper container styles */
  .reviewSwiper {
    width: 500px;
    height: 350px;
    
    @media (max-width: 768px) {
      width: 260px;
      height: 300px;
    }
    
    @media (max-width: 480px) {
      width: 240px;
      height: 280px;
    }
    
    @media (max-width: 400px) {
      width: min(90vw, 220px);
      height: 260px;
    }
  }

  /* Swiper slide styles */
  .swiper-slide {
    border-radius: 16px;
    transform-origin: center;
  }

  /* Enhanced deck effect */
  .swiper-slide-active {
    z-index: 10;
  }

  .swiper-slide-prev,
  .swiper-slide-next {
    z-index: 5;
  }

  .swiper-slide-prev-prev,
  .swiper-slide-next-next {
    z-index: 1;
  }
`;

export const CardDeckCard = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
  }

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    border-color: #667eea;
  }
`;

export const CardDeckReviewText = styled.div`
  font-size: 16px;
  color: #2d3748;
  font-weight: 500;
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  flex-grow: 1;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    -webkit-line-clamp: 10;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
    -webkit-line-clamp: 12;
    margin-bottom: 12px;
  }
`;

export const CardDeckAuthorInfo = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  color: #4a5568;
  font-weight: 600;
  margin-top: auto;
  gap: 12px;
  
  @media (max-width: 768px) {
    font-size: 13px;
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    gap: 8px;
  }
`;

export const CardDeckDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const CardDeckAuthorName = styled.div`
  color: #2d3748;
  font-weight: 600;
  font-size: 14px;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const CardDeckDesignation = styled.div`
  color: #4a5568;
  font-weight: 500;
  font-size: 12px;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
  
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const CardDeckDate = styled.div`
  font-size: 12px;
  color: #718096;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
  
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const CardDeckLink = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
  
  a {
    color: #667eea;
    text-decoration: none;
    font-size: 12px;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 768px) {
      font-size: 11px;
    }
    
    @media (max-width: 480px) {
      font-size: 10px;
    }
  }
`;

export const CardDeckFavicon = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  object-fit: cover;
  
  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
  }
`;

export const CardDeckAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  background-color: #f7fafc;
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }
`;

export const CardDeckError = styled.div`
  padding: 60px;
  text-align: center;
  color: #e53e3e;
  font-size: 18px;
  font-weight: 500;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
    font-size: 16px;
  }
`;