/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useRef } from "react";
import useIsInViewport from "../../_utils/use-is-in-viewport";
import { StyledDiv } from "./style";
import { useUpdateEffect } from "react-use";

const InfiniteScrollEndElement = forwardRef((props, ref) => {
  const {
    onIsVisible = () => {},
    onIsNotVisible,
    isHorizontal = false,
    className = "",
  } = props;

  const elementRef = useRef(null);
  const endIsVisible = useIsInViewport(elementRef);

  useUpdateEffect(() => {
    if (endIsVisible) onIsVisible();
    else onIsNotVisible?.();
  }, [endIsVisible]);

  return (
    <StyledDiv
      ref={elementRef}
      className={`scroller-element ${className}`}
      isHorizontal={isHorizontal}
    />
  );
});

export default InfiniteScrollEndElement;
