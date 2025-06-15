import React, { useEffect, useState, useCallback, useMemo } from "react";
import Masonry from "react-masonry-css";
import {
  StyledWallMainWrapper,
  LoadingWrapper,
  LoadingSpinner,
  LoadingText,
  LoadingSubtext,
  LoadingDots,
  ErrorWrapper,
  EmptyStateWrapper,
  MasonryGridStyles,
} from "./Wall.styles";
import {
  PlayButton,
  StyledBodyAuthorDetailsWrapper,
  StyledBodyHeader,
  StyledBodyHeadersWrapper,
  StyledCardBodyWrapper,
  StyledDesignation,
  StyledDetailsOnVideo,
  StyledDetailsOnVideoWrapper,
  StyledName,
  StyledReviewDate,
  StyledReviewLinkWrapper,
  StyledVideo,
  StyledVideoWrapper,
  StyledWallCard,
} from "./WallCard.styled";
import { Icon } from "@iconify/react";
import StarIcon from "../../assets/icons/Star";

const useIframeResize = () => {
  const triggerResize = useCallback(() => {
    if (window.parentIFrame?.size) {
      window.parentIFrame.size();
    }
  }, []);

  return triggerResize;
};

const useReviews = (apiUrl) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const reviewsData = data?.data?.reviews || [];

        const validReviews = reviewsData.sort(
          (a, b) => new Date(b.review_date) - new Date(a.review_date)
        );

        setReviews(validReviews);
      } catch (err) {
        console.error("Error loading reviews:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [apiUrl]);

  return { reviews, loading, error };
};

const ReviewCard = React.memo(({ review, onImageLoad, renderStars }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = React.useRef(null);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <StyledWallCard>
      {review.video_path && (
        <StyledVideoWrapper
          isOnlyVideo={review.video_path && !review.review_text}
        >
          <StyledVideo
            ref={videoRef}
            onClick={handleTogglePlay}
            controls={false}
            preload="metadata"
          >
            <source
              src={
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </StyledVideo>

          <StyledDetailsOnVideoWrapper>
            <StyledDetailsOnVideo>
              {review.rating && renderStars(review.rating)}
              <StyledName>
                {review.customer_firstname
                  ? `${review.customer_firstname}${
                      review.customer_lastname
                        ? " " + review.customer_lastname
                        : ""
                    }`
                  : ""}
              </StyledName>
              <StyledDesignation>
                {review.author_designation || review.work_title}
              </StyledDesignation>
            </StyledDetailsOnVideo>

            <PlayButton onClick={handleTogglePlay}>
              {isPlaying ? (
                <Icon
                  icon="material-symbols:pause-rounded"
                  width="44"
                  height="44"
                  style={{ color: "#fff" }}
                />
              ) : (
                <Icon
                  icon="material-symbols:play-arrow-rounded"
                  width="44"
                  height="44"
                  style={{ color: "#fff" }}
                />
              )}
            </PlayButton>
          </StyledDetailsOnVideoWrapper>
        </StyledVideoWrapper>
      )}

      {!review.video_path && (
        <StyledBodyHeadersWrapper>
          <StyledBodyHeader>
            <StyledBodyAuthorDetailsWrapper>
              <img src={review?.customer_photo || review?.author_pic} alt="" />
              <div>
                <h3>{review.author_name || review.customer_firstname}</h3>
                <h6>
                  {review.author_designation ||
                    review.work_title }
                </h6>
              </div>
            </StyledBodyAuthorDetailsWrapper>

            <StyledReviewLinkWrapper href={review.review_link} target="_blank">
              {review.review_link && (
                <img
                  src={`https://www.google.com/s2/favicons?domain=${
                    new URL(review.review_link).hostname
                  }&sz=64`}
                  alt="favicon"
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
            </StyledReviewLinkWrapper>
          </StyledBodyHeader>

          {review.rating && renderStars(review.rating)}
        </StyledBodyHeadersWrapper>
      )}

      {(review.review_text || review.review_title) && (
        <StyledCardBodyWrapper>
          {review.review_title && <h3>{review.review_title}</h3>}
          <p>{review.review_text}</p>
        </StyledCardBodyWrapper>
      )}

      <StyledReviewDate>
        {new Date(review.review_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </StyledReviewDate>
    </StyledWallCard>
  );
});

ReviewCard.displayName = "ReviewCard";

const Wall = ({ apiId = "1749890233" }) => {
  const apiUrl = `https://app.reputeup.ai/api/review-settings-with-list/${apiId}`;
  const { reviews, loading, error } = useReviews(apiUrl);
  const triggerResize = useIframeResize();

  const breakpointColumnsObj = useMemo(
    () => ({
      default: 3,
      1100: 2,
      700: 1,
    }),
    []
  );

  const renderStars = useMemo(
    () => (rating) => {
      const validRating = Math.max(0, Math.min(5, Math.floor(rating || 0)));
      const stars = [];

      for (let i = 0; i < 5; i++) {
        stars.push(<StarIcon />);
      }

      return (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {stars}
        </div>
      );
    },
    []
  );

  const handleImageLoad = useCallback(() => {
    setTimeout(triggerResize, 50);
  }, [triggerResize]);

  useEffect(() => {
    if (reviews.length > 0) {
      const timer = setTimeout(triggerResize, 300);
      return () => clearTimeout(timer);
    }
  }, [reviews.length, triggerResize]);

  if (loading) {
    return (
      <StyledWallMainWrapper>
        <LoadingWrapper>
          <LoadingSpinner />
          <LoadingText>Loading Reviews</LoadingText>
          <LoadingSubtext>Please wait while we fetch the latest reviews</LoadingSubtext>
          <LoadingDots>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </LoadingDots>
        </LoadingWrapper>
      </StyledWallMainWrapper>
    );
  }

  if (error) {
    return (
      <StyledWallMainWrapper>
        <ErrorWrapper>Failed to load reviews: {error}</ErrorWrapper>
      </StyledWallMainWrapper>
    );
  }

  if (reviews.length === 0) {
    return (
      <StyledWallMainWrapper>
        <EmptyStateWrapper>
          <h3>No Reviews Yet</h3>
          <p>Be the first to share your experience!</p>
        </EmptyStateWrapper>
      </StyledWallMainWrapper>
    );
  }

  return (
    <>
      <style>{MasonryGridStyles}</style>
      <StyledWallMainWrapper>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {reviews.map((review) => (
            <ReviewCard
              key={`${review.id}-${review.review_date}`}
              review={review}
              onImageLoad={handleImageLoad}
              renderStars={renderStars}
            />
          ))}
        </Masonry>
      </StyledWallMainWrapper>
    </>
  );
};

export default Wall;