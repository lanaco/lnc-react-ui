/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useState, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import Button from "../../../General/Button/Button";
import DetailedProductCard from "../../../Landing Components/product components/detailed-product-card";
import SuspenseDetailedProductCard from "../../../Landing Components/skeleton-components/product-skeletons/suspense-product-card-detailed";

const MemoizedProductCard = memo(DetailedProductCard);

const UrgentSaleProductsSection = forwardRef((props, ref) => {
  const {
    items,
    limit = 5,
    limitMobile = 4,
    onSelectCard = () => {},
    title = "Urgent sale",
    showLessText = "Show less",
    showMoreText = "Show more",
    isLoading = false,
    getImage = () => {},
    negotiableText,
    freeText,
  } = props;

  const isMobile = useDetectMobile();

  const [showAll, setShowAll] = useState(false);

  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items
              ?.slice(0, showAll === true ? items?.length : limitMobile)
              ?.map((x, index) => (
                <MemoizedProductCard
                  key={index}
                  title={x?.name}
                  price={x?.price}
                  isFree={x?.isFree}
                  isNegotiable={x?.isNegotiable}
                  currency={x?.currency}
                  sellerUuid={x?.sellerUuid}
                  uuid={x?.uuid}
                  isSponsored={x?.isSponsored}
                  onSelectCard={() => onSelectCard?.(x?.uuid)}
                  imageUrl={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
                  negotiableText={negotiableText}
                  freeText={freeText}
                />
              ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <MemoizedProductCard
                  key={index}
                  title={x?.name}
                  price={x?.price}
                  isFree={x?.isFree}
                  isNegotiable={x?.isNegotiable}
                  currency={x?.currency}
                  sellerUuid={x?.sellerUuid}
                  uuid={x?.uuid}
                  location={x?.location}
                  isSponsored={x?.isSponsored}
                  onSelectCard={() => onSelectCard?.(x?.uuid)}
                  imageUrl={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
                  negotiableText={negotiableText}
                  freeText={freeText}
                />
              ))}
      </>
    );
  }, [items, isMobile, limit, limitMobile, showAll]);

  return (
    <GridWrapper ref={ref} limit={limit}>
      <div className="urgent-tag">
        <i className="mng mng-lnc-bolt-filled" />
        <span>{title}</span>
      </div>
      <SuspenseDetailedProductCard
        isLoading={isLoading}
        limit={limit}
        keyPrefix={"explore-landing"}
      >
        {memoizedProducts}
      </SuspenseDetailedProductCard>
      {isMobile === true && limitMobile < items?.length && (
        <Button
          className="show-more"
          btnType="basic"
          type="button"
          color="neutral"
          onClick={(e) => {
            e?.target?.blur();
            setShowAll(!showAll);
          }}
        >
          {showAll === true ? showLessText : showMoreText}
        </Button>
      )}
    </GridWrapper>
  );
});

export default UrgentSaleProductsSection;
