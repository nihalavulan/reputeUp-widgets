import React, { useState, useMemo } from "react";
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
import { useReviews } from "../../hooks/useReviews";
import StarIcon from "../../assets/icons/Star";
import { Icon } from "@iconify/react";

const QuoteIcon = () => (
  <Icon icon="mingcute:quote-left-fill" width="36" height="36" style={{ color: "#ff8907" }} />
);

const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<StarIcon key={i} />);
  }
  return <CardRating>{stars}</CardRating>;
};

const Grid = ({ apiId = "1749890233" }) => {
  const { reviews, loading, error } = useReviews(apiId);
  const [modalReview, setModalReview] = useState(null);

  const textReviews = useMemo(() => reviews.filter(r => r.review_text), [reviews]);

  if (loading || error || textReviews.length === 0) return null;

  return (
    <>
      <GridWrapper>
        {textReviews.map((review, idx) => {
          const isLong = review.review_text.length > 180;
          const displayText = isLong ? review.review_text.slice(0, 180) + "... " : review.review_text;
          return (
            <GridCard key={review.id || idx}>
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
                {renderStars(review.rating)}
                <CardAuthor>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: '#222' }}>
                      {review.customer_firstname}
                      {review.customer_lastname ? ` ${review.customer_lastname[0]}.` : ''}
                    </span>
                    <GridReviewDate>
                      {review.review_date && new Date(review.review_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </GridReviewDate>
                  </div>
                  <div>
                    {review.customer_photo || review.author_pic ? (
                      <img
                        src={review.customer_photo || review.author_pic}
                        alt=""
                        style={{ width: 28, height: 28, borderRadius: '4px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white', fontWeight: 600, fontSize: 12,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {(review.customer_firstname || review.author_name || 'A').charAt(0)}
                      </div>
                    )}
                  </div>
                </CardAuthor>
              </CardFooter>
            </GridCard>
          );
        })}
      </GridWrapper>
      {modalReview && (
        <ModalOverlay onClick={() => setModalReview(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setModalReview(null)}>&times;</CloseButton>
            <QuoteIconWrap><QuoteIcon /></QuoteIconWrap>
            <div style={{ marginBottom: 12, fontSize: 16, color: '#444', fontWeight: 500 }}>{modalReview.review_text}</div>
            <CardFooter>
              {renderStars(modalReview.rating)}
              <CardAuthor>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: '#222' }}>
                  {modalReview.customer_firstname}
                  {modalReview.customer_lastname ? ` ${modalReview.customer_lastname[0]}.` : ''}
                </span>
                <GridReviewDate>
                  {modalReview.review_date && new Date(modalReview.review_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </GridReviewDate>
                </div>
                {modalReview.customer_photo || modalReview.author_pic ? (
                  <img
                    src={modalReview.customer_photo || modalReview.author_pic}
                    alt=""
                    style={{ width: 28, height: 28, borderRadius: '4px', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white', fontWeight: 600, fontSize: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {(modalReview.customer_firstname || modalReview.author_name || 'A').charAt(0)}
                  </div>
                )}
              </CardAuthor>
            </CardFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Grid;
