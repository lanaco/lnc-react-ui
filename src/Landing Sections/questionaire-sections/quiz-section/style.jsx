import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 2rem;

  & .wrapper__outlet {
    display: flex;
    padding: 2rem 3rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    align-self: stretch;
  }

  & .wrapper__image {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    max-width: 22.5rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .wrapper__outlet {
      padding: 0;
    }

    & .wrapper__image {
      display: none;
    }
  }
`;
