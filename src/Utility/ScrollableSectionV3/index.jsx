import { forwardRef, useEffect, useState } from "react";

import PropTypes from "prop-types";

import Icon from "../../General/Icon/Icon";
import IconButton from "../../General/IconButton/IconButton";
import useDetectMobile from "../../_utils/useDetectMobile";
import { isDefinedNotEmptyString } from "../../_utils/utils";
import { Container, Content } from "./style";

const ScrollableSectionV3 = forwardRef(
  ({ icon, title, numOfSlides = 2, showNavigation = true, children }, ref) => {
    const [index, setIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const isMobile = useDetectMobile();

    const minSwipeDistance = 50;
    const numOfItems = children?.length ?? 1;

    useEffect(() => {
      const handleResize = () => {
        setItemsPerView(numOfSlides);
      };

      window.addEventListener("resize", handleResize);

      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const visibleItems = isMobile
      ? children
      : children?.slice(index, index + itemsPerView);

    const scrollToRight = (e) => {
      e?.target?.blur();

      if (index + itemsPerView < numOfItems) {
        setIndex(index + itemsPerView);
      }
    };

    const scrollToLeft = (e) => {
      e?.target?.blur();

      if (index - itemsPerView >= 0) {
        setIndex(index - itemsPerView);
      }
    };

    return (
      <Container ref={ref}>
        <div className="scrollable-section__header">
          <div className="scrollable-section__title">
            {isDefinedNotEmptyString(icon) && (
              <Icon
                icon={icon}
                color="primary"
                sizeInUnits="1.5rem"
                className="title__icon"
              />
            )}
            {isDefinedNotEmptyString(title) && (
              <div className="title__text">{title}</div>
            )}
          </div>
        </div>
        <Content
          key={`scrollable-section__content-${index}`}
          numOfColumns={numOfSlides}
          {...(!isMobile && {
            animate: {
              x: 0,
              opacity: 1,
            },
            initial: {
              x: 10,
              opacity: 0,
            },
          })}
        >
          {visibleItems}
        </Content>
        {showNavigation && numOfItems > itemsPerView && !isMobile && (
          <div className="scrollable-section__navigation">
            <IconButton
              icon="angle-left"
              borderRadius="curved"
              btnType="tinted"
              color="neutral"
              className="navigation__arrow"
              disabled={index === 0}
              onClick={scrollToLeft}
            />
            <IconButton
              icon="angle-right"
              borderRadius="curved"
              btnType="tinted"
              color="neutral"
              className="navigation__arrow"
              disabled={index + itemsPerView >= numOfItems}
              onClick={scrollToRight}
            />
          </div>
        )}
      </Container>
    );
  }
);

ScrollableSectionV3.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  numOfSlides: PropTypes.number,
  numOfSlidesForMobile: PropTypes.number,
  showNavigation: PropTypes.bool,
};

export default ScrollableSectionV3;
