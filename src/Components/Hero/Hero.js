import React from 'react'
import { StyledHeroMainWrapper, WidgetGrid, WidgetCard, WidgetName, WidgetDescription, ViewDetailsButton } from './Hero.styled'
import { useNavigate } from 'react-router-dom';
import { FaThLarge, FaBolt, FaCommentDots, FaSlidersH, FaListUl, FaGripHorizontal, FaStar, FaVideo, FaImages } from 'react-icons/fa';

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
];

const Hero = () => {
  const navigate = useNavigate();
  return (
    <StyledHeroMainWrapper>
      <h1>Testimonials made easy.</h1>
      <WidgetGrid>
        {widgets.map(widget => (
          <WidgetCard key={widget.name} onClick={() => navigate(`/widget-details/${widget.route}`)}>
            {/* <WidgetPreview>{widget.icon}</WidgetPreview> */}
            <WidgetName>{widget.name}</WidgetName>
            <WidgetDescription>{widget.description}</WidgetDescription>
            <ViewDetailsButton>View Details</ViewDetailsButton>
          </WidgetCard>
        ))}
      </WidgetGrid>
    </StyledHeroMainWrapper>
  )
}

export default Hero