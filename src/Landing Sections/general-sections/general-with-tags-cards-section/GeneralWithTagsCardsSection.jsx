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
      tags = [],
      limitTags = 7,
      limitTagsForMobile = 2,
      limitCards = 3,
      limitCardsForMobile = 3,
      cards = [],
      onSelectTag = () => {},
      onSelectCard = () => {},
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
        limitTags={limitTags}
        limitTagsForMobile={limitTagsForMobile}
        limitCards={limitCards}
        limitCardsForMobile={limitCardsForMobile}
      >
        <div className="wrapper__heading">
          {title && <div className="wrapper__title">{title}</div>}
          {subtitle && <div className="wrapper__subtitle">{subtitle}</div>}
        </div>
        <div className="wrapper__cards">
          {cards && cards?.length > 0
            ? cards?.map((card, idx) => (
                <GeneralWithTagsCard
                  key={`general-with-tags-card__${idx + 1}`}
                  image={card?.image}
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
        <div className="wrapper__tags">
          {tags && tags?.length > 0
            ? tags?.map((tag, idx) => (
                <GeneralWithTagsCardTag
                  key={`general-with-tags-card-tag__${idx + 1}`}
                  icon={tag?.icon}
                  text={tag?.text}
                  onSelectCard={() => handleSelectTag?.(tag)}
                />
              ))
            : Array.from("123")?.map((_, idx) => (
                <GeneralWithTagsCardTagSkeleton
                  key={`general-with-tags-card-tag-skeleton__${idx + 1}`}
                />
              ))}
        </div>
      </Wrapper>
    );
  }
);

export default GeneralWithTagsCardsSection;
