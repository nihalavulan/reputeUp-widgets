import React, { useState } from "react";
import { useReviews } from "../../hooks/useReviews";
// import styled components (to be created in CardDeck.styled.js)
import {
  CardDeckWrapper,
  CardDeckContainer,
  CardDeckCard,
  CardDeckAvatar,
  CardDeckAuthorInfo,
  CardDeckReviewText,
  CardDeckLoading,
  CardDeckError
} from "./CardDeck.styled";

const CardDeck = ({ apiId = "1749890233" }) => {
  const { reviews, loading, error } = useReviews(apiId);
  // Only consider reviews with review_title or review_text
  const reviewsWithText = reviews
    ? reviews.filter(
        (r) => (r.review_title && r.review_title.trim() !== "") || (r.review_text && r.review_text.trim() !== "")
      )
    : [];

  // Prepare 9 cards: 4 left, 1 center, 4 right
  const [leftCards, setLeftCards] = useState([0, 1, 2, 3]);
  const [rightCards, setRightCards] = useState([4, 5, 6, 7]);
  const [centerCard, setCenterCard] = useState(8);

  // Simple swap logic: interchange clicked card with center card
  const handleCardClick = (side, idx) => {
    if (side === "left") {
      const clickedCardIndex = leftCards[idx];
      const newLeftCards = [...leftCards];
      newLeftCards[idx] = centerCard;
      setLeftCards(newLeftCards);
      setCenterCard(clickedCardIndex);
    } else if (side === "right") {
      const clickedCardIndex = rightCards[idx];
      const newRightCards = [...rightCards];
      newRightCards[idx] = centerCard;
      setRightCards(newRightCards);
      setCenterCard(clickedCardIndex);
    }
  };

  if (loading) return <CardDeckLoading>Loading reviews...</CardDeckLoading>;
  if (error) return <CardDeckError>Error loading reviews.</CardDeckError>;
  if (!reviewsWithText || reviewsWithText.length < 9) return <CardDeckLoading>Not enough reviews</CardDeckLoading>;

  return (
    <CardDeckWrapper>
      <CardDeckContainer>
        {/* Left cards - arranged in a fan behind center */}
        {leftCards.map((idx, i) => (
          <CardDeckCard 
            key={`left-${idx}`} 
            position="left" 
            index={i}
            onClick={() => handleCardClick("left", i)}
          >
            <CardDeckReviewText>{reviewsWithText[idx].review_text || reviewsWithText[idx].review_title}</CardDeckReviewText>
            <CardDeckAuthorInfo>
              <CardDeckAvatar src={reviewsWithText[idx].customer_photo || reviewsWithText[idx].author_pic} />
              <span>{reviewsWithText[idx].customer_firstname || "Anonymous"}</span>
            </CardDeckAuthorInfo>
          </CardDeckCard>
        ))}
        
        {/* Right cards - arranged in a fan behind center */}
        {rightCards.map((idx, i) => (
          <CardDeckCard 
            key={`right-${idx}`} 
            position="right" 
            index={i}
            onClick={() => handleCardClick("right", i)}
          >
            <CardDeckReviewText>{reviewsWithText[idx].review_text || reviewsWithText[idx].review_title}</CardDeckReviewText>
            <CardDeckAuthorInfo>
              <CardDeckAvatar src={reviewsWithText[idx].customer_photo || reviewsWithText[idx].author_pic} />
              <span>{reviewsWithText[idx].customer_firstname || "Anonymous"}</span>
            </CardDeckAuthorInfo>
          </CardDeckCard>
        ))}
        
        {/* Center card - on top */}
        <CardDeckCard position="center">
          <CardDeckReviewText>{reviewsWithText[centerCard].review_text || reviewsWithText[centerCard].review_title}</CardDeckReviewText>
          <CardDeckAuthorInfo>
            <CardDeckAvatar src={reviewsWithText[centerCard].customer_photo || reviewsWithText[centerCard].author_pic} />
            <span>{reviewsWithText[centerCard].customer_firstname || "Anonymous"}</span>
          </CardDeckAuthorInfo>
        </CardDeckCard>
      </CardDeckContainer>
    </CardDeckWrapper>
  );
};

export default CardDeck;