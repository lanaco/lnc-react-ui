/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import Button from "../../../General/Button/Button";
import { useTheme } from "../../../ThemeProvider/ThemeProvider";

import { Wrapper } from "./style";
import { isDefinedNotEmptyString } from "../../../_utils/utils";

const LandingPageOverlayGeneralCard = forwardRef(
  (
    {
      title,
      image,
      backgroundColor,
      description,
      buttonText,
      handleClick = () => {},
      onButtonAction = () => {}
    },
    ref
  ) => {
    const { theme } = useTheme();

    return (
      <>
        {/* <LandingPageOverlayGeneralCardSkeleton /> */}
        <Wrapper
          ref={ref}
          theme={theme}
          overlay={backgroundColor}
          onClick={handleClick}
        >
          <img src={image} />
          <div className="content-wrapper">
            <div className="content-text">
              <div>{title}</div>
              <div className="content-text-title">{description}</div>
            </div>
            {isDefinedNotEmptyString(buttonText) && (
              <Button
                text={buttonText}
                onClick={onButtonAction}
                className="text__action"
                size="medium"
                color="gray"
              />
            )}
          </div>
          {/* <div className="wrapper__overlay">
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
          /> */}
        </Wrapper>
      </>
    );
  }
);

export default LandingPageOverlayGeneralCard;
