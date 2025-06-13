import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../_utils/consts";

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
    max-width: -webkit-fill-available;
    max-width: -moz-available; /* WebKit-based browsers will ignore this. */
    max-width: fill-available;

    ${(props) =>
      props.rightAlignArrows === true &&
      props.noArrows !== true &&
      "margin-right: 6rem"};
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

    @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
      margin-right: 0;
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
    & .scrollable-container {
      overflow: auto;
    }
    & .scroll-arrow-left,
    & .scroll-arrow-right {
      display: none;
    }

    & .gradient {
      right: 0;
    }

    & .scrollable-container button:nth-of-type(3) {
      ${(p) => p.noMargin !== true && `margin-left: 1rem`};
    }
  }
`;
