import styled from "@emotion/styled";
import { down } from "../../_utils/breakpoints";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${() => `repeat(6,  minmax(0, 1fr))`};
  gap: 2rem;

  @media ${down("M")} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media ${down("S")} {
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
