import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;

  & .text-item {
    max-height: ${(p) => p.height};
    min-height: ${(p) => p.height};
    max-width: 27rem;
    margin: auto;
  }

  & img {
    object-fit: cover;
    width: 100%;
    max-height: ${(p) => p.height};
    min-height: ${(p) => p.height};
  }

  & .img-1 {
    border-radius: 0.75rem 0.75rem 0.75rem 0;
  }

  & .img-2 {
    border-radius: 0.75rem 0rem 0.75rem 0.75rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;

    & .img-item {
      width: 100%;
      min-height: 11.25rem;
      max-height: 11.25rem;
    }

    & .img-1,
    .img-2 {
      border-radius: 0.75rem;
    }

    & .text-item {
      min-height: unset;
      max-height: unset;
    }
  }
`;
