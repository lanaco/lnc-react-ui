import { forwardRef } from "react";

import Icon from "../../../General/Icon/Icon";
import IconButton from "../../../General/IconButton/IconButton";
import {
  formatLocaleDateString,
  formatString,
  getRoundedNumber,
} from "../../../_utils/utils";
import ProductImageWrapper from "../../product-img-wrapper";
import { BlogTag } from "../../../Landing Sections/style";
import { Wrapper } from "./style";

const BlogCardItem = forwardRef(
  (
    {
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
    },
    ref
  ) => {
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
                <IconButton
                  icon={
                    isBookmarked
                      ? " mng-lnc-bookmark--filled"
                      : " mng-lnc-bookmark"
                  }
                  borderRadius="curved"
                  btnType="basic"
                  color="neutral"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onBookmark();
                  }}
                />
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
              <IconButton
                icon={
                  isBookmarked
                    ? " mng-lnc-bookmark--filled"
                    : " mng-lnc-bookmark"
                }
                borderRadius="curved"
                btnType="basic"
                color="neutral"
                onClick={(e) => {
                  e?.stopPropagation();
                  onBookmark();
                }}
              />
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
