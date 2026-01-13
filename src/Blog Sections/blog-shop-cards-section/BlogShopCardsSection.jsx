/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";

import useDetectMobile from "../../_utils/useDetectMobile";
import ShopCard from "../../Landing Components/shop-components/shop-card";
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
      componentName,
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
            onSelectCard={(e, cardRef) => onSelectCard?.(x?.uuid, cardRef)}
            image={getImage(x?.profileImage, x?.uuid) || null}
            hideProducts={true}
            metadata={{ name: componentName, accessor: x?.accessor }}
          />
        ));
    }, [items]);

    return (
      <Wrapper ref={ref} className={isHighlight ? "highlight" : ""}>
        <div className="wrapper__grid">{memoizedShops}</div>
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
