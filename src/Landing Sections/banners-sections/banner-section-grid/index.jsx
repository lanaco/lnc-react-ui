import { forwardRef } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import TextBlockV1 from "../../../Landing Components/text-block-v1/index";

const BannerSectionGrid = forwardRef((props, ref) => {
  const {
    image1,
    image2,
    title1,
    title2,
    text1,
    text2,
    subtitle1,
    subtitle2,
    buttonText1,
    buttonText2,
    buttonLink1,
    buttonLink2,
    rowHeight = "12.65625rem",
  } = props;

  const isMobile = useDetectMobile();

  return (
    <GridWrapper height={rowHeight}>
      <TextBlockV1
        className="text-item"
        title={title1}
        subtitle={subtitle1}
        description={text1}
        buttonText={buttonText1}
        buttonLink={buttonLink1}
      />
      <img className="img-item img-1" src={image1} />

      {isMobile !== true && <img className="img-item img-2" src={image2} />}
      <TextBlockV1
        className="text-item"
        title={title2}
        subtitle={subtitle2}
        description={text2}
        buttonText={buttonText2}
        buttonLink={buttonLink2}
      />
      {isMobile === true && <img className="img-item img-2" src={image2} />}
    </GridWrapper>
  );
});

export default BannerSectionGrid;
