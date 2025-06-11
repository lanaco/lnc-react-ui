import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.25rem;

  & .text-block-v1 {
    grid-column: 1 / 4;
    max-width: 27rem;
    margin: auto;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    grid-template-columns: repeat(2, 1fr);

    & .text-block-v1 {
      grid-column: 1 / 3;
      max-width: unset;
      margin: unset;
    }

    & .simple-product-card {
      max-width: unset;
      min-width: unset;
      width: unset;
    }

    & .img-wrapper {

    }
  }
`;