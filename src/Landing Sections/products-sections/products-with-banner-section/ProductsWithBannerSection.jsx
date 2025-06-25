/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useMemo, memo } from "react";
import { GridWrapper, ProductsBannerWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { RegulatTitleSectionWrapper } from "../../style";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import ClearProductCard from "../../../Landing Components/product components/clear-product-card";
import SuspenseClearProductCard from "../../../Landing Components/skeleton-components/product-skeletons/suspense-product-card-clear";

const MemoizedProductCard = memo(ClearProductCard);

const ProductsWithBannerSection = forwardRef((props, ref) => {
  const {
    icon,
    items,
    limit = 4,
    bannerImage,
    onSelectCard = () => {},
    title = "Season inspiration",
    isLoading = false,
    getImage = () => {},
  } = props;

  const isMobile = useDetectMobile();
  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items?.map((x, index) => (
              <MemoizedProductCard
                key={index}
                title={x?.name}
                sellerUuid={x?.sellerUuid}
                uuid={x?.uuid}
                onSelectCard={() => onSelectCard?.(x?.uuid)}
                image={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <MemoizedProductCard
                  key={index}
                  title={x?.name}
                  sellerUuid={x?.sellerUuid}
                  uuid={x?.uuid}
                  onSelectCard={() => onSelectCard?.(x?.uuid)}
                  image={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
                />
              ))}
      </>
    );
  }, [items, isMobile, limit]);

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
        <SuspenseClearProductCard
          isLoading={isLoading}
          limit={limit}
          keyPrefix={"explore-landing"}
        >
          {memoizedProducts}
        </SuspenseClearProductCard>
      </GridWrapper>
    </RegulatTitleSectionWrapper>
  );
});

export default ProductsWithBannerSection;
