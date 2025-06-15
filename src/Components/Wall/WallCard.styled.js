import styled from "styled-components";

export const StyledWallCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.08);
  margin-bottom: 1rem;
  break-inside: avoid;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #d8d8d8;
`;

export const StyledVideoWrapper = styled.div`
  background: #a22727;
  border-radius: ${({ isOnlyVideo }) =>
    isOnlyVideo ? "12px" : "12px 12px 0 0"};
  width: 100%;
  min-height: 200px;
  margin-bottom: ${({ isOnlyVideo }) => (isOnlyVideo ? "0" : "1rem")};
  position: relative;
  overflow: hidden;
`;

export const StyledVideo = styled.video`
  border-radius: 12px 12px 0 0;
  display: block;
  width: 100%;
  height: 100%;
`;

export const PlayButton = styled.div`
  /* position: absolute; */
  /* bottom: 10px;
  right: 10px; */
  cursor: pointer;
`;

export const StyledDetailsOnVideoWrapper = styled.div`
  width: 100%;
  min-height: 30%;
  background: linear-gradient(to top, rgb(0, 0, 0), transparent);
  position: absolute;
  bottom: 0;
  padding: 1rem 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const StyledDetailsOnVideo = styled.div``;

export const StyledName = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.5;
  color: #ffffff;
  /* margin: 0.8rem 0; */
  word-wrap: break-word;
  hyphens: auto;
`;

export const StyledDesignation = styled.h4`
  font-size: 1rem;
  font-weight: 400;
  /* line-height: 1.5; */
  color: #dadada;
  /* margin: 0.8rem 0; */
  word-wrap: break-word;
  hyphens: auto;
`;

export const StyledCardBodyWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 0 1rem 1rem 1rem;
  /* background-color: #2a0404; */
  border-radius: 12px;

  & > h3 {
    font-size: 1.1rem;
    font-weight: 500;
    color: #111;
    margin-bottom: 0.5rem;
    line-height: 1.5;
    word-wrap: break-word;
  hyphens: auto;
  }

  & > p {
    font-size: 1rem;
    font-weight: 400;
    color: #434343;
     line-height: 1.3;
    word-wrap: break-word;
  hyphens: auto;
  }
`;

export const StyledBodyHeadersWrapper = styled.div`
  padding: 1rem;
`;

export const StyledBodyHeader = styled.div`
  /* padding: 1rem; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const StyledReviewLinkWrapper = styled.a`
  text-decoration: none;
`;
export const StyledBodyAuthorDetailsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  & > img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  & > div {
    & > h3 {
      font-size: 1rem;
      font-weight: 500;
      color: #111;
      text-transform: capitalize;
    }

    & > h6 {
      font-size: 0.75rem;
      font-weight: 400;
      color: #888;
    }
  }
`;


export const StyledReviewDate = styled.h5`
  font-size: 0.75rem;
  color: #888;
  margin-top: 0.25rem;
  font-weight: 500;
  padding: 0.5rem 1rem 1rem 1rem;
`;