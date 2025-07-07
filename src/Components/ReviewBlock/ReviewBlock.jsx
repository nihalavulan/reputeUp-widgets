"use client";
import React from 'react';
import StarIcon from '../../assets/icons/Star';
import {
  ReviewBlockWrapper,
  ReviewBlockContent,
  ReviewBlockStars,
  ReviewBlockText,
  ReviewBlockAvatars,
  AvatarImage,
} from './ReviewBlock.styled';
import Image from 'next/image';
import Loading from '../Common/Loading';
import ReputeUpFooter from '../Common/ReputeUpFooter';

const ReviewBlock = ({ apiId = '1749890233', reviews, widget_settings = {} }) => {
  if (!reviews || reviews.length === 0) {
    return <ReviewBlockWrapper>No reviews yet</ReviewBlockWrapper>;
  }

  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;

  // FOR TESTING: Change this value to see different star displays. We'll remove this later.
  const testRating = null; 

  const reviewersWithPics = reviews.filter(r => r.author_pic || r.customer_photo);
  const randomReviewers = reviewersWithPics.sort(() => 0.5 - Math.random()).slice(0, 5);

  const mainBg = widget_settings.bg_color || undefined;
  const txtColor = widget_settings.txt_color || undefined;
  const fontFamily = widget_settings.font_family || undefined;
  const starColor = widget_settings.star_color || undefined;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const partialStar = rating % 1;
    const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} color={starColor} />);
    }

    if (partialStar > 0) {
      stars.push(
        <div key="partial" style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
          <StarIcon color="#e4e5e9" />
          <div style={{ position: 'absolute', top: 0, left: 0, overflow: 'hidden', width: `${partialStar * 100}%` }}>
            <StarIcon color={starColor} />
          </div>
        </div>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} color="#e4e5e9" />);
    }

    return <ReviewBlockStars>{stars}</ReviewBlockStars>;
  };

  return (
    <ReviewBlockWrapper style={{ background: mainBg, color: txtColor, fontFamily }}>
      <ReviewBlockContent>
        <ReviewBlockAvatars>
          {randomReviewers.map((review, index) => (
            review.author_pic || review.customer_photo ? (
              <Image
                key={review.id || index}
                src={review.author_pic || review.customer_photo}
                alt="reviewer"
                width={40}
                height={40}
                style={{ borderRadius: '50%', objectFit: 'cover', zIndex: randomReviewers.length - index }}
              />
            ) : (
              <div key={review.id || index} style={{ width: 40, height: 40, borderRadius: '50%', background: '#eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontWeight: 600, fontSize: 16, zIndex: randomReviewers.length - index }}>
                {(review.customer_firstname?.[0] || review.author_name?.[0] || 'A').toUpperCase()}
              </div>
            )
          ))}
        </ReviewBlockAvatars>
        <div>
          {renderStars(testRating || averageRating)}
          <ReviewBlockText><strong>{(testRating || averageRating).toFixed(1)}</strong> from {totalReviews} reviews</ReviewBlockText>
        </div>
      </ReviewBlockContent>
      <ReputeUpFooter widget_settings={widget_settings} />
    </ReviewBlockWrapper>
  );
};

export default ReviewBlock; 