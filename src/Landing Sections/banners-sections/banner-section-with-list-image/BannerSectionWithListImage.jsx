import { forwardRef, Fragment } from "react";
import { Container, ContainerHeader, ListWrapper, Wrapper } from "./style";
import Button from "../../../General/Button/Button";

const BannerSectionWithListImage = forwardRef((props, ref) => {
  const {
    title,
    subtitle,
    buttonText,
    list,
    image,
    imageHeight,
    imageWidth,
    imageHeightMob,
    hasBorder = true,
    backgroundColor = "transparent",
    onBannerClick,
  } = props;

  return (
    <Container
      imgH={imageHeight}
      imgW={imageWidth}
      imgHMob={imageHeightMob}
      hasBorder={hasBorder}
      bgColor={backgroundColor}
    >
      <Wrapper>
        <ContainerHeader>
          <div className="header-title">{title}</div>
          <div className="header-subitle">{subtitle}</div>
        </ContainerHeader>
        <ListWrapper>
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
          color="gray"
          type="button"
          btnType="outline"
          onClick={onBannerClick}
        >
          {buttonText}
        </Button>
      </Wrapper>
      <img src={image} />
    </Container>
  );
});

export default BannerSectionWithListImage;
