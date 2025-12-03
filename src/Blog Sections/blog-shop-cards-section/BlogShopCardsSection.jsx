import { forwardRef, memo, useMemo } from "react";

import useDetectMobile from "../../_utils/useDetectMobile";
import ShopCard from "../../Landing Components/shop-components/shop-card";
import SuspenseShopCards from "../../Landing Components/skeleton-components/shop-skeletons/suspense-shop-cards";
import Button from "../../General/Button/Button";
import { Wrapper } from "../style";

const MemoizedShopCard = memo(ShopCard);

const BlogShopCardsSection = forwardRef(
  (
    {
      buttonText,
      buttonLink,
      items,
      onButtonAction = () => {},
      onSelectCard = () => {},
      isLoading = false,
      limit = 4,
      getImage = () => {},
      isHighlight = false,
    },
    ref
  ) => {
    const isMobile = useDetectMobile();

    const memoizedShops = useMemo(() => {
      return items
        ?.slice(0, 4)
        ?.map((x, index) => (
          <MemoizedShopCard
            key={`shop-card__${index + 1}`}
            uuid={x?.uuid}
            title={x?.name}
            subtitle={x?.shortDescription}
            rating={x?.rating}
            reviewCount={x?.reviewCount}
            onSelectCard={() => onSelectCard?.(x?.uuid)}
            image={getImage(x?.profileImage, x?.uuid) || null}
            hideProducts={true}
          />
        ));
    }, [items]);

    return (
      <Wrapper ref={ref} className={isHighlight ? "highlight" : ""}>
        <div className="wrapper__grid">
          <SuspenseShopCards
            isLoading={isLoading}
            limit={limit}
            keyPrefix="blog-section"
          >
            {memoizedShops}
          </SuspenseShopCards>
        </div>
        <Button
          text={buttonText}
          borderRadius="curved"
          btnType={isMobile ? "basic" : "outline"}
          color="neutral"
          className="wrapper__action"
          onClick={() => onButtonAction(buttonLink)}
        />
      </Wrapper>
    );
  }
);

export default BlogShopCardsSection;
