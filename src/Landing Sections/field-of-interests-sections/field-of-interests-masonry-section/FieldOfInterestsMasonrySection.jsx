/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useLayoutEffect } from "react";

import { isDefinedNotEmptyString } from "../../../_utils/utils";
import FieldOfInterestsMasonryTagSkeleton from "../../../Landing Components/field-of-interests-components/field-of-interests-masonry/tag-skeleton";
import FieldOfInterestsMasonryTag from "../../../Landing Components/field-of-interests-components/field-of-interests-masonry/tag";
import FieldOfInterestsMasonry from "../../../Landing Components/field-of-interests-components/field-of-interests-masonry/card";
import FieldOfInterestsMasonrySkeleton from "../../../Landing Components/field-of-interests-components/field-of-interests-masonry/card-skeleton";
import { Wrapper } from "./style";

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
    },
    ref
  ) => {
    useLayoutEffect(() => {
      if (!isDefinedNotEmptyString(className)) {
        return;
      }

      const applyMasonry = () => {
        const grid = document.querySelector(`.${className} .wrapper__cards`);
        const items = grid.querySelectorAll(".wrapper__card");

        items.forEach((item) => {
          const itemHeight = item.getBoundingClientRect().height;
          const rowSpan = Math.ceil((itemHeight + 10) / 20);
          item.style.gridRowEnd = `span ${rowSpan}`;
        });

        const lastItem = items?.[items.length - 1];
        if (lastItem) {
          const bottom = lastItem.offsetTop + lastItem.offsetHeight;
          grid.style.height = `${bottom}px`;
        }
      };

      const grid = document.querySelector(`.${className} .wrapper__cards`);
      const imgs = grid.querySelectorAll(".wrapper__image");

      let imgsLoaded = 0;

      if (imgs.length === 0) {
        applyMasonry();
      } else {
        imgs.forEach((img) => {
          if (img.complete) {
            imgsLoaded++;
          } else {
            img.addEventListener("load", () => {
              imgsLoaded++;

              if (imgsLoaded === imgs.length) {
                applyMasonry();
              }
            });
          }
        });

        if (imgsLoaded === imgs.length) {
          applyMasonry();
        }
      }

      window.addEventListener("resize", applyMasonry);

      return () => {
        window.removeEventListener("resize", applyMasonry);
      };
    }, [className, items]);

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
        <div className="wrapper__tags__external">
          <div className="wrapper__tags">
            {tags && tags?.length > 0
              ? tags?.map((tag, idx) => (
                  <FieldOfInterestsMasonryTag
                    key={`field-of-interests-masonry-tag__${idx + 1}`}
                    icon={tag?.icon}
                    text={tag?.title}
                    isActive={tag?.code === selectedTag}
                    onSelectCard={() => onSelectTag?.(tag)}
                  />
                ))
              : Array.from("12345")?.map((_, idx) => (
                  <FieldOfInterestsMasonryTagSkeleton
                    key={`field-of-interests-masonry-tag-skeleton__${idx + 1}`}
                  />
                ))}
          </div>
        </div>
        <div className="wrapper__cards">
          {items && items?.length > 0
            ? items?.map((card, idx) => (
                <FieldOfInterestsMasonry
                  key={`field-of-interests-with-tags-card__${idx + 1}`}
                  image={card?.image}
                  imageComponent={card?.imageComponent}
                  title={card?.title}
                  description={card?.description}
                  onSelectCard={() => onSelectCard?.(card)}
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
