import styled from "@emotion/styled";
import { linearGradientAnimation } from "../../../_utils/utils";

export const ExternalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);

  & .text-wrap {
    text-align: center;
  }
  & img {
    transition: var(--transition, all 0.3s ease);
    overflow: hidden;
  }
  &:hover {
    & img {
      transform: scale(1.1);
    }
  }
`;

export const CardWrapper = styled.div`
  width: 100%;
  min-height: 11rem;
  max-height: 11rem;
  position: relative;
  border-radius: 0.75rem;
  border: 1px solid var(--warning-500);
  overflow: hidden;

  & .skeleton__card {
    height: 100%;
    width: 100%;
    ${linearGradientAnimation("-90deg")}

    background: linear-gradient(
      178deg,
      rgba(0, 0, 0, 0) 1.5%,
      rgba(0, 0, 0, 0.16) 8.95%,
      #000 98.39%
    );
  }
  & img {
    min-height: 11rem;
    max-height: 11rem;
    width: 100%;
    object-fit: cover;
  }

  & .price-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(1px 1px 0px #b45309);
    background-color: var(--warning-500, #f59e0b);
    color: var(--white, #fff);
    width: 75.35525%;
    height: 2.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    position: absolute;
    left: -4.5rem;
    top: 1rem;
    z-index: 2;

    -moz-transform: rotate(315deg);
    -o-transform: rotate(315deg);
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
  }
`;

export const SkeletonWrapper = styled.div`
  width: 100%;
  height: 11.5rem;
  border-radius: 0.75rem;
  background: ${linearGradientAnimation("-90deg")};
`;
