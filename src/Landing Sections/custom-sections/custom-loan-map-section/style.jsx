import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  display: flex;
  gap: 2rem;

  & .loan-calculator,
  .location-finder {
    flex: 1;
  }
  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: column;
    gap: 1.25rem;
  }
`;
