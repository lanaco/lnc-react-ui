import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  width: 100%;
  height: 0.125rem;
  background-color: var(--gray-95008, rgba(20, 22, 26, 0.08));

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    height: 0.5rem;
  }
`;
