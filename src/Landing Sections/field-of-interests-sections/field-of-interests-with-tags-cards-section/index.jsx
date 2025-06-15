import { forwardRef, useState } from "react";

import FieldOfInterestsWithTagsCardTagSkeleton from "../../../Landing Components/field-of-interests-components/field-of-interests-with-tags-card/tag-skeleton";
import FieldOfInterestsWithTagsCardTag from "../../../Landing Components/field-of-interests-components/field-of-interests-with-tags-card/tag";
import FieldOfInterestsWithTagsCard from "../../../Landing Components/field-of-interests-components/field-of-interests-with-tags-card/card";
import FieldOfInterestsWithTagsCardSkeleton from "../../../Landing Components/field-of-interests-components/field-of-interests-with-tags-card/card-skeleton";
import { Wrapper } from "./style";

const FieldOfInterestsWithTagsCardsSection = forwardRef(
  (
    {
      title,
      subtitle,
      tags = [],
      limitTags = 7,
      limitTagsForMobile = 7,
      limitCards = 3,
      limitCardsForMobile = 2,
      cards = [],
      onSelectTag = () => {},
      onSelectCard = () => {},
    },
    ref
  ) => {
    // const [active, setActive] = useState();

    const handleSelectTag = (tag) => {
      // setActive(tag?.uuid);
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
        <div className="wrapper__tags">
          {tags && tags?.length > 0
            ? tags?.map((tag, idx) => (
                <FieldOfInterestsWithTagsCardTag
                  key={`field-of-interests-with-tags-card-tag__${idx + 1}`}
                  icon={tag?.icon}
                  text={tag?.text}
                  // isActive={tag?.uuid === active}
                  onSelectCard={() => handleSelectTag?.(tag)}
                />
              ))
            : Array.from("123")?.map((_, idx) => (
                <FieldOfInterestsWithTagsCardTagSkeleton
                  key={`field-of-interests-with-tags-card-tag-skeleton__${
                    idx + 1
                  }`}
                />
              ))}
        </div>
        <div className="wrapper__cards">
          {cards && cards?.length > 0
            ? cards?.map((card, idx) => (
                <FieldOfInterestsWithTagsCard
                  key={`field-of-interests-with-tags-card__${idx + 1}`}
                  image={card?.image}
                  imageComponent={card?.imageComponent}
                  title={card?.title}
                  description={card?.description}
                  onSelectCard={() => handleSelectCard?.(card?.uuid)}
                />
              ))
            : Array.from("123")?.map((_, idx) => (
                <FieldOfInterestsWithTagsCardSkeleton
                  key={`field-of-interests-with-tags-card-skeleton__${idx + 1}`}
                />
              ))}
        </div>
      </Wrapper>
    );
  }
);

export default FieldOfInterestsWithTagsCardsSection;
