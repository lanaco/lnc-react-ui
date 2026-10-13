import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

// Numeric values (e.g. 300 / "300") are treated as px, as before. Any other
// string (e.g. the legacy default "12.65625rem") used to produce an invalid
// "...rempx" length that the browser dropped, so it is ignored here too and
// the section stays content-driven - same as the web version.
const toPx = (value) => {
  if (value == null || value === "") return null;
  if (typeof value === "number") return `${value}px`;
  if (/^\d+(\.\d+)?$/.test(`${value}`.trim())) return `${`${value}`.trim()}px`;
  return null;
};

export const Container = styled.div`
  display: flex;
  border-radius: 0.75rem;
  background-color: ${(p) => p.bgcolor || "transparent"};
  overflow: hidden;
  ${(p) =>
    toPx(p.height)
      ? `max-height: ${toPx(p.height)}; min-height: ${toPx(p.height)};`
      : ""}
  position: relative;

  & button {
    width: fit-content;
  }

  & .banner-picture,
  & .header-picture {
    display: contents;
  }

  & img:not(.header-image) {
    object-fit: cover;
    flex-shrink: 0;
    max-width: ${(p) => toPx(p.imgW) || "25rem"};
    min-width: ${(p) => toPx(p.imgW) || "25rem"};
    max-height: ${(p) => toPx(p.height) || "25rem"};
    min-height: ${(p) => toPx(p.height) || "25rem"};
  }

  & .header-image {
    max-width: 9.25rem;
    max-height: 9.25rem;
    position: absolute;
    left: 1rem;
    top: 0;
    z-index: 1;
  }

  ${(p) =>
    p.hasBorder === true &&
    `border: 1px solid var(--gray-95008, rgba(20, 22, 26, 0.08));
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06);
`}

  @media ${down("S")} {
    padding-top: 1rem;
    padding-bottom: 1rem;
    gap: 1.5rem;
    flex-direction: column;
    min-height: unset;
    max-height: unset;
    border: none;
    border-radius: 0;

    &.hide-image-mobile .banner-picture {
      display: none;
    }

    & img:not(.header-image) {
      max-width: 100%;
      min-width: 100%;
      max-height: ${(p) => toPx(p.imgHMob) || "12.1rem"};
      min-height: ${(p) => toPx(p.imgHMob) || "12.1rem"};
    }

    & .header-image {
      max-width: 8rem;
      max-height: 8rem;
      min-width: 8rem;
      left: 0;
    }
  }
`;

export const Wrapper = styled.div`
  padding: ${(p) => (p.smallPadding === true ? "2rem" : "4rem 5rem")};
  display: flex;
  gap: 2rem;
  flex-direction: ${(p) => (p.isHorizontalContent === true ? "row" : "column")};
  flex: 1;
  z-index: 2;
  min-width: 0;

  ${(p) =>
    p.isHorizontalContent === true &&
    `justify-content: space-between; align-items: center;`}

  & .header-button {
    width: fit-content;
    min-height: 2.5rem;
    padding: 0 1.25rem;
    border-radius: 0.5rem;
    background: var(--gray-950, #14161a);
    color: var(--white, #fff);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.09px;
    white-space: pre;

    &:hover {
      background: var(--gray-700, #424b56);
    }
  }

  @media ${down("S")} {
    padding: 0;
    flex-direction: column;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  & .header-title {
    color: var(--gray-950, #14161a);
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.25rem;
    letter-spacing: -0.0369rem;
  }

  & .header-subtitle {
    color: var(--gray-950, #14161a);
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem;
    letter-spacing: -0.0112rem;
  }
`;
