/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import GiftCard from "../../../Landing Components/gift-components/gift-card";
import GiftCardSkeleton from "../../../Landing Components/gift-components/gift-card/skeleton";
import { Wrapper } from "./style";

const GiftCardsSection = forwardRef(
  ({
    title,
    subtitle,
    items,
    limit = 4,
    limitForMobile = 1,
    onSelectCard = () => {},
  }) => {
    const handleSelectCard = (card) => {
      onSelectCard?.(card?.uuid);
    };

    return (
      <Wrapper
        limitCards={limit}
        limitCardsForMobile={limitForMobile}
      >
        <div className="wrapper__heading">
          {title && <div className="wrapper__title">{title}</div>}
          {subtitle && <div className="wrapper__subtitle">{subtitle}</div>}
        </div>
        <div className="wrapper__cards">
          {items && items?.length > 0
            ? items?.map((card, idx) => (
                <GiftCard
                  key={`gift-card__${idx + 1}`}
                  uuid={card?.uuid}
                  text={card?.text}
                  price={card?.price}
                  currency={card?.currency}
                  image={card?.image}
                  imageComponent={card?.imageComponent}
                  onSelectCard={() => handleSelectCard?.(card)}
                />
              ))
            : Array.from("1234")?.map((_, idx) => (
                <GiftCardSkeleton key={`gift-card-skeleton__${idx + 1}`} />
              ))}
        </div>
      </Wrapper>
    );
  }
);

export default GiftCardsSection;
