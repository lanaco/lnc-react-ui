import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { down } from "../../../_utils/breakpoints";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  text-align: center;

  & .card__name {
    font-weight: 500;
    font-size: 1rem;
    leading-trim: none;
    line-height: 1.5rem;
    letter-spacing: 0;
    color: var(--neutral-600, #0f2a46);
    white-space: nowrap;

    &.below {
      display: none;
    }
  }

  @media ${down("S")} {
    & .card__name {
      &.below {
        display: block;
      }
    }
  }
`;

export const CardContainer = styled.a`
  text-decoration: none;
  color: var(--gray-950, #14161a);
  display: block;
  border-radius: 0.75rem;
  border: 1px solid var(--neutral-9508, rgba(20, 22, 26, 0.08));
  background: var(--gray-50, #f5f7fa);
  aspect-ratio: 2 / 1;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s ease;

  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    height: 0.375rem;
    width: 100%;
    z-index: 2;
    border-radius: 1rem 1rem 0 0;
    background: ${(p) => p?.borderColor || "var(--primary-500, #f59e0b)"};
    transition: left 0.38s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    &::before {
      left: 0;
    }

    & .card__image {
      transform: scale(1.1);
    }
  }

  & .card__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  & .card__name-badge {
    position: absolute;
    bottom: 0.75rem;
    left: 0.75rem;
    z-index: 2;
    background: var(--white, #fff);
    border-radius: 0.5rem;
    padding: 0.5rem;

    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06);
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  }

  @media ${down("S")} {
    aspect-ratio: 3 / 2;

    & .card__name-badge {
      display: none;
    }
  }
`;
