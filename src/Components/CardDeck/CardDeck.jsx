"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import Image from 'next/image';
import Loading from '../Common/Loading';
import ReputeUpFooter from '../Common/ReputeUpFooter';

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
  CardDeckError
} from "./CardDeck.styled";

const CardDeck = ({ reviews = [], widget_settings = {} }) => {
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

  const mainBg = widget_settings.bg_color || undefined;
  const txtColor = widget_settings.txt_color || undefined;
  const fontFamily = widget_settings.font_family || undefined;

  if (!limitedReviews || limitedReviews.length === 0) {
    return <Loading />;
  }

  return (
    <CardDeckWrapper style={{ background: mainBg, color: txtColor, fontFamily }}>
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
              <CardDeckCard style={{ background: mainBg, color: txtColor, fontFamily }}>
                <CardDeckReviewText>{review.review_text || review.review_title}</CardDeckReviewText>
                <CardDeckAuthorInfo>
                  {review.customer_photo || review.author_pic ? (
                    <Image
                      src={review.customer_photo || review.author_pic}
                      alt={review.customer_firstname || ''}
                      width={40}
                      height={40}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', background: '#eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontWeight: 600, fontSize: 16
                    }}>
                      {review.customer_firstname?.[0]?.toUpperCase() || ''}
                    </div>
                  )}
                  <span>
                    {review.customer_firstname ? `${review.customer_firstname}${review.customer_lastname ? ` ${review.customer_lastname}` : ''}` : ''}
                  </span>
                </CardDeckAuthorInfo>
              </CardDeckCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </CardDeckContainer>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <ReputeUpFooter widget_settings={widget_settings} size="small" />
      </div>
    </CardDeckWrapper>
  );
};

export default CardDeck;