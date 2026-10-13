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
    imageUrlMobile,
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
    headerImageUrlMobile,
  } = props;

  const isMobile = useDetectMobile();

  const showImage =
    isDefined(imageUrl) &&
    imageUrl !== "" &&
    !(hideImageForMobile === true && isMobile === true);

  const renderImage = () =>
    showImage && (
      <picture className="banner-picture">
        {imageUrlMobile && (
          <source media="(max-width: 767px)" srcSet={imageUrlMobile} />
        )}
        <img
          src={imageUrl}
          className="banner-image"
          alt={title || ""}
          loading="lazy"
        />
      </picture>
    );

  return (
    <Container
      ref={ref}
      bgcolor={backgroundColor}
      height={sectionHeight}
      imgW={imageWidth}
      imgHMob={imageHeightMobile}
      hasBorder={hasBorder}
      className={`lp-section lp-bnr-section lp-banner-section-simple banner-section-simple-lnc${
        hideImageForMobile ? " hide-image-mobile" : ""
      }`}
    >
      {headerImageUrl && (
        <picture className="header-picture">
          {headerImageUrlMobile && (
            <source media="(max-width: 767px)" srcSet={headerImageUrlMobile} />
          )}
          <img
            src={headerImageUrl}
            className="header-image"
            alt="Header image"
            loading="lazy"
          />
        </picture>
      )}
      {imagePosition === "left" && renderImage()}
      <Wrapper
        isHorizontalContent={isHorizontalContent}
        smallPadding={smallPadding}
        hasHeaderImage={isDefined(headerImageUrl)}
        className="banner-section-simple-content"
      >
        <ContainerHeader>
          {title && <div className="header-title">{title}</div>}
          {subtitle && <div className="header-subtitle">{subtitle}</div>}
        </ContainerHeader>
        {buttonText && (
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
        )}
      </Wrapper>
      {imagePosition !== "left" && renderImage()}
    </Container>
  );
});

export default BannerSectionSimple;
