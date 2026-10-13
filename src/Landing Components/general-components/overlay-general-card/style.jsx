import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

// backgroundColor is typically a gradient overlay layered over the image
// (WebFrontend OverlayGeneralCard.astro parity).
const bgLayers = (backgroundColor, image) => {
  const overlay =
    backgroundColor && backgroundColor !== "none" ? backgroundColor : null;
  return (
    [overlay, image ? `url("${image}")` : null].filter(Boolean).join(", ") ||
    "none"
  );
};

export const Container = styled.a`
  text-decoration: none;
  color: var(--gray-950);
  display: flex;
  height: 28.75rem;
  padding: 2.25rem;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  min-width: 0;
  background: ${(p) => bgLayers(p?.backgroundColor, p?.backgroundImage)};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 0.75rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 24px rgba(20, 22, 26, 0.12);
  }

  & .section__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;

    & .section__title {
      color: var(--white, #fff);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
    }

    & .section__description {
      color: var(--white, #fff);
      font-size: 1.375rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.75rem;
    }
  }

  & .section__action {
    background: var(--white, #fff);
    color: var(--gray-950, #14161a);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;

    &:hover {
      color: var(--gray-700, #4e555f);
    }

    &:focus {
      outline: none;
    }
  }

  @media ${down("S")} {
    ${(p) =>
      p?.backgroundImageMobile
        ? `background: ${bgLayers(p?.backgroundColor, p.backgroundImageMobile)};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;`
        : ""}
    padding: 2rem;
    min-height: 17.5rem;
    height: auto;

    & .section__text {
      gap: 0.5rem;

      & .section__title {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }

      & .section__description {
        font-size: 1rem;
        line-height: 1.5rem;
      }
    }
  }
`;
