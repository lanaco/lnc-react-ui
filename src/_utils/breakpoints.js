/**
 * Unified breakpoint system for consistent responsive design across all screen sizes.
 * Use this as the single source of truth for layout decisions.
 *
 * Breakpoint ranges (aligned with common device widths):
 * - XS: Phones portrait (0-480px)
 * - S:  Phones landscape / large phones (481-767px)
 * - M:  Tablets (768-1024px)
 * - L:  Laptops / small desktops (1025-1280px)
 * - XL: Large desktops (1281px+)
 */

/**
 * Get media query for exact breakpoint range.
 * Use with useMedia() when you need to know the current breakpoint.
 */
export const getMediaQuery = (size) => {
  if (size.min === 0) return `(max-width: ${size.max}px)`;
  if (size.max === Infinity) return `(min-width: ${size.min}px)`;
  return `(min-width: ${size.min}px) and (max-width: ${size.max}px)`;
};

// Add mediaQuery to each size for backward compatibility
const withMediaQuery = (size) => ({
  ...size,
  mediaQuery: getMediaQuery(size),
});

export const screenSizes = {
  XS: withMediaQuery({
    type: "XS",
    index: 0,
    min: 0,
    max: 480,
  }),
  S: withMediaQuery({
    type: "S",
    index: 1,
    min: 481,
    max: 767,
  }),
  M: withMediaQuery({
    type: "M",
    index: 2,
    min: 768,
    max: 1024,
  }),
  L: withMediaQuery({
    type: "L",
    index: 3,
    min: 1025,
    max: 1280,
  }),
  XL: withMediaQuery({
    type: "XL",
    index: 4,
    min: 1281,
    max: Infinity,
  }),
};

/**
 * Get "min-width" media query - matches this breakpoint and larger.
 * Use for: "show on tablet and up" -> up('M') -> (min-width: 768px)
 * @throws {Error} If key is not a valid breakpoint (XS, S, M, L, XL)
 */
export const up = (key) => {
  const size = screenSizes[key];
  if (!size) {
    throw new Error(
      `Invalid breakpoint key: "${key}". Valid keys: ${BREAKPOINT_ORDER.join(", ")}`
    );
  }
  return `(min-width: ${size.min}px)`;
};

/**
 * Get "max-width" media query - matches this breakpoint and smaller.
 * Use for: "show on mobile only" -> down('S') -> (max-width: 767px)
 * For down('XL'), returns ALL_SCREENS (matches all) since XL has no upper bound.
 * @throws {Error} If key is not a valid breakpoint (XS, S, M, L, XL)
 */
export const down = (key) => {
  const size = screenSizes[key];
  if (!size) {
    throw new Error(
      `Invalid breakpoint key: "${key}". Valid keys: ${BREAKPOINT_ORDER.join(", ")}`
    );
  }
  if (size.max === Infinity) return ALL_SCREENS;
  return `(max-width: ${size.max}px)`;
};

/**
 * Get media query for exactly one breakpoint range.
 * Use for: "show only on tablet" -> only('M') -> (min-width: 768px) and (max-width: 1024px)
 * @throws {Error} If key is not a valid breakpoint (XS, S, M, L, XL)
 */
export const only = (key) => {
  const size = screenSizes[key];
  if (!size) {
    throw new Error(
      `Invalid breakpoint key: "${key}". Valid keys: ${BREAKPOINT_ORDER.join(", ")}`
    );
  }
  return getMediaQuery(size);
};

/**
 * Get media query for a range between two breakpoints (inclusive).
 * Use for: "show on tablet and laptop" -> between('M', 'L')
 * @param {string} start - Start breakpoint (inclusive)
 * @param {string} end - End breakpoint (inclusive)
 * @throws {Error} If keys are invalid or start is larger than end
 */
export const between = (start, end) => {
  const startSize = screenSizes[start];
  const endSize = screenSizes[end];
  if (!startSize) {
    throw new Error(
      `Invalid breakpoint key: "${start}". Valid keys: ${BREAKPOINT_ORDER.join(", ")}`
    );
  }
  if (!endSize) {
    throw new Error(
      `Invalid breakpoint key: "${end}". Valid keys: ${BREAKPOINT_ORDER.join(", ")}`
    );
  }
  if (startSize.index > endSize.index) {
    throw new Error(
      `Start breakpoint "${start}" must be smaller than or equal to end breakpoint "${end}"`
    );
  }
  const min = startSize.min;
  const max = endSize.max;
  if (max === Infinity) return `(min-width: ${min}px)`;
  return `(min-width: ${min}px) and (max-width: ${max}px)`;
};

/**
 * Ordered array of breakpoint keys (smallest to largest).
 * Useful for iteration and responsive configs.
 */
export const BREAKPOINT_ORDER = ["XS", "S", "M", "L", "XL"];

/**
 * Media query that matches all screen sizes.
 * Returned by down('XL') since XL has no upper bound.
 */
const ALL_SCREENS = "(min-width: 0px)";

/**
 * Semantic device categories.
 * Use when you need "mobile" vs "tablet" vs "desktop" logic.
 */
export const DEVICE_CATEGORIES = {
  mobile: ["XS", "S"],
  tablet: ["M"],
  desktop: ["L", "XL"],
};

/**
 * Check if a screen size belongs to a device category.
 */
export const isMobile = (size) => DEVICE_CATEGORIES.mobile.includes(size);
export const isTablet = (size) => DEVICE_CATEGORIES.tablet.includes(size);
export const isDesktop = (size) => DEVICE_CATEGORIES.desktop.includes(size);

// ============ Usage in styled-components / Emotion ============
//
// Option 1 - Using up()/down() helpers:
//   import { down, up } from './_utils/breakpoints';
//   @media ${down('S')} { ... }        // max-width: 767px (mobile)
//   @media ${up('M')} { ... }          // min-width: 768px (tablet+)
//
// Option 2 - Raw values:
//   import { screenSizes, MOBILE_SIZE_PX } from './_utils/breakpoints';
//   @media (max-width: ${screenSizes.S.max}px) { ... }
//   @media (max-width: ${MOBILE_SIZE_PX}px) { ... }

/**
 * Legacy aliases - aligned with breakpoints for consistency.
 * MOBILE_SIZE_PX: max width for "mobile" layout (XS + S = phones)
 * SMALL_MOBILE_SIZE_PX: max width for "small mobile" (XS = small phones)
 */
export const MOBILE_SIZE_PX = screenSizes.S.max; // 767 - mobile = XS + S
export const SMALL_MOBILE_SIZE_PX = screenSizes.XS.max; // 480 - small phones
