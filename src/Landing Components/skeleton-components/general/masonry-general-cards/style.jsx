import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../../_utils/consts";
import { SkeletonRowWrapper } from "../../style";

export const Container = styled(SkeletonRowWrapper)`
  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
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
