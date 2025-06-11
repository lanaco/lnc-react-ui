import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const ProductsBannerWrapper = styled.div`
  width: 100%;
  height: 22.5rem;
  min-height: 22.5rem;
  max-height: 22.5rem;
  overflow: hidden;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--gray-95008, #14161a14);
  border-radius: 0.75rem;
  margin-bottom: 0.5rem;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p.limit},  minmax(0, 1fr))`};
  gap: 1.25rem;

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    display: flex;
    gap: 1rem;
    overflow-x: auto;

    -webkit-overflow-scrolling: touch;
    ::-webkit-scrollbar {
      -webkit-appearance: none;
    }
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */
    scrollbar-width: none;
    /* Firefox */

    &::-webkit-scrollbar {
      display: none;
      /* Safari and Chrome */
    }
  }
`;
