/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useLayoutEffect, useRef } from "react";

import FieldOfInterestsMasonryTag from "../../../Landing Components/field-of-interests-components/field-of-interests-masonry/tag";
import FieldOfInterestsMasonry from "../../../Landing Components/field-of-interests-components/field-of-interests-masonry/card";
import { Wrapper } from "./style";
import SuspenseFieldOfInterestsMasonryTag from "../../../Landing Components/skeleton-components/field-of-interests/field-of-interests-masonry/tags";
// import SuspenseFieldOfInterestsMasonryCard from "../../../Landing Components/skeleton-components/field-of-interests/field-of-interests-masonry/cards";

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
      // isLoadingCards = false,
      LinkComponent,
    },
    ref,
  ) => {
    // Own ref to the cards grid. Never query the global `document` or listen
    // on the global `window`: the section may be rendered through a portal
    // into an iframe (e.g. backoffice mobile preview), where those globals
    // belong to the parent app.
    const gridRef = useRef(null);

    useLayoutEffect(() => {
      const grid = gridRef.current;
      if (!grid) {
        return;
      }

      const view = grid.ownerDocument?.defaultView;
      let isDisposed = false;

      const applyMasonry = () => {
        if (isDisposed) return;

        const cards = grid.querySelectorAll(".wrapper__card");
        let bottom = 0;

        cards.forEach((card) => {
          const cardHeight = card.getBoundingClientRect().height;
          const rowSpan = Math.ceil((cardHeight + 10) / 20);
          card.style.gridRowEnd = `span ${rowSpan}`;
        });

        cards.forEach((card) => {
          bottom = Math.max(bottom, card.offsetTop + card.offsetHeight);
        });

        if (cards.length > 0) {
          grid.style.height = `${bottom}px`;
        } else {
          grid.style.height = "";
        }
      };

      // Run once every image in the grid has either loaded or failed (a
      // broken image must not block the layout forever).
      const imgs = Array.from(grid.querySelectorAll("img"));
      const pending = imgs.filter((img) => !img.complete);
      let settled = 0;

      const onImageSettled = () => {
        settled++;
        if (settled === pending.length) {
          applyMasonry();
        }
      };

      pending.forEach((img) => {
        img.addEventListener("load", onImageSettled);
        img.addEventListener("error", onImageSettled);
      });

      if (pending.length === 0) {
        applyMasonry();
      }

      // Re-apply when the grid's width changes (that is what changes card
      // heights). Prefer a ResizeObserver from the grid's own window; fall
      // back to that window's resize event.
      let resizeObserver;
      let lastWidth = grid.getBoundingClientRect().width;

      const ResizeObserverCtor = view?.ResizeObserver;
      if (typeof ResizeObserverCtor === "function") {
        resizeObserver = new ResizeObserverCtor((entries) => {
          const width = entries?.[0]?.contentRect?.width;
          if (width === undefined || width === lastWidth) return;
          lastWidth = width;
          applyMasonry();
        });
        resizeObserver.observe(grid);
      } else {
        view?.addEventListener("resize", applyMasonry);
      }

      return () => {
        isDisposed = true;
        pending.forEach((img) => {
          img.removeEventListener("load", onImageSettled);
          img.removeEventListener("error", onImageSettled);
        });
        if (resizeObserver) {
          resizeObserver.disconnect();
        } else {
          view?.removeEventListener("resize", applyMasonry);
        }
      };
    }, [items]);

    return (
      <Wrapper
        ref={ref}
        limitTags={limitTags}
        limitTagsForMobile={limitTagsForMobile}
        limitCards={limit}
        limitCardsForMobile={limitForMobile}
        className={`lp-section lp-field-of-interests-masonry-section${className ? ` ${className}` : ""}`}
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
        <div className="wrapper__cards" ref={gridRef}>
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
      </Wrapper>
    );
  },
);

export default FieldOfInterestsMasonrySection;
