import React from 'react'
import { StyledHeroMainWrapper, WidgetGrid, WidgetCard, WidgetName, WidgetDescription, ViewDetailsButton } from './Hero.styled'
import { useNavigate } from 'react-router-dom';
import { FaThLarge, FaBolt, FaCommentDots, FaSlidersH, FaListUl, FaGripHorizontal } from 'react-icons/fa';

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