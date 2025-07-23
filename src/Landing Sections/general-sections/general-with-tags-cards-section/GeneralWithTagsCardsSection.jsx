/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import GeneralWithTagsCardTagSkeleton from "../../../Landing Components/general-components/general-with-tags-card/tag-skeleton";
import GeneralWithTagsCardTag from "../../../Landing Components/general-components/general-with-tags-card/tag";
import GeneralWithTagsCard from "../../../Landing Components/general-components/general-with-tags-card/card";
import GeneralWithTagsCardSkeleton from "../../../Landing Components/general-components/general-with-tags-card/card-skeleton";
import { Wrapper } from "./style";

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
      isLoading,
    },
    ref
  ) => {
    const handleSelectTag = (tag) => {
      onSelectTag?.(tag?.uuid);
    };

    const handleSelectCard = (card) => {
      onSelectCard?.(card?.uuid);
    };

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
        <div className="wrapper__cards">
          {items && items?.length > 0
            ? items?.map((card, idx) => (
                <GeneralWithTagsCard
                  key={`general-with-tags-card__${idx + 1}`}
                  imageUrl={card?.imageUrl}
                  imageComponent={card?.imageComponent}
                  title={card?.title}
                  onSelectCard={() => handleSelectCard?.(card?.uuid)}
                />
              ))
            : Array.from("123")?.map((_, idx) => (
                <GeneralWithTagsCardSkeleton
                  key={`general-with-tags-card-skeleton__${idx + 1}`}
                />
              ))}
        </div>
        {options?.length > 0 && (
          <div className="wrapper__tags">
            {options?.map((tag, idx) => (
              <GeneralWithTagsCardTag
                key={`general-with-tags-card-tag__${idx + 1}`}
                icon={tag?.icon}
                title={tag?.title}
                onSelectCard={() => handleSelectTag?.(tag)}
              />
            ))}
          </div>
        )}

        {isLoading === true && !(options?.length > 0) && (
          <div className="wrapper__tags">
            {Array.from("123")?.map((_, idx) => (
              <GeneralWithTagsCardTagSkeleton
                key={`general-with-tags-card-tag-skeleton__${idx + 1}`}
              />
            ))}
          </div>
        )}
      </Wrapper>
    );
  }
);

export default GeneralWithTagsCardsSection;
