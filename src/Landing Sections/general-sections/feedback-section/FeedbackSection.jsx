/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import { isDefinedNotEmptyString } from "../../../_utils/utils";
import Button from "../../../General/Button/Button";

import { Container } from "./style";

const FeedbackSection = forwardRef(
  ({ title, description, buttonText, onButtonAction = () => {} }, ref) => {
    return (
      <Container ref={ref}>
        <div className="feedback__content">
          {isDefinedNotEmptyString(title) && (
            <div className="feedback__title">
              <span>{title}</span>
            </div>
          )}
          {isDefinedNotEmptyString(description) && (
            <div className="feedback__description">
              <span>{description}</span>
            </div>
          )}
        </div>
        {isDefinedNotEmptyString(buttonText) && (
          <Button
            text={buttonText}
            borderRadius="curved"
            btnType="tinted"
            color="neutral"
            className="feedback__action"
            onClick={(e) => {
              e?.target?.blur();

              onButtonAction?.();
            }}
          />
        )}
      </Container>
    );
  }
);

export default FeedbackSection;
