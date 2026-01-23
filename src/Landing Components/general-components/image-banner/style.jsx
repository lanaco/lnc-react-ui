import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  & .wrapper__image {
    width: ${(p) => (p?.imageWidth ? `${p?.imageWidth}px` : "100%")};
    height: ${(p) => (p?.imageHeight ? `${p?.imageHeight}px` : "100%")};
    object-fit: cover;
  }

  //&:hover {
  //  cursor: pointer;
  //}

  //@media (max-width: ${MOBILE_SIZE_PX + "px"}) {
  //  aspect-ratio: 1 / 1;
  //  & .wrapper__image {
  //    aspect-ratio: 1 / 1;
  //  }
  //}
`;
