/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/display-name */
import { forwardRef, useRef } from "react";
import { Wrapper } from "./style";
import {
  formatPrice,
  GetCurrencySymbol,
  isDefined,
  isDefinedNotEmptyString,
} from "../../../_utils/utils";
import ProductImageWrapper from "../../product-img-wrapper";
import Icon from "../../../General/Icon/Icon";
import { SalesPackageIcons } from "../../consts";

const SimpleProductCard = forwardRef((props, ref) => {
  const {
    uuid,
    title,
    price = 0,
    sellingPrice,
    currency,
    isNegotiable,
    isFree,
    image,
    sellerUuid,
    nameSlug,
    onSelectCard = () => {},
    imageComponent,
    negotiableText = "Negotiable",
    freeText = "Free",
    freeShippingText,
    giftText,
    newCollectionText,
    hasFreeShipping,
    activeSalesPackages,
    metadata,
    LinkComponent,
  } = props;
  const Component = LinkComponent || "a";
  const productCardRef = useRef();

  // Same rule as the web card: prefer sellingPrice, fall back to price, and
  // render no chip at all when there is nothing to show.
  const displayPrice = sellingPrice ?? price;
  const priceLabel =
    displayPrice > 0 && currency && isNegotiable !== true && isFree !== true
      ? `${formatPrice(displayPrice)} ${GetCurrencySymbol(currency)}`
      : isNegotiable
        ? negotiableText
        : isFree
          ? freeText
          : null;

  // Campaign badges over the image (same as the web card) and a red price
  // when the selling price is below the full price.
  const hasDiscount = displayPrice > 0 && price > displayPrice;
  const discountPercent = hasDiscount
    ? Math.round((1 - displayPrice / price) * 100)
    : 0;
  const packageCodes = (activeSalesPackages || []).map(
    (salesPackage) => salesPackage?.salesPackageCode,
  );
  const freeShippingBadge = {
    type: "freeshipping",
    icon: SalesPackageIcons.FREESHIPPING,
    label: freeShippingText,
  };
  const packageBadges = {
    FreeShipping: freeShippingBadge,
    IncludeGifts: {
      type: "includegifts",
      icon: SalesPackageIcons.INCLUDEGIFTS,
      label: giftText,
    },
    FreeQuantity: {
      type: "freequantity",
      icon: SalesPackageIcons.FREEQUANTITY,
    },
    NewCollection: {
      type: "newcollection",
      icon: SalesPackageIcons.NEWCOLLECTION,
      label: newCollectionText,
    },
  };
  const badges = [
    ...(hasDiscount || packageCodes.includes("AddDiscount")
      ? [
          {
            type: "adddiscount",
            text: discountPercent > 0 ? `${discountPercent} %` : null,
            icon: discountPercent > 0 ? null : SalesPackageIcons.ADDDISCOUNT,
          },
        ]
      : []),
    ...(hasFreeShipping === true && !packageCodes.includes("FreeShipping")
      ? [freeShippingBadge]
      : []),
    ...[...new Set(packageCodes)]
      .map((code) => packageBadges[code])
      .filter(Boolean),
  ];

  return (
    <Wrapper
      ref={productCardRef}
      className="simple-product-card"
      data-accessor={metadata?.accessor}
      name={metadata?.name}
      onClick={(e) => onSelectCard(e, productCardRef)}
      as={Component}
      {...(LinkComponent
        ? {
            to: `/product/${
              isDefinedNotEmptyString(nameSlug) ? `${nameSlug}-` : ""
            }${uuid}`,
          }
        : {
            href: `/product/${
              isDefinedNotEmptyString(nameSlug) ? `${nameSlug}-` : ""
            }${uuid}`,
          })}
    >
      <div className="img-wrapper">
        {isDefined(imageComponent) ? (
          imageComponent
        ) : (
          <ProductImageWrapper src={image} alt={title} loading="lazy" />
        )}
      </div>
      {badges.length > 0 && (
        <div className="campaign-badges">
          {badges.map((badge) => (
            <span
              key={badge.type}
              className={`campaign-badge campaign-badge-${badge.type}`}
              role={badge.label ? "img" : undefined}
              title={badge.label}
              aria-label={badge.label}
            >
              {badge.icon && <Icon icon={badge.icon} sizeInUnits="1rem" />}
              {badge.text}
            </span>
          ))}
        </div>
      )}
      <div className="text-block">
        {priceLabel && (
          <span
            className={`price-chip${hasDiscount ? " price-chip--discount" : ""}`}
          >
            {priceLabel}
            {hasDiscount && (
              <span className="full-price">
                {`${formatPrice(price)} ${GetCurrencySymbol(currency)}`}
              </span>
            )}
          </span>
        )}
        <span className="title-simple-product-card">{title}</span>
      </div>
    </Wrapper>
  );
});

export default SimpleProductCard;
