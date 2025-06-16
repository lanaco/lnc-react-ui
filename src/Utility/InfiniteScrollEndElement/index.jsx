/* eslint-disable react/jsx-key */
import { forwardRef, useRef } from "react";
import PropTypes from "prop-types";
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

InfiniteScrollEndElement.propTypes = {
  onIsVisible: PropTypes.func,
  /**
   * For horizontal scroll InfiniteScrollEndElement has to have some widh otherwise it won't ever be visible and trigger onIsVisible callback
   */
  isHorizontal: PropTypes.bool,
};

export default InfiniteScrollEndElement;
