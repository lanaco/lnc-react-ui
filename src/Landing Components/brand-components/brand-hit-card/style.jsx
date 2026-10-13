import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

// Square, rounded logo tile - 7.5rem desktop / 4.5rem mobile (same as web).
export const Wrapper = styled.a`
  display: block;
  flex-shrink: 0;
  text-decoration: none;
  color: var(--gray-950);
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: transform 0.15s ease;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-500, #0056b3);
    outline-offset: 2px;
  }

  & .wrapper__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 0.75rem;
  }

  @media ${down("S")} {
    width: 4.5rem;
    height: 4.5rem;
  }
`;
