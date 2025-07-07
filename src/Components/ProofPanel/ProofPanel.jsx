"use client";

import React from "react";
import {
  ProofPanelWrapper,
  ProofPanelHeader,
  ProofPanelTabsRow,
  ProofPanelTab,
  ProofPanelTopRow,
  ProofPanelTitle,
  ProofPanelRatingRow,
  ProofPanelStars,
  ProofPanelRatingValue,
  ProofPanelReviewCount,
  ProofPanelWriteButton,
  ProofPanelReviewsGrid,
  ProofPanelReviewCard,
  ProofPanelReviewImage,
  ProofPanelReviewContent,
  ProofPanelReviewerRow,
  ProofPanelAvatar,
  ProofPanelReviewerInfo,
  ProofPanelReviewerName,
  ProofPanelReviewerSource,
  ProofPanelStarsContainer,
  ProofPanelReviewText,
  ProofPanelReadMore,
  ProofPanelError,
  ProofPanelLoadMoreContainer,
  ProofPanelLoadMoreButton,
} from "./ProofPanel.styled";
import Loading from '../Common/Loading';
import ReputeUpFooter from '../Common/ReputeUpFooter';

const ProofPanel = ({ reviews = [], widget_settings = {} }) => {
  const [activeSource, setActiveSource] = React.useState("All Reviews");
  const [expandedReviews, setExpandedReviews] = React.useState({});
  const [isMobile, setIsMobile] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(18);

  const mainBg = widget_settings.bg_color || undefined;
  const txtColor = widget_settings.txt_color || undefined;
  const fontFamily = widget_settings.font_family || undefined;
  const starColor = widget_settings.star_color || '#fbbf24';

  React.useEffect(() => {
    const checkIsMobile = () => window.innerWidth < 640;
    setIsMobile(checkIsMobile());
    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const reviewsWithText = reviews
    ? reviews.filter((r) => r.review_text && r.review_text.trim() !== "")
    : [];

  const groupByPlatform = (reviews) => {
    return reviews.reduce((acc, review) => {
      const platform = review.source || "Other";
      if (!acc[platform]) acc[platform] = [];
      acc[platform].push(review);
      return acc;
    }, {});
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasPartialStar = rating % 1 !== 0;
    const partialStarPercentage = ((rating % 1) * 100).toFixed(0);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} style={{ color: starColor, fontSize: 16 }}>
            ★
          </span>
        );
      } else if (i === fullStars && hasPartialStar) {
        stars.push(
          <span
            key={i}
            style={{
              position: "relative",
              fontSize: 16,
              display: "inline-block",
            }}
          >
            <span style={{ color: "#e5e7eb" }}>★</span>
            <span
              style={{
                color: starColor,
                position: "absolute",
                left: 0,
                top: 0,
                width: `${partialStarPercentage}%`,
                overflow: "hidden",
              }}
            >
              ★
            </span>
          </span>
        );
      } else {
        stars.push(
          <span key={i} style={{ color: "#e5e7eb", fontSize: 16 }}>
            ★
          </span>
        );
      }
    }
    return <ProofPanelStars>{stars}</ProofPanelStars>;
  };

  const toggleReadMore = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + (isMobile ? 8 : 12));
  };

  React.useEffect(() => {
    setVisibleCount(isMobile ? 8 : 18);
  }, [activeSource, isMobile]);

  if (!reviewsWithText || reviewsWithText.length === 0)
    return <Loading>No reviews yet</Loading>;

  const grouped = groupByPlatform(reviewsWithText);
  const allSources = ["All Reviews", ...Object.keys(grouped)];

  const formatRating = (rating) => {
    return Math.floor(rating * 10) / 10;
  };

  const allReviewsAverage =
    reviewsWithText.length > 0
      ? formatRating(
          reviewsWithText.reduce((acc, r) => acc + (r.rating || 0), 0) /
            reviewsWithText.length
        )
      : 0;

  const averageRatingsBySource = Object.keys(grouped).reduce((acc, source) => {
    const sourceReviews = grouped[source];
    const totalRating = sourceReviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );
    acc[source] =
      sourceReviews.length > 0
        ? formatRating(totalRating / sourceReviews.length)
        : 0;
    return acc;
  }, {});

  const allFilteredReviews =
    activeSource === "All Reviews"
      ? reviewsWithText
      : grouped[activeSource] || [];
  const filteredReviews = allFilteredReviews.slice(0, visibleCount);

  const totalReviews = allFilteredReviews.length;
  const averageRating =
    totalReviews > 0
      ? formatRating(
          allFilteredReviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
            totalReviews
        )
      : 0;

  const ratingLabel =
    activeSource === "All Reviews"
      ? "Overall Rating"
      : `${activeSource.charAt(0).toUpperCase() + activeSource.slice(1)} Reviews`;

  const hasMoreReviews = visibleCount < totalReviews;

  return (
    <ProofPanelWrapper style={{ background: mainBg, color: txtColor, fontFamily }}>
      <ProofPanelHeader>
        <ProofPanelTabsRow>
          {allSources.map((source) => {
            const rating =
              source === "All Reviews"
                ? allReviewsAverage
                : averageRatingsBySource[source];
            const count =
              source === "All Reviews"
                ? reviewsWithText.length
                : (grouped[source] || []).length;
            return (
              <ProofPanelTab
                key={source}
                active={activeSource === source}
                onClick={() => setActiveSource(source)}
              >
                {source} ({count}) • {rating}★
              </ProofPanelTab>
            );
          })}
        </ProofPanelTabsRow>
        <ProofPanelTopRow>
          <div>
            <ProofPanelTitle>{ratingLabel}</ProofPanelTitle>
            <ProofPanelRatingRow>
              {renderStars(parseFloat(averageRating))}
              <ProofPanelRatingValue>{averageRating}</ProofPanelRatingValue>
              <ProofPanelReviewCount>
                from {totalReviews} verified reviews
              </ProofPanelReviewCount>
            </ProofPanelRatingRow>
          </div>
          <ProofPanelWriteButton>Write a Review</ProofPanelWriteButton>
        </ProofPanelTopRow>
      </ProofPanelHeader>

      <ProofPanelReviewsGrid>
        {filteredReviews.map((review) => {
          const isExpanded = expandedReviews[review.id];
          const reviewText = review.review_text || "";
          const shouldTruncate = reviewText.length > 150 && !isExpanded;
          const displayText = shouldTruncate
            ? reviewText.substring(0, 150) + "..."
            : reviewText;

          return (
            <ProofPanelReviewCard key={review.id}>
              {review.review_image && (
                <ProofPanelReviewImage src={review.review_image} alt="review" />
              )}
              <ProofPanelReviewContent>
                {reviewText && (
                  <>
                    <ProofPanelReviewText>{displayText}</ProofPanelReviewText>
                    {reviewText.length > 150 && (
                      <ProofPanelReadMore
                        onClick={() => toggleReadMore(review.id)}
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </ProofPanelReadMore>
                    )}
                  </>
                )}

                <ProofPanelStarsContainer>
                  {renderStars(review.rating)}
                </ProofPanelStarsContainer>

                <ProofPanelReviewerRow>
                  <ProofPanelAvatar
                    src={
                      review.customer_photo ||
                      review.author_pic ||
                      `https://ui-avatars.com/api/?name=${
                        review.customer_firstname
                      }+${
                        review.customer_lastname || ""
                      }&background=3b82f6&color=fff&size=64`
                    }
                    alt={review.customer_firstname}
                  />
                  <ProofPanelReviewerInfo>
                    <ProofPanelReviewerName>
                      {review.customer_firstname ? `${review.customer_firstname}${review.customer_lastname ? ' ' + review.customer_lastname : ''}` : ''}
                    </ProofPanelReviewerName>
                    <ProofPanelReviewerSource>
                      {new Date(review.review_date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </ProofPanelReviewerSource>
                  </ProofPanelReviewerInfo>
                </ProofPanelReviewerRow>
              </ProofPanelReviewContent>
            </ProofPanelReviewCard>
          );
        })}
      </ProofPanelReviewsGrid>

      {hasMoreReviews && (
        <ProofPanelLoadMoreContainer>
          <ProofPanelLoadMoreButton onClick={handleLoadMore}>
            Load More Reviews ({totalReviews - visibleCount} remaining)
          </ProofPanelLoadMoreButton>
        </ProofPanelLoadMoreContainer>
      )}
      <ReputeUpFooter widget_settings={widget_settings} />
    </ProofPanelWrapper>
  );
};

export default ProofPanel;
