/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import { Wrapper } from "./style";

const ImageBanner = forwardRef((props, ref) => {
  const {
    image,
    altText,
    imageWidth,
    imageHeight,
    imageMobileWidth,
    imageMobileHeight,
    isMobile,
    onClick = () => {},
  } = props;

  const width = isMobile ? imageMobileWidth : imageWidth;
  const height = isMobile ? imageMobileHeight : imageHeight;

  return (
    <Wrapper
      ref={ref}
      imageWidth={width}
      imageHeight={height}
      className={`image-banner__wrapper`}
    >
      <img
        loading="lazy"
        src={image}
        alt={altText}
        className="wrapper__image"
        onClick={onClick}
      />
    </Wrapper>
  );
});

export default ImageBanner;
