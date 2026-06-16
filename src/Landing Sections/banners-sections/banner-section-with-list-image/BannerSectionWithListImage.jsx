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
          <div className="header-title">{title}</div>
          <div className="header-subitle">{subtitle}</div>
        </ContainerHeader>
        <ListWrapper lassName="banner-sec-listimg-list">
          {list?.map((x, index) => (
            <Fragment key={index}>
              <div className="list-item">
                <i className="mng mng-lnc-checkmark--filled" />
                <span>{x}</span>
              </div>
            </Fragment>
          ))}
        </ListWrapper>
        <Button
          size="medium"
          color="neutral"
          type="button"
          btnType="outline"
          onClick={(e) => {
            e?.target?.blur();
            onButtonAction(buttonLink);
          }}
        >
          {buttonText}
        </Button>
      </Wrapper>
      <img src={imageUrl} />
    </Container>
  );
});

export default BannerSectionWithListImage;
