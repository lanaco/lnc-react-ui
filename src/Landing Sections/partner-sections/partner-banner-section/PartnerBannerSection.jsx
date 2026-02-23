import { forwardRef } from "react";

import Icon from "../../../General/Icon/Icon";
import Button from "../../../General/Button/Button";
import { Container } from "./style";

const PartnerBannerSerction = forwardRef(
  (
    {
      title,
      description,
      imageUrl,
      items,
      buttonText,
      buttonLink,
      onButtonAction = () => {},
    },
    ref,
  ) => {
    return (
      <Container imageUrl={imageUrl}>
        <div className="section__text">
          {title && <div className="section__title">{title}</div>}
          {description && (
            <div className="section__description">{description}</div>
          )}
        </div>
        {items && items?.length > 0 && (
          <div className="section__items">
            {items?.map((item, idx) => (
              <div
                key={`partner-banner-section-item__${idx + 1}`}
                className="section__item"
              >
                <Icon
                  icon=" mng-lnc-checkmark--outline"
                  sizeInUnits="1rem"
                  color="success"
                  className="item__icon"
                />
                <div className="item__text">{item}</div>
              </div>
            ))}
          </div>
        )}
        {buttonText && buttonLink && (
          <Button
            text={buttonText}
            onClick={() => onButtonAction(buttonLink)}
            borderRadius="curved"
            color="gray"
            className="section__action"
          />
        )}
      </Container>
    );
  },
);

export default PartnerBannerSerction;
