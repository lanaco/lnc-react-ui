/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { cloneElement, forwardRef, useState } from "react";

import Icon from "../../../General/Icon/Icon";
import IconButton from "../../../General/IconButton/IconButton";
import {
  formatLocaleDateString,
  formatString,
  getRoundedNumber,
  isDefined,
} from "../../../_utils/utils";
import ProductImageWrapper from "../../product-img-wrapper";
import { BlogTag } from "../../../Landing Sections/style";
import { Wrapper } from "./style";

const BlogCardItem = forwardRef(
  (
    {
      blogUuid,
      title,
      imageUrl,
      options,
      publishedAt,
      timeToReadText = "{0} min read",
      timeToRead = 0,
      numberOfLikes = 0,
      numberOfComments = 0,
      isBookmarked = false,
      onSelectCard = () => {},
      onBookmark = () => {},
      onShare = () => {},
      bookmarkComponent = <></>,
    },
    ref
  ) => {
    const ClonedBookmarkComponent = () => {
      if (!isDefined(bookmarkComponent)) return <></>;

      const clonedChild = cloneElement(bookmarkComponent, {
        key: `bookmark_blog__${blogUuid}__${isBookmarked}`,
        isBookmarked: isBookmarked,
        blogUuid: blogUuid,
        onBookmark: (isAdded, uuid) => onBookmark(isAdded, uuid),
        ref: ref,
        componentName: "ExploreBlogSectionCard",
      });

      return clonedChild;
    };

    return (
      <Wrapper onClick={onSelectCard} className="blog-card-item">
        <ProductImageWrapper src={imageUrl} className="wrapper__image" />
        <div className="wrapper__content">
          <div className="wrapper__subcontent">
            <div className="wrapper__title">{title}</div>
            <div className="wrapper__tags-action">
              <div className="wrapper__tags">
                {options &&
                  options?.map((x, idx) => (
                    <BlogTag
                      key={`blog-card-sponsored-option__${idx + 1}`}
                      color={x?.color}
                    >
                      {x?.name}
                    </BlogTag>
                  ))}
              </div>
              <div className="info__content mobile-only">
                <ClonedBookmarkComponent />
                <IconButton
                  icon=" mng-lnc-share"
                  borderRadius="curved"
                  btnType="basic"
                  color="neutral"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onShare();
                  }}
                />
              </div>
            </div>
          </div>
          <div className="wrapper__info">
            <div className="info__content">
              <div className="info__text">{`${formatLocaleDateString(
                publishedAt
              )} • ${formatString(timeToReadText, timeToRead)}`}</div>
              <div className="info__text">
                <div>
                  <Icon icon=" mng-lnc-thumbs-up--filled" sizeInUnits="1rem" />
                  {getRoundedNumber(numberOfLikes)}
                </div>
                <div>
                  <Icon icon=" mng-lnc-messages-filled" sizeInUnits="1rem" />
                  {getRoundedNumber(numberOfComments)}
                </div>
              </div>
            </div>
            <div className="info__content desktop-only">
              <ClonedBookmarkComponent />
              <IconButton
                icon=" mng-lnc-share"
                borderRadius="curved"
                btnType="basic"
                color="neutral"
                onClick={(e) => {
                  e?.stopPropagation();
                  onShare();
                }}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
);

export default BlogCardItem;
