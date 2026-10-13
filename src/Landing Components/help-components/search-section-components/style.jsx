import styled from "@emotion/styled";

import { down } from "../../../_utils/breakpoints";

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  align-content: center;

  & .tags__item {
    color: var(--neutral-600, #0f2a46);
    background: var(--neutral-50, #eef2f5);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;
    letter-spacing: 0.025rem;
    border-radius: 999px;
    padding: 0.5rem 0.75rem;

    &:hover {
      background: var(--gray-200, #e4e9f0);
    }

    &:focus {
      outline: none;
    }
  }

  @media ${down("S")} {
    width: 100%;
    justify-content: center;

    & .tags__item {
      padding: 0.5rem 0.75rem;
    }
  }
`;

export const PlayButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: min(31.25rem, 100%);
  max-height: 18.75rem;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;

  & .section__thumbnail {
    display: block;
    width: 100%;
    height: 100%;
    max-width: min(31.25rem, 100%);
    max-height: 18.75rem;
    border-radius: 1rem;
    object-fit: cover;
  }

  & .section__play {
    position: absolute;
  }
`;

export const VideoContainer = styled.div`
  width: 31.25rem;
  max-width: 100%;
  height: 18.75rem;
  border-radius: 1rem;
  overflow: hidden;

  & video {
    border-radius: 1rem;
    object-fit: cover;
  }

  @media ${down("S")} {
    width: 100%;
    height: auto;
    aspect-ratio: 5 / 3;
    max-height: 18.75rem;
  }
`;
