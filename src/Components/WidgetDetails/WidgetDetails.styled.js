import styled from 'styled-components';

export const WidgetDetailsWrapper = styled.div`
  max-width: 700px;
  margin: 40px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media (max-width: 600px) {
    padding: 18px 6vw;
    margin: 16px 0;
  }
`;

export const WidgetHeader = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #ff6f91;
  margin-bottom: 8px;
`;

export const WidgetPreviewSection = styled.div`
  margin: 24px 0 32px 0;
`;

export const WidgetCodeSection = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 18px 16px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(255,111,145,0.06);
`;

export const WidgetInstallSection = styled.div`
  margin-top: 12px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #6c6c80;
  font-size: 1rem;
  margin-bottom: 12px;
  cursor: pointer;
  align-self: flex-start;
  &:hover {
    color: #ff6f91;
    text-decoration: underline;
  }
`;

export const CopyButton = styled.button`
  background: linear-gradient(90deg, #ff6f91 0%, #ffb86c 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
  transition: background 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 8px rgba(255,111,145,0.10);
  &:hover {
    background: linear-gradient(90deg, #ffb86c 0%, #ff6f91 100%);
    box-shadow: 0 4px 16px rgba(255,111,145,0.18);
  }
`;

export const CodeBlock = styled.pre`
  background: #23272f;
  color: #fff;
  border-radius: 8px;
  padding: 14px 12px;
  font-size: 0.98rem;
  overflow-x: auto;
  margin: 0;
`; 