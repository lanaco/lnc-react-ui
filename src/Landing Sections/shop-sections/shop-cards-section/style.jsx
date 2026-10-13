import styled from "@emotion/styled";

import { down } from "../../../_utils/breakpoints";

const GAP = "1.25rem";

const cardBasis = (count, gap = GAP) =>
  `calc((100% - ${count - 1} * ${gap}) / ${count})`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  width: 100%;

  & .wrapper__heading {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    & .wrapper__subtitle {
      color: var(--gray-600, #676e79);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;
      letter-spacing: 0.25px;
    }

    & .wrapper__description {
      color: var(--gray-800, #131f2f);
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.5rem;
    }
  }

  & .wrapper__cards {
    display: grid;
    grid-template-columns: ${(p) =>
      `repeat(${p?.limitCards || 4}, minmax(0, 1fr))`};
    gap: ${GAP};
    justify-items: center;
    align-items: center;
    width: 100%;
  }

  /* scrollHorizontal: one non-wrapping row, \`limit\` cards visible. */
  & .wrapper__viewport {
    width: 100%;
  }

  & .wrapper__cards--scroll {
    display: flex;
    flex-wrap: nowrap;
    justify-items: initial;
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    & > * {
      flex: 0 0 ${(p) => cardBasis(p?.limitCards || 4)};
      min-width: 0;
    }
  }

  @media ${down("M")} {
    & .wrapper__cards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    & .wrapper__cards--scroll > * {
      flex-basis: ${cardBasis(2)};
    }
  }

  & .wrapper__view-all {
    align-self: center;
    color: var(--neutral-600, #0f2a46);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.0056rem;

    &:focus {
      outline: none;
    }

    display: none;
  }

  @media ${down("S")} {
    gap: 1.25rem;

    & .wrapper__view-all {
      display: unset;
    }

    & .wrapper__heading {
      & .title__action {
        &.grid {
          display: none;
        }
      }
    }

    & .wrapper__cards {
      gap: 1rem;

      ${(p) =>
        p?.gridView
          ? `
            grid-template-columns: repeat(2, minmax(0, 1fr));
            & > div {
              min-width:100%;
             max-width:100%;
            }`
          : `
            display: flex;
            align-items: stretch;
            overflow-x: auto;

            -webkit-overflow-scrolling: touch;
            -ms-overflow-style: none;
            scrollbar-width: none;

            &::-webkit-scrollbar {
              display: none;
            }

            & > * {
              flex: 0 0 auto;
            }`}
    }
  }
`;
