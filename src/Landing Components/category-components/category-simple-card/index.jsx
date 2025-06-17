import { forwardRef } from "react";
import { CardWrapper } from "./style";

const ReviewCard = forwardRef((props, ref) => {
  const { uuid, image, name, onSelectCard = () => {} } = props;

  return (
    <CardWrapper
      className="simple-category-card"
      onClick={() => onSelectCard(uuid)}
    >
      <img src={image} />
      <div className="card-content">
        <div className="card-content-2">{name}</div>
      </div>
    </CardWrapper>
  );
});

export default ReviewCard;
