/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import { Wrapper } from "./style";

import ImageBanner from "../../Landing Components/general-components/image-banner";
import useDetectMobile from "../../_utils/useDetectMobile";

const BlogImagePathSection = forwardRef((props, ref) => {
  const {
    image,
    altText,
    imageWidth,
    imageHeight,
    imageMobileWidth,
    imageMobileHeight,
    onClick = () => {},
  } = props;

  const isMobile = useDetectMobile();
  return (
    <Wrapper ref={ref}>
      <ImageBanner
        image={image}
        altText={altText}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        imageMobileWidth={imageMobileWidth}
        imageMobileHeight={imageMobileHeight}
        isMobile={isMobile}
        onClick={onClick}
      />
    </Wrapper>
  );
});

export default BlogImagePathSection;
