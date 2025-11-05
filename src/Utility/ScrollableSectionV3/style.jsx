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

      & .title__icon {
      }

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
`;

export const Content = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(${(p) => p?.numOfColumns}, 1fr);
  gap: 1.5rem;
  width: 100%;

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    grid-template-columns: repeat(${(p) => p?.numOfColumnsForMobile}, 1fr);
  }
`;
