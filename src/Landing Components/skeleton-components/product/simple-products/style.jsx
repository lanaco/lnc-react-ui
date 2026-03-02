import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonColumnWrapper } from "../../style";

export const Container = styled(SkeletonColumnWrapper)`
  @media ${down("S")} {
    & .skeleton__cards {
      & > div {
        width: 100%;
        height: 100%;

        &:nth-of-type(even) {
          display: none;
        }
      }
    }
  }
`;
