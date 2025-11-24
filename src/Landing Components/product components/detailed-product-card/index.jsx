/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/display-name */
import { forwardRef, useState } from "react";
import { Wrapper, ImageWrapper, TagsPopoverContent } from "./style";
import {
  formatPrice,
  GetCurrencySymbol,
  isDefined,
} from "../../../_utils/utils";
import SponsoredLine from "../../sponsored-line";
import ProductImageWrapper from "../../product-img-wrapper";
import Badge from "../../../Data display/Badge/Badge";
import Popover from "../../../Utility/Popover/Popover";
import PopoverTrigger from "../../../Utility/Popover/PopoverTrigger";
import PopoverContent from "../../../Utility/Popover/PopoverContent";
import {
  AttributeTags,
  RealEstateCategoryPrefix,
  VehiclesBusesCategoryCode,
  VehiclesCampersCategoryCode,
  VehiclesCarsCategoryCode,
  VehiclesConstructionMachinesCategoryCode,
  VehiclesMotorcycleCategoryCode,
  VehiclesTractorsCategoryCode,
  VehiclesTrucksCategoryCode,
} from "../../consts";
import useDetectMobile from "../../../_utils/useDetectMobile";

const DetailedProductCard = forwardRef((props, ref) => {
  const {
    title,
    price = 0,
    sellingPrice,
    currency,
    isNegotiable,
    isFree,
    imageUrl,
    location,
    isSponsored,
    imageComponent,
    onSelectCard = () => {},
    freeText = "Free",
    negotiableText = "Negotiable",
    tags = [],
    categoryCode,
    condition,
    quantity,
    trade,
  } = props;

  const isMobile = useDetectMobile();

  const CATEGORY_PREFIXES = [
    VehiclesCarsCategoryCode,
    VehiclesMotorcycleCategoryCode,
    VehiclesTrucksCategoryCode,
    VehiclesTractorsCategoryCode,
    VehiclesConstructionMachinesCategoryCode,
    VehiclesBusesCategoryCode,
    VehiclesCampersCategoryCode,
    RealEstateCategoryPrefix,
  ];

  const isVehiclesRealEstateCategory = CATEGORY_PREFIXES.some((prefix) =>
    categoryCode?.includes(prefix)
  );

  const [popover, setPopover] = useState(false);

  const handleOpenPopover = () => {
    setPopover(true);
  };

  const handleClosePopover = () => {
    setPopover(false);
  };

  const renderTags = () => {
    return (
      <div className="tags-popover__trigger">
        {tags?.map((x, idx) => {
          const icon =
            AttributeTags?.[x?.code]?.icon ??
            AttributeTags?.default?.icon ??
            "";

          const unit =
            x?.measurementUnit?.symbol ??
            AttributeTags?.[x?.code]?.measure ??
            "";

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
        })}
      </div>
    );
  };

  const renderDropdownTags = () => {
    return (
      <div className="tags-popover__content">
        {tags?.map((x, idx) => {
          const unit =
            x?.measurementUnit?.symbol ??
            AttributeTags?.[x?.code]?.measure ??
            "";

          const value = x?.value ?? x?.multiOptions?.[0] ?? "";
          const text = [value, unit].filter(Boolean).join(" ");
          const name = x?.name;

          return (
            <div key={`detailed-products-section-tag-dropdown__${idx + 1}`}>
              <span className="tags-popover__name">{`${name}: `}</span>
              <span className="tags-popover__value">{text}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderOtherTags = () => {
    if (isMobile) {
      return [condition, quantity, trade]?.map((x, idx) => (
        <div className="tag-mobile">
          {x}
          {idx === 0 ? " · " : ""}
        </div>
      ));
    }

    return (
      <>
        {condition && (
          <Badge key="detailed-products-section-tag__condition" className="tag">
            {condition}
          </Badge>
        )}

        {quantity && (
          <Badge key="detailed-products-section-tag__quantity" className="tag">
            {quantity}
          </Badge>
        )}
        {trade && (
          <Badge key="detailed-products-section-tag__trade" className="tag">
            {trade}
          </Badge>
        )}
      </>
    );
  };

  return (
    // <LandingPageProductCardSkeleton />
    <Wrapper ref={ref} className="product-card" onClick={onSelectCard}>
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
      <div className="wrapper-card-3">
        {isVehiclesRealEstateCategory && (
          <div
            {...(isMobile
              ? {}
              : {
                  onMouseEnter: handleOpenPopover,
                  onMouseLeave: handleClosePopover,
                })}
          >
            <Popover placement="bottom" open={popover}>
              <PopoverTrigger>{renderTags()}</PopoverTrigger>
              <PopoverContent style={{ all: "unset" }}>
                <TagsPopoverContent>{renderDropdownTags()}</TagsPopoverContent>
              </PopoverContent>
            </Popover>
          </div>
        )}
        {!isVehiclesRealEstateCategory && renderOtherTags()}
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
