import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  & .wrapper__heading {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;

    & .wrapper__title {
      color: var(--gray-950, #14161a);
      text-align: center;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2rem;
      letter-spacing: -0.47px;
    }

    & .wrapper__subtitle {
      color: var(---gray-600, #676e79);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;
      letter-spacing: 0.25px;
    }
  }

  & .wrapper__tags {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
  }

  & .wrapper__cards {
    display: grid;
    grid-template-columns: ${(p) =>
      `repeat(${p?.limitCards}, minmax(12.5rem, 1fr))`};
    grid-auto-rows: 0.625rem;
    gap: 0.625rem;
    width: 100%;
    position: relative;

    & .wrapper__card {
      overflow: hidden;
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .wrapper__tags {
      overflow-x: scroll;
      justify-content: flex-start;
      width: 100%;

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

    & .wrapper__cards {
      grid-template-columns: ${(p) =>
        `repeat(${p?.limitCardsForMobile}, minmax(0, 1fr))`};
    }
  }
`;
