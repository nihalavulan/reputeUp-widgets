import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import {
  FloatWrapper,
  FloatCard,
  FloatContent,
  FloatHeader,
  FloatAuthor,
  FloatText,
  FloatFooter,
  FloatRating,
  NavigationButtons,
  NavButton,
  StyledReviewLinkWrapper,
  NavigationArrowLeft,
  NavigationArrowRight,
  FloatTopRow,
  QuoteIconWrap,
  ActionIcons
} from "./Float.styled";
import StarIcon from "../../assets/icons/Star";
import { useReviews } from "../../hooks/useReviews";
import { Icon } from "@iconify/react/dist/iconify.js";

const useIframeResize = () => {
  const triggerResize = useCallback(() => {
    if (window.parentIFrame?.size) {
      window.parentIFrame.size();
    }
  }, []);

  return triggerResize;
};

// SVGs for quote, plus, minus
const QuoteIcon = () => (
    <Icon icon="mingcute:quote-left-fill" width="44" height="44"  style={{color: "#ff8907"}} />
);
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="#888" strokeWidth="2" strokeLinecap="round"/></svg>
);
const MinusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12" stroke="#888" strokeWidth="2" strokeLinecap="round"/></svg>
);

const Float = ({ apiId = "1749890233" }) => {
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('right'); // 'right' or 'left'
  const [expandedReviews, setExpandedReviews] = useState(new Set());
  const [truncatedReviews, setTruncatedReviews] = useState(new Set());
  
  const textRefs = useRef({});

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

  const handleNavigation = useCallback((direction) => {
    if (isTransitioning) return;
    setTransitionDirection(direction === 'next' ? 'right' : 'left');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (direction === 'next') {
          return (prev + 1) % textReviews.length;
        } else {
          return prev === 0 ? textReviews.length - 1 : prev - 1;
        }
      });
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [isTransitioning, textReviews.length]);

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
    
    setTimeout(triggerResize, 100);
  }, [triggerResize]);

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

  // Reset when reviews change
  useEffect(() => {
    setCurrentIndex(0);
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
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'visible';
    document.body.style.background = 'transparent';
    
    const positionData = {
      type: 'FLOAT_POSITION',
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
    return null;
  }

  if (error) {
    return null;
  }

  const currentReview = textReviews[currentIndex];
  const isExpanded = expandedReviews.has(currentIndex);
  // Fallback: consider text truncated if it's long
  const isLongText = currentReview.review_text && currentReview.review_text.length > 180;
  const isTruncated = truncatedReviews.has(currentIndex) || isLongText;

  return (
    <FloatWrapper side={side}>
      <FloatCard side={side} isTransitioning={isTransitioning} transitionDirection={transitionDirection}>
        <NavigationArrowLeft 
          onClick={() => handleNavigation('prev')}
          disabled={textReviews.length <= 1}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </NavigationArrowLeft>
        <NavigationArrowRight 
          onClick={() => handleNavigation('next')}
          disabled={textReviews.length <= 1}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </NavigationArrowRight>
        <FloatContent isTransitioning={isTransitioning}>
          <FloatTopRow>
            <QuoteIconWrap><QuoteIcon /></QuoteIconWrap>
          </FloatTopRow>
         <div style={{ flex: 1 }}>
         <FloatText isExpanded={isExpanded}>
            {isExpanded ? (
              <>
                <p
                  style={{
                    fontSize: '15px',
                    color: '#444',
                    marginBottom: '8px',
                    marginTop: 0,
                    textAlign: 'left',
                    fontWeight: 500,
                    wordBreak: 'break-word',
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
                      fontSize: '13px',
                      cursor: 'pointer',
                      padding: 0,
                      margin: 0,
                      textDecoration: 'underline',
                      fontWeight: 500
                    }}
                  >
                    Read less
                  </button>
                )}
              </>
            ) : (
              <>
                <p
                  ref={el => textRefs.current[currentIndex] = el}
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '15px',
                    color: '#444',
                    marginBottom: '8px',
                    marginTop: 0,
                    textAlign: 'left',
                    fontWeight: 500,
                    wordBreak: 'break-word',
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
                      fontSize: '13px',
                      cursor: 'pointer',
                      padding: 0,
                      margin: 0,
                      textDecoration: 'underline',
                      fontWeight: 500
                    }}
                  >
                    Read more
                  </button>
                )}
              </>
            )}
          </FloatText>
          <FloatFooter>
            <FloatRating>
              {renderStars(currentReview.rating)}
            </FloatRating>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ display : 'flex' , flexDirection : 'column' , alignItems : 'flex-end' , gap : '2px' }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: '#222', marginRight: 2 }}>
                {currentReview.customer_firstname}
                {currentReview.customer_lastname ? ` ${currentReview.customer_lastname[0]}.` : ''}
              </span>

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
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
            </StyledReviewLinkWrapper>
                </div>
              {currentReview.customer_photo || currentReview.author_pic ? (
                <img 
                  src={currentReview.customer_photo || currentReview.author_pic} 
                  alt="" 
                  style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', marginLeft: 2 }}
                />
              ) : (
                <div className="avatar-placeholder" style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontWeight: 600, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 2 }}>
                  {(currentReview.customer_firstname || currentReview.author_name || 'A').charAt(0)}
                </div>
              )}
            </div>
          </FloatFooter>
         </div>
        </FloatContent>
      </FloatCard>
    </FloatWrapper>
  );
};

export default Float;