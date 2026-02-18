/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, memo, useMemo } from "react";

import CategorySimpleCard from "../../Landing Components/category-components/category-simple-card/CategorySimpleCard";
import { Wrapper } from "../style";

const MemoizedCategorySimpleCard = memo(CategorySimpleCard);

const BlogCategoryCardsSection = forwardRef(
  (
    {
      items,
      onSelectCard = () => {},

      isHighlight = false,
    },
    ref,
  ) => {
    const memoizedCategories = useMemo(() => {
      return items
        ?.slice(0, 4)
        ?.map((x, index) => (
          <MemoizedCategorySimpleCard
            key={index}
            uuid={x?.uuid}
            image={x?.image}
            name={x?.name}
            onSelectCard={() => onSelectCard?.(x?.uuid)}
          />
        ));
    }, [items]);

    return (
      <Wrapper ref={ref} className={isHighlight ? "highlight" : ""}>
        <div className="wrapper__grid">{memoizedCategories}</div>
      </Wrapper>
    );
  },
);

export default BlogCategoryCardsSection;
