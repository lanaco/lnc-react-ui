import PropTypes from "prop-types";
import React, { useRef, useState, useEffect, useImperativeHandle } from "react";
import FlexBox from "../../Layout/FlexBox/FlexBox";
import IconButton from "../../General/IconButton/IconButton";
import { useTheme } from "../../ThemeProvider/ThemeProvider";
import { Styled_Section } from "./style";
import useDetectMobile from "../../_utils/useDetectMobile";
import InfiniteScrollEndElement from "../InfiniteScrollEndElement";

const ScrollableSection = React.forwardRef(
  (
    {
      columnGap = "2rem",
      rowGap = "1.25rem",
      scrollBySize = 300,
      wrapForMobile = false,
      wrap = false,
      children,
      methodsRef,
      arrowsVisibleOnHover = true,
      rightAlignArrows = false,
      padding = "0",
      showTimesBtn,
      noArrows,
      noGradient = false,
      hideDisabledArrows = false,
      noMargin = false,
      ...rest
    },
    ref
  ) => {
    const isMobile = useDetectMobile();

    const { theme } = useTheme();

    const [scrollRightDisabled, setScrollRightDisabled] = useState(false);
    const [scrollLeftDisabled, setScrollLeftDisabled] = useState(false);
    const [showGradient, setShowGradient] = useState(true);
    const wrapperRef = useRef();

    const scrollRight = () => {
      wrapperRef.current?.scrollBy(scrollBySize, 0);
    };

    const scrollLeft = () => {
      wrapperRef.current?.scrollBy(-scrollBySize, 0);
    };

    const [hasOverflow, setHasOferflow] = useState(false);

    useEffect(() => {
      setHasOferflow(
        wrapperRef?.current?.scrollWidth > wrapperRef?.current?.clientWidth
      );
    }, [children]);

    useImperativeHandle(methodsRef, () => ({
      scrollToEnd() {
        scrollToEnd();
      },

      scrollLeft() {
        scrollLeft();
      },

      scrollRight() {
        scrollRight();
      },
    }));

    const scrollToEnd = () => {
      wrapperRef.current.scrollLeft = wrapperRef.current.scrollWidth;
    };

    return (
      <Styled_Section
        ref={ref}
        arrowsVisibleOnHover={arrowsVisibleOnHover}
        hasOverflow={hasOverflow}
        noArrows={noArrows}
        padding={padding}
        rightAlignArrows={rightAlignArrows}
        showTimesBtn={showTimesBtn}
        theme={theme}
        noMargin={noMargin}
        {...rest}
      >
        <FlexBox
          ref={wrapperRef}
          className="scrollable-container"
          columnGap={columnGap}
          rowGap={rowGap}
          wrap={
            wrap
              ? "Wrap"
              : wrapForMobile
              ? isMobile
                ? "Wrap"
                : "NoWrap"
              : "NoWrap"
          }
        >
          {noArrows !== true && (
            <>
              {!(
                hideDisabledArrows === true && scrollLeftDisabled === true
              ) && (
                <IconButton
                  borderRadius="curved"
                  btnType="tinted"
                  className={"scroll-arrow-left"}
                  color="neutral"
                  disabled={scrollLeftDisabled}
                  icon="angle-left"
                  onClick={scrollLeft}
                />
              )}
              {!(
                hideDisabledArrows === true && scrollRightDisabled === true
              ) && (
                <IconButton
                  borderRadius="curved"
                  btnType="tinted"
                  className={"scroll-arrow-right"}
                  color="neutral"
                  disabled={scrollRightDisabled}
                  icon="angle-right"
                  onClick={scrollRight}
                />
              )}
            </>
          )}
          <InfiniteScrollEndElement
            isHorizontal={true}
            onIsNotVisible={() => {
              if (scrollLeftDisabled === true) setScrollLeftDisabled(false);
            }}
            onIsVisible={() => {
              if (scrollLeftDisabled === false) setScrollLeftDisabled(true);
            }}
          />
          {children}
          <InfiniteScrollEndElement
            className="right-scroller"
            isHorizontal={true}
            onIsNotVisible={() => {
              if (scrollRightDisabled === true) setScrollRightDisabled(false);

              setShowGradient(true);
            }}
            onIsVisible={() => {
              if (scrollRightDisabled === false) {
                setScrollRightDisabled(true);
              }
              setShowGradient(false);
            }}
          />

          {showGradient && hasOverflow && noGradient !== true && (
            <div className={"gradient"} />
          )}
        </FlexBox>
      </Styled_Section>
    );
  }
);

ScrollableSection.propTypes = {
  title: PropTypes.string,
  rowGap: PropTypes.string,
  columnGap: PropTypes.string,
  scrollBySize: PropTypes.number,
  wrapForMobile: PropTypes.bool,
  wrap: PropTypes.bool,
  methodsRef: PropTypes.any,
  arrowsVisibleOnHover: PropTypes.bool,
  rightAlignArrows: PropTypes.bool,
  padding: PropTypes.string,
};

export default ScrollableSection;
