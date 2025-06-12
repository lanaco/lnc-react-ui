import { forwardRef, useState } from "react";

import FieldOfInterestsWithTagsCardTagSkeleton from "../../../Landing Components/field-of-interests-components/field-of-interests-with-tags-card/tag-skeleton";
import FieldOfInterestsWithTagsCardTag from "../../../Landing Components/field-of-interests-components/field-of-interests-with-tags-card/tag";
import FieldOfInterestsWithTagsCard from "../../../Landing Components/field-of-interests-components/field-of-interests-with-tags-card/card";
import FieldOfInterestsWithTagsCardSkeleton from "../../../Landing Components/field-of-interests-components/field-of-interests-with-tags-card/card-skeleton";
import { Wrapper } from "./style";

const FieldOfInterestsWithTagsCardSection = forwardRef(
  (
    { title, subtitle, tags = [], cards = [], onSelectCard = () => {} },
    ref
  ) => {
    // const [active, setActive] = useState();

    const handleSelectCard = (tag) => {
      // setActive(tag?.uuid);
      onSelectCard?.(tag?.uuid);
    };

    return (
      <Wrapper>
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
                  onSelectCard={() => handleSelectCard?.(tag)}
                />
              ))
            : Array.from("12345")?.map((_, idx) => (
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
                  onSelectCard={() => onSelectCard?.(card?.uuid)}
                />
              ))
            : Array.from("12345")?.map((_, idx) => (
                <FieldOfInterestsWithTagsCardSkeleton
                  key={`field-of-interests-with-tags-card-skeleton__${idx + 1}`}
                />
              ))}
        </div>
      </Wrapper>
    );
  }
);

export default FieldOfInterestsWithTagsCardSection;
