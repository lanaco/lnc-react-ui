import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

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
