"use client";
// InlineSlider.jsx
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Wrapper,
  Card,
  QuoteIcon,
  QuoteIconRight,
  ReviewText,
  AuthorRow,
  AuthorName,
  ReviewLink,
  Avatar,
  ArrowLeft,
  ArrowRight,
  FadeOverlay,
  InnerContent
} from "./InlineSlider.styled";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReputeUpFooter from '../Common/ReputeUpFooter';

const InlineSlider = ({ apiId = "1749890233", reviews, widget_settings = {}, widgetId }) => {
  const textReviews = reviews ? reviews.filter(r => r.review_text) : [];
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? textReviews.length - 1 : prev - 1));
  }, [textReviews.length]);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % textReviews.length);
  }, [textReviews.length]);

  const review = textReviews[current];

  useEffect(() => {
    setExpanded(false);
    setTimeout(() => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollHeight > textRef.current.clientHeight + 1);
      }
    }, 50);
  }, [review]);

  let faviconUrl = "";
  try {
    if (review.review_link) {
      faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(review.review_link).hostname}&sz=64`;
    }
  } catch {
    faviconUrl = "";
  }

  const mainBg = widget_settings.bg_color || undefined;
  const txtColor = widget_settings.txt_color || undefined;
  const fontFamily = widget_settings.font_family || undefined;

  return (
    <Wrapper style={{ background: mainBg, color: txtColor, fontFamily }}>
      <Card expanded={expanded}>
        <ArrowLeft onClick={handlePrev}>
          <Icon icon="ic:round-chevron-left" width={28} height={28} />
        </ArrowLeft>
        <ArrowRight onClick={handleNext}>
          <Icon icon="ic:round-chevron-right" width={28} height={28} />
        </ArrowRight>
        <InnerContent>
          <QuoteIcon icon="mingcute:quote-left-fill" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <ReviewText
              ref={textRef}
              style={expanded ? {
                WebkitLineClamp: 'unset',
                WebkitBoxOrient: 'unset',
                overflow: 'visible',
                display: 'block',
                textOverflow: 'unset',
                maxHeight: 'none'
              } : {}}
            >
              {review.review_text}
            </ReviewText>

            {!expanded && isTruncated && <FadeOverlay />}

            {isTruncated && !expanded && (
              <button
                onClick={() => setExpanded(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1976d2',
                  fontSize: '13px',
                  cursor: 'pointer',
                  padding: 0,
                  margin: 0,
                  textDecoration: 'underline',
                  fontWeight: 500,
                  marginTop: 4
                }}
              >
                Read more
              </button>
            )}
            {isTruncated && expanded && (
              <button
                onClick={() => setExpanded(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1976d2',
                  fontSize: '13px',
                  cursor: 'pointer',
                  padding: 0,
                  margin: 0,
                  textDecoration: 'underline',
                  fontWeight: 500,
                  marginTop: 4
                }}
              >
                Read less
              </button>
            )}
            <AuthorRow>
              <AuthorName>
                {review.customer_firstname} {review.customer_lastname}
              </AuthorName>
              {faviconUrl && (
                <ReviewLink href={review.review_link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={faviconUrl}
                    alt="favicon"
                    style={{ width: 16, height: 16, borderRadius: 4, objectFit: "cover", marginLeft: 4 }}
                  />
                </ReviewLink>
              )}
              <Avatar src={review.author_pic} alt="avatar" />
            </AuthorRow>
          </div>
          <QuoteIconRight icon="mingcute:quote-left-fill" />
        </InnerContent>
      </Card>
      <ReputeUpFooter widget_settings={widget_settings} widgetId={widgetId} />
    </Wrapper>
  );
};

export default InlineSlider;