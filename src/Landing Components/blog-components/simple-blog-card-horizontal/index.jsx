/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";
import Link from "../../../General/Link/Link";
import ProductImageWrapper from "../../product-img-wrapper";

const SimpleBlogCardHorizontal = forwardRef((props, ref) => {
  const { title, imageUrl, text, buttonText, onCardClick } = props;

  return (
    <Wrapper ref={ref} className="blog-card" onClick={onCardClick}>
      <TextWrapper>
        <div className="text-wr-title">{title}</div>
        <div className="text-wr">{text}</div>
        <Link color="gray" onClick={onCardClick}>
          {buttonText}
        </Link>
      </TextWrapper>
      <ProductImageWrapper src={imageUrl} />
    </Wrapper>
  );
});

export default SimpleBlogCardHorizontal;
