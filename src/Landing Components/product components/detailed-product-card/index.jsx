/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { Wrapper, ImageWrapper } from "./style";
import {
  formatPrice,
  GetCurrencySymbol,
  isDefined,
} from "../../../_utils/utils";
import SponsoredLine from "../../sponsored-line";
import ProductImageWrapper from "../../product-img-wrapper";
import Badge from "../../../Data display/Badge/Badge";
import { AttributeTags } from "../../consts";
import useDetectMobile from "../../../_utils/useDetectMobile";

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
    tags = [],
  } = props;

  const isMobile = useDetectMobile();

  const renderTags = () =>
    tags?.map((x, idx) => {
      const icon =
        AttributeTags?.[x?.code]?.icon ?? AttributeTags?.default?.icon ?? "";

      const unit =
        x?.measurementUnit?.symbol ?? AttributeTags?.[x?.code]?.measure ?? "";

      const value = x?.value ?? x?.multiOptions?.[0] ?? "";
      const text = [value, unit].filter(Boolean).join(" ");

      if (isMobile) {
        return (
          <div className="tag-mobile">
            {text}
            {idx === 0 ? " · " : ""}
          </div>
        );
      }

      return (
        <Badge
          key={`detailed-products-section-tag__${idx + 1}`}
          className={`tag ${isSponsored ? "tag-sponsored" : ""}`}
        >
          <i className={icon} />
          {text}
        </Badge>
      );
    });

  return (
    // <LandingPageProductCardSkeleton />
    <Wrapper className="product-card" onClick={onSelectCard}>
      <ImageWrapper className="product-image-wrapper">
        {isDefined(imageComponent) ? (
          imageComponent
        ) : (
          <ProductImageWrapper src={imageUrl} />
        )}
      </ImageWrapper>
      <div className="wrapper-card-1">
        <div className="card-title">{title}</div>
      </div>

      {tags && tags?.length > 0 && (
        <div className="wrapper-card-3">{renderTags()}</div>
      )}

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
