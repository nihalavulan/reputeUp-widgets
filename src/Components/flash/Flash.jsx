import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  FlashWrapper,
  FlashCard,
  FlashContent,
  FlashHeader,
  FlashAuthor,
  FlashText,
  FlashFooter,
  FlashRating,
  FlashIndicators,
  Indicator,
  StyledReviewLinkWrapper
} from "./Flash.styled";
import { Icon } from "@iconify/react";
import StarIcon from "../../assets/icons/Star";
import { useReviews } from "../../hooks/useReviews";

const useIframeResize = () => {
  const triggerResize = useCallback(() => {
    if (window.parentIFrame?.size) {
      window.parentIFrame.size();
    }
  }, []);

  return triggerResize;
};

const Flash = ({ apiId = "1749890233" }) => {
  const { reviews, loading, error } = useReviews(apiId);
  const triggerResize = useIframeResize();
  
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const side = urlParams.get('side') || 'right'; // default to right
  
  // Filter reviews that have text content
  const textReviews = useMemo(() => {
    return reviews.filter(review => review.review_text || review.review_title);
  }, [reviews]);

  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const AUTO_ADVANCE_INTERVAL = 3000; // 5 seconds

  const renderStars = useMemo(
    () => (rating) => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
        stars.push(<StarIcon key={i} />);
      }
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {stars}
        </div>
      );
    },
    []
  );

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % textReviews.length);
      setAutoPlay(false);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [textReviews.length, isTransitioning]);

  const handleIndicatorClick = useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setAutoPlay(false);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [isTransitioning, currentIndex]);

  // Auto-advance functionality
  useEffect(() => {
    if (!autoPlay || textReviews.length <= 1 || isTransitioning || isHovered) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % textReviews.length);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    }, AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(interval);
  }, [autoPlay, textReviews.length, isTransitioning, isHovered]);

  // Reset when reviews change
  useEffect(() => {
    setCurrentIndex(0);
    setAutoPlay(true);
    setIsTransitioning(false);
  }, [textReviews]);

  // Trigger resize when content changes
  useEffect(() => {
    const timer = setTimeout(triggerResize, 100);
    return () => clearTimeout(timer);
  }, [currentIndex, triggerResize]);

  // Set up body styles and communicate with parent
  useEffect(() => {
    // Set body styles to ensure proper display
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'visible';
    document.body.style.background = 'transparent';
    
    // Try to position iframe via postMessage (safer approach)
    const positionData = {
      type: 'FLASH_POSITION',
      side: side,
      styles: {
        position: 'fixed',
        bottom: '20px',
        [side === 'left' ? 'left' : 'right']: '20px',
        zIndex: '9999',
        border: 'none',
        width: window.innerWidth <= 768 ? '280px' : '320px',
        maxWidth: 'calc(100vw - 40px)'
      }
    };
    
    // Send positioning data to parent
    try {
      window.parent.postMessage(positionData, '*');
    } catch (e) {
      console.log('PostMessage not available');
    }

    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
      document.body.style.background = '';
    };
  }, [side]);

  if (loading || textReviews.length === 0) {
    return null; // Don't show anything while loading or if no text reviews
  }

  if (error) {
    return null; // Silently fail for widget
  }

  const currentReview = textReviews[currentIndex];

  return (
    <FlashWrapper side={side}>
      <FlashCard 
        side={side} 
        isTransitioning={isTransitioning}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FlashContent isTransitioning={isTransitioning}>
          <FlashHeader>
            <FlashAuthor>
              {currentReview.customer_photo || currentReview.author_pic ? (
                <img 
                  src={currentReview.customer_photo || currentReview.author_pic} 
                  alt="" 
                />
              ) : (
                <div className="avatar-placeholder">
                  {(currentReview.customer_firstname || currentReview.author_name || 'A').charAt(0)}
                </div>
              )}
              <div className="author-info">
                <h4>
                  {currentReview.customer_firstname
                    ? `${currentReview.customer_firstname}${
                        currentReview.customer_lastname
                          ? " " + currentReview.customer_lastname
                          : ""
                      }`
                    : currentReview.author_name || "Anonymous"}
                </h4>
                <span>
                  {currentReview.author_designation || currentReview.work_title || "Customer"}
                </span>
              </div>
            </FlashAuthor>
          </FlashHeader>

          <FlashText>
            {currentReview.review_title && (
              <h3 className="review-title">{currentReview.review_title}</h3>
            )}
            <p>{currentReview.review_text}</p>
          </FlashText>

          <FlashFooter>
            {currentReview.rating && (
              <FlashRating>
                {renderStars(currentReview.rating)}
              </FlashRating>
            )}
            <StyledReviewLinkWrapper href={currentReview.review_link} target="_blank">
              {currentReview.review_link && (
                <img
                  src={`https://www.google.com/s2/favicons?domain=${
                    new URL(currentReview.review_link).hostname
                  }&sz=64`}
                  alt="favicon"
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "2px",
                    objectFit: "cover",
                  }}
                />
              )}
            </StyledReviewLinkWrapper>
          </FlashFooter>
        </FlashContent>

        {textReviews.length > 1 && (
          <FlashIndicators>
            {textReviews.map((_, index) => (
              <Indicator
                key={index}
                active={index === currentIndex}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </FlashIndicators>
        )}
      </FlashCard>
    </FlashWrapper>
  );
};

export default Flash;