/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo, useRef } from "react";
import { Section } from "./style";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import useDetectMobile from "../../../_utils/useDetectMobile";
import DetailedProductCard from "../../../Landing Components/product components/detailed-product-card";
import SuspenseDetailedProductCard from "../../../Landing Components/skeleton-components/product/detailed-product-card";
import SelectBar from "../../../Inputs/SelectBar";
import SuspenseSelectBar from "../../../Landing Components/skeleton-components/general/select-bar";
import {
  EndCta,
  ScrollButtons,
  ScrollViewport,
  SectionHeader,
  useScrollButtons,
} from "../_shared";

const MemoizedProductCard = memo(DetailedProductCard);

/**
 * Mirrors the web DetailedProductsSection.astro:
 *  - header: icon (iconColor) + title + optional red `badge` chip and a tinted
 *    button (only when buttonText && buttonLink && !showMoreAtEnd);
 *  - ALL items in one horizontally scrollable row (desktop sized so `limit`
 *    cards fit, 6 on tablet), prev/next buttons only on overflow;
 *  - showMoreAtEnd: the button becomes an arrow end-card in the row;
 *  - darkMode: black card, card text flipped to white.
 */
const DetailedProductsSection = forwardRef((props, ref) => {
  const {
    icon,
    iconColor,
    badge,
    title,
    buttonLink,
    items,
    buttonText,
    limit = 4,
    onSelectCard = () => {},
    onButtonAction = () => {},
    isLoading = false,
    getImage = () => {},
    negotiableText,
    freeText,
    tradeText,
    quantityText,
    options = [],
    isLoadingOptions = false,
    selectedOption,
    onSelectOption = () => {},
    onRemoveOption = () => {},
    allOptionsEnabled = false,
    allOptionsLabel = "All",
    onSelectAllOptions = () => {},
    optionLabel = "label",
    optionValue = "value",
    optionCode = "code",
    sponsoredText,
    onBookmark = () => {},
    actionComponent,
    componentName,
    LinkComponent,
    urgentText,
    darkMode = false,
    showMoreAtEnd = false,
  } = props;

  const isMobile = useDetectMobile();
  const rowRef = useRef(null);

  const { canPrev, canNext, scrollPrev, scrollNext } = useScrollButtons(
    rowRef,
    [items, isMobile, limit, showMoreAtEnd, isLoading],
  );

  const hasEndCta =
    showMoreAtEnd &&
    isDefinedNotEmptyString(buttonText) &&
    isDefinedNotEmptyString(buttonLink);

  const memoizedProducts = useMemo(
    () =>
      items?.map((x, index) => (
        <MemoizedProductCard
          key={x?.uuid ?? index}
          name={x?.name}
          price={x?.price}
          sellingPrice={x?.sellingPrice}
          currency={x?.currency}
          image={x?.image}
          sellerUuid={x?.sellerUuid}
          uuid={x?.uuid}
          location={x?.location}
          sponsored={x?.sponsored ?? x?.isSponsored}
          imageComponent={x?.imageComponent}
          nameSlug={x?.nameSlug}
          onSelectCard={(e, cardRef) =>
            onSelectCard({
              uuid: x?.uuid,
              nameSlug: x?.nameSlug,
              cardRef,
            })
          }
          sellerName={x?.sellerName}
          imageUrl={
            getImage(x?.image, x?.uuid, x?.sellerUuid) || x?.image || null
          }
          isFree={x?.isFree}
          isNegotiable={x?.isNegotiable}
          negotiableText={negotiableText}
          freeText={freeText}
          tradeText={tradeText}
          quantityText={quantityText}
          tags={x?.tags}
          categoryCode={x?.categoryCode}
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
          onBookmark={onBookmark}
          actionComponent={actionComponent}
          bookmarked={x?.bookmarked}
          bookmarkLists={x?.bookmarkLists}
          metadata={{ accessor: x?.accessor, name: componentName }}
          LinkComponent={LinkComponent}
          activeSalesPackages={x?.activeSalesPackages}
          urgentText={urgentText}
          hasFreeShipping={x?.hasFreeShipping}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, negotiableText, freeText, tradeText, quantityText, sponsoredText],
  );

  return (
    <Section
      ref={ref}
      limit={limit}
      darkMode={darkMode}
      className={`lp-section lp-detailed-products-section${
        darkMode ? " detailed-products-section--dark" : ""
      }`}
    >
      <SectionHeader
        className="regular-title"
        icon={icon}
        iconColor={iconColor}
        title={title}
        badge={badge}
        buttonText={isLoading ? undefined : buttonText}
        buttonLink={buttonLink}
        showMoreAtEnd={showMoreAtEnd}
        onButtonAction={onButtonAction}
        buttonVariant="tinted"
        darkMode={darkMode}
        titleAs="span"
      />
      <SuspenseSelectBar isLoading={isLoadingOptions}>
        {options && options?.length > 0 && (
          <SelectBar
            items={options}
            selectedIds={selectedOption}
            onRemove={onRemoveOption}
            onSelect={onSelectOption}
            allButton={allOptionsEnabled}
            onSelectAll={onSelectAllOptions}
            labelKey={optionLabel}
            valueKey={optionValue}
            codeKey={optionCode}
            noMargin={true}
            productsToolbarName={allOptionsLabel}
            noGradient={true}
            className="section__options"
          />
        )}
      </SuspenseSelectBar>

      <SuspenseDetailedProductCard
        isLoading={isLoading}
        keyPrefix="detailed-products-skeleton"
      >
        <ScrollViewport className="detailed-products__viewport">
          <div className="detailed-products__row" ref={rowRef}>
            {memoizedProducts}
            {hasEndCta && (
              <EndCta
                buttonText={buttonText}
                buttonLink={buttonLink}
                onButtonAction={onButtonAction}
                darkMode={darkMode}
                mobileWidth="8.875rem"
              />
            )}
          </div>
          {isMobile !== true && (
            <ScrollButtons
              canPrev={canPrev}
              canNext={canNext}
              onPrev={scrollPrev}
              onNext={scrollNext}
            />
          )}
        </ScrollViewport>
      </SuspenseDetailedProductCard>
    </Section>
  );
});

export default DetailedProductsSection;
