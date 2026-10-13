/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import Button from "../../../General/Button/Button";
import { Container } from "./style";
import { isDefinedNotEmptyString } from "../../../_utils/utils";

const OverlayGeneralCard = forwardRef(
  (
    {
      title,
      description,
      buttonText,
      imageUrl,
      imageUrlMobile,
      backgroundColor = "none",
      handleSelectCard = () => {},
      handleButtonAction = () => {},
      selectAction,
      LinkComponent,
    },
    ref,
  ) => {
    const Component = LinkComponent || "a";

    return (
      <Container
        ref={ref}
        backgroundImage={imageUrl}
        backgroundImageMobile={imageUrlMobile}
        backgroundColor={backgroundColor}
        onClick={handleSelectCard}
        as={Component}
        {...(LinkComponent
          ? {
              to: `/${selectAction}`,
            }
          : {
              href: `/${selectAction}`,
            })}
      >
        <div className="section__text">
          {title && <div className="section__title">{title}</div>}
          {description && (
            <div className="section__description">{description}</div>
          )}
        </div>
        {isDefinedNotEmptyString(buttonText) && (
          <Button
            text={buttonText}
            onClick={(e) => {
              e?.preventDefault();
              e?.stopPropagation();

              handleButtonAction();
            }}
            borderRadius="regular"
            color="gray"
            className="section__action"
          />
        )}
      </Container>
    );
  },
);

export default OverlayGeneralCard;
