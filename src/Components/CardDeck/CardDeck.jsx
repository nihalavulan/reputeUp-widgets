"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

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

const CardDeck = ({ reviews = [] }) => {
  const [swiper, setSwiper] = useState(null);
  
  const reviewsWithText = reviews
    ? reviews.filter(
        (r) => (r.review_title && r.review_title.trim() !== "") || (r.review_text && r.review_text.trim() !== "")
      )
    : [];

  // Limit to only 9 items
  const limitedReviews = reviewsWithText.slice(0, 9);

  // Set initial slide to the middle card (5th card, index 4)
  useEffect(() => {
    if (swiper && limitedReviews.length > 0) {
      const middleIndex = Math.floor(limitedReviews.length / 2);
      swiper.slideTo(middleIndex, 0);
    }
  }, [swiper, limitedReviews]);

  if (!limitedReviews || limitedReviews.length === 0) {
    return <CardDeckLoading>No reviews available</CardDeckLoading>;
  }

  return (
    <CardDeckWrapper>
      <CardDeckContainer>
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="reviewSwiper"
          onSwiper={setSwiper}
          cardsEffect={{
            slideShadows: true,
            transformEl: null,
            perSlideOffset: 8,
            perSlideRotate: 2,
          }}
          initialSlide={Math.floor(limitedReviews.length / 2)}
        >
          {limitedReviews.map((review, index) => (
            <SwiperSlide key={index}>
              <CardDeckCard>
                <CardDeckReviewText>
                  {review.review_text || review.review_title}
                </CardDeckReviewText>
                <CardDeckAuthorInfo>
                  <CardDeckAvatar 
                    src={review.customer_photo || review.author_pic} 
                    alt={review.customer_firstname || "Anonymous"}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span>{review.customer_firstname || "Anonymous"}</span>
                </CardDeckAuthorInfo>
              </CardDeckCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </CardDeckContainer>
    </CardDeckWrapper>
  );
};

export default CardDeck;