/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import Button from "../../../General/Button/Button";
import ShopCard from "../../../Landing Components/shop-components/shop-card";
import ShopCardSkeleton from "../../../Landing Components/shop-components/shop-card/skeleton";
import { isDefinedNotEmptyString } from "../../../_utils/utils";

import { Wrapper } from "./style";

const ShopCardsSection = forwardRef(
  (
    {
      title,
      subtitle,
      items,
      limit = 4,
      limitForMobile = 2,
      buttonText = "Show More",
      onSelectCard = () => {},
      onButtonAction = () => {},
      icon,
      getImage = () => {},
      getProductImage = () => {},
      hideProducts = false,
    },
    ref
  ) => {
    return (
      <Wrapper
        ref={ref}
        limitCards={limit}
        limitCardsForMobile={limitForMobile}
      >
        <div className="wrapper__heading">
          <div className="wrapper__title">
            {title && (
              <div className="title__text">
                {isDefinedNotEmptyString(icon) && <i className={icon} />}
                <span>{title}</span>
              </div>
            )}
            {onButtonAction && (
              <Button
                text={buttonText}
                borderRadius="curved"
                btnType="tinted"
                className="title__action"
                onClick={onButtonAction}
              />
            )}
          </div>
          {subtitle && <div className="wrapper__subtitle">{subtitle}</div>}
        </div>
        <div className="wrapper__cards">
          {items && items?.length > 0
            ? items?.map((card, idx) => (
                <ShopCard
                  key={`shop-card__${idx + 1}`}
                  uuid={card?.uuid}
                  title={card?.name}
                  subtitle={card?.shortDescription}
                  rating={card?.ratingArithmeticMean}
                  reviewCount={card?.reviewCount}
                  products={card?.products}
                  imageComponent={card?.imageComponent}
                  onSelectCard={() => onSelectCard(card?.uuid)}
                  image={getImage(card?.profileImage, card?.uuid) || null}
                  getProductImage={getProductImage}
                  canAcceptPayments={card?.canAcceptPayments}
                  hideProducts={hideProducts}
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
