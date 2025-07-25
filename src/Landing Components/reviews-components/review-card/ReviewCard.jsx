/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Wrapper, ExternalWrapper } from "./style";
import StarRating from "../../star-rating/StarRating";
import ProductImageWrapper from "../../product-img-wrapper";

const ReviewCard = forwardRef((props, ref) => {
  const { image, text, title, onSelectCard = () => {}, rating } = props;

  return (
    <ExternalWrapper ref={ref} className="review-card" onClick={onSelectCard}>
      <Wrapper>
        <ProductImageWrapper src={image} />
        <div className="cont">
          <span className="cont-title">{title}</span>
          <div className="cont-text">{text}</div>
        </div>
        <StarRating color="warning" rating={rating} />
      </Wrapper>
    </ExternalWrapper>
  );
});

export default ReviewCard;
