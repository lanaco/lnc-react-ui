/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

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
      limit = 3,
      limitForMobile = 2,
      items = [],
      selectedTag,
      onSelectTag = () => {},
      onSelectCard = () => {},
      getImage = () => {},
    },
    ref
  ) => {
    // const [active, setActive] = useState();

    const handleSelectTag = (tag) => {
      // setActive(tag?.uuid);
      onSelectTag?.(tag);
    };

    const handleSelectCard = (card) => {
      onSelectCard?.(card);
    };

    return (
      <Wrapper
        limitTags={limitTags}
        limitTagsForMobile={limitTagsForMobile}
        limitCards={limit}
        limitCardsForMobile={limitForMobile}
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
                  name={tag?.name}
                  isActive={tag?.uuid === selectedTag?.uuid}
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
          {items && items?.length > 0
            ? items?.map((card, idx) => (
                <FieldOfInterestsWithTagsCard
                  key={`field-of-interests-with-tags-card__${idx + 1}`}
                  image={getImage(card?.image, card?.uuid, card?.sellerUuid)}
                  imageComponent={card?.imageComponent}
                  name={card?.name}
                  description={card?.shortDescription || card?.description}
                  onSelectCard={() => handleSelectCard?.(card)}
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
