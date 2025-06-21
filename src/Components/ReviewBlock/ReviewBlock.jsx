import React from 'react';
import { useReviews } from '../../hooks/useReviews';
import StarIcon from '../../assets/icons/Star';
import {
  ReviewBlockWrapper,
  ReviewBlockContent,
  ReviewBlockStars,
  ReviewBlockText,
  ReviewBlockAvatars,
  AvatarImage,
  LoadingWrapper,
} from './ReviewBlock.styled';

const ReviewBlock = ({ apiId = '1749890233' }) => {
  const { reviews, loading, error } = useReviews(apiId);

  if (loading) {
    return (
      <LoadingWrapper>
        <span>Loading...</span>
      </LoadingWrapper>
    );
  }

  if (error) {
    return <ReviewBlockWrapper>Error loading reviews</ReviewBlockWrapper>;
  }

  if (!reviews || reviews.length === 0) {
    return <ReviewBlockWrapper>No reviews yet</ReviewBlockWrapper>;
  }

  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;

  // FOR TESTING: Change this value to see different star displays. We'll remove this later.
  const testRating = null; 

  const reviewersWithPics = reviews.filter(r => r.author_pic || r.customer_photo);
  const randomReviewers = reviewersWithPics.sort(() => 0.5 - Math.random()).slice(0, 5);


  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const partialStar = rating % 1;
    const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} />);
    }

    if (partialStar > 0) {
      stars.push(
        <div key="partial" style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
          <StarIcon color="#e4e5e9" />
          <div style={{ position: 'absolute', top: 0, left: 0, overflow: 'hidden', width: `${partialStar * 100}%` }}>
            <StarIcon />
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
    <ReviewBlockWrapper>
      <ReviewBlockContent>
        <ReviewBlockAvatars>
          {randomReviewers.map((review, index) => (
            <AvatarImage
              key={review.id || index}
              src={review.author_pic || review.customer_photo}
              alt="reviewer"
              style={{ zIndex: randomReviewers.length - index }}
            />
          ))}
        </ReviewBlockAvatars>
        <div>
          {renderStars(testRating || averageRating)}
          <ReviewBlockText><strong>{(testRating || averageRating).toFixed(1)}</strong> from {totalReviews} reviews</ReviewBlockText>
        </div>
      </ReviewBlockContent>
    </ReviewBlockWrapper>
  );
};

export default ReviewBlock; 