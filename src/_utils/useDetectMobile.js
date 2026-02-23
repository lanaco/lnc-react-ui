import { useEffect, useState } from "react";
import { MOBILE_SIZE_PX } from "./consts";

const useDetectMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return width <= MOBILE_SIZE_PX;
};

export default useDetectMobile;
