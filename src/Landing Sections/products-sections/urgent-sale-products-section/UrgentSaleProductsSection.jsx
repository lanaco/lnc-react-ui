/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import DetailedProductCard from "../../../Landing Components/product components/detailed-product-card";
import SuspenseDetailedProductCard from "../../../Landing Components/skeleton-components/product/detailed-product-card";

const MemoizedProductCard = memo(DetailedProductCard);

const UrgentSaleProductsSection = forwardRef((props, ref) => {
  const {
    items,
    limit = 5,
    onSelectCard = () => {},
    title = "Urgent sale",
    isLoading = false,
    getImage = () => {},
    negotiableText,
    freeText,
    onBookmark = () => {},
    actionComponent,
    componentName,
    sponsoredText,
    LinkComponent,
  } = props;

  const isMobile = useDetectMobile();

  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items?.map((x, index) => (
                <MemoizedProductCard
                  key={index}
                  sellerName={x?.sellerName}
                  name={x?.name}
                  price={x?.price}
                  sellingPrice={x?.sellingPrice}
                  isFree={x?.isFree}
                  isNegotiable={x?.isNegotiable}
                  currency={x?.currency}
                  categoryCode={x?.categoryCode}
                  sellerUuid={x?.sellerUuid}
                  uuid={x?.uuid}
                  sponsored={x?.sponsored}
                  onSelectCard={(e, cardRef) =>
                    onSelectCard({
                      uuid: x?.uuid,
                      nameSlug: x?.nameSlug,
                      cardRef,
                    })
                  }
                  nameSlug={x?.nameSlug}
                  image={x?.image}
                  imageUrl={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
                  imageComponent={x?.imageComponent}
                  negotiableText={negotiableText}
                  freeText={freeText}
                  onBookmark={onBookmark}
                  actionComponent={actionComponent}
                  bookmarked={x?.bookmarked}
                  bookmarkLists={x?.bookmarkLists}
                  metadata={{ name: componentName, accessor: x?.accessor }}
                  tags={x?.tags}
                  condition={x?.condition}
                  quantity={x?.quantity}
                  hasQuantities={x?.hasQuantities}
                  status={x?.status}
                  trade={x?.trade}
                  forCart={x?.forCart}
                  sponsoredText={sponsoredText}
                  LinkComponent={LinkComponent}
                  hasFreeShipping={x?.hasFreeShipping}
                />
              ))
          : items?.slice(0, limit).map((x, index) => (
              <MemoizedProductCard
                key={index}
                name={x?.name}
                price={x?.price}
                sellingPrice={x?.sellingPrice}
                isFree={x?.isFree}
                isNegotiable={x?.isNegotiable}
                currency={x?.currency}
                categoryCode={x?.categoryCode}
                sellerUuid={x?.sellerUuid}
                uuid={x?.uuid}
                location={x?.location}
                sponsored={x?.sponsored}
                onSelectCard={(e, cardRef) =>
                  onSelectCard({
                    uuid: x?.uuid,
                    nameSlug: x?.nameSlug,
                    cardRef,
                  })
                }
                nameSlug={x?.nameSlug}
                image={x?.image}
                imageUrl={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
                imageComponent={x?.imageComponent}
                negotiableText={negotiableText}
                freeText={freeText}
                onBookmark={onBookmark}
                actionComponent={actionComponent}
                bookmarked={x?.bookmarked}
                bookmarkLists={x?.bookmarkLists}
                metadata={{ name: componentName, accessor: x?.accessor }}
                tags={x?.tags}
                condition={x?.condition}
                quantity={x?.quantity}
                hasQuantities={x?.hasQuantities}
                status={x?.status}
                trade={x?.trade}
                forCart={x?.forCart}
                sponsoredText={sponsoredText}
                sellerName={x?.sellerName}
                LinkComponent={LinkComponent}
                hasFreeShipping={x?.hasFreeShipping}
              />
            ))}
      </>
    );
  }, [items, isMobile, limit]);

  return (
    <SuspenseDetailedProductCard
      isLoading={isLoading}
      keyPrefix="urgent-sale-products-skeleton"
    >
      <GridWrapper ref={ref} limit={limit} className="lp-section lp-urgent-sale-products-section">
        <div className="urgent-tag">
          <i className="mng mng-lnc-bolt-filled" />
          <span>{title}</span>
        </div>{" "}
        {isMobile === true ? (
          <div className="urgent-products__mobile-row">{memoizedProducts}</div>
        ) : (
          memoizedProducts
        )}
      </GridWrapper>
    </SuspenseDetailedProductCard>
  );
});

export default UrgentSaleProductsSection;
