import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

export const Wrapper = styled.div`
  display: flex;
  gap: 2rem;

  & .loan-calculator,
  .location-finder {
    flex: 1;
  }
  @media ${down("S")} {
    flex-direction: column;
    gap: 1.25rem;
  }
`;
