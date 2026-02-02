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
  } = props;

  const productCardRef = useRef();

  return (
    <Wrapper
      ref={productCardRef}
      className="simple-product-card"
      data-accessor={metadata?.accessor}
      name={metadata?.name}
      onClick={(e) => onSelectCard(e, productCardRef)}
      to={`/product/${isDefinedNotEmptyString(nameSlug) ? `${nameSlug}-` : ""}${uuid}`}
    >
      {isDefined(imageComponent) ? (
        imageComponent
      ) : (
        <ProductImageWrapper src={image} />
      )}
      <div className="text-block">
        <div className="title-simple-product-card">{title}</div>
        <div className="price-chip">
          {price > 0 &&
            currency &&
            isNegotiable !== true &&
            isFree !== true &&
            `${formatPrice(price)} ${GetCurrencySymbol(currency)}`}
          {isNegotiable && negotiableText}
          {isFree && freeText}
        </div>
      </div>
    </Wrapper>
  );
});

export default SimpleProductCard;
