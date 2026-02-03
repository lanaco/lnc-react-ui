/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useLayoutEffect } from "react";

import { isDefinedNotEmptyString } from "../../../_utils/utils";
import FieldOfInterestsMasonryTag from "../../../Landing Components/field-of-interests-components/field-of-interests-masonry/tag";
import FieldOfInterestsMasonry from "../../../Landing Components/field-of-interests-components/field-of-interests-masonry/card";
import { Wrapper } from "./style";
import SuspenseFieldOfInterestsMasonryTag from "../../../Landing Components/skeleton-components/field-of-interests/field-of-interests-masonry/tags";
import SuspenseFieldOfInterestsMasonryCard from "../../../Landing Components/skeleton-components/field-of-interests/field-of-interests-masonry/cards";

const FieldOfInterestsMasonrySection = forwardRef(
  (
    {
      title,
      subtitle,
      tags = [],
      items = [],
      limitTags = 5,
      limitTagsForMobile = 5,
      limit = 3,
      limitForMobile = 2,
      selectedTag,
      onSelectTag = () => {},
      onSelectCard = () => {},
      className,
      isLoadingTags = false,
      isLoadingCards = false,
      LinkComponent
    },
    ref
  ) => {
    useLayoutEffect(() => {
      if (!isDefinedNotEmptyString(className)) {
        return;
      }

      const applyMasonry = () => {
        const grid = document?.querySelector(`.${className} .wrapper__cards`);
        const items = grid?.querySelectorAll(".wrapper__card");

        items?.forEach((item) => {
          const itemHeight = item.getBoundingClientRect().height;
          const rowSpan = Math.ceil((itemHeight + 10) / 20);
          item.style.gridRowEnd = `span ${rowSpan}`;
        });

        const lastItem = items?.[items?.length - 1];
        if (lastItem) {
          const bottom = lastItem.offsetTop + lastItem.offsetHeight;
          grid.style.height = `${bottom}px`;
        }
      };

      const grid = document?.querySelector(`.${className} .wrapper__cards`);
      const imgs = grid?.querySelectorAll(".wrapper__image");

      let imgsLoaded = 0;

      if (imgs?.length === 0) {
        applyMasonry();
      } else {
        imgs?.forEach((img) => {
          if (img.complete) {
            imgsLoaded++;
          } else {
            img.addEventListener("load", () => {
              imgsLoaded++;

              if (imgsLoaded === imgs?.length) {
                applyMasonry();
              }
            });
          }
        });

        if (imgsLoaded === imgs?.length) {
          applyMasonry();
        }
      }

      window.addEventListener("resize", applyMasonry);

      return () => {
        window.removeEventListener("resize", applyMasonry);
      };
    }, [className, items, isLoadingCards]);

    return (
      <Wrapper
        ref={ref}
        limitTags={limitTags}
        limitTagsForMobile={limitTagsForMobile}
        limitCards={limit}
        limitCardsForMobile={limitForMobile}
        className={className}
        numberOfTags={tags?.length}
      >
        <div className="wrapper__heading">
          {title && <div className="wrapper__title">{title}</div>}
          {subtitle && <div className="wrapper__subtitle">{subtitle}</div>}
        </div>
        <SuspenseFieldOfInterestsMasonryTag
          isLoading={isLoadingTags}
          keyPrefix="field-of-interests-masonry-tag"
        >
          <div className="wrapper__tags__external">
            <div className="wrapper__tags">
              {tags?.map((tag, idx) => (
                <FieldOfInterestsMasonryTag
                  key={`field-of-interests-masonry-tag__${idx + 1}`}
                  icon={tag?.icon}
                  text={tag?.title}
                  isActive={tag?.code === selectedTag}
                  onSelectCard={() => onSelectTag?.(tag)}
                />
              ))}
            </div>
          </div>
        </SuspenseFieldOfInterestsMasonryTag>
        <SuspenseFieldOfInterestsMasonryCard
          isLoading={isLoadingCards}
          keyPrefix="field-of-interests-masonry-card"
        >
          <div className="wrapper__cards">
            {items?.map((card, idx) => (
              <FieldOfInterestsMasonry
                key={`field-of-interests-with-tags-card__${idx + 1}`}
                image={card?.image}
                imageComponent={card?.imageComponent}
                title={card?.title}
                description={card?.description}
                onSelectCard={() => onSelectCard?.(card)}
                className="wrapper__card"
                link={card?.link}
                LinkComponent={LinkComponent}
              />
            ))}
          </div>
        </SuspenseFieldOfInterestsMasonryCard>
      </Wrapper>
    );
  }
);

export default FieldOfInterestsMasonrySection;
