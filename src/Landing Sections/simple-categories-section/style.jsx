import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../_utils/consts";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(p) => `repeat(6,  minmax(0, 1fr))`};
  gap: 2rem;

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
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
