/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";
import Link from "../../../General/Link/Link";

const SimpleBlogCard = forwardRef((props, ref) => {
  const { title, imageUrl, text, onCardClick, readMoreText = "Read more" } = props;

  return (
    <Wrapper ref={ref} className="blog-card" onClick={onCardClick}>
      <img src={imageUrl} />
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
