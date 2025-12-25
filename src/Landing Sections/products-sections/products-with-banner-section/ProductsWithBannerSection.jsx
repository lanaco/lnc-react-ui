/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useMemo, memo } from "react";
import { GridWrapper, ProductsBannerWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { RegulatTitleSectionWrapper } from "../../style";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import ClearProductCard from "../../../Landing Components/product components/clear-product-card";
import SuspenseProductsWithBanner from "../../../Landing Components/skeleton-components/product/products-with-banner";

const MemoizedProductCard = memo(ClearProductCard);

const ProductsWithBannerSection = forwardRef((props, ref) => {
  const {
    icon,
    items,
    limit = 4,
    imageUrl,
    onSelectCard = () => {},
    title = "Season inspiration",
    isLoading = false,
    getImage = () => {},
    componentName,
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
                onSelectCard={(e, cardRef) =>
                  onSelectCard({
                    uuid: x?.uuid,
                    nameSlug: x?.nameSlug,
                    cardRef,
                  })
                }
                image={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
                metadata={{ name: componentName, accessor: x?.accessor }}
              />
            ))
          : items?.slice(0, limit).map((x, index) => (
              <MemoizedProductCard
                key={index}
                title={x?.name}
                sellerUuid={x?.sellerUuid}
                uuid={x?.uuid}
                onSelectCard={(e, cardRef) =>
                  onSelectCard({
                    uuid: x?.uuid,
                    nameSlug: x?.nameSlug,
                    cardRef,
                  })
                }
                image={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
                metadata={{ name: componentName, accessor: x?.accessor }}
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
      <SuspenseProductsWithBanner
        isLoading={isLoading}
        keyPrefix="products-with-banner-skeleton"
      >
        <ProductsBannerWrapper className="products-banner">
          <img src={imageUrl} />
        </ProductsBannerWrapper>
        <GridWrapper limit={limit}>{memoizedProducts}</GridWrapper>
      </SuspenseProductsWithBanner>
    </RegulatTitleSectionWrapper>
  );
});

export default ProductsWithBannerSection;
