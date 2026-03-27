import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonAnimationContainer } from "../../style";

export const Container = styled(SkeletonAnimationContainer)`
  @media ${down("S")} {
    flex-direction: column;

    & > div {
    }
  }
`;
