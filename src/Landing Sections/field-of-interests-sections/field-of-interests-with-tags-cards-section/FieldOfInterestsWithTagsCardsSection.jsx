/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import FieldOfInterestsWithTagsCardTag from "../../../Landing Components/field-of-interests-components/field-of-interests-with-tags-card/tag";
import FieldOfInterestsWithTagsCard from "../../../Landing Components/field-of-interests-components/field-of-interests-with-tags-card/card";
import { Wrapper } from "./style";
import SuspenseFieldOfInterestsWithTagsCard from "../../../Landing Components/skeleton-components/field-of-interests/field-of-interests-with-tags/cards";
import SuspenseFieldOfInterestsWithTagsTag from "../../../Landing Components/skeleton-components/field-of-interests/field-of-interests-with-tags/tags";

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
          isLoading={isLoadingTags}
          keyPrefix="field-of-interests-with-tags-card"
        >
          <div className="wrapper__cards">
            {items?.map((card, idx) => (
              <FieldOfInterestsWithTagsCard
                key={`field-of-interests-with-tags-card__${idx + 1}`}
                image={card?.image}
                imageComponent={card?.imageComponent}
                name={card?.title}
                description={card?.description}
                onSelectCard={() => onSelectCard?.(card)}
              />
            ))}
          </div>
        </SuspenseFieldOfInterestsWithTagsCard>
      </Wrapper>
    );
  }
);

export default FieldOfInterestsWithTagsCardsSection;
