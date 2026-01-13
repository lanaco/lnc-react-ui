/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import Button from "../../../General/Button/Button";
import ShopCard from "../../../Landing Components/shop-components/shop-card";
import { isDefinedNotEmptyString } from "../../../_utils/utils";

import { Wrapper } from "./style";
import SuspenseShopCards from "../../../Landing Components/skeleton-components/shop/shop-cards";

const ShopCardsSection = forwardRef(
  (
    {
      title,
      subtitle,
      items,
      isLoading = false,
      limit = 4,
      limitForMobile = 2,
      buttonText = "Show More",
      onSelectCard = () => {},
      onButtonAction = () => {},
      icon,
      getImage = () => {},
      getProductImage = () => {},
      hideProducts = false,
      showRating = true,
      gridView = false,
      componentName,
    },
    ref
  ) => {
    return (
      <Wrapper
        ref={ref}
        limitCards={limit}
        limitCardsForMobile={limitForMobile}
        gridView={gridView}
      >
        <div className="wrapper__heading">
          <div className="wrapper__title">
            {title && (
              <div className="title__text">
                {isDefinedNotEmptyString(icon) && <i className={icon} />}
                <span>{title}</span>
              </div>
            )}
            {onButtonAction && !isLoading && (
              <Button
                text={buttonText}
                color="neutral"
                borderRadius="curved"
                btnType="tinted"
                className={`title__action ${gridView ? "grid" : ""}`}
                onClick={onButtonAction}
              />
            )}
          </div>
          {subtitle && <div className="wrapper__subtitle">{subtitle}</div>}
        </div>
        <SuspenseShopCards
          isLoading={isLoading}
          keyPrefix="shop-cards-skeleton"
        >
          <div className="wrapper__cards">
            {items?.map((card, idx) => (
              <ShopCard
                showRating={showRating}
                key={`shop-card__${idx + 1}`}
                uuid={card?.uuid}
                title={card?.name}
                subtitle={card?.shortDescription}
                rating={card?.ratingArithmeticMean}
                reviewCount={card?.reviewCount}
                products={card?.products}
                imageComponent={card?.imageComponent}
                onSelectCard={(e, shopCardRef) =>
                  onSelectCard(card?.uuid, shopCardRef)
                }
                image={getImage(card?.profileImage, card?.uuid) || null}
                getProductImage={getProductImage}
                canAcceptPayments={card?.canAcceptPayments}
                hideProducts={hideProducts}
                metadata={{ name: componentName, accessor: card?.accessor }}
              />
            ))}
          </div>
        </SuspenseShopCards>

        {gridView && onButtonAction && !isLoading && (
          <Button
            text={buttonText}
            borderRadius="curved"
            btnType="basic"
            color="neutral"
            className="wrapper__view-all"
            onClick={onButtonAction}
          />
        )}
      </Wrapper>
    );
  }
);

export default ShopCardsSection;
