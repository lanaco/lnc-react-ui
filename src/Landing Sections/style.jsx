import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../_utils/consts";

export const RegulatTitleSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

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
      color: var(--primary-500, #F59E0B);
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
    }

    & i {
      font-size: 1.5rem;
      color: var(--primary-500, #F59E0B);
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .regular-title {
      font-size: 1.375rem;
    }
  }
`;

const getColor = (color) => {
  if (color?.toLowerCase() == "success") {
    return `color: var(--success-700); border: 1px solid var(--success-600); background-color: var(--sucess-60008);`;
  }

  if (color?.toLowerCase() == "warning") {
    return `color: var(--warning-600); border: 1px solid var(--warning-500); background-color: var(--warning-50012);`;
  }

  if (color?.toLowerCase() == "info") {
    return `color: var(--info-700); border: 1px solid var(--info-600); background-color: var(--sucess-60012);`;
  }

  if (color?.toLowerCase() == "danger") {
    return `color: var(--danger-600); border: 1px solid var(--danger-500); background-color: var(--danger-5008);`;
  }

  if (color?.toLowerCase() == "gray") {
    return `color: var(--info-700); border: 1px solid var(--info-600); background-color: var(--sucess-60012);`;
  }

  return `color: var(--gray-950, #14161A); border: 1px solid var(--gray-200); background-color: var(--white);`;
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
  ${(p) => getColor(p.color)}
`;
