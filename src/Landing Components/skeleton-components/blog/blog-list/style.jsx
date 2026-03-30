import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonAnimationColumnContainer } from "../../style";

export const Container = styled(SkeletonAnimationColumnContainer)`
  @media ${down("S")} {
    & > div {
      flex-direction: column;
    }
  }
`;
