import styled from "@emotion/styled";

import { linearGradientAnimation } from "../../../_utils/utils";

export const SkeletonContainer = styled.div`
  width: 100%;
  max-width: 76rem;
  height: 100vh;
  max-height: 22.5rem;
  border-radius: 0.75rem;
  background: ${linearGradientAnimation("-90deg")};

  & .skeleton__active-slide {
    display: none;
  }

  & .skeleton__next-slide {
    display: none;
  }

  @media (max-width: 464px) {
    max-width: 100%;
    height: 23.4375rem;
    max-height: 23.4375rem;
    border-radius: 0;
    background: transparent;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;

    & .skeleton__active-slide {
      display: block;
      width: 100%;
      height: 100vh;
      max-height: 23.4375rem;
      border-radius: 0.75rem;
      background: ${linearGradientAnimation("-90deg")};
    }

    & .skeleton__next-slide {
      display: block;
      width: 100%;
      max-width: 4rem;
      height: 100vh;
      max-height: 20.625rem;
      border-radius: 0.75rem 0 0 0.75rem;
      background: ${linearGradientAnimation("-90deg")};
    }
  }
`;
