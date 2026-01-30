import styled from "@emotion/styled";

export const ExternalWrapper = styled.a`
  text-decoration: none;
  color: var(--gray-950);
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
  border: 1px solid var(--warning-500, #f59e0b);
  overflow: hidden;

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
