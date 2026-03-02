import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

export const Wrapper = styled.a`
  text-decoration: none;
  color: var(--gray-950);
  width: 7.5rem;
  height: auto;
  max-height: 7.5rem;

  &:hover {
    cursor: pointer;
  }

  & .wrapper__image {
    width: 7.5rem;
    height: auto;
  }

  @media ${down("S")} {
    width: 4.5rem;
    height: auto;
    max-height: 4.5rem;

    & .wrapper__image {
      width: 4.5rem;
      height: auto;
    }
  }
`;
