/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import { Container } from "./style";
import IconButton from "../../../General/IconButton/IconButton";
import Button from "../../../General/Button/Button";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import useDetectMobile from "../../../_utils/useDetectMobile";
import DetailedProductCard from "../../../Landing Components/product components/detailed-product-card";
import SuspenseDetailedProductCard from "../../../Landing Components/skeleton-components/product-skeletons/suspense-product-card-detailed";

const MemoizedProductCard = memo(DetailedProductCard);

const DetailedProductsSectionInfinitive = forwardRef((props, ref) => {
  const {
    title,
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
  } = props;

  const isMobile = useDetectMobile();

  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items?.map((x, index) => (
              <MemoizedProductCard
                key={index}
                title={x?.title}
                price={x?.price}
                sellingPrice={x?.sellingPrice}
                currency={x?.currency}
                image={x?.image}
                sellerUuid={x?.sellerUuid}
                uuid={x?.uuid}
                sponsored={x?.sponsored}
                imageComponent={x?.imageComponent}
                onSelectCard={() => onSelectCard(x?.uuid)}
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
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <MemoizedProductCard
                  key={index}
                  title={x?.title}
                  price={x?.price}
                  sellingPrice={x?.sellingPrice}
                  currency={x?.currency}
                  image={x?.image}
                  sellerUuid={x?.sellerUuid}
                  uuid={x?.uuid}
                  location={x?.location}
                  sponsored={x?.sponsored}
                  imageComponent={x?.imageComponent}
                  onSelectCard={() => onSelectCard(x?.uuid)}
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
                />
              ))}
      </>
    );
  }, [items, isMobile, limit]);

  return (
    <Container limit={limit}>
      <div className="section__heading">
        {isDefinedNotEmptyString(title) && (
          <div className="section__title">{title}</div>
        )}
        {isMobile && isDefinedNotEmptyString(viewAllbuttonLink) && (
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
        limit={limit}
        keyPrefix="explore-landing"
      >
        <div className="section__items">{memoizedProducts}</div>
      </SuspenseDetailedProductCard>
      {!isMobile && (
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

export default DetailedProductsSectionInfinitive;
