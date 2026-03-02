/* eslint-disable react/prop-types */
import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonRowWrapper } from "../../style";

export const Container = styled(SkeletonRowWrapper)`
  &.skeleton__tags {
    max-width: 50rem;
  }

  @media ${down("S")} {
    &.skeleton__tags {
      overflow-x: hidden;
    }
  }
`;
