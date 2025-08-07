/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Container, ContainerHeader, Wrapper } from "./style";
import Button from "../../../General/Button/Button";
import useDetectMobile from "../../../_utils/useDetectMobile";

const BannerSectionSimple = forwardRef((props, ref) => {
  const {
    title,
    subtitle,
    buttonText,
    buttonLink,
    onButtonAction = () => {},
    imageUrl,
    imagePosition = "right",
    hideImageForMobile = false,
    sectionHeight = "12.65625rem",
    imageWidth,
    imageHeightMobile,
    smallPadding = false,
    isHorizontalContent = false,
    backgroundColor,
    hasBorder = false,
  } = props;

  const isMobile = useDetectMobile();

  return (
    <Container
      ref={ref}
      bgcolor={backgroundColor}
      height={sectionHeight}
      imgW={imageWidth}
      imgHMob={imageHeightMobile}
      hasBorder={hasBorder}
    >
      {imagePosition !== "right" &&
        !(hideImageForMobile === true && isMobile === true) && (
          <img src={imageUrl} />
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
          onClick={(e) => {
            e?.target?.blur();
            onButtonAction(buttonLink);
          }}
        >
          {buttonText}
        </Button>
      </Wrapper>
      {imagePosition === "right" &&
        !(hideImageForMobile === true && isMobile === true) && (
          <img src={imageUrl} />
        )}
    </Container>
  );
});

export default BannerSectionSimple;
