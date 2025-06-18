import { forwardRef } from "react";

import Button from "../../../General/Button/Button";
import { useTheme } from "../../../ThemeProvider/ThemeProvider";

import { Wrapper } from "./style";

const LandingPageOverlayGeneralCard = forwardRef(
  (
    {
      title,
      image,
      overlay,
      description,
      actionText,
      actionLink,
      handleClick = () => {},
    },
    ref
  ) => {
    const { theme } = useTheme();

    return (
      <>
        {/* <LandingPageOverlayGeneralCardSkeleton /> */}
        <Wrapper theme={theme} overlay={overlay} onClick={handleClick}>
          <div className="wrapper__overlay">
            <img src={image} className="wrapper__image" />
          </div>
          <div className="wrapper__text">
            <div className="text__title">{title}</div>
            <div className="text__description">{description}</div>
          </div>
          <Button
            text={actionText}
            onClick={handleClick}
            className="text__action"
          />
        </Wrapper>
      </>
    );
  }
);

export default LandingPageOverlayGeneralCard;
