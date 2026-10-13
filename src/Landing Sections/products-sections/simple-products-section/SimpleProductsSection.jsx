/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo, useRef } from "react";
import { Section } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import SimpleProductCard from "../../../Landing Components/product components/simple-product-card";
import SuspenseSimpleProducts from "../../../Landing Components/skeleton-components/product/simple-products";
import {
  EndCta,
  ScrollButtons,
  ScrollViewport,
  SectionHeader,
  useScrollButtons,
} from "../_shared";
import { isDefinedNotEmptyString } from "../../../_utils/utils";

const MemoizedProductCard = memo(SimpleProductCard);

const MOBILE_LIMIT = 4;

/**
 * Mirrors the web SimpleProductsSection.astro:
 *  - header: icon (iconColor) + title + optional red `badge` chip, outline
 *    button on the same line (only when buttonText && buttonLink &&
 *    !showMoreAtEnd), subtitle above;
 *  - desktop: one horizontally scrollable row of ALL items sized so `limit`
 *    cards fit, prev/next buttons appear only on overflow;
 *  - mobile: the first 4 items in a horizontal scroll row;
 *  - showMoreAtEnd: the button moves to an arrow end-card in the row;
 *  - darkMode: black card with its own padding.
 */
const SimpleProductsSection = forwardRef((props, ref) => {
  const {
    title,
    subtitle,
    icon,
    iconColor,
    badge,
    buttonText,
    buttonLink,
    items,
    onButtonAction = () => {},
    isLoading = false,
    limit = 6,
    getImage = () => {},
    negotiableText,
    freeText,
    componentName,
    LinkComponent,
    darkMode = false,
    showMoreAtEnd = false,
    mobileLimit = MOBILE_LIMIT,
  } = props;

  const isMobile = useDetectMobile();
  const rowRef = useRef(null);

  const visibleItems = useMemo(
    () => (isMobile === true ? items?.slice(0, mobileLimit) : items) || [],
    [items, isMobile, mobileLimit],
  );

  const { canPrev, canNext, scrollPrev, scrollNext } = useScrollButtons(
    rowRef,
    [visibleItems, isMobile, limit, showMoreAtEnd],
  );

  const hasEndCta =
    showMoreAtEnd &&
    isDefinedNotEmptyString(buttonText) &&
    isDefinedNotEmptyString(buttonLink);

  const memoizedProducts = useMemo(
    () =>
      visibleItems.map((x, index) => (
        <MemoizedProductCard
          key={x?.uuid ?? index}
          title={x?.name}
          price={x?.price}
          sellingPrice={x?.sellingPrice}
          isFree={x?.isFree}
          isNegotiable={x?.isNegotiable}
          currency={x?.currency}
          sellerUuid={x?.sellerUuid}
          uuid={x?.uuid}
          nameSlug={x?.nameSlug}
          image={getImage(x?.image, x?.uuid, x?.sellerUuid) || x?.image || null}
          imageComponent={x?.imageComponent}
          negotiableText={negotiableText}
          freeText={freeText}
          metadata={{ name: componentName, accessor: x?.accessor }}
          LinkComponent={LinkComponent}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visibleItems, negotiableText, freeText, componentName, LinkComponent],
  );

  return (
    <SuspenseSimpleProducts
      isLoading={isLoading}
      keyPrefix="simple-products-skeleton"
    >
      <Section
        ref={ref}
        limit={limit}
        darkMode={darkMode}
        className={`lp-section lp-simple-products-section${
          darkMode ? " simple-products-section--dark" : ""
        }`}
      >
        <SectionHeader
          className="text-block-v1"
          icon={icon}
          iconColor={iconColor}
          title={title}
          subtitle={subtitle}
          badge={badge}
          buttonText={buttonText}
          buttonLink={buttonLink}
          showMoreAtEnd={showMoreAtEnd}
          onButtonAction={onButtonAction}
          buttonVariant="outline"
          darkMode={darkMode}
        />
        <ScrollViewport className="simple-products__viewport">
          <div className="simple-products__row" ref={rowRef}>
            {memoizedProducts}
            {hasEndCta && (
              <EndCta
                buttonText={buttonText}
                buttonLink={buttonLink}
                onButtonAction={onButtonAction}
                darkMode={darkMode}
                mobileWidth="10.5rem"
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
      </Section>
    </SuspenseSimpleProducts>
  );
});

export default SimpleProductsSection;
