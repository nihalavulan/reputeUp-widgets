"use client";
import React, { useState, useEffect } from 'react'
import { StyledHeroMainWrapper, WidgetGrid, WidgetCard, WidgetName, WidgetDescription, ViewDetailsButton } from './Hero.styled'
import { useRouter } from 'next/navigation';
import { FaThLarge, FaBolt, FaCommentDots, FaSlidersH, FaListUl, FaGripHorizontal, FaStar, FaVideo, FaImages, FaClone, FaWaveSquare, FaSpinner } from 'react-icons/fa';

const widgets = [
  {
    name: 'Wall',
    description: 'A testimonial wall for your site.',
    icon: <FaThLarge size={40} />,
    route: 'wall',
  },
  {
    name: 'Flash',
    description: 'Flash testimonials popup.',
    icon: <FaBolt size={40} />,
    route: 'flash',
  },
  {
    name: 'Float',
    description: 'Floating testimonial widget.',
    icon: <FaCommentDots size={40} />,
    route: 'float',
  },
  {
    name: 'InlineSlider',
    description: 'Inline slider for testimonials.',
    icon: <FaSlidersH size={40} />,
    route: 'inlineslider',
  },
  {
    name: 'List',
    description: 'List view for testimonials.',
    icon: <FaListUl size={40} />,
    route: 'list',
  },
  {
    name: 'Grid',
    description: 'Grid layout for testimonials.',
    icon: <FaGripHorizontal size={40} />,
    route: 'grid',
  },
  {
    name: 'ReviewBlock',
    description: 'A block to show average review rating.',
    icon: <FaStar size={40} />,
    route: 'reviewblock',
  },
  {
    name: 'VideoWall',
    description: 'A wall of videos that auto-scrolls.',
    icon: <FaVideo size={40} />,
    route: 'videowall',
  },
  {
    name: 'Photoset',
    description: 'A review slider with a photo gallery.',
    icon: <FaImages size={40} />,
    route: 'photoset',
  },
  {
    name: 'ProofPanel',
    description: 'A modern review panel with source tabs and overall rating.',
    icon: <FaStar size={40} />,
    route: 'proofpanel',
  },
  {
    name: 'CardDeck',
    description: 'A deck of testimonial cards with interactive swapping.',
    icon: <FaClone size={40} />,
    route: 'carddeck',
  },
  {
    name: 'AnimatedWall',
    description: 'A visually animated testimonial wall.',
    icon: <FaWaveSquare size={40} />,
    route: 'animatedwall',
  },
];

const Hero = ({ widget_settings = {} }) => {
  const router = useRouter();
  const [loadingWidget, setLoadingWidget] = useState(null);

  // Prefetch all widget routes when component mounts
  useEffect(() => {
    widgets.forEach(widget => {
      router.prefetch(`/widget-details/${widget.route}`);
    });
  }, [router]);

  const handleWidgetClick = (widget) => {
    setLoadingWidget(widget.route);
    router.push(`/widget-details/${widget.route}`);
  };

  const mainBg = widget_settings.bg_color || undefined;
  const txtColor = widget_settings.txt_color || undefined;
  const fontFamily = widget_settings.font_family || undefined;

  return (
    <StyledHeroMainWrapper style={{ background: mainBg, color: txtColor, fontFamily }}>
      <h1>Testimonials made easy.</h1>
      <WidgetGrid>
        {widgets.map(widget => (
          <WidgetCard 
            key={widget.name} 
            onClick={() => handleWidgetClick(widget)}
            onMouseEnter={() => {
              // Additional prefetch on hover for extra speed
              router.prefetch(`/widget-details/${widget.route}`);
            }}
            style={{ 
              opacity: loadingWidget && loadingWidget !== widget.route ? 0.6 : 1,
              cursor: loadingWidget ? 'wait' : 'pointer',
              background: mainBg, color: txtColor, fontFamily
            }}
          >
            <WidgetName>{widget.name}</WidgetName>
            <WidgetDescription>{widget.description}</WidgetDescription>
            <ViewDetailsButton disabled={loadingWidget}>
              {loadingWidget === widget.route ? (
                <>
                  <FaSpinner className="spinner" style={{ marginRight: '8px' }} />
                  Loading...
                </>
              ) : (
                'View Details'
              )}
            </ViewDetailsButton>
          </WidgetCard>
        ))}
      </WidgetGrid>
      
      <style jsx>{`
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </StyledHeroMainWrapper>
  )
}

export default Hero