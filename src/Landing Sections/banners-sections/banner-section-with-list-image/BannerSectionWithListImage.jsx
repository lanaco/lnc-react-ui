/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, Fragment } from "react";
import { Container, ContainerHeader, ListWrapper, Wrapper } from "./style";
import Button from "../../../General/Button/Button";

const BannerSectionWithListImage = forwardRef((props, ref) => {
  const {
    title,
    subtitle,
    buttonText,
    list,
    imageUrl,
    imageUrlMobile,
    imageHeight,
    imageWidth,
    imageHeightMobile,
    hasBorder = true,
    backgroundColor = "transparent",
    onButtonAction = () => {},
    buttonLink,
  } = props;

  return (
    <Container
      ref={ref}
      imgH={imageHeight}
      imgW={imageWidth}
      imgHMob={imageHeightMobile}
      hasBorder={hasBorder}
      bgColor={backgroundColor}
      className="lp-section lp-bnr-section lp-banner-section-with-list-image banner-sec-listimg"
    >
      <Wrapper className="banner-sec-listimg-wrapper">
        <ContainerHeader>
          {title && <div className="header-title">{title}</div>}
          {subtitle && <div className="header-subtitle">{subtitle}</div>}
        </ContainerHeader>
        {list?.length > 0 && (
          <ListWrapper className="banner-sec-listimg-list">
            {list.map((x, index) => (
              <Fragment key={index}>
                <div className="list-item">
                  <i className="mng mng-lnc-checkmark--filled" aria-hidden="true" />
                  <span>{x}</span>
                </div>
              </Fragment>
            ))}
          </ListWrapper>
        )}
        {buttonText && (
          <Button
            size="medium"
            color="neutral"
            type="button"
            btnType="outline"
            className="banner-sec-listimg-button"
            onClick={(e) => {
              e?.target?.blur();
              onButtonAction(buttonLink);
            }}
          >
            {buttonText}
          </Button>
        )}
      </Wrapper>
      {imageUrl && (
        <picture className="banner-sec-listimg-picture">
          {imageUrlMobile && (
            <source media="(max-width: 767px)" srcSet={imageUrlMobile} />
          )}
          <img src={imageUrl} alt={title || ""} loading="lazy" />
        </picture>
      )}
    </Container>
  );
});

export default BannerSectionWithListImage;
