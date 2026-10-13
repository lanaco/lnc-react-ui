/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import { isDefined } from "../../../_utils/utils";
import { CategoryCardsWrapper } from "./categoryCardsStyle";

const MAX_PER_ROW = 7;

/**
 * GeneralWithTagsCardsSection, variant "categoryCards" ("Top kategorije").
 * Mirrors WebFrontend SimpleGeneralCategoryCardsSection.astro:
 *   3, 4, 6, 7 items -> image on top, label below
 *   5 items          -> taller image, label as a pill overlaid bottom-left
 *   8 items          -> two rows of 4
 *   1-2 items        -> laid out like 3
 * Mobile (<=767px): one horizontal scroll row of 8.5rem cards.
 * Tags (`options`) are not part of this design and are not rendered.
 */
const CategoryCardsVariant = forwardRef(
  ({ title, items = [], onSelectCard = () => {}, LinkComponent }, ref) => {
    const list = items || [];
    const count = list.length;

    if (count === 0) return null;

    const columns =
      count === 8 ? 4 : Math.min(Math.max(count, 3), MAX_PER_ROW);
    const isOverlay = count === 5;
    const Component = LinkComponent || "a";

    return (
      <CategoryCardsWrapper
        ref={ref}
        columns={columns}
        isOverlay={isOverlay}
        className="lp-section lp-general-section lp-general-with-tags-cards-section lp-simple-general-category-cards"
      >
        {title && <h2 className="cat-cards__title">{title}</h2>}
        <div className="cat-cards__grid">
          {list.map((item, index) => {
            const link = item?.selectAction ? `/${item.selectAction}` : undefined;
            const linkProps = link
              ? LinkComponent
                ? { to: link }
                : { href: link }
              : {};

            return (
              <Component
                key={`cat-card__${index + 1}`}
                className="cat-card"
                onClick={() => onSelectCard?.(item)}
                {...linkProps}
              >
                <span className="cat-card__media">
                  {isDefined(item?.imageComponent) ? (
                    item.imageComponent
                  ) : (
                    <>
                      <img
                        src={item?.imageUrl}
                        alt={item?.title || ""}
                        loading="lazy"
                        className="cat-card__img cat-card__img--desktop"
                      />
                      <img
                        src={item?.imageUrlMobile || item?.imageUrl}
                        alt={item?.title || ""}
                        loading="lazy"
                        className="cat-card__img cat-card__img--mobile"
                      />
                    </>
                  )}
                </span>
                {item?.title && (
                  <span className="cat-card__label">{item.title}</span>
                )}
              </Component>
            );
          })}
        </div>
      </CategoryCardsWrapper>
    );
  },
);

export default CategoryCardsVariant;
