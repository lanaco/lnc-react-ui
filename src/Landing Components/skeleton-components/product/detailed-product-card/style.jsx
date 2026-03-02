import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonRowWrapper } from "../../style";

export const Container = styled(SkeletonRowWrapper)`
  @media ${down("S")} {
    & > div {
      &:nth-of-type(even) {
        display: none;
      }
    }
  }
`;
