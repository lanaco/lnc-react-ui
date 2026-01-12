import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../../_utils/consts";
import { SkeletonColumnWrapper } from "../../style";

export const Container = styled(SkeletonColumnWrapper)`
  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .skeleton__tags {
      & > div {
        width: 100%;
      }
    }

    & .skeleton__cards {
      flex-direction: column;

      & > div {
        background: linear-gradient(
          to right,
          transparent 0%,
          #f4f6fb 40%,
          #f4f6fb 100%
        );

        box-shadow: none;
      }
    }
  }
`;
