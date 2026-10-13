import { useContext, useEffect, useState } from "react";
import { MOBILE_SIZE_PX } from "./breakpoints";
import { DetectMobileContext } from "./DetectMobileContext";

const useDetectMobile = () => {
  // Without DetectMobileProvider this is the global window - same as before.
  const override = useContext(DetectMobileContext);
  const targetWindow = override?.targetWindow ?? window;

  const [width, setWidth] = useState(targetWindow.innerWidth);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWidth(targetWindow.innerWidth);
    };

    // Re-read when the measured window changes (no re-render if equal).
    handleWindowSizeChange();
    targetWindow.addEventListener("resize", handleWindowSizeChange);

    return () => {
      targetWindow.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [targetWindow]);

  if (typeof override?.isMobile === "boolean") {
    return override.isMobile;
  }

  return width <= MOBILE_SIZE_PX;
};

export default useDetectMobile;
