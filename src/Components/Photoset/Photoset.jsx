"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Wrapper,
  Card,
  ReviewContainer,
  QuoteIcon,
  QuoteIconRight,
  ReviewText,
  AuthorRow,
  AuthorName,
  ReviewLink,
  ArrowLeft,
  ArrowRight,
  PhotoGrid,
  PhotoThumbnail,
  TextAreaContainer,
} from "./Photoset.styled";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from 'next/image';
import Loading from '../Common/Loading';

const getReviewPhotos = (review, index) => {
  if (review.photos && review.photos.length > 0) {
    return review.photos;
  }
  // Generate 5 placeholder images for each review
  return Array.from({ length: 5 }, (_, i) => 
    `https://picsum.photos/seed/${index}-${i}/200/300`
  );
};

const Photoset = ({ reviews = [], widget_settings = {} }) => {
  const displayableReviews = reviews
    ? reviews.filter((r) => r.review_text && r.review_text.trim()).slice(0, 5)
    : [];

  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const mainBg = widget_settings.bg_color || undefined;
  const txtColor = widget_settings.txt_color || undefined;
  const fontFamily = widget_settings.font_family || undefined;

  const handlePrev = useCallback(() => {
    if (displayableReviews.length <= 1) return;
    setCurrent((prev) => prev === 0 ? displayableReviews.length - 1 : prev - 1);
  }, [displayableReviews.length]);

  const handleNext = useCallback(() => {
    if (displayableReviews.length <= 1) return;
    setCurrent((prev) => (prev + 1) % displayableReviews.length);
  }, [displayableReviews.length]);

  const handleThumbnailClick = (imageUrl) => {
    setImageLoading(true);
    setModalImage(imageUrl);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
  };
  
  const review = displayableReviews[current];

  useEffect(() => {
    setExpanded(false);
    setTimeout(() => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollHeight > textRef.current.clientHeight + 1);
      }
    }, 50);
  }, [review]);

  if (displayableReviews.length === 0) return <Wrapper><div>No reviews to display</div></Wrapper>;

  let reviewPostLink = '';
  if (review.review_link) {
      try {
          reviewPostLink = `View post on ${new URL(review.review_link).hostname.replace('www.', '')}`;
      } catch (e) {
        //   console.error("Invalid URL for review link", e);
      }
  }

  const currentReviewPhotos = getReviewPhotos(review, current);

  return (
    <Wrapper style={{ background: mainBg, color: txtColor, fontFamily }}>
      <Card style={{ background: mainBg, color: txtColor, fontFamily }}>
        <ReviewContainer>
          <ArrowLeft 
            onClick={handlePrev} 
            disabled={displayableReviews.length <= 1}
            style={{ 
              opacity: displayableReviews.length <= 1 ? 0.3 : 1,
              cursor: displayableReviews.length <= 1 ? 'default' : 'pointer'
            }}
          >
            <Icon icon="ic:round-chevron-left" width={32} height={32} />
          </ArrowLeft>
          
          <TextAreaContainer>
            <QuoteIcon icon="mingcute:quote-left-fill" />
            <ReviewText
              ref={textRef}
              style={expanded ? {
                WebkitLineClamp: 'unset',
                overflow: 'visible',
              } : {}}
            >
              {review.review_text}
            </ReviewText>
            
            {isTruncated && (
              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1976d2',
                  fontSize: '13px',
                  cursor: 'pointer',
                  padding: 0,
                  margin: 0,
                  textDecoration: 'underline',
                  fontWeight: 500,
                  marginTop: 4
                }}
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            )}

            <AuthorRow>
              <AuthorName>
                {review.customer_firstname ? `${review.customer_firstname}${review.customer_lastname ? ' ' + review.customer_lastname : ''}` : ''}
              </AuthorName>
              {review.review_link && (
                <ReviewLink href={review.review_link} target="_blank" rel="noopener noreferrer">
                  {reviewPostLink || 'View post'}
                </ReviewLink>
              )}
            </AuthorRow>
            <QuoteIconRight icon="mingcute:quote-left-fill" />
          </TextAreaContainer>

          <ArrowRight 
            onClick={handleNext} 
            disabled={displayableReviews.length <= 1}
            style={{ 
              opacity: displayableReviews.length <= 1 ? 0.3 : 1,
              cursor: displayableReviews.length <= 1 ? 'default' : 'pointer'
            }}
          >
            <Icon icon="ic:round-chevron-right" width={32} height={32} />
          </ArrowRight>
        </ReviewContainer>

        <PhotoGrid>
          {currentReviewPhotos.map((photo, index) => (
            photo ? (
              <Image
                key={`${current}-${index}`}
                src={photo}
                alt={`Review photo ${index + 1}`}
                width={80}
                height={80}
                style={{ borderRadius: '8px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => handleThumbnailClick(photo)}
              />
            ) : (
              <div key={`${current}-${index}`} style={{ width: 80, height: 80, borderRadius: 8, background: '#eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>No Image</div>
            )
          ))}
        </PhotoGrid>
      </Card>

      {modalImage && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            background: 'rgba(0,0,0,0.9)', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            zIndex: 999999,
            padding: '20px',
            boxSizing: 'border-box'
          }}
          onClick={() => {
            setModalImage(null);
            setImageLoading(false);
          }}
        >
          <div 
            style={{ 
              position: 'relative', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              width: '100%',
              height: '100%'
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px', 
                background: 'rgba(0,0,0,0.7)', 
                border: 'none', 
                color: 'white', 
                fontSize: '24px', 
                cursor: 'pointer', 
                lineHeight: 1, 
                borderRadius: '50%', 
                width: '40px', 
                height: '40px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                zIndex: 1000000,
                fontWeight: 'bold'
              }}
              onClick={() => {
                setModalImage(null);
                setImageLoading(false);
              }}
            >
              ×
            </button>
            
            {imageLoading && (
              <Loading text="Loading image..." minHeight={80} />
            )}
            
            {modalImage ? (
              <Image
                src={modalImage}
                alt="Enlarged review"
                width={600}
                height={600}
                style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', objectFit: 'contain', display: imageLoading ? 'none' : 'block' }}
                onLoadingComplete={handleImageLoad}
              />
            ) : (
              <div style={{ width: 600, height: 600, borderRadius: 8, background: '#eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>No Image</div>
            )}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Photoset;