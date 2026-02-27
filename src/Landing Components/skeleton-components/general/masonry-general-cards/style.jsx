import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonRowWrapper } from "../../style";

export const Container = styled(SkeletonRowWrapper)`
  @media ${down("S")} {
    flex-direction: column;

    & .skeleton__big {
      width: 100%;
      height: 100%;
      aspect-ratio: 1 / 1;
    }

    & > div {
      flex-direction: column;
    }
  }
`;
