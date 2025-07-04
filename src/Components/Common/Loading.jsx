import React from 'react';
import { LoaderWrapper, LoaderSpinner, LoaderText } from './Loading.styled';

const Loading = ({ text = 'Loading...', minHeight = 160 }) => (
  <LoaderWrapper style={{ minHeight }}>
    <LoaderSpinner />
    <LoaderText>{text}</LoaderText>
  </LoaderWrapper>
);

export default Loading; 