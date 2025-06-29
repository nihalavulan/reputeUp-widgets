"use client";

import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
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
import StarIcon from "../../assets/icons/Star";

const useIframeResize = () => {
  const triggerResize = useCallback(() => {
    if (window.parentIFrame?.size) {
      window.parentIFrame.size();
    }
  }, []);

  return triggerResize;
};

const Flash = ({ reviews = [] }) => {
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
  const [expandedReviews, setExpandedReviews] = useState(new Set());
  const [truncatedReviews, setTruncatedReviews] = useState(new Set());
  
  const textRefs = useRef({});

  const AUTO_ADVANCE_INTERVAL = 3000; // 3 seconds

  // Check if text is truncated
  const checkTextTruncation = useCallback((reviewIndex) => {
    const textElement = textRefs.current[reviewIndex];
    if (textElement) {
      const isOverflowing = textElement.scrollHeight > textElement.clientHeight;
      setTruncatedReviews(prev => {
        const newSet = new Set(prev);
        if (isOverflowing) {
          newSet.add(reviewIndex);
        } else {
          newSet.delete(reviewIndex);
        }
        return newSet;
      });
    }
  }, []);

  const renderStars = useMemo(
    () => (rating) => {
      const stars = [];
      for (let i = 0; i < rating; i++) {
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

  const handleIndicatorClick = useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setAutoPlay(false);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [isTransitioning, currentIndex]);

  const toggleReadMore = useCallback((reviewIndex) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewIndex)) {
        newSet.delete(reviewIndex);
      } else {
        newSet.add(reviewIndex);
      }
      return newSet;
    });
    
    // Trigger resize after state update
    setTimeout(triggerResize, 100);
  }, [triggerResize]);

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
    setExpandedReviews(new Set());
    setTruncatedReviews(new Set());
  }, [textReviews]);

  // Check truncation when current review changes
  useEffect(() => {
    setTimeout(() => {
      checkTextTruncation(currentIndex);
    }, 100);
  }, [currentIndex, checkTextTruncation]);

  // Trigger resize when content changes
  useEffect(() => {
    const timer = setTimeout(triggerResize, 100);
    return () => clearTimeout(timer);
  }, [currentIndex, expandedReviews, triggerResize]);

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

  if (textReviews.length === 0) {
    return null; // Don't show anything if no text reviews
  }

  const currentReview = textReviews[currentIndex];
  const isExpanded = expandedReviews.has(currentIndex);
  const isTruncated = truncatedReviews.has(currentIndex);

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
                  src={currentReview.author_pic || currentReview.customer_photo } 
                  alt="" 
                />
              ) : (
                <div className="avatar-placeholder">
                  {(currentReview.customer_firstname || currentReview.author_name || 'A').charAt(0)}
                </div>
              )}
            </FlashAuthor>
            <div>

          <FlashText>
            {currentReview.review_title && (
              <h3 className="review-title">{currentReview.review_title}</h3>
            )}
            <p 
              ref={el => textRefs.current[currentIndex] = el}
              style={{ 
                display: isExpanded ? 'block' : '-webkit-box',
                WebkitLineClamp: isExpanded ? 'unset' : 3,
                WebkitBoxOrient: isExpanded ? 'unset' : 'vertical',
                overflow: isExpanded ? 'visible' : 'hidden'
              }}
            >
              {currentReview.review_text}
            </p>
            {isTruncated && (
              <button
                onClick={() => toggleReadMore(currentIndex)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1976d2',
                  fontSize: '11px',
                  cursor: 'pointer',
                  padding: '2px 0 0 0',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
                onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.target.style.textDecoration = 'none'}
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
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

            </div>
          </FlashHeader>

          

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