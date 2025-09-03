/* eslint-disable react/display-name */
import PropTypes from "prop-types";
import {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import useDetectMobile from "../../_utils/useDetectMobile";
import { useTheme } from "@emotion/react";
import { HeaderWrapper, Styled_Section, Wrapper } from "./style";
import FlexBox from "../../Layout/FlexBox/FlexBox";
import InfiniteScrollEndElement from "../InfiniteScrollEndElement";
import IconButton from "../../General/IconButton/IconButton";
import useSwipeDirection, {
  SwipeDirection,
} from "../../_utils/useSwipeDirection";

const ScrollableSectionV2 = forwardRef(
  (
    {
      title,
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
      onShowEnd,
      arrowsZIndex,
      showArrows,
      elementsCount,
      minElementsCount = 2,
      ...rest
    },
    ref
  ) => {
    const isMobile = useDetectMobile();

    const theme = useTheme();

    const [scrollRightDisabled, setScrollRightDisabled] = useState(
      elementsCount < minElementsCount
    );
    const [scrollLeftDisabled, setScrollLeftDisabled] = useState(false);
    const [showGradient, setShowGradient] = useState(true);
    const wrapperRef = useRef();
    const swipeDetect = useSwipeDirection(wrapperRef);

    useEffect(() => {
      if (
        swipeDetect?.direction === SwipeDirection.RIGHT &&
        scrollLeftDisabled !== true
      ) {
        scrollLeft();
      } else if (
        swipeDetect?.direction === SwipeDirection.LEFT &&
        scrollRightDisabled !== true
      ) {
        scrollRight();
      }
    }, [swipeDetect]);

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
      <Wrapper arrowsZIndex={arrowsZIndex}>
        <HeaderWrapper>
          <div>{title}</div>
          {showArrows && (
            <div className="btns-group">
              <IconButton
                borderRadius="curved"
                btnType="tinted"
                className={"scroll-arrow-left"}
                color="neutral"
                disabled={scrollLeftDisabled}
                icon="angle-left"
                onClick={scrollLeft}
              />
              <IconButton
                borderRadius="curved"
                btnType="tinted"
                className={"scroll-arrow-right"}
                color="neutral"
                disabled={scrollRightDisabled}
                icon="angle-right"
                onClick={scrollRight}
              />
            </div>
          )}
        </HeaderWrapper>
        {showArrows && (
          <>
            <IconButton
              borderRadius="curved"
              btnType="tinted"
              className={"hover-left-arrow scroll-arrow-left"}
              color="neutral"
              disabled={scrollLeftDisabled}
              icon="angle-left"
              onClick={scrollLeft}
            />
            <IconButton
              borderRadius="curved"
              btnType="tinted"
              className={"hover-right-arrow scroll-arrow-right"}
              color="neutral"
              disabled={scrollRightDisabled}
              icon="angle-right"
              onClick={scrollRight}
            />
          </>
        )}
        <Styled_Section
          ref={ref}
          arrowsVisibleOnHover={arrowsVisibleOnHover}
          hasOverflow={hasOverflow}
          noArrows={noArrows}
          padding={padding}
          rightAlignArrows={rightAlignArrows}
          showTimesBtn={showTimesBtn}
          theme={theme}
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
              isHorizontal={true}
              onIsNotVisible={() => {
                if (scrollRightDisabled === true) setScrollRightDisabled(false);

                setShowGradient(true);
              }}
              onIsVisible={() => {
                if (scrollRightDisabled === false) setScrollRightDisabled(true);

                setShowGradient(false);
                onShowEnd?.();
              }}
            />
            {showGradient && hasOverflow && <div className={"gradient"} />}
          </FlexBox>
        </Styled_Section>
      </Wrapper>
    );
  }
);

ScrollableSectionV2.propTypes = {
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

export default ScrollableSectionV2;
