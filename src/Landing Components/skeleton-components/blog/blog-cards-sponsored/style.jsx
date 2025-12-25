import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../../_utils/consts";
import { SkeletonColumnWrapper } from "../../style";

export const Container = styled(SkeletonColumnWrapper)`
  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: column;

    & > div {
      flex-direction: column;
    }
  }
`;
