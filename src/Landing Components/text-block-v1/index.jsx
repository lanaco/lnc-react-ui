/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { Wrapper } from "./style";
import Button from "../../General/Button/Button";

const TextBlockV1 = forwardRef((props, ref) => {
  const { title, subtitle, description, buttonText, buttonLink, onButtonAction = () => {}, ...rest } =
    props;

  return (
    <Wrapper {...rest}>
      <div className="block-group">
        <div className="txt-block-subtitle">{subtitle}</div>
        <div className="txt-block-title">{title}</div>
        <div className="txt-block-description">{description}</div>
      </div>
      <Button
        type="button"
        btnType="outline"
        borderRadius="curved"
        onClick={() => onButtonAction(buttonLink)}
        color="gray"
      >
        {buttonText}
      </Button>
    </Wrapper>
  );
});

export default TextBlockV1;
