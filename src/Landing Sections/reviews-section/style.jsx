import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../_utils/consts";

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

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
