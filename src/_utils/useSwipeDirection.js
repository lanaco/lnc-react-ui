import { useEffect, useState, useRef } from "react";

/**
 * @param {string | ref} wrapperElement - provide id or ref of HTML element
 * @param {string} detectDirection - detect only provided direction, if no direction is provided detect swipe in any direction
 * @returns { { trigger | direction } } swipeDetect
 */
const useSwipeDirection = (wrapperElement, detectDirection) => {
  const [swipeDetect, setSwipeDetect] = useState({
    trigger: null,
    direction: null,
  });

  const getTouches = (evt) => {
    return evt.touches || evt.originalEvent.touches;
  };

  useEffect(() => {
    // if type is string - id is provided, otherwise it is ref
    const wrapper =
      typeof wrapperElement === "string" || wrapperElement instanceof String
        ? document.getElementById(wrapperElement)
        : wrapperElement.current;

    let xDown = null;
    let yDown = null;

    if (wrapper) {
      const handleTouchStart = (evt) => {
        const firstTouch = getTouches(evt)[0];

        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
      };

      const handleTouchMove = (evt) => {
        if (!xDown || !yDown) {
          return;
        }

        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;

        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0) {
            /** left swipe */
            if (detectDirection === SwipeDirection.LEFT || !detectDirection) {
              setSwipeDetect((prev) => ({
                trigger: !prev.trigger,
                direction: SwipeDirection.LEFT,
              }));
            }
          } else {
            /** right swipe */
            if (detectDirection === SwipeDirection.RIGHT || !detectDirection) {
              setSwipeDetect((prev) => ({
                trigger: !prev.trigger,
                direction: SwipeDirection.RIGHT,
              }));
            }
          }
        } else {
          if (yDiff > 0) {
            /** * Up swipe */
            if (detectDirection === SwipeDirection.UP || !detectDirection) {
              setSwipeDetect((prev) => ({
                trigger: !prev.trigger,
                direction: SwipeDirection.UP,
              }));
            }
          } else {
            /** Down swipe */
            if (detectDirection === SwipeDirection.DOWN || !detectDirection) {
              setSwipeDetect((prev) => ({
                trigger: !prev.trigger,
                direction: SwipeDirection.DOWN,
              }));
            }
          }
        }
        /* reset values */
        xDown = null;
        yDown = null;
      };

      wrapper.addEventListener("touchstart", handleTouchStart); // add event listener
      wrapper.addEventListener("touchmove", handleTouchMove);

      return () => {
        wrapper.removeEventListener("touchstart", handleTouchStart); // clean up
        wrapper.addEventListener("touchmove", handleTouchMove);
      };
    }
  }, []);

  return swipeDetect;
};

export default useSwipeDirection;

export const SwipeDirection = {
  UP: "up",
  DOWN: "down",
  RIGHT: "right",
  LEFT: "left",
};

export const useVerticalSwipe = (onSwipeUp, onSwipeDown, threshold = 50) => {
  const touchStartY = useRef(0);

  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY > threshold) onSwipeDown();
    else if (deltaY < -threshold) onSwipeUp();
  };

  return {
    onTouchStart,
    onTouchEnd,
  };
};

export const useHorizontalSwipe = (
  onSwipeRight,
  onSwipeLeft,
  threshold = 50
) => {
  const touchStartX = useRef(0);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > threshold) onSwipeRight();
    else if (deltaX < -threshold) onSwipeLeft();
  };

  return {
    onTouchStart,
    onTouchEnd,
  };
};
