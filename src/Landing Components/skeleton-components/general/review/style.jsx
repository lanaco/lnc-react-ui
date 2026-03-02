import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { skeletonGradientBackground, SkeletonRowWrapper } from "../../style";

export const Container = styled(SkeletonRowWrapper)`
  @media ${down("S")} {
    flex-direction: column;

    & > div {
      flex-direction: column;

      & > div {
        ${skeletonGradientBackground}
      }
    }
  }
`;
