/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, Fragment, useEffect, useRef } from "react";
import DefaultShopImage from "../../assets/images/ShopAvatar.svg";
import { isDefinedNotEmptyString } from "../../_utils/utils";

const ShopImageWrapper = forwardRef(({ src, ...rest }, ref) => {
  const imgRef = useRef();

  useEffect(() => {
    const onErrorImage = (event) => {
      event.target.src = DefaultShopImage;
      event.onerror = null;
    };

    imgRef?.current?.addEventListener("error", onErrorImage);

    return () => {
      imgRef?.current?.removeEventListener("error", onErrorImage);
    };
  }, []);

  return (
    <Fragment ref={ref}>
      {isDefinedNotEmptyString(src) ? (
        <img ref={imgRef} src={src} {...rest} />
      ) : (
        <img src={DefaultShopImage} {...rest} />
      )}
    </Fragment>
  );
});

export default ShopImageWrapper;
