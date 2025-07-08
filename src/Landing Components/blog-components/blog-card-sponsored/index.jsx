import { forwardRef } from "react";

import Icon from "../../../General/Icon/Icon";
import Chip from "../../../Data display/Chip/Chip";
import {
  formatLocaleDateString,
  formatString,
  getRoundedNumber,
} from "../../../_utils/utils";
import ProductImageWrapper from "../../product-img-wrapper";
import { Wrapper } from "./style";

const BlogCardSponsored = forwardRef(
  (
    {
      title,
      imageUrl,
      tags,
      publishedAt,
      timeToReadText = "{0} min read",
      timeToRead = 0,
      numberOfLikes = 0,
      numberOfComments = 0,
      isSponsored = false,
      onSelectCard = () => {},
      onSelectTag = () => {},
    },
    ref
  ) => {
    return (
      <Wrapper isSponsored={isSponsored} onClick={onSelectCard}>
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
              {tags &&
                tags?.map((tag, idx) => (
                  <Chip
                    key={`blog-card-sponsored-tag__${idx + 1}`}
                    label={tag?.name}
                    color={tag?.color}
                    className="wrapper__tag"
                    onClick={(e) => {
                      e?.stopPropagation();

                      onSelectTag(tag?.code);
                    }}
                  />
                ))}
            </div>
          </div>
          <div className="wrapper__info">
            <div className="info__text">{`${formatLocaleDateString(
              publishedAt
            )} • ${formatString(timeToReadText, timeToRead)}`}</div>
            <div className="info__text">
              <div>
                <Icon icon=" mng-lnc-thumbs-up" sizeInUnits="1rem" />
                {getRoundedNumber(numberOfLikes)}
              </div>
              <div>
                <Icon icon=" mng-lnc-messages" sizeInUnits="1rem" />
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
