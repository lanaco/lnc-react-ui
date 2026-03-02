import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonRowWrapper } from "../../style";

export const Container = styled(SkeletonRowWrapper)`
  @media ${down("S")} {
    & > div {
      background: linear-gradient(
        to right,
        transparent 0%,
        #f4f6fb 10%,
        #f4f6fb 100%
      );

      box-shadow: none;
    }
  }
`;
