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
import { useReviews } from "../../hooks/useReviews";

const getReviewPhoto = (review, index) => {
  if (review.photos && review.photos.length > 0) {
    return review.photos[0];
  }
  return `https://picsum.photos/id/${1015 + index}/200/200`;
};

const Photoset = ({ apiId = "1749890233" }) => {
  const { reviews, loading, error } = useReviews(apiId);

  const displayableReviews = reviews
    ? reviews.filter((r) => r.review_text && r.review_text.trim()).slice(0, 5)
    : [];

  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? displayableReviews.length - 1 : prev - 1));
  }, [displayableReviews.length]);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % displayableReviews.length);
  }, [displayableReviews.length]);

  const handleThumbnailClick = (imageUrl) => {
    setModalImage(imageUrl);
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

  if (loading) return <Wrapper><div>Loading...</div></Wrapper>;
  if (error) return <Wrapper><div>Error loading reviews</div></Wrapper>;
  if (displayableReviews.length === 0) return <Wrapper><div>No reviews to display</div></Wrapper>;

  let reviewPostLink = '';
  if (review.review_link) {
      try {
          reviewPostLink = `View post on ${new URL(review.review_link).hostname.replace('www.', '')}`;
      } catch (e) {
        //   console.error("Invalid URL for review link", e);
      }
  }

  return (
    <Wrapper>
      <Card>
        <ReviewContainer>
          <ArrowLeft onClick={handlePrev} disabled={displayableReviews.length <= 1}>
            <Icon icon="ic:round-chevron-left" width={32} height={32} />
          </ArrowLeft>
          
          <TextAreaContainer>
            <QuoteIcon icon="mingcute:quote-left-fill" />
            {/* <ReviewTitle>{review.review_title || 'Fun way to see the city'}</ReviewTitle> */}
            <ReviewText
              ref={textRef}
              style={expanded ? {
                WebkitLineClamp: 'unset',
                overflow: 'visible',
              } : {}}
            >
              {review.review_text}
            </ReviewText>
            
            {/* {!expanded && isTruncated && <FadeOverlay />} */}

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
                {review.customer_firstname || 'Anonymous'}{review.customer_lastname ? ` ${review.customer_lastname}` : ''}
              </AuthorName>
              {review.review_link && (
                <ReviewLink href={review.review_link} target="_blank" rel="noopener noreferrer">
                  {reviewPostLink || 'View post'}
                </ReviewLink>
              )}
            </AuthorRow>
            <QuoteIconRight icon="mingcute:quote-left-fill" />
            </TextAreaContainer>

          <ArrowRight onClick={handleNext} disabled={displayableReviews.length <= 1}>
            <Icon icon="ic:round-chevron-right" width={32} height={32} />
          </ArrowRight>
        </ReviewContainer>

        <PhotoGrid>
          {displayableReviews.map((r, index) => (
            <PhotoThumbnail
              key={r.id || index}
              src={getReviewPhoto(r, index)}
              alt={`Review photo ${index + 1}`}
            //   className={index === current ? "active" : ""}
              onClick={() => handleThumbnailClick(getReviewPhoto(r, index))}
            />
          ))}
        </PhotoGrid>
      </Card>

      {modalImage && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}
          onClick={() => setModalImage(null)}
        >
          <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button 
              style={{ position: 'absolute', top: '-40px', right: 0, background: 'transparent', border: 'none', color: 'white', fontSize: '32px', cursor: 'pointer', lineHeight: 1 }}
              onClick={() => setModalImage(null)}
            >&times;</button>
            <img src={modalImage} alt="Enlarged review" style={{ maxWidth: '95vw', maxHeight: '95vh', borderRadius: '8px' }} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Photoset; 