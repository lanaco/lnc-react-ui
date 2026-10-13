/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo, useRef } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import DetailedProductCard from "../../../Landing Components/product components/detailed-product-card";
import SuspenseDetailedProductCard from "../../../Landing Components/skeleton-components/product/detailed-product-card";
import { ScrollButtons, ScrollViewport, useScrollButtons } from "../_shared";

const MemoizedProductCard = memo(DetailedProductCard);

/**
 * Mirrors the web UrgentSaleProductsSection.astro:
 *  - renders nothing when there are no items (once loading has finished);
 *  - desktop: grid of the first `limit` items, or with `scrollHorizontal` one
 *    scrollable row of ALL items with prev/next buttons on overflow;
 *  - mobile: every item in a horizontal scroll row;
 *  - darkMode: near-black fill instead of the light red one.
 */
const UrgentSaleProductsSection = forwardRef((props, ref) => {
  const {
    items,
    limit = 5,
    onSelectCard = () => {},
    title = "Urgent sale",
    isLoading = false,
    getImage = () => {},
    negotiableText,
    freeText,
    tradeText,
    quantityText,
    onBookmark = () => {},
    actionComponent,
    componentName,
    sponsoredText,
    LinkComponent,
    darkMode = false,
    scrollHorizontal = false,
  } = props;

  const isMobile = useDetectMobile();
  const rowRef = useRef(null);
  const useScrollRow = scrollHorizontal && isMobile !== true;

  const { canPrev, canNext, scrollPrev, scrollNext } = useScrollButtons(
    rowRef,
    [items, isMobile, limit, useScrollRow, isLoading],
  );

  const visibleItems = useMemo(
    () =>
      (isMobile === true || scrollHorizontal
        ? items
        : items?.slice(0, limit)) || [],
    [items, isMobile, limit, scrollHorizontal],
  );

  const memoizedProducts = useMemo(
    () =>
      visibleItems.map((x, index) => (
        <MemoizedProductCard
          key={x?.uuid ?? index}
          sellerName={x?.sellerName}
          name={x?.name}
          price={x?.price}
          sellingPrice={x?.sellingPrice}
          isFree={x?.isFree}
          isNegotiable={x?.isNegotiable}
          currency={x?.currency}
          categoryCode={x?.categoryCode}
          sellerUuid={x?.sellerUuid}
          uuid={x?.uuid}
          location={x?.location}
          sponsored={x?.sponsored ?? x?.isSponsored}
          onSelectCard={(e, cardRef) =>
            onSelectCard({
              uuid: x?.uuid,
              nameSlug: x?.nameSlug,
              cardRef,
            })
          }
          nameSlug={x?.nameSlug}
          image={x?.image}
          imageUrl={
            getImage(x?.image, x?.uuid, x?.sellerUuid) || x?.image || null
          }
          imageComponent={x?.imageComponent}
          negotiableText={negotiableText}
          freeText={freeText}
          tradeText={tradeText}
          quantityText={quantityText}
          onBookmark={onBookmark}
          actionComponent={actionComponent}
          bookmarked={x?.bookmarked}
          bookmarkLists={x?.bookmarkLists}
          metadata={{ name: componentName, accessor: x?.accessor }}
          tags={x?.tags}
          condition={x?.condition}
          quantity={x?.quantity}
          hasQuantities={x?.hasQuantities}
          status={x?.status}
          trade={x?.trade}
          exchangeAcceptable={x?.exchangeAcceptable}
          forCart={x?.forCart}
          forOrder={x?.forOrder}
          contactSeller={x?.contactSeller}
          hasVariants={x?.hasVariants}
          sponsoredText={sponsoredText}
          LinkComponent={LinkComponent}
          activeSalesPackages={x?.activeSalesPackages}
          hasFreeShipping={x?.hasFreeShipping}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visibleItems, negotiableText, freeText, tradeText, quantityText],
  );

  // Same guard as the web: no empty red box when there is nothing to show.
  if (!isLoading && (!Array.isArray(items) || items.length === 0)) {
    return null;
  }

  return (
    <SuspenseDetailedProductCard
      isLoading={isLoading}
      keyPrefix="urgent-sale-products-skeleton"
    >
      <GridWrapper
        ref={ref}
        limit={limit}
        darkMode={darkMode}
        className={`lp-section lp-urgent-sale-products-section${
          darkMode ? " urgent-sale-products-section--dark" : ""
        }`}
      >
        <div className="urgent-tag">
          <i className="mng mng-lnc-bolt-filled" />
          {title && <span>{title}</span>}
        </div>
        {isMobile === true ? (
          <div className="urgent-products__mobile-row">{memoizedProducts}</div>
        ) : useScrollRow ? (
          <ScrollViewport className="urgent-products__viewport">
            <div className="urgent-products__scroll-row" ref={rowRef}>
              {memoizedProducts}
            </div>
            <ScrollButtons
              canPrev={canPrev}
              canNext={canNext}
              onPrev={scrollPrev}
              onNext={scrollNext}
            />
          </ScrollViewport>
        ) : (
          <div className="urgent-products__grid">{memoizedProducts}</div>
        )}
      </GridWrapper>
    </SuspenseDetailedProductCard>
  );
});

export default UrgentSaleProductsSection;
