import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  gap: 1.25rem;

  & .wrapper-title {
    font-weight: 600;
    font-size: 1rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    padding: 0;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-weight: 500;
  font-size: 0.875rem;

  & .group-items {
    padding: 0 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 400;

    & .count-txt {
      color: var(--gray-600, #676e79);
    }
  }

  & .region,
  .city {
    cursor: pointer;
    transition: var(--transition);

    &:hover {
      color: var(--primary-500, #f59e0b);
    }
  }
`;
