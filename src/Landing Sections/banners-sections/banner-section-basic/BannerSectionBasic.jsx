import { forwardRef } from "react";
import { Container, ContainerHeader, Wrapper } from "./style";
import Button from "../../../General/Button/Button";

const BannerSectionBasic = forwardRef((props, ref) => {
  const {
    title,
    subtitle,
    buttonText,
    onClick,
    height,
    imageWidth,
    imageHeightMob,
    smallPadding = false,
    isHorizontalContent = false,
    backgroundColor,
    hasBorder = false,
  } = props;

  return (
    <Container
      bgcolor={backgroundColor}
      height={height}
      imgW={imageWidth}
      imgHMob={imageHeightMob}
      hasBorder={hasBorder}
    >
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
          borderRadius="curved"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </Wrapper>
    </Container>
  );
});

export default BannerSectionBasic;
