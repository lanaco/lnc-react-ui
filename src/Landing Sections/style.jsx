import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../_utils/consts";
import { truncateText } from "../_utils/utils";

export const RegulatTitleSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & .button-link {
    white-space: nowrap;
  }

  & .regular-title {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
    font-weight: 600;
    & .regular-title-text {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    & i {
      font-size: 1.5rem;
      color: var(--primary-500, #f59e0b);
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    gap: 1.25rem;

    & .regular-title {
      font-size: 1.375rem;

      &.center {
        justify-content: center;
      }
    }
  }
`;

export const TitleWithOptionsSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  & .regular-title {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
    font-weight: 600;
    padding-bottom: 0.75rem;

    & .regular-title-text {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      ${truncateText()}

      & span {
        ${truncateText()}
      }
    }

    & .button-link {
      white-space: nowrap;
    }

    & i {
      font-size: 1.5rem;
      color: var(--primary-500, #f59e0b);
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .regular-title {
      font-size: 1.375rem;
      padding-bottom: 0.5rem;
    }
  }
`;

const getColor = (color) => {
  if (color?.toLowerCase() == "success") {
    return `color: var(--success-700, #047857); border: 1px solid var(--success-600, #059669); background-color: var(--sucess-60008, #05966914);`;
  }

  if (color?.toLowerCase() == "warning") {
    return `color: var(--warning-600, #d97706); border: 1px solid var(--warning-500, #f59e0b); background-color: var(--warning-50012, #f59e0b1f);`;
  }

  if (color?.toLowerCase() == "info") {
    return `color: var(--info-700, #6d28d9); border: 1px solid var(--info-600, #7c3aed); background-color: var(--info-60012, #7c3aed1f);`;
  }

  if (color?.toLowerCase() == "danger") {
    return `color: var(--danger-600, #e11d48); border: 1px solid var(--danger-500, #f43f5e); background-color: var(--danger-5008, #f43f5e14);`;
  }

  if (color?.toLowerCase() == "secondary") {
    return `color: var(--secondary-700, #2667a0); border: 1px solid var(--secondary-600, #3284cb); background-color: var(--secondary-60012, #3284cb1f);`;
  }

  return `color: var(--gray-950, #14161A); border: 1px solid var(--gray-200, #dddfe4); background-color: var(--white, #fff);`;
};

export const BlogTag = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0 0.5rem;
  align-items: center;
  min-height: 1.25rem;
  max-height: 1.25rem;
  border-radius: 0.25rem;
  display: flex;
  max-width: 12.5rem;
  ${(p) => getColor(p.color)}
  ${truncateText()}
`;

export const SectionHeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & .heading__title {
    color: var(--gray-950, #14161a);
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 2rem;
    letter-spacing: -0.0294rem;

    & i {
      font-size: 1.5rem;
      color: var(--primary-500, #f59e0b);
    }
  }

  & .heading__action {
    /* color: var(--gray-950, #14161a);
    background: var(--neutral-9504, rgba(20, 22, 26, 0.04)); */
    white-space: nowrap;

    /* &:hover {
      background: var(--neutral-9504, rgba(20, 22, 26, 0.12));
    } */

    &:focus {
      outline: none;
    }
  }
`;
