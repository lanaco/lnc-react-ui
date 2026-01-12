import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../../_utils/consts";
import { SkeletonRowWrapper } from "../../style";

export const Container = styled(SkeletonRowWrapper)`
  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
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
`;
