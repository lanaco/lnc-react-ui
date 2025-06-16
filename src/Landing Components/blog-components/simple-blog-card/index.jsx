import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";
import SimpleBlogCardSkeleton from "./skeleton";
import Link from "../../../General/Link/Link";

const SimpleBlogCard = forwardRef((props, ref) => {
  const { title, image, text, onCardClick, readMoreText = "Read more" } = props;

  return (
    // <SimpleBlogCardSkeleton />
    <Wrapper className="blog-card" onClick={onCardClick}>
      <img src={image} />
      <TextWrapper>
        <div className="text-wr-title">{title}</div>
        <div className="text-wr">{text}</div>
      </TextWrapper>
      <Link className="action" color="gray" onClick={onCardClick}>
        {readMoreText}
      </Link>
    </Wrapper>
  );
});

export default SimpleBlogCard;
