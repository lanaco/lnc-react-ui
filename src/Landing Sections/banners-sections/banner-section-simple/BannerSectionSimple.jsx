/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Container, ContainerHeader, Wrapper } from "./style";
import Button from "../../../General/Button/Button";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { isDefined } from "../../../_utils/utils";

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
    headerImageUrl,
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
      {headerImageUrl && (
        <img src={headerImageUrl} className="header-image" alt="Header image" />
      )}
      {imagePosition !== "right" &&
        !(hideImageForMobile === true && isMobile === true) && (
          <img src={imageUrl} className="banner-image" />
        )}
      <Wrapper
        isHorizontalContent={isHorizontalContent}
        smallPadding={smallPadding}
        hasHeaderImage={isDefined(headerImageUrl)}
      >
        <ContainerHeader>
          <div className="header-title">{title}</div>
          <div className="header-subitle">{subtitle}</div>
        </ContainerHeader>
        <Button
          size="medium"
          color="neutral"
          type="button"
          className="header-button"
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
          <img src={imageUrl} className="banner-image" />
        )}
    </Container>
  );
});

export default BannerSectionSimple;
