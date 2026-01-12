import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  width: 7.5rem;
  height: auto;
  max-height: 7.5rem;

  &:hover {
    cursor: pointer;
  }

  & .wrapper__image {
    width: 7.5rem;
    height: auto;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    width: 4.5rem;
    height: auto;
    max-height: 4.5rem;

    & .wrapper__image {
      width: 4.5rem;
      height: auto;
    }
  }
`;
