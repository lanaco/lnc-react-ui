/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";
import { BlogTag } from "../../../Landing Sections/style";

const BlogCardDetailed = forwardRef((props, ref) => {
  const {
    title,
    imageUrl,
    text,
    numberOfLikes,
    numberOfComments,
    readDuration,
    datePublished,
    tags,
    onCardClick,
    timeToReadText = "read",
  } = props;

  return (
    // <BlogCardDetailedSkeleton />
    <Wrapper ref={ref} className="blog-card" onClick={onCardClick}>
      <img src={imageUrl} />
      <TextWrapper>
        <div className="info-wr">
          <div className="info-wr-1">
            <span>{datePublished}</span>
            <span className="small-dot">●</span>
            {readDuration && timeToReadText
              ? `${readDuration} ${timeToReadText}`
              : "N/A"}
          </div>
          <div className="info-wr-2">
            <span className="info-wr-1">
              <i className="mng mng-lnc-thumbs-up--filled" />
              <span>{numberOfLikes}</span>
            </span>
            <span className="info-wr-1">
              <i className="mng mng-lnc-messages-filled" />
              <span>{numberOfComments}</span>
            </span>
          </div>
        </div>
        <div className="text-wr-title">{title}</div>
        <div className="text-wr">{text}</div>
        {/* <div className="tags-block">
          
        </div> */}
      </TextWrapper>
      <div className="tags-wr">
        {tags?.map((x, index) => (
          <BlogTag key={index} color={x?.color}>
            {x?.name}
          </BlogTag>
        ))}
      </div>
    </Wrapper>
  );
});

export default BlogCardDetailed;
