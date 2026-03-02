import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p.limit},  minmax(0, 1fr))`};
  gap: 1.25rem;

  & .button-link {
    white-space: nowrap;
  }

  & .section__options {
    & button {
      &:focus {
        outline: none;
        outline-offset: 0;
      }
    }
  }

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
