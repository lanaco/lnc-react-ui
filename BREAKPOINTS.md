# Breakpoint System

Unified responsive design system for consistent layouts across all screen sizes.

## Breakpoint Ranges

| Key | Width | Typical Devices |
|-----|-------|-----------------|
| **XS** | 0–480px | Phones portrait |
| **S**  | 481–767px | Phones landscape / large phones |
| **M**  | 768–1024px | Tablets |
| **L**  | 1025–1280px | Laptops / small desktops |
| **XL** | 1281px+ | Large desktops |

## Media Query Helpers

### `up(key)` — "this breakpoint and larger"

```js
import { up } from "@lanaco/lnc-react-ui";

// Show on tablet and up
@media ${up("M")} {
  /* min-width: 768px */
}
```

### `down(key)` — "this breakpoint and smaller"

```js
import { down } from "@lanaco/lnc-react-ui";

// Mobile only
@media ${down("S")} {
  /* max-width: 767px */
}
```

### `only(key)` — "exactly this breakpoint"

```js
import { only } from "@lanaco/lnc-react-ui";

// Tablet only
@media ${only("M")} {
  /* min-width: 768px and max-width: 1024px */
}
```

### `between(start, end)` — "range between two breakpoints"

```js
import { between } from "@lanaco/lnc-react-ui";

// Tablet and laptop
@media ${between("M", "L")} {
  /* min-width: 768px and max-width: 1280px */
}
```

## Raw Values

```js
import { screenSizes, MOBILE_SIZE_PX, SMALL_MOBILE_SIZE_PX } from "@lanaco/lnc-react-ui";

// In styled-components
@media (max-width: ${screenSizes.S.max}px) { }
@media (max-width: ${MOBILE_SIZE_PX}px) { }      // 767 — mobile = XS + S
@media (max-width: ${SMALL_MOBILE_SIZE_PX}px) { } // 480 — small phones
```

## Via Theme

When using `ThemeProvider`, breakpoints are available on the theme:

```js
import { useTheme } from "@lanaco/lnc-react-ui";

const MyComponent = () => {
  const { theme } = useTheme();

  return (
    <div
      css={{
        padding: 16,
        [theme.breakpoints.down("S")]: { padding: 8 },
      }}
    />
  );
};
```

## Hooks

### `useScreenSize()` — Current breakpoint

Returns `"XS"`, `"S"`, `"M"`, `"L"`, or `"XL"` based on viewport width.

```js
import { useScreenSize } from "@lanaco/lnc-react-ui";

const size = useScreenSize(); // "M"
```

### `useIsMobile()` — Semantic mobile check

Returns `true` for XS and S (phones).

```js
import { useIsMobile } from "@lanaco/lnc-react-ui";

const isMobile = useIsMobile(); // true on phones
```

### `useDetectMobile()` — Width-based mobile check

Returns `true` when viewport width ≤ 767px. Same cutoff as `useIsMobile` but uses `window.innerWidth`.

```js
import { useDetectMobile } from "@lanaco/lnc-react-ui";

const isMobile = useDetectMobile();
```

**When to use which:**
- **useScreenSize** — When you need the exact breakpoint (e.g. Table VisibilityPattern, FlexGridItem columns)
- **useIsMobile** — When you need "mobile vs desktop" logic; uses media queries (matches `useMedia`)
- **useDetectMobile** — When you need the same boolean but prefer window resize; useful for components that already use it

## Semantic Helpers

```js
import { isMobile, isTablet, isDesktop } from "@lanaco/lnc-react-ui";

const size = useScreenSize();
if (isMobile(size)) { /* XS or S */ }
if (isTablet(size)) { /* M */ }
if (isDesktop(size)) { /* L or XL */ }
```

## Constants

| Export | Value | Description |
|--------|-------|-------------|
| `MOBILE_SIZE_PX` | 767 | Max width for mobile (S.max) |
| `SMALL_MOBILE_SIZE_PX` | 480 | Max width for small phones (XS.max) |
| `BREAKPOINT_ORDER` | `["XS","S","M","L","XL"]` | Ordered breakpoint keys |
| `DEVICE_CATEGORIES` | `{ mobile, tablet, desktop }` | Semantic groupings |
