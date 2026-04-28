/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, memo, useMemo } from "react";

import CategoryCard from "../../../Landing Components/category-components/category-cards";
import { Wrapper } from "./style";

const MemoizedCategoryCard = memo(CategoryCard);

const CategoryCardsSection = forwardRef(
  (
    { title, items, onSelectCard = () => {}, componentName, LinkComponent },
    ref,
  ) => {
    const memoizedCards = useMemo(() => {
      return items?.map((x, idx) => (
        <MemoizedCategoryCard
          key={`category-card__${idx + 1}`}
          name={x?.name}
          imageUrl={x?.imageUrl}
          borderColor={x?.borderColor}
          onSelectCard={(e, cardRef) => onSelectCard?.(x, cardRef)}
          LinkComponent={LinkComponent}
        />
      ));
    }, [items]);

    return (
      <Wrapper ref={ref}>
        {title && <div className="wrapper__title">{title}</div>}
        <div className="wrapper__grid">{memoizedCards}</div>
      </Wrapper>
    );
  },
);

export default CategoryCardsSection;
