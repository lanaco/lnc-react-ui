import { forwardRef, memo, useMemo } from "react";

import CategorySimpleCard from "../../Landing Components/category-components/category-simple-card/CategorySimpleCard";
import SuspenseSimpleCategoryCard from "../../Landing Components/skeleton-components/categories-skeletons/suspense-categories-card-simple";
import { Wrapper } from "../style";

const MemoizedCategorySimpleCard = memo(CategorySimpleCard);

const BlogCategoryCardsSection = forwardRef(
  ({ items, onSelectCard = () => {}, isLoading = false, limit = 4 }, ref) => {
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
      <Wrapper>
        <div className="wrapper__grid">
          <SuspenseSimpleCategoryCard
            isLoading={isLoading}
            limit={limit}
            keyPrefix="blog-section"
          >
            {memoizedCategories}
          </SuspenseSimpleCategoryCard>
        </div>
      </Wrapper>
    );
  }
);

export default BlogCategoryCardsSection;
