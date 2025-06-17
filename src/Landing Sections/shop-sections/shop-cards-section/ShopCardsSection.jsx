import { forwardRef } from "react";

import ShopCard from "../../../Landing Components/shop-components/shop-card";
import ShopCardSkeleton from "../../../Landing Components/shop-components/shop-card/skeleton";
import { Wrapper } from "./style";

const ShopCardsSection = forwardRef(
  (
    {
      title,
      subtitle,
      cards,
      limitCards = 4,
      limitCardsForMobile = 2,
      onSelectCard = () => {},
    },
    ref
  ) => {
    const handleSelectCard = (card) => {
      onSelectCard?.(card?.uuid);
    };

    return (
      <Wrapper
        limitCards={limitCards}
        limitCardsForMobile={limitCardsForMobile}
      >
        <div className="wrapper__heading">
          {title && <div className="wrapper__title">{title}</div>}
          {subtitle && <div className="wrapper__subtitle">{subtitle}</div>}
        </div>
        <div className="wrapper__cards">
          {cards && cards?.length > 0
            ? cards?.map((card, idx) => (
                <ShopCard
                  key={`shop-card__${idx + 1}`}
                  uuid={card?.uuid}
                  title={card?.title}
                  subtitle={card?.subtitle}
                  image={card?.image}
                  products={card?.products}
                  imageComponent={card?.imageComponent}
                  onSelectCard={() => handleSelectCard?.(card)}
                />
              ))
            : Array.from("1234")?.map((_, idx) => (
                <ShopCardSkeleton key={`shop-card-skeleton__${idx + 1}`} />
              ))}
        </div>
      </Wrapper>
    );
  }
);

export default ShopCardsSection;
