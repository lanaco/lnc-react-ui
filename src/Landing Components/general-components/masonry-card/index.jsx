/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import { Wrapper } from "./style.jsx";
import { useTheme } from "@emotion/react";
import { isDefinedNotEmptyString } from "../../../_utils/utils.jsx";

const LandingPageMasonryGeneralCard = forwardRef(
  (
    {
      title,
      imageUrl,
      imageUrlMobile,
      description,
      buttonText,
      onSelectCard = () => {},
      className,
      position,
      tag,
      backgroundColor,
      borderColor,
      buttonLink,
      LinkComponent,
    },
    ref,
  ) => {
    const Component = LinkComponent || "a";
    const theme = useTheme();
    const link = `/${buttonLink || ""}`;

    return (
      <Wrapper
        ref={ref}
        theme={theme}
        className={["masonry-card", className].filter(Boolean).join(" ")}
        position={position}
        backgroundColor={backgroundColor}
        onClick={onSelectCard}
        as={Component}
        borderColor={borderColor}
        {...(LinkComponent ? { to: link } : { href: link })}
      >
        {imageUrl && (
          <>
            <img
              src={imageUrl}
              alt={title || ""}
              className="wrapper__image wrapper__image--desktop"
              loading="lazy"
            />
            <img
              src={imageUrlMobile || imageUrl}
              alt={title || ""}
              className="wrapper__image wrapper__image--mobile"
              loading="lazy"
            />
          </>
        )}
        <div className="wrapper__text">
          {tag && <div className="text__tag">{tag}</div>}
          {isDefinedNotEmptyString(title) && (
            <div className="text__title">{title}</div>
          )}
          {isDefinedNotEmptyString(description) && (
            <div className="text__description">{description}</div>
          )}
          {isDefinedNotEmptyString(buttonText) && (
            <span className="text__action">{buttonText}</span>
          )}
        </div>
      </Wrapper>
    );
  },
);

export default LandingPageMasonryGeneralCard;
