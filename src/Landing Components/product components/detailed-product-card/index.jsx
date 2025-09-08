/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { Wrapper } from "./style";
import {
  formatPrice,
  GetCurrencySymbol,
  isDefined,
} from "../../../_utils/utils";
import SponsoredLine from "../../sponsored-line";
import ProductImageWrapper from "../../product-img-wrapper";

const DetailedProductCard = forwardRef((props, ref) => {
  const {
    uuid,
    title,
    price = 0,
    sellingPrice,
    currency,
    isNegotiable,
    isFree,
    imageUrl,
    sellerUuid,
    location,
    isSponsored,
    imageComponent,
    onSelectCard = () => {},
    freeText = "Free",
    negotiableText = "Negotiable",
  } = props;

  return (
    // <LandingPageProductCardSkeleton />
    <Wrapper className="product-card" onClick={onSelectCard}>
      {isDefined(imageComponent) ? (
        imageComponent
      ) : (
        <ProductImageWrapper src={imageUrl} />
      )}
      <div className="wrapper-card-1">
        <div className="card-title">{title}</div>
      </div>

      <div className="wrapper-card-2">
        <div className="price-text">
          {sellingPrice > 0 &&
            currency &&
            isNegotiable !== true &&
            isFree !== true && (
              <div>
                {`${formatPrice(sellingPrice)} ${GetCurrencySymbol(currency)}`}
              </div>
            )}
          {price > 0 &&
            currency &&
            isNegotiable !== true &&
            isFree !== true &&
            price !== sellingPrice && (
              <div className={`${sellingPrice > 0 ? "full-price" : ""}`}>
                {`${formatPrice(price)} ${GetCurrencySymbol(currency)}`}
              </div>
            )}
          {isNegotiable && negotiableText}
          {isFree && freeText}
        </div>
        <div className="location-text">{location}</div>
      </div>
      {isSponsored === true && <SponsoredLine />}
    </Wrapper>
  );
});

export default DetailedProductCard;
