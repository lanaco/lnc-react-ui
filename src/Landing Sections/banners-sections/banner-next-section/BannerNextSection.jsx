/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import { useTheme } from "@emotion/react";

import Button from "../../../General/Button/Button";
import { Container } from "./style";

const BannerNextSection = forwardRef(
  (
    {
      title,
      description,
      imageUrl,
      imageUrlMobile,
      backgroundColor = "white",
      buttonText,
      buttonLink,
      onButtonAction = () => {},
    },
    ref,
  ) => {
    const theme = useTheme();

    return (
      <Container className="lp-section lp-bnr-section lp-banner-next-section banner-next-section-lnc" ref={ref} theme={theme} backgroundColor={backgroundColor}>
        <div className="section__left">
          {imageUrl && (
            <div className="section__image">
              <picture className="section__picture">
                {imageUrlMobile && (
                  <source media="(max-width: 767px)" srcSet={imageUrlMobile} />
                )}
                <img src={imageUrl} alt="Banner next image" loading="lazy" />
              </picture>
            </div>
          )}
        </div>
        <div className="section__right">
          <div className="section__text">
            {title && <h2 className="section__title">{title}</h2>}
            {description && (
              <div className="section__description">{description}</div>
            )}
          </div>
          {buttonText && buttonLink && (
            <Button
              text={buttonText}
              borderRadius="curved"
              className="section__action"
              size="medium"
              onClick={(e) => {
                e?.stopPropagation();

                onButtonAction(buttonLink);
              }}
            />
          )}
        </div>
      </Container>
    );
  },
);

export default BannerNextSection;
