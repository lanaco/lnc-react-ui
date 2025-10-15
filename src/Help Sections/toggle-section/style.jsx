import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../_utils/consts";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  & .section__heading {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    width: 100%;
  }

  & .section__title {
    color: var(--navy-900, #0c1520);
    text-align: center;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2rem;
  }

  & .section__description {
    color: var(--navy-500, #7a8594);
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    gap: 1.5rem;

    & .section__heading {
      gap: 0.5rem;
    }

    & .section__title {
      font-size: 1.375rem;
      font-weight: 600;
      line-height: 1.75rem;
      text-align: left;
    }

    & .section__description {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.25rem;
      letter-spacing: 0.25px;
      text-align: left;
    }
  }
`;
