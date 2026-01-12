import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../../_utils/consts";
import { SkeletonRowWrapper } from "../../style";

export const Container = styled(SkeletonRowWrapper)`
  &.skeleton__tags {
    max-width: 50rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    &.skeleton__tags {
      overflow-x: hidden;

      & > div {
        width: 3rem;
        height: 3rem;
      }
    }

    &.skeleton__cards {
      display: grid;
      grid-template-columns: 1fr 1fr;

      & > div {
        height: 7rem;
      }
    }
  }
`;
