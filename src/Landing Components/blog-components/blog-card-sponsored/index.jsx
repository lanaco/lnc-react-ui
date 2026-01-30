/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useRef } from "react";

import Icon from "../../../General/Icon/Icon";
import {
  formatLocaleDateString,
  formatString,
  getRoundedNumber,
} from "../../../_utils/utils";
import { BlogTag } from "../../../Landing Sections/style";
import ProductImageWrapper from "../../product-img-wrapper";
import { Wrapper } from "./style";

const BlogCardSponsored = forwardRef(
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
      isSponsored = false,
      onSelectCard = () => {},
      metadata,
      titleSlug,
    },
    ref
  ) => {
    const cardRef = useRef();

    return (
      <Wrapper
        ref={cardRef}
        isSponsored={isSponsored}
        data-accessor={metadata?.accessor}
        name={metadata?.name}
        onClick={(e) => onSelectCard(e, cardRef)}
        href={`/blog/${titleSlug}`}
      >
        {isSponsored && (
          <div className="wrapper__sponsored">
            <Icon icon=" mng-lnc-paw" sizeInUnits="1.5rem" />
          </div>
        )}
        <ProductImageWrapper src={imageUrl} className="wrapper__image" />
        <div className="wrapper__content">
          <div className="wrapper__subcontent">
            <div className="wrapper__title">{title}</div>
            <div className="wrapper__tags">
              {options &&
                options?.map((x, idx) => (
                  <BlogTag key={idx} color={x?.color}>
                    {x?.name}
                  </BlogTag>
                ))}
            </div>
          </div>
          <div className="wrapper__info">
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
        </div>
      </Wrapper>
    );
  }
);

export default BlogCardSponsored;
