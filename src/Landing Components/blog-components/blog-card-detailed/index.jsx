/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useRef } from "react";
import { TextWrapper, Wrapper } from "./style";
import { BlogTag } from "../../../Landing Sections/style";
import ProductImageWrapper from "../../product-img-wrapper";
import {
  formatLocaleDateString,
  formatString,
  getRoundedNumber,
} from "../../../_utils/utils";

const BlogCardDetailed = forwardRef((props, ref) => {
  const {
    title,
    imageUrl,
    text,
    numberOfLikes,
    numberOfComments,
    timeToRead,
    publishedAt,
    tags,
    onCardClick,
    timeToReadText = "{0} min read",
    metadata,
  } = props;

  const cardRef = useRef();

  return (
    // <BlogCardDetailedSkeleton />
    <Wrapper
      ref={cardRef}
      className="blog-card"
      data-accessor={metadata?.accessor}
      name={metadata?.name}
      onClick={(e) => onCardClick(e, cardRef)}
    >
      <ProductImageWrapper src={imageUrl} />
      <TextWrapper>
        <div className="info-wr">
          <div className="info-wr-1">
            <span>{formatLocaleDateString(publishedAt)} </span>
            <span className="small-dot">●</span>
            {timeToRead && timeToReadText
              ? `${formatString(timeToReadText, timeToRead)}`
              : "N/A"}
          </div>
          <div className="info-wr-2">
            <span className="info-wr-1">
              <i className="mng mng-lnc-thumbs-up--filled" />
              <span>{getRoundedNumber(numberOfLikes)}</span>
            </span>
            <span className="info-wr-1">
              <i className="mng mng-lnc-messages-filled" />
              <span>{getRoundedNumber(numberOfComments)}</span>
            </span>
          </div>
        </div>
        <div className="text-wr-title">{title}</div>
        <div className="text-wr">{text}</div>
        {/* <div className="tags-block">
          
        </div> */}
      </TextWrapper>
      {tags && (
        <div className="tags-wr">
          {tags?.map((x, index) => (
            <BlogTag key={index} color={x?.color}>
              {x?.name}
            </BlogTag>
          ))}
        </div>
      )}
    </Wrapper>
  );
});

export default BlogCardDetailed;
