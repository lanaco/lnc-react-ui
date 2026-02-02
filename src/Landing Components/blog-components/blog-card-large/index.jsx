/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useRef } from "react";
import { TextWrapper, Wrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import Button from "../../../General/Button/Button";
import ProductImageWrapper from "../../product-img-wrapper";

const BlogCardLarge = forwardRef((props, ref) => {
  const { title, imageUrl, text, onCardClick, buttonText, metadata, titleSlug } = props;

  const isMobile = useDetectMobile();

  const cardRef = useRef();

  return (
    <Wrapper
      ref={cardRef}
      className="blog-card"
      data-accessor={metadata?.accessor}
      name={metadata?.name}
      onClick={(e) => onCardClick(e, cardRef)}
      to={`/blog/${titleSlug}`}
    >
      <ProductImageWrapper src={imageUrl} />
      <TextWrapper>
        <div className="text-wr-title">{title}</div>
        <div className="text-wr">{text}</div>
        {isMobile !== true && (
          <Button
            type="button"
            btnType="outline"
            size="medium"
            color="gray"
            onClick={onCardClick}
          >
            {buttonText}
          </Button>
        )}
      </TextWrapper>
      {isMobile === true && (
        <Button
          className="action"
          type="button"
          btnType="outline"
          size="medium"
          color="gray"
          onClick={onCardClick}
        >
          {buttonText}
        </Button>
      )}
    </Wrapper>
  );
});

export default BlogCardLarge;
