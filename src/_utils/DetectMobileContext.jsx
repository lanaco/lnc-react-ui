/* eslint-disable react/prop-types */
import { createContext, useMemo } from "react";

/**
 * Optional override for `useDetectMobile`.
 *
 * Without a provider (the default for every app) `useDetectMobile` keeps
 * measuring the global `window`, exactly as before.
 *
 * Wrap a subtree with `DetectMobileProvider` only when that subtree is rendered
 * into another window than the global one - e.g. a mobile preview rendered
 * through a portal into an iframe - so components measure that window instead.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const DetectMobileContext = createContext(null);

/**
 * @param {Window} [targetWindow] Window whose width decides mobile/desktop.
 * @param {boolean} [isMobile] Forces the result; takes precedence over targetWindow.
 */
const DetectMobileProvider = ({ targetWindow, isMobile, children }) => {
  const value = useMemo(
    () => ({ targetWindow, isMobile }),
    [targetWindow, isMobile],
  );

  return (
    <DetectMobileContext.Provider value={value}>
      {children}
    </DetectMobileContext.Provider>
  );
};

export default DetectMobileProvider;
