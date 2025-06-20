import React from "react";
import { useReviews } from "../../hooks/useReviews";
import {
  ListWrapper,
  ListCard,
  ListAvatar,
  ListContent,
  ListName,
  ListText,
  ListFooter,
  ListStars,
  ListRightMeta,
  ListIcon
} from "./List.styled";
import StarIcon from "../../assets/icons/Star";

const List = ({ apiId = "1749890233" }) => {
  const { reviews, loading, error } = useReviews(apiId);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<StarIcon key={i} />);
    }
    return <ListStars>{stars}</ListStars>;
  };

  if (loading) return <ListWrapper>Loading...</ListWrapper>;
  if (error) return <ListWrapper>Error loading reviews</ListWrapper>;

  // Only show reviews with review_text
  const filteredReviews = (reviews || []).filter(r => r.review_text);
  if (filteredReviews.length === 0) return <ListWrapper>No reviews</ListWrapper>;

  return (
    <ListWrapper>
      {filteredReviews.map((review) => {
        let faviconUrl = "";
        try {
          if (review.review_link) {
            faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(review.review_link).hostname}&sz=64`;
          }
        } catch {
          faviconUrl = "";
        }
        return (
          <ListCard key={review.id}>
            <ListAvatar src={review.customer_photo || review.author_pic} alt="avatar" />
            <ListContent>
              <ListText>{review.review_text}</ListText>
              <ListFooter>
                <ListName>{review.customer_firstname} {review.customer_lastname}</ListName>
                <ListRightMeta>
                  {renderStars(review.rating)}
                  <span style={{ fontSize: 13, color: '#888' }}>
                    {review.review_date && new Date(review.review_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {review.review_link && faviconUrl && (
                    <a href={review.review_link} target="_blank" rel="noopener noreferrer">
                      <ListIcon>
                        <img
                          src={faviconUrl}
                          alt="favicon"
                          style={{ width: 16, height: 16, borderRadius: "50%" }}
                        />
                      </ListIcon>
                    </a>
                  )}
                </ListRightMeta>
              </ListFooter>
            </ListContent>
          </ListCard>
        );
      })}
    </ListWrapper>
  );
};

export default List; 