import styled from "@emotion/styled";
import { down } from "../../_utils/breakpoints";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--darkest-950);
  & .container-title {
    /* width: 100%; */
    text-align: center;
    font-weight: 600;
    font-size: 1.5rem;
  }
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p.limit},  minmax(0, 1fr))`};
  gap: 1.25rem;

  @media ${down("M")} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${down("S")} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${down("XS")} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
