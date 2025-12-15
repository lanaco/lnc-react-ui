/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import Button from "../../../General/Button/Button";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { TitleWithOptionsSectionWrapper } from "../../style";
import DetailedProductCard from "../../../Landing Components/product components/detailed-product-card";
import SuspenseDetailedProductCard from "../../../Landing Components/skeleton-components/product-skeletons/suspense-product-card-detailed";
import SelectBar from "../../../Inputs/SelectBar";

const MemoizedProductCard = memo(DetailedProductCard);

const DetailedProductsSection = forwardRef((props, ref) => {
  const {
    icon,
    title,
    buttonLink,
    items,
    buttonText,
    limit = 4,
    onSelectCard = () => {},
    onButtonAction = () => {},
    isLoading = false,
    getImage = () => {},
    negotiableText,
    freeText,
    options,
    onSelectOption = () => {},
    productsToolbarName = "All",
    sponsoredText,
    onBookmark = () => {},
    bookmarkComponent,
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
                  onSelectCard({
                    uuid: x?.uuid,
                    nameSlug: x?.nameSlug,
                    cardRef,
                  })
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
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <MemoizedProductCard
                  key={index}
                  name={x?.name}
                  price={x?.price}
                  sellingPrice={x?.sellingPrice}
                  currency={x?.currency}
                  image={x?.image}
                  sellerUuid={x?.sellerUuid}
                  uuid={x?.uuid}
                  location={x?.location}
                  sponsored={x?.sponsored}
                  imageComponent={x?.imageComponent}
                  onSelectCard={(e, cardRef) =>
                    onSelectCard({
                      uuid: x?.uuid,
                      nameSlug: x?.nameSlug,
                      cardRef,
                    })
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
                />
              ))}
      </>
    );
  }, [items, isMobile, limit]);

  return (
    <TitleWithOptionsSectionWrapper ref={ref}>
      <div className="regular-title">
        <div className="regular-title-text">
          {isDefinedNotEmptyString(icon) && <i className={icon} />}
          <span>{title}</span>
        </div>
        {isDefinedNotEmptyString(buttonLink) && (
          <Button
            type="button"
            btnType="tinted"
            color="neutral"
            onClick={(e) => {
              e?.target?.blur();
              onButtonAction(buttonLink);
            }}
            borderRadius="curved"
            className="button-link"
          >
            {buttonText}
          </Button>
        )}
      </div>
      {options?.length > 0 && (
        <SelectBar
          // items={dataExplore?.map((item) => ({
          //   ...item,
          // }))}
          items={options}
          // selectedIds={selectedExploreCategoriesIds}
          onRemove={(item) => {
            onSelectOption(item);
            // setSelectedExploreCategoriesIds([
            //   ...selectedExploreCategoriesIds.filter((x) => x != id),
            // ])
          }}
          onSelect={(item) => {
            onSelectOption(item);
            // setSelectedExploreCategoriesIds([id]);
          }}
          // onSelectAll={() => setSelectedExploreCategoriesIds([])}
          labelKey={"name"}
          valueKey={"code"}
          noMargin={true}
          productsToolbarName={productsToolbarName}
        />
      )}
      <GridWrapper limit={limit}>
        <SuspenseDetailedProductCard
          isLoading={isLoading}
          limit={limit}
          keyPrefix={"explore-landing"}
        >
          {memoizedProducts}
        </SuspenseDetailedProductCard>
      </GridWrapper>
    </TitleWithOptionsSectionWrapper>
  );
});

export default DetailedProductsSection;
