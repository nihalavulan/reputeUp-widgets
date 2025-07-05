"use client";
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import {
  VideoWallWrapper,
  VideoWallContainer,
  VideoCard,
  Video,
  Overlay,
  Content,
  Title,
  Quote,
  PlayButton,
  VolumeButton,
  VideoLoader,
  LoaderSpinner,
  LoaderText,
} from "./VideoWall.styled";
import { Icon } from "@iconify/react";

const VideoCardComponent = ({
  video,
  isPlaying,
  onTogglePlay,
  onMouseEnter,
  onMouseLeave,
}) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(e => {
          console.error("Play failed", e);
          setHasError(true);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleVideoLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMuted(!isMuted);
  };

  const handlePlayButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onTogglePlay();
  };

  return (
    <VideoCard onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Video 
        ref={videoRef} 
        controls={false} 
        preload="metadata" 
        muted={isMuted} 
        loop 
        playsInline
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
      >
        <source src={video.videoUrl} type="video/mp4" />
      </Video>
      
      {/* Loading overlay */}
      <VideoLoader className={!isLoading ? 'hidden' : ''}>
        <LoaderSpinner />
        <LoaderText>Loading video...</LoaderText>
      </VideoLoader>
      
      {/* Error overlay */}
      {hasError && (
        <VideoLoader>
          <Icon 
            icon="material-symbols:error-outline" 
            width="40" 
            height="40" 
            style={{ color: '#ff6b6b', marginBottom: '12px' }}
          />
          <LoaderText>Failed to load video</LoaderText>
        </VideoLoader>
      )}
      
      <Overlay />
      <Title>{video.title}</Title>
      <VolumeButton onClick={handleMuteToggle}>
        {isMuted ? (
          <Icon icon="material-symbols:volume-off-rounded" width="24" height="24" />
        ) : (
          <Icon icon="material-symbols:volume-up-rounded" width="24" height="24" />
        )}
      </VolumeButton>
      <Content>
        <Quote>{video.quote}</Quote>
      </Content>
      <PlayButton onClick={handlePlayButtonClick}>
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
    </VideoCard>
  );
};

// Transform reviews prop to video card data
const getVideoData = (reviews) => {
  if (!Array.isArray(reviews) || reviews.length === 0) return [];
  return reviews
    .filter(r => r.video_path)
    .map((r, idx) => ({
      id: idx + 1,
      videoUrl: r.video_path,
      title: r.author_name || "Untitled",
      quote: r.review_text || r.review_title || "",
    }));
};

const VideoWall = ({ reviews = [], widget_settings = {} }) => {
  const WIDGET_BG_COLOR = widget_settings.bg_color || "#141414";
  const txtColor = widget_settings.txt_color || undefined;
  const fontFamily = widget_settings.font_family || undefined;
  const [playingVideo, setPlayingVideo] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const isHovering = useRef(false);
  const isSwiping = useRef(false);
  const autoScrollRef = useRef(null);
  const startTranslateX = useRef(0);

  // Use reviews data instead of mockData
  const videoData = useMemo(() => getVideoData(reviews), [reviews]);

  // Show loading state if no videos are available
  if (videoData.length === 0) {
    return (
      <VideoWallWrapper 
        style={{ background: WIDGET_BG_COLOR, color: txtColor, fontFamily }}
      >
        <VideoLoader>
          <LoaderSpinner />
          <LoaderText>No videos available</LoaderText>
        </VideoLoader>
      </VideoWallWrapper>
    );
  }

  // Duplicate videos for infinite scroll
  const duplicatedVideos = useMemo(() => {
    // Create 3 sets of videos for smooth infinite scroll
    const videos = [...videoData, ...videoData, ...videoData];
    return videos.map((video, index) => ({
      ...video,
      uniqueId: `${video.id}-${index}`
    }));
  }, [videoData]);

  // Card dimensions
  const CARD_WIDTH = 330; // 300px + 30px margin
  const ORIGINAL_SET_WIDTH = videoData.length * CARD_WIDTH;

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  // Auto scroll function
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) return;
    
    autoScrollRef.current = setInterval(() => {
      if (!isHovering.current && !isSwiping.current) {
        setTranslateX(prev => {
          let newTranslateX = prev - 1; // Scroll speed
          
          // Reset to start of second set when reaching end of first set
          if (Math.abs(newTranslateX) >= ORIGINAL_SET_WIDTH) {
            newTranslateX = 0;
          }
          
          return newTranslateX;
        });
      }
    }, 16); // ~60fps
  }, [ORIGINAL_SET_WIDTH]);

  // Initialize auto scroll
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  // Handle mouse enter/leave
  const handleMouseEnter = () => {
    isHovering.current = true;
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
  };

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipeStart: () => {
      isSwiping.current = true;
      startTranslateX.current = translateX;
      
      // Remove transition during swipe
      if (containerRef.current) {
        containerRef.current.style.transition = 'none';
      }
    },
    onSwiping: (eventData) => {
      if (!isSwiping.current) return;
      
      const newTranslateX = startTranslateX.current + eventData.deltaX;
      setTranslateX(newTranslateX);
    },
    onSwipeEnd: (eventData) => {
      isSwiping.current = false;
      
      // Re-enable transition
      if (containerRef.current) {
        containerRef.current.style.transition = 'transform 0.3s ease-out';
      }
      
      // Snap to nearest position or handle momentum
      const velocity = eventData.velocity;
      let finalTranslateX = translateX;
      
      if (Math.abs(velocity) > 0.5) {
        // Add momentum based on swipe velocity
        const momentum = velocity * 50;
        finalTranslateX += momentum;
      }
      
      // Ensure we stay within bounds for infinite scroll
      if (finalTranslateX > CARD_WIDTH) {
        finalTranslateX = finalTranslateX - ORIGINAL_SET_WIDTH;
      } else if (finalTranslateX < -ORIGINAL_SET_WIDTH * 2) {
        finalTranslateX = finalTranslateX + ORIGINAL_SET_WIDTH;
      }
      
      setTranslateX(finalTranslateX);
      
      // Reset transition and resume auto-scroll after animation
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = 'none';
        }
        // Ensure auto-scroll resumes after swipe
        isSwiping.current = false;
        if (!autoScrollRef.current && !isHovering.current) {
          startAutoScroll();
        }
      }, 300);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    delta: 10
  });

  const handleTogglePlay = (videoId) => {
    setPlayingVideo(prev => (prev === videoId ? null : videoId));
  };

  // Apply transform to container
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [translateX]);

  return (
    <VideoWallWrapper 
      ref={wrapperRef} 
      {...swipeHandlers} 
      style={{ background: WIDGET_BG_COLOR, color: txtColor, fontFamily }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <VideoWallContainer ref={containerRef}>
        {duplicatedVideos.map((video) => (
          <VideoCardComponent
            key={video.uniqueId}
            video={video}
            isPlaying={playingVideo === video.id}
            onTogglePlay={() => handleTogglePlay(video.id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </VideoWallContainer>
    </VideoWallWrapper>
  );
};

export default VideoWall;