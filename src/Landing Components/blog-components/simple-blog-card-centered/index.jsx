/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";
import Button from "../../../General/Button/Button";
import ProductImageWrapper from "../../product-img-wrapper";

const SimpleBlogCardCentered = forwardRef((props, ref) => {
  const { title, image, text, buttonText, onCardClick } = props;

  return (
    <Wrapper ref={ref} className="blog-card" onClick={onCardClick}>
      <ProductImageWrapper src={image} />
      <TextWrapper>
        <div className="text-wr-title">{title}</div>
        <div className="text-wr">{text}</div>
      </TextWrapper>
      <Button
        borderRadius="curved"
        color="gray"
        type="button"
        btnType="outline"
        onClick={onCardClick}
        size="medium"
      >
        {buttonText}
      </Button>
    </Wrapper>
  );
});

export default SimpleBlogCardCentered;
