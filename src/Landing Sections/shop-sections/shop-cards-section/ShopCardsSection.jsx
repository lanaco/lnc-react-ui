/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useRef } from "react";

import Button from "../../../General/Button/Button";
import ShopCard from "../../../Landing Components/shop-components/shop-card";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import useDetectMobile from "../../../_utils/useDetectMobile";
import {
  EndCta,
  ScrollButtons,
  ScrollViewport,
  SectionHeader,
  useScrollButtons,
} from "../../products-sections/_shared";

import { Wrapper } from "./style";
import SuspenseShopCards from "../../../Landing Components/skeleton-components/shop/shop-cards";

/**
 * Mirrors the web ShopCardsSection.astro:
 *  - header: icon (iconColor) + title + optional red `badge`, tinted button
 *    only when buttonText && buttonLink && !showMoreAtEnd; subtitle and
 *    description below;
 *  - desktop grid of `limit` columns, or with `scrollHorizontal` one
 *    scrollable row with prev/next buttons on overflow;
 *  - showMoreAtEnd: the button becomes an arrow end-card after the shops.
 */
const ShopCardsSection = forwardRef(
  (
    {
      title,
      subtitle,
      description,
      items,
      isLoading = false,
      limit = 4,
      limitForMobile = 2,
      buttonText,
      buttonLink,
      onSelectCard = () => {},
      onButtonAction = () => {},
      icon,
      iconColor,
      badge,
      getImage = () => {},
      getProductImage = () => {},
      hideProducts = false,
      showRating = true,
      gridView = false,
      scrollHorizontal = false,
      showMoreAtEnd = false,
      componentName,
      LinkComponent,
    },
    ref,
  ) => {
    const isMobile = useDetectMobile();
    const rowRef = useRef(null);
    const isScrollRow = scrollHorizontal && !gridView && isMobile !== true;

    const { canPrev, canNext, scrollPrev, scrollNext } = useScrollButtons(
      rowRef,
      [items, isMobile, limit, isScrollRow, showMoreAtEnd, isLoading],
    );

    const hasButton =
      isDefinedNotEmptyString(buttonText) &&
      isDefinedNotEmptyString(buttonLink);
    const hasEndCta = showMoreAtEnd && hasButton && !gridView;

    const cards = (
      <>
        {items?.map((card, idx) => (
          <ShopCard
            showRating={showRating}
            key={`shop-card__${idx + 1}`}
            uuid={card?.uuid}
            title={card?.name ?? card?.title}
            subtitle={card?.shortDescription ?? card?.subtitle}
            rating={card?.ratingArithmeticMean}
            reviewCount={card?.reviewCount}
            products={card?.products}
            imageComponent={card?.imageComponent}
            onSelectCard={(e, shopCardRef) =>
              onSelectCard(card?.uuid, shopCardRef)
            }
            image={
              getImage(card?.profileImage, card?.uuid) || card?.image || null
            }
            getProductImage={getProductImage}
            canAcceptPayments={card?.canAcceptPayments}
            hideProducts={hideProducts}
            metadata={{ name: componentName, accessor: card?.accessor }}
            LinkComponent={LinkComponent}
          />
        ))}
        {hasEndCta && (
          <EndCta
            buttonText={buttonText}
            buttonLink={buttonLink}
            onButtonAction={onButtonAction}
            mobileWidth="10rem"
          />
        )}
      </>
    );

    return (
      <Wrapper
        ref={ref}
        limitCards={limit}
        limitCardsForMobile={limitForMobile}
        gridView={gridView}
        className="lp-section lp-shop-cards-section"
      >
        <div className="wrapper__heading">
          <SectionHeader
            className="wrapper__title"
            icon={icon}
            iconColor={iconColor}
            title={title}
            badge={badge}
            buttonText={isLoading ? undefined : buttonText}
            buttonLink={buttonLink}
            showMoreAtEnd={showMoreAtEnd}
            onButtonAction={onButtonAction}
            buttonVariant="tinted"
            buttonClassName={`title__action ${gridView ? "grid" : ""}`}
          />
          {isDefinedNotEmptyString(subtitle) && (
            <div className="wrapper__subtitle">{subtitle}</div>
          )}
          {isDefinedNotEmptyString(description) && (
            <div className="wrapper__description">{description}</div>
          )}
        </div>
        <SuspenseShopCards
          isLoading={isLoading}
          keyPrefix="shop-cards-skeleton"
        >
          {isScrollRow ? (
            <ScrollViewport className="wrapper__viewport">
              <div
                className="wrapper__cards wrapper__cards--scroll"
                ref={rowRef}
              >
                {cards}
              </div>
              <ScrollButtons
                canPrev={canPrev}
                canNext={canNext}
                onPrev={scrollPrev}
                onNext={scrollNext}
              />
            </ScrollViewport>
          ) : (
            <div className="wrapper__cards">{cards}</div>
          )}
        </SuspenseShopCards>

        {gridView && hasButton && !isLoading && (
          <Button
            text={buttonText}
            borderRadius="curved"
            btnType="basic"
            color="neutral"
            className="wrapper__view-all"
            onClick={() => onButtonAction(buttonLink)}
          />
        )}
      </Wrapper>
    );
  },
);

export default ShopCardsSection;
