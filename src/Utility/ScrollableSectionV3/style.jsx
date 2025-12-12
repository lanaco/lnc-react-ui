import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { MOBILE_SIZE_PX } from "../../_utils/consts";

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  align-self: stretch;
  position: relative;

  & .scrollable-section__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    & .scrollable-section__title {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      & .title__text {
        color: var(--gray-950, #14161a);
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 600;
        line-height: 2rem;
      }
    }
  }

  & .scrollable-section__navigation {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    position: absolute;
    top: 0;
    right: 0;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    gap: 1.25rem;

    & .scrollable-section__header {
      & .scrollable-section__title {
        & .title__text {
          font-size: 1.375rem;
          line-height: 1.75rem;
        }
      }
    }
  }
`;

export const Content = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(${(p) => p?.numOfColumns}, 1fr);
  gap: 1.5rem;
  width: 100%;

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    justify-content: flex-start;
    gap: 1rem;

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
