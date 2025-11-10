/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";
import Link from "../../../General/Link/Link";
import ProductImageWrapper from "../../product-img-wrapper";
import { BlogTag } from "../../../Landing Sections/style";

const SimpleBlogCard = forwardRef((props, ref) => {
  const {
    title,
    imageUrl,
    text,
    options,
    onCardClick,
    readMoreText = "Read more",
  } = props;

  return (
    <Wrapper ref={ref} className="blog-card" onClick={onCardClick}>
      <ProductImageWrapper src={imageUrl} />
      <TextWrapper>
        <div className="text-wr-title">{title}</div>
        <div className="text-wr">{text}</div>
      </TextWrapper>
      {options && (
        <div className="tags-wr">
          {options?.map((x, index) => (
            <BlogTag key={index} color={x?.color}>
              {x?.name}
            </BlogTag>
          ))}
        </div>
      )}
      <Link className="action" color="gray" onClick={onCardClick}>
        {readMoreText}
      </Link>
    </Wrapper>
  );
});

export default SimpleBlogCard;
