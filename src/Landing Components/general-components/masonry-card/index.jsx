/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import Button from "../../../General/Button/Button";
import { Wrapper } from "./style.jsx";
import { useTheme } from "@emotion/react";
import { isDefinedNotEmptyString } from "../../../_utils/utils.jsx";

const LandingPageMasonryGeneralCard = forwardRef(
  (
    {
      title,
      imageUrl,
      description,
      buttonText,
      onSelectCard = () => {},
      className,
      position,
      tag,
      backgroundColor,
      buttonLink
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <>
        {/* <LandingPageMasonryGeneralCardSkeleton /> */}
        <Wrapper
          ref={ref}
          theme={theme}
          className={className}
          position={position}
          backgroundColor={backgroundColor}
          onClick={onSelectCard}
          to={`/${buttonLink}`}
        >
          <img src={imageUrl} className="wrapper__image" />
          <div className="wrapper__text">
            {tag && <div className="text__tag">{tag}</div>}
            <div className="text__title">{title}</div>
            {isDefinedNotEmptyString(description) && (
              <div className="text__description">{description}</div>
            )}
            {isDefinedNotEmptyString(buttonText) && (
              <Button
                text={buttonText}
                // onClick={() => onSelectCard}
                className="text__action"
              />
            )}
          </div>
        </Wrapper>
      </>
    );
  }
);

export default LandingPageMasonryGeneralCard;
