"use client";
import React, { useEffect, useState, useMemo } from "react";
import { ThemeProvider } from "styled-components";
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
  AnimatedWallLoadingWrapper,
  AnimatedWallErrorWrapper,
  ThemeToggleButton,
  GlobalStyle,
  lightTheme,
  darkTheme,
} from "./AnimatedWall.styled";
import StarIcon from "../../assets/icons/Star";
import Image from 'next/image';

const AnimatedWallStarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<StarIcon key={i} />);
  }
  return <AnimatedWallStarsContainer>{stars}</AnimatedWallStarsContainer>;
};

const AnimatedWallReviewCard = ({ review }) => {
  return (
    <AnimatedWallCard>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <AnimatedWallAuthorImage 
          as={Image}
          src={review?.author_pic || review?.customer_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent((review.customer_firstname?.[0] || review.author_name?.[0] || 'A').toUpperCase())}&background=random`} 
          alt="Author" 
          width={40}
          height={40}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
        <AnimatedWallAuthorDetails>
          <AnimatedWallAuthorName>
            {review.customer_firstname ? `${review.customer_firstname}${review.customer_lastname ? ' ' + review.customer_lastname : ''}` : ''}
          </AnimatedWallAuthorName>
          <AnimatedWallAuthorDesignation>
            {review.author_designation || review.work_title || 'Customer'}
          </AnimatedWallAuthorDesignation>
        </AnimatedWallAuthorDetails>
      </div>
      
      <AnimatedWallReviewText>
        {review.review_text}
      </AnimatedWallReviewText>
    </AnimatedWallCard>
  );
};

const AnimatedWall = ({ apiId = "1749890233", reviews, widget_settings = {} }) => {
  const [columnsCount, setColumnsCount] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('animatedWallTheme');
    return savedTheme === 'dark';
  });

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('animatedWallTheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

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

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Use widget_settings for theme overrides
  const customTheme = {
    ...((isDarkMode ? darkTheme : lightTheme)),
    background: widget_settings.bg_color || (isDarkMode ? darkTheme.background : lightTheme.background),
    textPrimary: widget_settings.txt_color || (isDarkMode ? darkTheme.textPrimary : lightTheme.textPrimary),
    fontFamily: widget_settings.font_family || 'Roboto, Arial, sans-serif',
    starColor: widget_settings.star_color || '#FFD700',
  };

  if (filteredReviews.length === 0) {
    return (
      <ThemeProvider theme={customTheme}>
        <GlobalStyle />
        <AnimatedWallMainWrapper style={{ fontFamily: customTheme.fontFamily }}>
          <ThemeToggleButton onClick={toggleTheme}>
            {isDarkMode ? '☀️' : '🌙'}
          </ThemeToggleButton>
          <AnimatedWallErrorWrapper>
            No reviews with text found
          </AnimatedWallErrorWrapper>
        </AnimatedWallMainWrapper>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={customTheme}>
      <GlobalStyle />
      <AnimatedWallMainWrapper style={{ fontFamily: customTheme.fontFamily }}>
        <ThemeToggleButton onClick={toggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
        </ThemeToggleButton>
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
                />
              ))}
            </AnimatedWallRow>
          ))}
        </AnimatedWallContainer>
      </AnimatedWallMainWrapper>
    </ThemeProvider>
  );
};

export default AnimatedWall;