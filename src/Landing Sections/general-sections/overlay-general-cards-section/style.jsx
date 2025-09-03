import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p.limit}, auto)`};
  gap: 1.25rem;
  justify-items: center;

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
