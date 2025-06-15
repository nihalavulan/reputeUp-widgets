import styled from "styled-components";

// Main wrapper for the review wall
export const StyledWallMainWrapper = styled.div`
  padding: 2rem;
  background: #ffffff;
  height: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`;

// Individual testimonial card
export const TestimonialCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.08);
  margin-bottom: 1rem;
  break-inside: avoid;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #d8d8d8;
  
  /* &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  } */
`;

// Header section containing reviewer info
export const ReviewerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

// Reviewer profile image
export const ReviewerImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.75rem;
  border: 2px solid #f0f0f0;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: #e0e0e0;
  }
`;

// Reviewer name styling
export const ReviewerName = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  line-height: 1.2;
`;

// Review text content
export const ReviewText = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: #555;
  margin: 0.8rem 0;
  word-wrap: break-word;
  hyphens: auto;
`;

// Review date display
export const ReviewDate = styled.div`
  font-size: 0.75rem;
  color: #888;
  margin-top: 0.25rem;
  font-weight: 400;
`;

// Star rating display
export const StarRating = styled.div`
  margin-top: 0.5rem;
  color: #f39c12;
  font-size: 1rem;
  letter-spacing: 1px;
  
  &::selection {
    background: transparent;
  }
`;

// Loading state wrapper
export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: #666;
  min-height: 200px;
  
  &::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid #ddd;
    border-top: 2px solid #666;
    border-radius: 50%;
    margin-left: 10px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Error state wrapper
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

// Empty state wrapper
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

// Masonry grid custom styles
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
  
  /* Responsive adjustments */
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

// Reviewer info container
export const ReviewerInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

// Rating container with additional styling options
export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
  
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

// Optional: Verified badge component
export const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  color: #059669;
  background: #d1fae5;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  margin-left: 0.5rem;
  font-weight: 500;
  
  &::before {
    content: '✓';
    margin-right: 0.2rem;
    font-weight: bold;
  }
`;

// Theme variants (optional)
export const themes = {
  default: {
    background: '#f7f7f7',
    cardBackground: 'white',
    textColor: '#333',
    mutedTextColor: '#888',
    starColor: '#f39c12',
  },
  dark: {
    background: '#1a1a1a',
    cardBackground: '#2d2d2d',
    textColor: '#ffffff',
    mutedTextColor: '#aaaaaa',
    starColor: '#ffd700',
  },
  minimal: {
    background: '#ffffff',
    cardBackground: '#ffffff',
    textColor: '#333333',
    mutedTextColor: '#666666',
    starColor: '#ff6b6b',
  }
};