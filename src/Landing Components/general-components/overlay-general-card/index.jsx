import { forwardRef } from "react";

import PropTypes from "prop-types";

import Button from "../../../General/Button/Button";
import { Container } from "./style";

const OverlayGeneralCard = forwardRef(
  (
    {
      title,
      description,
      buttonText,
      imageUrl,
      backgroundColor,
      handleSelectCard = () => {},
      handleButtonAction = () => {},
    },
    ref
  ) => {
    return (
      <Container
        backgroundImage={imageUrl}
        backgroundColor={backgroundColor}
        onClick={handleSelectCard}
      >
        <div className="section__text">
          {title && <div className="section__title">{title}</div>}
          {description && (
            <div className="section__description">{description}</div>
          )}
        </div>
        <Button
          text={buttonText}
          onClick={(e) => {
            e?.stopPropagation();

            handleButtonAction();
          }}
          borderRadius="regular"
          color="gray"
          className="section__action"
        />
      </Container>
    );
  }
);

OverlayGeneralCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  imageUrl: PropTypes.string,
  backgroundColor: PropTypes.string,
  handleSelectCard: PropTypes.func,
  handleButtonAction: PropTypes.func,
};

export default OverlayGeneralCard;
