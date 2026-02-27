import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

export const Wrapper = styled.div`
  width: 100%;
  height: 0.125rem;
  background-color: var(--gray-95008, rgba(20, 22, 26, 0.08));

  @media ${down("S")} {
    height: 0.5rem;
  }
`;
