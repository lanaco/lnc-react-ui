import { forwardRef, useState } from "react";

import FieldOfInterestsMasonryTagSkeleton from "../../../Landing Components/field-of-interests-components/field-of-interests-masonry/tag-skeleton";
import FieldOfInterestsMasonryTag from "../../../Landing Components/field-of-interests-components/field-of-interests-masonry/tag";
import FieldOfInterestsMasonry from "../../../Landing Components/field-of-interests-components/field-of-interests-masonry/card";
import FieldOfInterestsMasonrySkeleton from "../../../Landing Components/field-of-interests-components/field-of-interests-masonry/card-skeleton";
import { Wrapper } from "./style";
import { useEffectOnce } from "react-use";

const FieldOfInterestsMasonrySection = forwardRef(
  (
    {
      title,
      subtitle,
      tags = [],
      cards = [],
      limitTags = 5,
      limitTagsForMobile = 5,
      limitCards = 3,
      limitCardsForMobile = 2,
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

    useEffectOnce(() => {
      const applyMasonry = () => {
        const grid = document.querySelector(".wrapper__cards");
        const items = grid.querySelectorAll(".wrapper__card");

        items.forEach((item) => {
          const itemHeight = item.getBoundingClientRect().height;
          const rowSpan = Math.ceil((itemHeight + 10) / (10 + 10));
          item.style.gridRowEnd = `span ${rowSpan}`;
        });
      };

      applyMasonry();
      window.addEventListener("resize", applyMasonry);

      return () => {
        window.removeEventListener("resize", applyMasonry);
      };
    });

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
                <FieldOfInterestsMasonryTag
                  key={`field-of-interests-masonry-tag__${idx + 1}`}
                  icon={tag?.icon}
                  text={tag?.text}
                  // isActive={tag?.uuid === active}
                  onSelectCard={() => handleSelectTag?.(tag)}
                />
              ))
            : Array.from("12345")?.map((_, idx) => (
                <FieldOfInterestsMasonryTagSkeleton
                  key={`field-of-interests-masonry-tag-skeleton__${idx + 1}`}
                />
              ))}
        </div>
        <div className="wrapper__cards">
          {cards && cards?.length > 0
            ? cards?.map((card, idx) => (
                <FieldOfInterestsMasonry
                  key={`field-of-interests-with-tags-card__${idx + 1}`}
                  image={card?.image}
                  imageComponent={card?.imageComponent}
                  title={card?.title}
                  description={card?.description}
                  onSelectCard={() => handleSelectCard?.(card?.uuid)}
                  className="wrapper__card"
                />
              ))
            : Array.from("12345")?.map((_, idx) => (
                <FieldOfInterestsMasonrySkeleton
                  key={`field-of-interests-with-tags-card-skeleton__${idx + 1}`}
                />
              ))}
        </div>
      </Wrapper>
    );
  }
);

export default FieldOfInterestsMasonrySection;
