"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  GridWrapper,
  GridCard,
  CardContentRow,
  CardText,
  CardFooter,
  CardRating,
  CardAuthor,
  ReadMoreButton,
  ModalOverlay,
  ModalContent,
  CloseButton,
  QuoteIconWrap,
  GridReviewDate,
} from "./Grid.styled";
import StarIcon from "../../assets/icons/Star";
import { Icon } from "@iconify/react";
import Image from 'next/image';

const ITEMS_PER_PAGE = 12;

const QuoteIcon = () => (
  <Icon icon="mingcute:quote-left-fill" width="36" height="36" style={{ color: "#ff8907" }} />
);

const renderStars = (rating, starColor) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<StarIcon key={i} color={starColor} />);
  }
  return <CardRating>{stars}</CardRating>;
};

const getFaviconUrl = (review_link) => {
  try {
    if (review_link) {
      return `https://www.google.com/s2/favicons?domain=${new URL(review_link).hostname}&sz=64`;
    }
  } catch {
    return "";
  }
  return "";
};

const Grid = ({ apiId = "1749890233", reviews, widget_settings = {} }) => {
  const [modalReview, setModalReview] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const modalRef = useRef(null);

  // Scroll modal into view when opened
  useEffect(() => {
    if (modalReview && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [modalReview]);

  const textReviews = useMemo(() => reviews.filter(r => r.review_text), [reviews]);
  const displayedReviews = useMemo(() => textReviews.slice(0, displayedCount), [textReviews, displayedCount]);
  const hasMore = textReviews.length > displayedCount;

  const mainBg = widget_settings.bg_color || undefined;
  const txtColor = widget_settings.txt_color || undefined;
  const fontFamily = widget_settings.font_family || undefined;
  const starColor = widget_settings.star_color || undefined;

  return (
    <>
      <GridWrapper style={{ background: mainBg, color: txtColor, fontFamily }}>
        {displayedReviews.map((review, idx) => {
          const isLong = review.review_text.length > 180;
          const displayText = isLong ? review.review_text.slice(0, 180) + "... " : review.review_text;
          const faviconUrl = getFaviconUrl(review.review_link);
          return (
            <GridCard key={review.id || idx} style={{ background: mainBg, color: txtColor, fontFamily }}>
              <CardContentRow>
                <QuoteIconWrap><QuoteIcon /></QuoteIconWrap>
                <CardText>
                  {displayText}
                  {isLong && (
                    <ReadMoreButton onClick={() => setModalReview(review)}>Read more</ReadMoreButton>
                  )}
                </CardText>
              </CardContentRow>
              <CardFooter>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
                  {faviconUrl && (
                    <a href={review.review_link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={faviconUrl}
                        alt="favicon"
                        style={{ width: 16, height: 16, borderRadius: 4, objectFit: "cover", marginRight: 2 }}
                      />
                    </a>
                  )}
                </div>
                {renderStars(review.rating, starColor)}
                <CardAuthor>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: '#222' }}>
                      {review.customer_firstname ? `${review.customer_firstname}${review.customer_lastname ? ' ' + review.customer_lastname : ''}` : ''}
                    </span>
                    <GridReviewDate>
                      {review.review_date && new Date(review.review_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </GridReviewDate>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {review.customer_photo || review.author_pic ? (
                      <Image
                        src={review.customer_photo || review.author_pic}
                        alt=""
                        width={28}
                        height={28}
                        style={{ borderRadius: '4px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white', fontWeight: 600, fontSize: 12,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {(review.customer_firstname?.[0] || review.author_name?.[0] || 'A').toUpperCase()}
                      </div>
                    )}
                  </div>
                </CardAuthor>
              </CardFooter>
            </GridCard>
          );
        })}
      </GridWrapper>
      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '18px 0', marginBottom: 32 }}>
          <button
            onClick={() => setDisplayedCount(c => c + ITEMS_PER_PAGE)}
            style={{
              background: '#f5f6fa',
              color: '#1976d2',
              border: '1px solid #e0e0e0',
              borderRadius: 6,
              padding: '6px 18px',
              fontSize: '0.98rem',
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: 'none',
              transition: 'all 0.2s',
            }}
          >
            Load More
          </button>
        </div>
      )}
      {modalReview && (
        <ModalOverlay onClick={() => setModalReview(null)}>
          <ModalContent ref={modalRef} onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setModalReview(null)}>&times;</CloseButton>
            <QuoteIconWrap><QuoteIcon /></QuoteIconWrap>
            <div style={{ marginBottom: 12, fontSize: 16, color: '#444', fontWeight: 500 }}>{modalReview.review_text}</div>
            <CardFooter>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
                {getFaviconUrl(modalReview.review_link) && (
                  <a href={modalReview.review_link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={getFaviconUrl(modalReview.review_link)}
                      alt="favicon"
                      style={{ width: 16, height: 16, borderRadius: 4, objectFit: "cover", marginRight: 2 }}
                    />
                  </a>
                )}
              </div>
              {renderStars(modalReview.rating, starColor)}
              <CardAuthor>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: '#222' }}>
                    {modalReview.customer_firstname ? `${modalReview.customer_firstname}${modalReview.customer_lastname ? ' ' + modalReview.customer_lastname[0] + '.' : ''}` : ''}
                  </span>
                  <GridReviewDate>
                    {modalReview.review_date && new Date(modalReview.review_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </GridReviewDate>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {modalReview.customer_photo || modalReview.author_pic ? (
                    <Image
                      src={modalReview.customer_photo || modalReview.author_pic}
                      alt=""
                      width={28}
                      height={28}
                      style={{ borderRadius: '4px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white', fontWeight: 600, fontSize: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {(modalReview.customer_firstname?.[0] || modalReview.author_name?.[0] || 'A').toUpperCase()}
                    </div>
                  )}
                </div>
              </CardAuthor>
            </CardFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Grid;
