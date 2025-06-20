import styled from "@emotion/styled";
import { isDefined } from "../../_utils/utils";
import { MOBILE_SIZE_PX } from "../../_utils/consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;

  & .hover-left-arrow {
    display: none;
    position: absolute;
    top: 50%;
    left: 1.5rem;
    z-index: ${p => isDefined(p.arrowsZIndex) ? p.arrowsZIndex : 20};
  }

  & .hover-right-arrow {
    display: none;
    position: absolute;
    top: 50%;
    right: 1.5rem;
    z-index: ${p => isDefined(p.arrowsZIndex) ? p.arrowsZIndex : 20};
  }

  & .clip-loader-wrapper {
    margin: auto;
    padding: 0 1rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    gap: 1.25rem;
    & .hover-left-arrow,
    .hover-right-arrow {
      display: flex;
    }
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
  gap: 1rem;

  font-weight: 600;
  font-size: 1.5rem;

  & .btns-group {
    display: flex;
    gap: 0.375rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    padding: 0 1rem;
    & .btns-group {
      display: none;
    }
  }
`;

export const Styled_Section = styled.div`
  position: relative;
  padding: ${(p) => p.padding};

  & button {
    white-space: nowrap;
  }

  & .badge-button {
    ${(p) =>
      p.showTimesBtn === true && `padding-left: 0.5rem; padding-right: 0.5rem;`}
  }

  & .gradient {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 4;
    transition: ${"0.3s"};
    right: ${(p) => (p.noArrows !== true ? "6rem" : "0")};
    width: 2rem;
    background: #fff;
    height: 100%;
    -webkit-mask-image: linear-gradient(to left, black 10%, transparent 50%);
    mask-image: linear-gradient(to left, black 10%, transparent 50%);
  }

  & .scrollable-container {
    scroll-behavior: smooth;
    overflow: hidden;
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
  & .scroll-arrow-right,
  & .scroll-arrow-left {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    visibility: ${(props) =>
      props.arrowsVisibleOnHover === false
        ? props.hasOverflow
          ? "visible"
          : "hidden"
        : "hidden"};
    z-index: 4;
    transition: ${"0.3s"};
  }
  & .scroll-arrow-right {
    ${(props) =>
      props.rightAlignArrows === true ? "right: 0" : "right: 0.7rem"};
  }
  & .scroll-arrow-left {
    ${(props) =>
      props.rightAlignArrows === true ? "right: 2.625rem" : "left: 0.7rem"};
  }
  & .scrollable-container:hover > .scroll-arrow-left,
  & .scrollable-container:hover > .scroll-arrow-right {
    visibility: ${(props) => (props.hasOverflow ? "visible" : "hidden")};
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .scroll-arrow-left,
    & .scroll-arrow-right {
      display: none;
    }

    & .gradient {
      right: 0;
    }
  }
`;
