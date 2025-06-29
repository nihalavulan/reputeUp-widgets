"use client";
import React, { useState, useRef, useEffect } from "react";
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
  ListIcon,
  ReadMoreToggle,
  LoadMoreButton,
  LoadingWrapper
} from "./List.styled";
import StarIcon from "../../assets/icons/Star";

const BATCH_SIZE = 8;

const List = ({ apiId = "1749890233", reviews }) => {
  const [expandedIds, setExpandedIds] = useState([]);
  const [overflowMap, setOverflowMap] = useState({});
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const textRefs = useRef({});

  const toggleReadMore = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const newOverflowMap = {};
    Object.keys(textRefs.current).forEach((id) => {
      const el = textRefs.current[id];
      if (el && el.scrollHeight > el.clientHeight + 1) {
        newOverflowMap[id] = true;
      }
    });
    setOverflowMap(newOverflowMap);
  }, [reviews]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<StarIcon key={i} />);
    }
    return <ListStars>{stars}</ListStars>;
  };

  if (reviews.length === 0) return <ListWrapper>No reviews</ListWrapper>;

  const visibleReviews = reviews.slice(0, visibleCount);

  return (
    <ListWrapper>
      {visibleReviews.map((review) => {
        const isExpanded = expandedIds.includes(review.id);
        const hasOverflowed = overflowMap[review.id];
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
            <ListAvatar src={review.author_pic || review.customer_photo} alt="avatar" />
            <ListContent>
              <ListText
                ref={(el) => (textRefs.current[review.id] = el)}
                $expanded={isExpanded}
              >
                {review.review_text}
              </ListText>
              {hasOverflowed && (
                <ReadMoreToggle onClick={() => toggleReadMore(review.id)}>
                  {isExpanded ? "Read less" : "Read more"}
                </ReadMoreToggle>
              )}
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

      {visibleCount < reviews.length && (
        <LoadMoreButton onClick={() => setVisibleCount(prev => prev + BATCH_SIZE)}>
          Load More
        </LoadMoreButton>
      )}
    </ListWrapper>
  );
};

export default List;
