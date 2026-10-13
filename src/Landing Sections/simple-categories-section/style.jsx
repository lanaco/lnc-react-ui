import styled from "@emotion/styled";
import { down } from "../../_utils/breakpoints";
import { RegulatTitleSectionWrapper } from "../style";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${() => `repeat(6,  minmax(0, 1fr))`};
  gap: 2rem;

  /* showMoreAtEnd: the button link as one more slot at the end */
  & .end-cta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
    text-decoration: none;
    color: var(--gray-950, #14161a);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }

  & .end-cta__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 999px;
    background: var(--gray-100, #f3f6fb);
    color: var(--gray-950, #14161a);
    font-size: 1.5rem;
  }

  @media ${down("M")} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media ${down("S")} {
    & .end-cta {
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 1rem;
      width: 8.75rem;
    }

    display: flex;
    gap: 1rem;
    overflow-x: auto;

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

// Header extras (WebFrontend SimpleCategoriesSection.astro parity):
// icon tint (inline style), red "badge" chip next to the title.
export const SectionWrapper = styled(RegulatTitleSectionWrapper)`
  & .regular-title .regular-title-text {
    min-width: 0;
  }

  & .regular-title .regular-title-text > i {
    line-height: 1;
  }

  & .section__title {
    color: var(--gray-950, #14161a);
  }

  & .regular-title .title-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem;
    border-radius: 0.375rem;
    background: var(--danger-600, #e53a35);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    letter-spacing: 0.03125rem;
    white-space: nowrap;

    & i {
      font-size: 1rem;
      color: #fff;
    }
  }
`;
