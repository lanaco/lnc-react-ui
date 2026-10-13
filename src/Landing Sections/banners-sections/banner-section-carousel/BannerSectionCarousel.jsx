/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

import SuspenseBannerSectionCarousel from "../../../Landing Components/skeleton-components/banner/banner-section-carousel";
import { isDefined } from "../../../_utils/utils";
import { Container } from "./style";

const SWIPE_THRESHOLD = 50;
const DRAG_THRESHOLD = 8;

const Chevron = ({ direction = "left" }) => (
  <svg
    className="hero__btn-icon"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d={direction === "left" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Hero banner carousel - mirrors the web's Banner.astro:
 * - desktop: one rounded slide at a time, round arrows shown on hover,
 *   text/CTA overlay over a top-left dark gradient;
 * - mobile (<=767px): full-width 375:200 slides, title/description/orange
 *   CTA top-left over a left dark gradient, centered dots and two small
 *   arrows bottom-right, swipe support.
 * Autoplays every `interval` ms (default 5000), paused on hover.
 *
 * `deviceType`, `partialVisible` and `carouselProps` are kept for backward
 * compatibility (they configured the previous react-multi-carousel based
 * implementation); `carouselProps.autoPlay` / `carouselProps.autoPlaySpeed`
 * are still honoured as fallbacks for `autoPlay` / `interval`.
 */
const BannerSectionCarousel = forwardRef(
  (
    {
      items = [],
      isLoading = false,
      // eslint-disable-next-line no-unused-vars
      deviceType,
      // eslint-disable-next-line no-unused-vars
      partialVisible = true,
      fallbackComponent = <></>,
      onSelectItem = () => {},
      onButtonAction = () => {},
      carouselProps,
      autoPlay,
      interval,
      pauseOnHover = true,
    },
    ref,
  ) => {
    const slides = Array.isArray(items) ? items.filter(Boolean) : [];
    const count = slides.length;
    const isSingle = count <= 1;

    const shouldAutoPlay = autoPlay ?? carouselProps?.autoPlay ?? true;
    const intervalMs = Number(interval ?? carouselProps?.autoPlaySpeed ?? 5000);

    const [index, setIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [restartKey, setRestartKey] = useState(0);

    const rootRef = useRef(null);
    const touchRef = useRef({ startX: 0, currentX: 0, active: false });
    const didDragRef = useRef(false);

    const setRefs = useCallback(
      (node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const current = count ? ((index % count) + count) % count : 0;

    const goTo = useCallback(
      (next) => {
        if (!count) return;
        setIndex(((next % count) + count) % count);
        // restart the autoplay countdown after a user action
        setRestartKey((k) => k + 1);
      },
      [count],
    );

    // Autoplay
    useEffect(() => {
      if (!shouldAutoPlay || isSingle || isPaused || isHidden || isDragging)
        return;
      if (!(intervalMs > 0)) return;

      const win = rootRef.current?.ownerDocument?.defaultView;
      const setI = win?.setInterval?.bind(win) ?? setInterval;
      const clearI = win?.clearInterval?.bind(win) ?? clearInterval;

      const timer = setI(() => {
        setIndex((i) => (i + 1) % count);
      }, intervalMs);

      return () => clearI(timer);
    }, [
      shouldAutoPlay,
      isSingle,
      isPaused,
      isHidden,
      isDragging,
      intervalMs,
      count,
      restartKey,
    ]);

    // Pause while the (iframe-aware) document is hidden
    useEffect(() => {
      const doc = rootRef.current?.ownerDocument;
      if (!doc) return;

      const onVisibility = () => setIsHidden(doc.hidden === true);
      doc.addEventListener("visibilitychange", onVisibility);
      return () => doc.removeEventListener("visibilitychange", onVisibility);
    }, []);

    const onTouchStart = (e) => {
      if (isSingle) return;
      const touch = e.touches?.[0];
      if (!touch) return;

      touchRef.current = {
        startX: touch.clientX,
        currentX: touch.clientX,
        active: true,
      };
      didDragRef.current = false;
      setIsDragging(true);
    };

    const onTouchMove = (e) => {
      if (!touchRef.current.active) return;
      const touch = e.touches?.[0];
      if (!touch) return;

      touchRef.current.currentX = touch.clientX;
      const diff = touch.clientX - touchRef.current.startX;
      if (Math.abs(diff) > DRAG_THRESHOLD) didDragRef.current = true;
      setDragOffset(diff);
    };

    const onTouchEnd = () => {
      if (!touchRef.current.active) return;
      touchRef.current.active = false;

      const diff = touchRef.current.currentX - touchRef.current.startX;
      setIsDragging(false);
      setDragOffset(0);

      if (Math.abs(diff) >= SWIPE_THRESHOLD) {
        goTo(diff < 0 ? current + 1 : current - 1);
      } else {
        setRestartKey((k) => k + 1);
      }
    };

    // Swallow the click that ends a swipe so it doesn't select the slide
    const onClickCapture = (e) => {
      if (!didDragRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      didDragRef.current = false;
    };

    return (
      <Container
        className="lp-section lp-bnr-section lp-banner-section-carousel banner-section-carousel-lnc"
        ref={setRefs}
      >
        <SuspenseBannerSectionCarousel
          fallbackComponent={fallbackComponent}
          keyPrefix="banner-carousel-skeleton"
          isLoading={isLoading}
        >
          <div
            className={`hero__slider${isSingle ? " is-single" : ""}`}
            aria-roledescription="carousel"
            onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
            onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
            onClickCapture={onClickCapture}
          >
            <div className="hero__viewport">
              <div
                className={`hero__track${isDragging ? " is-dragging" : ""}`}
                style={{
                  transform: `translate3d(calc(${current * -100}% + ${dragOffset}px), 0, 0)`,
                }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onTouchCancel={onTouchEnd}
                onDragStart={(e) => e.preventDefault()}
              >
                {slides.map((item, idx) => {
                  const hasText = Boolean(item?.title || item?.description);
                  const hasButton = Boolean(item?.buttonText);
                  const hasOverlay = hasText || hasButton;

                  return (
                    <div
                      key={`banner-section-carousel-item__${idx + 1}`}
                      className={`hero__slide section__card${
                        idx === current ? " is-active" : ""
                      }`}
                      aria-hidden={idx === current ? undefined : "true"}
                      onClick={() => onSelectItem(item)}
                    >
                      {isDefined(item?.imageComponent) ? (
                        item?.imageComponent
                      ) : (
                        <picture className="hero__picture">
                          {item?.imageUrlMobile && (
                            <source
                              media="(max-width: 767px)"
                              srcSet={item.imageUrlMobile}
                            />
                          )}
                          <img
                            src={item?.imageUrl}
                            alt={item?.title || `Slide ${idx + 1}`}
                            loading={idx === 0 ? "eager" : "lazy"}
                            className="hero__img section__image"
                            draggable={false}
                          />
                        </picture>
                      )}
                      {hasOverlay && (
                        <div className="hero__overlay card__content">
                          <div className="hero__overlay-inner">
                            {hasText && (
                              <div className="hero__text card__text">
                                {item?.title && (
                                  <div className="hero__title card__title">
                                    {item.title}
                                  </div>
                                )}
                                {item?.description && (
                                  <div className="hero__desc card__description">
                                    {item.description}
                                  </div>
                                )}
                              </div>
                            )}
                            {hasButton && (
                              <button
                                type="button"
                                className="hero__cta card__action"
                                tabIndex={idx === current ? 0 : -1}
                                onClick={(e) => {
                                  e?.stopPropagation();
                                  onButtonAction(item);
                                }}
                              >
                                {item.buttonText}
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {!isSingle && (
              <>
                <button
                  className="hero__btn hero__btn--prev"
                  type="button"
                  aria-label="Previous slide"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(current - 1);
                  }}
                >
                  <span className="hero__btn-glyph">‹</span>
                  <Chevron direction="left" />
                </button>
                <button
                  className="hero__btn hero__btn--next"
                  type="button"
                  aria-label="Next slide"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(current + 1);
                  }}
                >
                  <span className="hero__btn-glyph">›</span>
                  <Chevron direction="right" />
                </button>

                <div className="hero__dots" role="tablist">
                  {slides.map((_, idx) => (
                    <button
                      key={`banner-section-carousel-dot__${idx + 1}`}
                      className="hero__dot"
                      type="button"
                      role="tab"
                      aria-label={`Slide ${idx + 1}`}
                      aria-selected={idx === current ? "true" : "false"}
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo(idx);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </SuspenseBannerSectionCarousel>
      </Container>
    );
  },
);

export default BannerSectionCarousel;
