/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, Fragment, useEffect, useRef } from "react";
import DefaultProductImage from "../../assets/images/NoListingsPhoto.svg";
import { isDefinedNotEmptyString } from "../../_utils/utils";

const ProductImageWrapper = forwardRef(
  (
    {
      src,
      ...rest
    },
    ref
  ) => {
    const imgRef = useRef();

    useEffect(() => {
      const onErrorImage = (event) => {
        event.target.src = DefaultProductImage;
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
          <img src={DefaultProductImage} {...rest}/>
        )}
      </Fragment>
    );
  }
);

export default ProductImageWrapper;
