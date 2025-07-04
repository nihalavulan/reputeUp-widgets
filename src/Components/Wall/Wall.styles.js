import styled from "styled-components";

export const StyledWallMainWrapper = styled.div`
  padding: 2rem;
  background: #ffffff;
  height: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`;

export const ErrorWrapper = styled.div`
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem;
  color: #c33;
  text-align: center;
  font-size: 0.95rem;
  
  &::before {
    content: '⚠️';
    display: block;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: #888;
  text-align: center;
  min-height: 200px;
  
  &::before {
    content: '📝';
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    color: #666;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

export const MasonryGridStyles = `
  .my-masonry-grid {
    display: flex;
    margin-left: -1rem;
    width: auto;
  }
  
  .my-masonry-grid_column {
    padding-left: 1rem;
    background-clip: padding-box;
  }
  
  .my-masonry-grid_column > div {
    margin-bottom: 1rem;
  }
  
  @media (max-width: 700px) {
    .my-masonry-grid {
      margin-left: -0.5rem;
    }
    
    .my-masonry-grid_column {
      padding-left: 0.5rem;
    }
    
    .my-masonry-grid_column > div {
      margin-bottom: 0.75rem;
    }
  }
`;


export const LoadMoreButton = styled.button`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin: 2rem auto;
  display: block;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #2980b9, #3498db);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(52, 152, 219, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
