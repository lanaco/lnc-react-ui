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
      <div className="text-block">
        {priceLabel && <span className="price-chip">{priceLabel}</span>}
        <span className="title-simple-product-card">{title}</span>
      </div>
    </Wrapper>
  );
});

export default SimpleProductCard;
