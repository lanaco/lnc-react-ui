/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import GeneralWithTagsCardTag from "../../../Landing Components/general-components/general-with-tags-card/tag";
import GeneralWithTagsCard from "../../../Landing Components/general-components/general-with-tags-card/card";
import { Wrapper } from "./style";
import SuspenseFieldOfInterestsWithTagsTag from "../../../Landing Components/skeleton-components/field-of-interests/field-of-interests-with-tags/tags";
import SuspenseFieldOfInterestsWithTagsCard from "../../../Landing Components/skeleton-components/field-of-interests/field-of-interests-with-tags/cards";

const GeneralWithTagsCardsSection = forwardRef(
  (
    {
      title,
      subtitle,
      options = [],
      limitTags = 7,
      limitTagsForMobile = 2,
      limit = 3,
      limitForMobile = 3,
      items = [],
      onSelectTag = () => {},
      onSelectCard = () => {},
      isLoadingTags = false,
      isLoadingCards = false,
      LinkComponent
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
        <SuspenseFieldOfInterestsWithTagsCard
          isLoading={isLoadingCards}
          keyPrefix="general-with-tags-cards-card"
        >
          <div className="wrapper__cards">
            {items?.map((card, idx) => (
              <GeneralWithTagsCard
                key={`general-with-tags-card__${idx + 1}`}
                imageUrl={card?.imageUrl}
                imageComponent={card?.imageComponent}
                title={card?.title}
                selectAction={card?.selectAction}
                onSelectCard={() => {
                  onSelectCard?.(card);
                }}
                LinkComponent={LinkComponent}
              />
            ))}
          </div>
        </SuspenseFieldOfInterestsWithTagsCard>
        <SuspenseFieldOfInterestsWithTagsTag
          isLoading={isLoadingTags}
          keyPrefix="general-with-tags-cards-tag"
        >
          <div className="wrapper__tags">
            {options?.map((tag, idx) => (
              <GeneralWithTagsCardTag
                key={`general-with-tags-card-tag__${idx + 1}`}
                icon={tag?.icon}
                title={tag?.title}
                onSelectCard={() => onSelectTag?.(tag)}
                selectAction={tag?.selectAction}
                LinkComponent={LinkComponent}
              />
            ))}
          </div>
        </SuspenseFieldOfInterestsWithTagsTag>
      </Wrapper>
    );
  }
);

export default GeneralWithTagsCardsSection;
