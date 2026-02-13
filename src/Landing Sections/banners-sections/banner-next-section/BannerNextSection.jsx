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
      backgroundColor = "white",
      buttonText,
      buttonLink,
      onButtonAction = () => {},
    },
    ref,
  ) => {
    const theme = useTheme();

    return (
      <Container ref={ref} theme={theme} backgroundColor={backgroundColor}>
        <div className="section__left">
          {imageUrl && (
            <div className="section__image">
              <img src={imageUrl} alt="Banner next image" loading="lazy" />
            </div>
          )}
        </div>
        <div className="section__right">
          <div className="section__text">
            {title && <div className="section__title">{title}</div>}
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
