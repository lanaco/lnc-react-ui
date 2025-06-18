import styled from "@emotion/styled";

import {
  linearGradientAnimation,
  truncateTextInRows,
} from "../../../_utils/utils";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;

  &:hover {
    cursor: pointer;
  }

  & .wrapper__card {
    width: 100%;
    height: auto;
    border-radius: 0.75rem;
    position: relative;
    overflow: hidden;

    & .wrapper__image {
      width: 100%;
      object-fit: cover;
      height: auto;
      border-radius: 0.75rem;
      border: 1px solid var(--yellow-600, #d97706);

      /* drop-shadow-sm */
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    }

    & .wrapper__tag {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: -40%;
      top: 10%;
      filter: drop-shadow(1px 1px 0px #d97706);
      background: var(--yellow-500, #f59e0b);
      color: var(--white, #fff);
      width: 100%;
      height: 2rem;
      font-weight: 600;
      font-size: 0.875rem;

      -moz-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
  }

  & .wrapper__text {
    color: var(--gray-950, #14161a);
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem;
    width: 100%;
    ${truncateTextInRows(2)}
  }
`;

export const SkeletonWrapper = styled.div`
  width: 100%;
  height: 11.5rem;
  border-radius: 0.75rem;
  background: ${linearGradientAnimation("-90deg")};
`;
