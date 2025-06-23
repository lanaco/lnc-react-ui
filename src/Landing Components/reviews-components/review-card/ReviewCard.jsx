import { forwardRef } from "react";
import { Wrapper, ExternalWrapper } from "./style";
import StarRating from "../../star-rating/StarRating";

const ReviewCard = forwardRef((props, ref) => {
  const { uuid, image, text, title, onSelectReview = () => {}, rating } = props;

  return (
    <ExternalWrapper
      className="review-card"
      onClick={() => onSelectReview(uuid)}
    >
      <Wrapper>
        <img src={image} />
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
