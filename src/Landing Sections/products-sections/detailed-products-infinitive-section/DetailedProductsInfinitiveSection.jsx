/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import { Container } from "./style";
import IconButton from "../../../General/IconButton/IconButton";
import Button from "../../../General/Button/Button";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import useDetectMobile from "../../../_utils/useDetectMobile";
import DetailedProductCard from "../../../Landing Components/product components/detailed-product-card";
import SuspenseDetailedProductCard from "../../../Landing Components/skeleton-components/product/detailed-product-card";

const MemoizedProductCard = memo(DetailedProductCard);

const DetailedProductsInfinitiveSection = forwardRef((props, ref) => {
  const {
    title,
    icon,
    items,
    limit = 4,
    isLoading = false,
    onSelectCard = () => {},
    onLoadMore = () => {},
    onButtonAction = () => {},
    getImage = () => {},
    viewAllbuttonLink,
    viewAllButonText = "View all",
    negotiableText,
    freeText,
    loadMoreButtonIcon = "angle-down",
    sponsoredText,
    onBookmark = () => {},
    bookmarkComponent,
    componentName,
  } = props;

  const isMobile = useDetectMobile();

  const memoizedProducts = useMemo(() => {
    return items?.map((x, index) => (
      <MemoizedProductCard
        key={index}
        name={x?.name}
        price={x?.price}
        sellingPrice={x?.sellingPrice}
        currency={x?.currency}
        image={x?.image}
        sellerUuid={x?.sellerUuid}
        uuid={x?.uuid}
        sponsored={x?.sponsored}
        imageComponent={x?.imageComponent}
        onSelectCard={(e, cardRef) =>
          onSelectCard({ uuid: x?.uuid, nameSlug: x?.nameSlug, cardRef })
        }
        imageUrl={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
        isFree={x?.isFree}
        isNegotiable={x?.isNegotiable}
        negotiableText={negotiableText}
        freeText={freeText}
        tags={x?.tags}
        categoryCode={x?.categoryCode}
        condition={x?.condition}
        quantity={x?.quantity}
        trade={x?.trade}
        sponsoredText={sponsoredText}
        onBookmark={onBookmark}
        bookmarkComponent={bookmarkComponent}
        bookmarked={x?.bookmarked}
        bookmarkLists={x?.bookmarkLists}
        metadata={{ accessor: x?.accessor, name: componentName }}
        sellerName={x?.sellerName}
        forCart={x?.forCart}
        forOrder={x?.forOrder}
        contactSeller={x?.contactSeller}
        hasVariants={x?.hasVariants}
      />
    ));
  }, [items]);

  return (
    <Container ref={ref} limit={limit}>
      <div className="section__heading">
        {isDefinedNotEmptyString(title) && (
          <div className="section__title">
            {isDefinedNotEmptyString(icon) && <i className={icon} />} {title}
          </div>
        )}
        {isMobile &&
          isDefinedNotEmptyString(viewAllbuttonLink) &&
          isDefinedNotEmptyString(viewAllButonText) &&
          !isLoading && (
            <Button
              type="button"
              btnType="tinted"
              color="neutral"
              onClick={(e) => {
                e?.target?.blur();

                onButtonAction(viewAllbuttonLink);
              }}
              borderRadius="curved"
              className="section__view-all"
            >
              {viewAllButonText}
            </Button>
          )}
      </div>
      <SuspenseDetailedProductCard
        isLoading={isLoading}
        keyPrefix="detailed-product-card-skeleton"
      >
        <div className="section__items">{memoizedProducts}</div>
      </SuspenseDetailedProductCard>

      {!isMobile && !isLoading && (
        <IconButton
          icon={loadMoreButtonIcon}
          borderRadius="curved"
          btnType="basic"
          color="neutral"
          className="section__show-more"
          onClick={onLoadMore}
        />
      )}
    </Container>
  );
});

export default DetailedProductsInfinitiveSection;
