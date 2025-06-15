import React, { useEffect, useState, useCallback, useMemo } from "react";
import Masonry from "react-masonry-css";
import {
  StyledWallMainWrapper,
  TestimonialCard,
  ReviewerHeader,
  ReviewerImage,
  ReviewerName,
  ReviewText,
  ReviewDate,
  StarRating,
  LoadingWrapper,
  ErrorWrapper,
  EmptyStateWrapper,
  ReviewerInfo,
  MasonryGridStyles
} from "./Wall.styles";

// Custom hook for iframe resizing
const useIframeResize = () => {
  const triggerResize = useCallback(() => {
    if (window.parentIFrame?.size) {
      window.parentIFrame.size();
    }
  }, []);

  return triggerResize;
};

// Custom hook for fetching reviews
const useReviews = (apiUrl) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const reviewsData = data?.data?.reviews || [];
        
        // Filter out reviews without text and sort by date (newest first)
        const validReviews = reviewsData
          .filter(review => review.review_text?.trim())
          .sort((a, b) => new Date(b.review_date) - new Date(a.review_date));
          
        setReviews(validReviews);
      } catch (err) {
        console.error("Error loading reviews:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [apiUrl]);

  return { reviews, loading, error };
};

// Memoized review card component
const ReviewCard = React.memo(({ review, onImageLoad, renderStars }) => (
  <TestimonialCard>
    <ReviewerHeader>
      <ReviewerImage
        src={review.customer_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.customer_firstname || 'Anonymous')}&background=e1e5e9&color=64748b`}
        alt={`${review.customer_firstname || 'Anonymous'} avatar`}
        onLoad={onImageLoad}
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.customer_firstname || 'Anonymous')}&background=e1e5e9&color=64748b`;
        }}
      />
      <ReviewerInfo>
        <ReviewerName>
          {review.customer_firstname || "Anonymous"}
        </ReviewerName>
        <ReviewDate>
          {new Date(review.review_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </ReviewDate>
      </ReviewerInfo>
    </ReviewerHeader>
    <ReviewText>{review.review_text}</ReviewText>
    <StarRating>{renderStars(review.rating)}</StarRating>
  </TestimonialCard>
));

ReviewCard.displayName = 'ReviewCard';

const Wall = ({ apiId = "1749890233" }) => {
  const apiUrl = `https://app.reputeup.ai/api/review-settings-with-list/${apiId}`;
  const { reviews, loading, error } = useReviews(apiUrl);
  const triggerResize = useIframeResize();

  // Memoized breakpoint configuration
  const breakpointColumnsObj = useMemo(() => ({
    default: 3,
    1100: 2,
    700: 1,
  }), []);

  // Memoized star rendering function
  const renderStars = useMemo(() => (rating) => {
    const validRating = Math.max(0, Math.min(5, Math.floor(rating || 0)));
    return "★".repeat(validRating) + "☆".repeat(5 - validRating);
  }, []);

  // Handle image load with debounced resize
  const handleImageLoad = useCallback(() => {
    setTimeout(triggerResize, 50);
  }, [triggerResize]);

  // Trigger resize when reviews change
  useEffect(() => {
    if (reviews.length > 0) {
      const timer = setTimeout(triggerResize, 300);
      return () => clearTimeout(timer);
    }
  }, [reviews.length, triggerResize]);

  if (loading) {
    return (
      <StyledWallMainWrapper>
        <LoadingWrapper>Loading reviews...</LoadingWrapper>
      </StyledWallMainWrapper>
    );
  }

  if (error) {
    return (
      <StyledWallMainWrapper>
        <ErrorWrapper>
          Failed to load reviews: {error}
        </ErrorWrapper>
      </StyledWallMainWrapper>
    );
  }

  if (reviews.length === 0) {
    return (
      <StyledWallMainWrapper>
        <EmptyStateWrapper>
          <h3>No Reviews Yet</h3>
          <p>Be the first to share your experience!</p>
        </EmptyStateWrapper>
      </StyledWallMainWrapper>
    );
  }

  return (
    <>
      <style>{MasonryGridStyles}</style>
      <StyledWallMainWrapper>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {reviews.map((review) => (
            <ReviewCard
              key={`${review.id}-${review.review_date}`}
              review={review}
              onImageLoad={handleImageLoad}
              renderStars={renderStars}
            />
          ))}
        </Masonry>
      </StyledWallMainWrapper>
    </>
  );
};

export default Wall;