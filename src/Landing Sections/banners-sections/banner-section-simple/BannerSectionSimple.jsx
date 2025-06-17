import { forwardRef } from "react";
import { Container, ContainerHeader, Wrapper } from "./style";
import Button from "../../../General/Button/Button";
import useDetectMobile from "../../../_utils/useDetectMobile";

const BannerSectionSimple = forwardRef((props, ref) => {
  const {
    title,
    subtitle,
    buttonText,
    image,
    imagePosition = "right",
    noImageForMobile = false,
    height,
    imageWidth,
    imageHeightMob,
    smallPadding = false,
    isHorizontalContent = false,
    backgroundColor,
    hasBorder = false,
    onBannerClick,
  } = props;

  const isMobile = useDetectMobile();

  return (
    <Container
      bgcolor={backgroundColor}
      height={height}
      imgW={imageWidth}
      imgHMob={imageHeightMob}
      hasBorder={hasBorder}
    >
      {imagePosition !== "right" &&
        !(noImageForMobile === true && isMobile === true) && (
          <img src={image} />
        )}
      <Wrapper
        isHorizontalContent={isHorizontalContent}
        smallPadding={smallPadding}
      >
        <ContainerHeader>
          <div className="header-title">{title}</div>
          <div className="header-subitle">{subtitle}</div>
        </ContainerHeader>
        <Button
          size="medium"
          color="neutral"
          type="button"
          onClick={onBannerClick}
        >
          {buttonText}
        </Button>
      </Wrapper>
      {imagePosition === "right" &&
        !(noImageForMobile === true && isMobile === true) && (
          <img src={image} />
        )}
    </Container>
  );
});

export default BannerSectionSimple;
