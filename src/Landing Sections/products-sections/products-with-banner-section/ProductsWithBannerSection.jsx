/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { GridWrapper, ProductsBannerWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { RegulatTitleSectionWrapper } from "../../style";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import ClearProductCard from "../../../Landing Components/product components/clear-product-card";

const ProductsWithBannerSection = forwardRef((props, ref) => {
  const {
    icon,
    items,
    limit = 4,
    bannerImage,
    onSelectCard = () => {},
    title = "Season inspiration",
  } = props;
  const isMobile = useDetectMobile();

  return (
    <RegulatTitleSectionWrapper ref={ref}>
      <div className="regular-title">
        <div className="regular-title-text">
          {isDefinedNotEmptyString(icon) && <i className={icon} />}
          <span>{title}</span>
        </div>
      </div>
      <ProductsBannerWrapper className="products-banner">
        <img src={bannerImage} />
      </ProductsBannerWrapper>
      <GridWrapper limit={limit}>
        {isMobile === true
          ? items?.map((x, index) => (
              <ClearProductCard
                key={index}
                title={x?.title}
                image={x?.image}
                sellerUuid={x?.sellerUuid}
                uuid={x?.uuid}
                onSelectCard={() => onSelectCard?.(x?.uuid)}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <ClearProductCard
                  key={index}
                  title={x?.title}
                  image={x?.image}
                  sellerUuid={x?.sellerUuid}
                  uuid={x?.uuid}
                  onSelectCard={() => onSelectCard?.(x?.uuid)}
                />
              ))}
      </GridWrapper>
    </RegulatTitleSectionWrapper>
  );
});

export default ProductsWithBannerSection;
