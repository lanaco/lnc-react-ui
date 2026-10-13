/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import FieldOfInterestsWithTagsCardTag from "../../../Landing Components/field-of-interests-components/field-of-interests-with-tags-card/tag";
import FieldOfInterestsWithTagsCard from "../../../Landing Components/field-of-interests-components/field-of-interests-with-tags-card/card";
import FieldOfInterestsMasonryCard from "../../../Landing Components/field-of-interests-components/field-of-interests-masonry/card";
import { isDefined, isDefinedNotEmptyString } from "../../../_utils/utils";
import { Wrapper } from "./style";
import SuspenseFieldOfInterestsWithTagsCard from "../../../Landing Components/skeleton-components/field-of-interests/field-of-interests-with-tags/cards";
import SuspenseFieldOfInterestsWithTagsTag from "../../../Landing Components/skeleton-components/field-of-interests/field-of-interests-with-tags/tags";

// Cards link via their own `link` field (like the masonry card / web). When a
// card has no `link`, fall back to the legacy product URL built from uuid.
const getCardLink = (card) => {
  if (isDefined(card?.link)) return card.link;
  if (isDefined(card?.uuid)) {
    return `product/${
      isDefinedNotEmptyString(card?.nameSlug) ? `${card.nameSlug}-` : ""
    }${card.uuid}`;
  }
  return undefined;
};

const FieldOfInterestsWithTagsCardsSection = forwardRef(
  (
    {
      title,
      subtitle,
      tags = [],
      limitTags = 7,
      limitTagsForMobile = 7,
      limit = 3,
      limitForMobile = 2,
      items = [],
      isLoadingTags = false,
      isLoadingCards = false,
      selectedTag,
      activeColor,
      onSelectTag = () => {},
      onSelectCard = () => {},
      LinkComponent,
      // "masonry" (default): same card design as the web / masonry section
      // (natural-height image, description hidden on mobile).
      // "legacy": the previous square-cropped product-style card.
      cardVariant = "masonry",
      className,
    },
    ref
  ) => {
    return (
      <Wrapper
        ref={ref}
        limitTags={limitTags}
        limitTagsForMobile={limitTagsForMobile}
        limitCards={limit}
        limitCardsForMobile={limitForMobile}
        cardVariant={cardVariant}
        className={`lp-section lp-field-of-interests-with-tags-cards-section${
          className ? ` ${className}` : ""
        }`}
      >
        <div className="wrapper__heading">
          {title && <div className="wrapper__title">{title}</div>}
          {subtitle && <div className="wrapper__subtitle">{subtitle}</div>}
        </div>
        <SuspenseFieldOfInterestsWithTagsTag
          isLoading={isLoadingTags}
          keyPrefix="field-of-interests-with-tags-tag"
        >
          <div className="wrapper__tags">
            {tags?.map((tag, idx) => (
              <FieldOfInterestsWithTagsCardTag
                key={`field-of-interests-with-tags-card-tag__${idx + 1}`}
                icon={tag?.icon}
                name={tag?.title}
                isActive={tag?.code === selectedTag}
                activeColor={activeColor}
                onSelectCard={() => onSelectTag?.(tag)}
              />
            ))}
          </div>
        </SuspenseFieldOfInterestsWithTagsTag>
        <SuspenseFieldOfInterestsWithTagsCard
          isLoading={isLoadingTags || isLoadingCards}
          keyPrefix="field-of-interests-with-tags-card"
        >
          <div className="wrapper__cards">
            {items?.map((card, idx) =>
              cardVariant === "legacy" ? (
                <FieldOfInterestsWithTagsCard
                  key={`field-of-interests-with-tags-card__${idx + 1}`}
                  image={card?.image}
                  imageComponent={card?.imageComponent}
                  name={card?.title}
                  description={card?.description}
                  onSelectCard={() => onSelectCard?.(card)}
                  uuid={card?.uuid}
                  nameSlug={card?.nameSlug}
                  LinkComponent={LinkComponent}
                />
              ) : (
                <FieldOfInterestsMasonryCard
                  key={`field-of-interests-with-tags-card__${idx + 1}`}
                  image={card?.image}
                  imageComponent={card?.imageComponent}
                  title={card?.title}
                  description={card?.description}
                  onSelectCard={() => onSelectCard?.(card)}
                  className="wrapper__card"
                  link={getCardLink(card)}
                  LinkComponent={LinkComponent}
                />
              )
            )}
          </div>
        </SuspenseFieldOfInterestsWithTagsCard>
      </Wrapper>
    );
  }
);

export default FieldOfInterestsWithTagsCardsSection;
