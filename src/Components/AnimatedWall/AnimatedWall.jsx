"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  AnimatedWallMainWrapper,
  AnimatedWallContainer,
  AnimatedWallRow,
  AnimatedWallCard,
  AnimatedWallAuthorImage,
  AnimatedWallAuthorDetails,
  AnimatedWallAuthorName,
  AnimatedWallAuthorDesignation,
  AnimatedWallReviewText,
  AnimatedWallStarsContainer,
  AnimatedWallErrorWrapper,
  GlobalStyle,
} from "./AnimatedWall.styled";
import StarIcon from "../../assets/icons/Star";
import Image from 'next/image';
import Loading from '../Common/Loading';
import ReputeUpFooter from '../Common/ReputeUpFooter';

// const AnimatedWallStarRating = ({ rating }) => {
//   const stars = [];
//   for (let i = 0; i < rating; i++) {
//     stars.push(<StarIcon key={i} />);
//   }
//   return <AnimatedWallStarsContainer>{stars}</AnimatedWallStarsContainer>;
// };

const AnimatedWallReviewCard = ({ review, cardBgColor, txtColor, fontFamily }) => {
  const [expanded, setExpanded] = useState(false);
  const charLimit = 180;
  const isLong = review.review_text && review.review_text.length > charLimit;
  const displayText = !expanded && isLong ? review.review_text.slice(0, charLimit) + '...' : review.review_text;

  return (
    <AnimatedWallCard 
      expanded={expanded}
      style={{ background: cardBgColor, color: txtColor, fontFamily }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <AnimatedWallAuthorImage 
          as={Image}
          src={review?.author_pic || review?.customer_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent((review.customer_firstname?.[0] || 'A').toUpperCase())}&background=random`} 
          alt="Author" 
          width={40}
          height={40}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
        <AnimatedWallAuthorDetails>
          <AnimatedWallAuthorName>
            {review.customer_firstname ? `${review.customer_firstname}${review.customer_lastname ? ' ' + review.customer_lastname : ''}` : ''}
          </AnimatedWallAuthorName>
          {review.author_designation || review.work_title ? (
            <AnimatedWallAuthorDesignation>
              {review.author_designation || review.work_title}
            </AnimatedWallAuthorDesignation>
          ) : null}
        </AnimatedWallAuthorDetails>
      </div>
      <AnimatedWallReviewText style={expanded ? { overflow: 'visible', display: 'block', maxHeight: 'none' } : {}}>
        {displayText}
        {isLong && (
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              background: 'none',
              border: 'none',
              color: '#1976d2',
              fontSize: '13px',
              cursor: 'pointer',
              padding: 0,
              marginLeft: 6,
              textDecoration: 'underline',
              fontWeight: 500,
            }}
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </AnimatedWallReviewText>
    </AnimatedWallCard>
  );
};

const AnimatedWall = ({ apiId = "1749890233", reviews, widget_settings = {}, widgetId }) => {
  const [columnsCount, setColumnsCount] = useState(3);

  // Use widget_settings for all theme values
  const mainBg = widget_settings.bg_color || '#fff';
  const txtColor = widget_settings.txt_color || '#000';
  const fontFamily = widget_settings.font_family || 'Roboto, Arial, sans-serif';
  const cardBgColor = widget_settings.card_bg_color || '#fff';

  // Hook to handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setColumnsCount(1); // Mobile: 1 column
      } else if (width < 1024) {
        setColumnsCount(2); // Tablet: 2 columns
      } else {
        setColumnsCount(3); // Desktop: 3 columns
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter reviews to only include those with review_text
  const filteredReviews = useMemo(() => {
    return reviews.filter(review => review.review_text && review.review_text.trim().length > 0);
  }, [reviews]);

  // Split reviews into arrays based on columnsCount
  const reviewRows = useMemo(() => {
    const rows = Array.from({ length: columnsCount }, () => []);
    filteredReviews.forEach((review, index) => {
      rows[index % columnsCount].push(review);
    });
    // Duplicate reviews to ensure smooth infinite scrolling
    return rows.map(row => [...row, ...row, ...row]);
  }, [filteredReviews, columnsCount]);

  if (filteredReviews.length === 0) {
    return (
      <>
        <GlobalStyle />
        <AnimatedWallMainWrapper bgColor={mainBg} style={{ color: txtColor, fontFamily }}>
          <AnimatedWallErrorWrapper>
            No reviews with text found
          </AnimatedWallErrorWrapper>
        </AnimatedWallMainWrapper>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <div style={{ 
        height: '100vh', 
        background: mainBg, 
        color: txtColor, 
        fontFamily,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <AnimatedWallMainWrapper bgColor={mainBg} style={{ color: txtColor, fontFamily }}>
          <AnimatedWallContainer columnsCount={columnsCount}>
            {reviewRows.map((rowReviews, rowIndex) => (
              <AnimatedWallRow 
                key={rowIndex} 
                direction={rowIndex === 1 ? 'down' : 'up'}
              >
                {rowReviews.map((review, cardIndex) => (
                  <AnimatedWallReviewCard
                    key={`${review.id}-${cardIndex}`}
                    review={review}
                    cardBgColor={cardBgColor}
                    txtColor={txtColor}
                    fontFamily={fontFamily}
                  />
                ))}
              </AnimatedWallRow>
            ))}
          </AnimatedWallContainer>
        </AnimatedWallMainWrapper>
        {/* Place footer after all content */}
        <ReputeUpFooter widget_settings={widget_settings} widgetId={widgetId} absolute={false} />
      </div>
    </>
  );
};

export default AnimatedWall;