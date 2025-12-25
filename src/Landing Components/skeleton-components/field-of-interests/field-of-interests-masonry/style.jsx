import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../../_utils/consts";
import { SkeletonRowWrapper } from "../../style";

export const Container = styled(SkeletonRowWrapper)`
  &.skeleton__tags {
    max-width: 50rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    &.skeleton__tags {
      overflow-x: hidden;
    }
  }
`;
