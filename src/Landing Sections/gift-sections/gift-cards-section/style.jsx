import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p.limit},  minmax(0, 1fr))`};
  gap: 1.25rem;

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
