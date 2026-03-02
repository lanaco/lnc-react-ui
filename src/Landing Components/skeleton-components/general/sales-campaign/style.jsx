import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonRowWrapper } from "../../style";

export const Container = styled(SkeletonRowWrapper)`
  @media ${down("S")} {
    flex-direction: column;

    & .skeleton__image {
      width: 100%;
      height: 100%;
    }

    & > div {
      &:last-of-type {
        display: none;
      }
    }
  }
`;
