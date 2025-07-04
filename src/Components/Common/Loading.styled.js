import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 160px;
  background: transparent;
`;

export const LoaderSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #e3e3e3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1.2rem;
`;

export const LoaderText = styled.div`
  font-size: 1.1rem;
  color: #555;
  font-weight: 500;
  text-align: center;
`; 