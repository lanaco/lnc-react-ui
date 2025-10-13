import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-content: center;

  & .tags__item {
    color: var(--neutral-600, #0f2a46);
    background: var(--neutral-50, #eef2f5);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;
    letter-spacing: 0.025rem;
    padding: 0.5rem;

    &:hover {
      background: var(--gray-200, #e4e9f0);
    }

    &:focus {
      outline: none;
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;

    -webkit-overflow-scrolling: touch;
    ::-webkit-scrollbar {
      -webkit-appearance: none;
    }
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */
    scrollbar-width: none;
    /* Firefox */

    &::-webkit-scrollbar {
      display: none;
      /* Safari and Chrome */
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
  max-width: 31.25rem;
  max-height: 18.75rem;
  border-radius: 1rem;

  & .section__thumbnail {
    width: 100%;
    height: 100%;
    max-width: 31.25rem;
    max-height: 18.75rem;
    border-radius: 1rem;
  }

  & .section__play {
    position: absolute;
  }
`;
