import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import axios from 'axios';

const StyledWallMainWrapper = styled.div`
  padding: 2rem;
  background: #f7f7f7;
  min-height: 100vh;
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 1rem;
`;

const ReviewerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const ReviewerImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.75rem;
`;

const ReviewerName = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
`;

const ReviewText = styled.p`
  font-size: 0.95rem;
  line-height: 1.4;
`;

const ReviewDate = styled.div`
  font-size: 0.75rem;
  color: #888;
  margin-top: 0.5rem;
`;

const StarRating = styled.div`
  margin-top: 0.5rem;
  color: #f39c12;
  font-size: 1rem;
`;

const Wall = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get('https://app.reputeup.ai/api/review-settings-with-list/1749890233')
      .then((res) => {
        const data = res.data?.data?.reviews || [];
        // filter reviews that have text
        const filtered = data.filter(r => r.review_text && r.review_text.trim() !== '');
        setReviews(filtered);
      })
      .catch((err) => {
        console.error('Error loading reviews', err);
      });
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <StyledWallMainWrapper>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {reviews.map((review) => (
          <TestimonialCard key={review.id}>
            <ReviewerHeader>
              <ReviewerImage src={review.customer_photo || 'https://randomuser.me/api/portraits/men/1.jpg'} />
              <div>
                <ReviewerName>{review.customer_firstname || 'Anonymous'}</ReviewerName>
                <ReviewDate>{review.review_date}</ReviewDate>
              </div>
            </ReviewerHeader>
            <ReviewText>{review.review_text}</ReviewText>
            <StarRating>{renderStars(review.rating)}</StarRating>
          </TestimonialCard>
        ))}
      </Masonry>
    </StyledWallMainWrapper>
  );
};

export default Wall;
