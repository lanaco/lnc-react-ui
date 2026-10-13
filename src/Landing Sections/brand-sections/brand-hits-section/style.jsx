import styled from "@emotion/styled";

import { down, up } from "../../../_utils/breakpoints";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;

  & img {
    border-radius: 0.75rem;
  }

  & .wrapper__heading {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    width: 100%;

    & .wrapper__title {
      color: var(--navy-900, #0c1520);
      text-align: center;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2rem;
      letter-spacing: -0.47px;
    }

    & .wrapper__subtitle {
      color: var(--navy-500, #7a8594);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
      letter-spacing: 0.25px;
    }
  }

  /* Wraps (like the web) instead of overflowing one long row. */
  & .wrapper__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem 3rem;
    align-self: stretch;
  }

  & .wrapper__more {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    min-height: 2.25rem;
    padding: 0 1rem;
    border: none;
    border-radius: 999px;
    background: var(--gray-100, #f3f6fb);
    color: var(--gray-950, #14161a);
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: var(--gray-200, #e4e9f0);
    }

    &:focus {
      outline: none;
    }

    & i {
      font-size: 1.25rem;
      transition: transform 0.2s ease;
      transform: ${(p) => (p.expanded ? "rotate(180deg)" : "none")};
    }
  }

  @media ${up("M")} {
    ${(p) =>
      p.desktopLimit && !p.expanded
        ? `& .wrapper__content > *:nth-child(n + ${p.desktopLimit + 1}) {
            display: none;
          }`
        : ""}

    & .wrapper__more--mobile-only {
      display: none;
    }
  }

  @media ${down("M")} {
    & .wrapper__content {
      gap: 2rem;
    }
  }

  @media ${down("S")} {
    gap: 1.25rem;

    & .wrapper__heading {
      & .wrapper__title {
        font-size: 1.375rem;
        line-height: 1.75rem;
      }

      & .wrapper__subtitle {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }

    & .wrapper__content {
      align-content: center;
      gap: 1rem;
    }

    ${(p) =>
      p.mobileLimit && !p.expanded
        ? `& .wrapper__content > *:nth-child(n + ${p.mobileLimit + 1}) {
            display: none;
          }`
        : ""}

    & .wrapper__more--desktop-only {
      display: none;
    }
  }
`;
