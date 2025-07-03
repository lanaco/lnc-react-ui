/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useEffect } from "react";

import Button from "../../../General/Button/Button";
import { Wrapper } from "./style.jsx";
import { useTheme } from "@emotion/react";
import { isDefinedNotEmptyString } from "../../../_utils/utils.jsx";

const LandingPageMasonryGeneralCard = forwardRef(
  (
    {
      title,
      image,
      description,
      buttonText,
      onSelectCard = () => {},
      className,
      position,
      selectAction,
      tag,
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <>
        {/* <LandingPageMasonryGeneralCardSkeleton /> */}
        <Wrapper
          theme={theme}
          className={className}
          onClick={onSelectCard}
          position={position}
        >
          <img src={image} className="wrapper__image" />
          <div className="wrapper__text">
            {tag && <div className="text__tag">{tag}</div>}
            <div className="text__title">{title}</div>
            {isDefinedNotEmptyString(description) && (
              <div className="text__description">{description}</div>
            )}
            {isDefinedNotEmptyString(buttonText) && (
              <Button
                text={buttonText}
                onClick={() => onSelectCard(selectAction)}
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
