import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonColumnWrapper } from "../../style";

export const Container = styled(SkeletonColumnWrapper)`
  @media ${down("S")} {
    & > div {
      height: 100%;
      aspect-ratio: 1 / 1;
    }
  }
`;
