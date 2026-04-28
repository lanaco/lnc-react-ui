import styled from "@emotion/styled";

import { down } from "../../../_utils/breakpoints";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;

  & .wrapper__title {
    color: var(--gray-900, #0c1520);
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2rem;
    letter-spacing: -0.47px;
  }

  & .wrapper__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    width: 100%;
  }

  @media ${down("S")} {
    gap: 1rem;

    & .wrapper__title {
      font-size: 1.375rem;
    }

    & .wrapper__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem;
    }
  }

  @media ${down("XS")} {
    & .wrapper__title {
      font-size: 1.375rem;
      font-style: semibold;
    }

    & .wrapper__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;
