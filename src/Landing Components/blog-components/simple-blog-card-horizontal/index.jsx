import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";
import SimpleBlogCardHorizontalSkeleton from "./skeleton";
import Link from "../../../General/Link/Link";

const SimpleBlogCardHorizontal = forwardRef((props, ref) => {
  const { title, image, text, buttonText, onCardClick } = props;

  return (
    // <SimpleBlogCardHorizontalSkeleton />
    <Wrapper className="blog-card" onClick={onCardClick}>
      <TextWrapper>
        <div className="text-wr-title">{title}</div>
        <div className="text-wr">{text}</div>
        <Link color="gray" onClick={onCardClick}>
          {buttonText}
        </Link>
      </TextWrapper>
      <img src={image} />
    </Wrapper>
  );
});

export default SimpleBlogCardHorizontal;
