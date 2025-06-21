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
} from "./VideoWall.styled";
import { Icon } from "@iconify/react";

const mockData = [
  {
    id: 1,
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    title: "Diamond Aesthetics",
    quote: "I see consistent profit month after month. No stress.",
  },
  {
    id: 2,
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    title: "North Central Massage & Aesthetics",
    quote: "Zoca helped me go from 2 leads a week to over 30.",
  },
  {
    id: 3,
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    title: "Red Chair Salon",
    quote: "My calendar's full, my phone's buzzing, without a single ad.",
  },
  {
    id: 4,
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    title: "Natura Spa",
    quote: "400 leads in two months. At least one new client every day.",
  },
  {
    id: 5,
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    title: "Diamond Aesthetics 2",
    quote: "I see consistent profit month after month. No stress.",
  },
  {
    id: 6,
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    title: "Red Chair Salon 2",
    quote: "My calendar's full, my phone's buzzing, without a single ad.",
  },
  {
    id: 7,
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    title: "Natura Spa 2",
    quote: "400 leads in two months. At least one new client every day.",
  },
  {
    id: 8,
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    title: "Diamond Aesthetics 3",
    quote: "I see consistent profit month after month. No stress.",
  },
];

const VideoCardComponent = ({
  video,
  isPlaying,
  onTogglePlay,
  onMouseEnter,
  onMouseLeave,
}) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(e => console.error("Play failed", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

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
      <Video ref={videoRef} controls={false} preload="metadata" muted={isMuted} loop playsInline>
        <source src={video.videoUrl} type="video/mp4" />
      </Video>
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

const VideoWall = () => {
  const WIDGET_BG_COLOR = "#141414";
  const [playingVideo, setPlayingVideo] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const isHovering = useRef(false);
  const isSwiping = useRef(false);
  const autoScrollRef = useRef(null);
  const startTranslateX = useRef(0);

  // Duplicate videos for infinite scroll
  const duplicatedVideos = useMemo(() => {
    // Create 3 sets of videos for smooth infinite scroll
    const videos = [...mockData, ...mockData, ...mockData];
    return videos.map((video, index) => ({
      ...video,
      uniqueId: `${video.id}-${index}`
    }));
  }, []);

  // Card dimensions
  const CARD_WIDTH = 330; // 300px + 30px margin
  const ORIGINAL_SET_WIDTH = mockData.length * CARD_WIDTH;

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
      bgColor={WIDGET_BG_COLOR}
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