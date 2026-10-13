/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/**
 * Building blocks shared by the landing product / shop sections so they match
 * the production web (Astro) versions:
 *  - SectionHeader: icon (iconColor) + title + optional red badge chip, with
 *    an optional "view all" button on the same line.
 *  - EndCta: the "Pogledaj sve" + round arrow cell appended at the end of a
 *    scroll row (showMoreAtEnd).
 *  - useScrollButtons / ScrollButtons: prev/next buttons that only appear when
 *    the row overflows. Measures only the row element itself (no global
 *    window/document), so it also works when rendered into an iframe portal.
 */
import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";
import { isDefinedNotEmptyString } from "../../../_utils/utils";

export const DARK_BACKGROUND = "#010201";

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

const hasContent = (value) =>
  value !== undefined && value !== null && value !== false && value !== "";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  color: ${(p) => (p.darkMode ? "#fff" : "var(--gray-950, #14161a)")};

  & .lp-header__subtitle {
    font-size: 0.75rem;
    font-weight: 400;
    color: ${(p) =>
      p.darkMode ? "rgba(255, 255, 255, 0.64)" : "var(--gray-500, #868c98)"};
  }

  & .lp-header__line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
  }

  & .lp-header__title-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }

  & .lp-header__icon {
    font-size: 1.5rem;
    line-height: 1;
    flex-shrink: 0;
  }

  & .lp-header__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 2rem;
    letter-spacing: -0.0294rem;
    color: inherit;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .lp-header__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem;
    border-radius: 0.375rem;
    background: var(--danger-600, #e53a35);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    letter-spacing: 0.03125rem;
    white-space: nowrap;
    flex-shrink: 0;

    & i {
      font-size: 1rem;
    }
  }

  & .lp-header__button {
    flex-shrink: 0;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.25rem;
    padding: 0 1rem;
    border-radius: 999px;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s ease;

    &:focus {
      outline: none;
    }
  }

  & .lp-header__button--outline {
    background: transparent;
    border: 1px solid
      ${(p) => (p.darkMode ? "rgba(255, 255, 255, 0.32)" : "var(--gray-300, #cdd3db)")};
    color: ${(p) => (p.darkMode ? "#fff" : "var(--gray-950, #14161a)")};

    &:hover {
      background: ${(p) =>
        p.darkMode ? "rgba(255, 255, 255, 0.08)" : "var(--gray-100, #f3f6fb)"};
    }
  }

  & .lp-header__button--tinted {
    border: none;
    background: ${(p) =>
      p.darkMode ? "rgba(255, 255, 255, 0.12)" : "var(--gray-100, #f3f6fb)"};
    color: ${(p) => (p.darkMode ? "#fff" : "var(--gray-950, #14161a)")};

    &:hover {
      background: ${(p) =>
        p.darkMode ? "rgba(255, 255, 255, 0.2)" : "var(--gray-200, #e4e9f0)"};
    }
  }

  @media ${down("S")} {
    & .lp-header__title {
      font-size: 1.375rem;
      line-height: 1.75rem;
    }
  }
`;

/**
 * Header line used by the product / shop sections.
 * The button is rendered only when `buttonText` and `buttonLink` are both set
 * and `showMoreAtEnd` is false (same rule as the web).
 */
export const SectionHeader = ({
  icon,
  iconColor,
  title,
  subtitle,
  badge,
  badgeIcon = "mng-lnc-percentage",
  buttonText,
  buttonLink,
  showMoreAtEnd = false,
  onButtonAction = () => {},
  buttonVariant = "outline",
  buttonClassName = "",
  darkMode = false,
  titleAs = "h2",
  className = "",
  children,
}) => {
  const TitleTag = titleAs;
  const showButton =
    isDefinedNotEmptyString(buttonText) &&
    isDefinedNotEmptyString(buttonLink) &&
    !showMoreAtEnd;

  return (
    <HeaderWrapper darkMode={darkMode} className={`lp-header ${className}`}>
      {isDefinedNotEmptyString(subtitle) && (
        <span className="lp-header__subtitle">{subtitle}</span>
      )}
      <div className="lp-header__line">
        <div className="lp-header__title-group">
          {isDefinedNotEmptyString(icon) && (
            <i
              className={`lp-header__icon ${icon}`}
              style={{ color: iconColor || "var(--primary-500, #f59e0b)" }}
            />
          )}
          {hasContent(title) && (
            <TitleTag className="lp-header__title">{title}</TitleTag>
          )}
          {hasContent(badge) && (
            <span className="lp-header__badge">
              {isDefinedNotEmptyString(badgeIcon) && <i className={badgeIcon} />}
              {badge}
            </span>
          )}
        </div>
        {showButton && (
          <button
            type="button"
            className={`lp-header__button lp-header__button--${buttonVariant} button-link ${buttonClassName}`}
            onClick={(e) => {
              e?.currentTarget?.blur();
              onButtonAction(buttonLink);
            }}
          >
            {buttonText}
          </button>
        )}
      </div>
      {children}
    </HeaderWrapper>
  );
};

// ---------------------------------------------------------------------------
// End-of-row CTA (showMoreAtEnd)
// ---------------------------------------------------------------------------

const EndCtaButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: ${(p) => (p.darkMode ? "#fff" : "var(--gray-950, #14161a)")};

  &:focus {
    outline: none;
  }

  & .end-cta__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 999px;
    background: var(--gray-100, #f3f6fb);
    color: var(--gray-950, #14161a);
    font-size: 1.5rem;
    transition: background 0.2s ease;
  }

  &:hover .end-cta__icon {
    background: var(--gray-200, #e4e9f0);
  }

  @media ${down("S")} {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
    width: ${(p) => p.mobileWidth};
    min-width: ${(p) => p.mobileWidth};
  }
`;

/**
 * The "view all" link relocated to the end of a scroll row. Renders nothing
 * unless `buttonText` and `buttonLink` are both set (same rule as the web).
 */
export const EndCta = ({
  buttonText,
  buttonLink,
  onButtonAction = () => {},
  darkMode = false,
  mobileWidth = "10.5rem",
  arrowIcon = "mng-lnc-arrow--right",
  className = "",
}) => {
  if (
    !isDefinedNotEmptyString(buttonText) ||
    !isDefinedNotEmptyString(buttonLink)
  ) {
    return null;
  }

  return (
    <EndCtaButton
      type="button"
      darkMode={darkMode}
      mobileWidth={mobileWidth}
      className={`end-cta ${className}`}
      onClick={(e) => {
        e?.currentTarget?.blur();
        onButtonAction(buttonLink);
      }}
    >
      <span>{buttonText}</span>
      <span className="end-cta__icon">
        <i className={arrowIcon} />
      </span>
    </EndCtaButton>
  );
};

// ---------------------------------------------------------------------------
// Scroll row + prev / next buttons
// ---------------------------------------------------------------------------

/**
 * Tracks whether a horizontally scrollable element can scroll left / right.
 * Only the element itself (and its own ownerDocument's window, for
 * ResizeObserver / getComputedStyle) is used - never the global window.
 */
export const useScrollButtons = (containerRef, deps = []) => {
  const [state, setState] = useState({ canPrev: false, canNext: false });

  const update = useCallback(() => {
    const el = containerRef?.current;
    if (!el) return;

    const overflows = el.scrollWidth > el.clientWidth + 1;
    const canPrev = overflows && el.scrollLeft > 0;
    const canNext =
      overflows && el.scrollLeft + el.clientWidth < el.scrollWidth - 1;

    setState((prev) =>
      prev.canPrev === canPrev && prev.canNext === canNext
        ? prev
        : { canPrev, canNext },
    );
  }, [containerRef]);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return undefined;

    update();
    el.addEventListener("scroll", update, { passive: true });

    const view = el.ownerDocument?.defaultView;
    const ResizeObserverCtor = view?.ResizeObserver;
    let observer;

    if (ResizeObserverCtor) {
      observer = new ResizeObserverCtor(update);
      observer.observe(el);
      Array.from(el.children || []).forEach((child) => observer.observe(child));
    }

    return () => {
      el.removeEventListener("scroll", update);
      observer?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, ...deps]);

  const scrollByStep = useCallback(
    (direction) => {
      const el = containerRef?.current;
      if (!el) return;

      const first = el.firstElementChild;
      const view = el.ownerDocument?.defaultView;
      const gap = parseFloat(view?.getComputedStyle?.(el)?.columnGap) || 0;
      const step = first
        ? first.getBoundingClientRect().width + gap
        : el.clientWidth;

      if (typeof el.scrollBy === "function") {
        el.scrollBy({ left: direction * step, behavior: "smooth" });
      } else {
        el.scrollLeft += direction * step;
      }
    },
    [containerRef],
  );

  return {
    ...state,
    scrollPrev: () => scrollByStep(-1),
    scrollNext: () => scrollByStep(1),
    update,
  };
};

export const ScrollViewport = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;

  & .lp-scroll-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    padding: 0;
    border: none;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    box-shadow:
      1px 1px 2px rgba(12, 21, 32, 0.08),
      0 2px 8px rgba(12, 21, 32, 0.16);
    color: var(--gray-950, #14161a);
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1;

    &:focus {
      outline: none;
    }
  }

  & .lp-scroll-btn--left {
    left: -1.125rem;
  }

  & .lp-scroll-btn--right {
    right: -1.125rem;
  }

  @media ${down("S")} {
    & .lp-scroll-btn {
      display: none;
    }
  }
`;

export const ScrollButtons = ({
  canPrev,
  canNext,
  onPrev,
  onNext,
  prevLabel = "Previous",
  nextLabel = "Next",
}) => (
  <>
    {canPrev && (
      <button
        type="button"
        className="lp-scroll-btn lp-scroll-btn--left"
        aria-label={prevLabel}
        onClick={(e) => {
          e?.preventDefault();
          e?.currentTarget?.blur();
          onPrev();
        }}
      >
        <i className="mng-lnc-chevron--left" />
      </button>
    )}
    {canNext && (
      <button
        type="button"
        className="lp-scroll-btn lp-scroll-btn--right"
        aria-label={nextLabel}
        onClick={(e) => {
          e?.preventDefault();
          e?.currentTarget?.blur();
          onNext();
        }}
      >
        <i className="mng-lnc-chevron--right" />
      </button>
    )}
  </>
);

/** Shared "hide the scrollbar but keep scrolling" rules for scroll rows. */
export const hiddenScrollbar = `
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/** Dark-mode overrides for DetailedProductCard text on a #010201 background. */
export const detailedCardDarkOverrides = `
  & .product-card {
    color: #fff;
  }

  & .product-card .product-image-wrapper {
    border-color: rgba(255, 255, 255, 0.16);
  }

  & .product-card .seller,
  & .product-card .full-price,
  & .product-card .location-text,
  & .product-card .sponsored-line {
    color: rgba(255, 255, 255, 0.64);
  }

  & .product-card .price-text:not(.new-price) {
    color: #fff;
  }
`;
