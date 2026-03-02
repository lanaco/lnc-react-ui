import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonColumnWrapper } from "../../style";

export const Container = styled(SkeletonColumnWrapper)`
  @media ${down("S")} {
    & .skeleton__cards {
      overflow-x: hidden;
    }
  }
`;
