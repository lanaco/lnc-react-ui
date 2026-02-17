/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import Button from "../../../General/Button/Button";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { TitleWithOptionsSectionWrapper } from "../../style";
import DetailedProductCard from "../../../Landing Components/product components/detailed-product-card";
import SuspenseDetailedProductCard from "../../../Landing Components/skeleton-components/product/detailed-product-card";
import SelectBar from "../../../Inputs/SelectBar";
import SuspenseSelectBar from "../../../Landing Components/skeleton-components/general/select-bar";

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
    options = [],
    isLoadingOptions = false,
    selectedOption,
    onSelectOption = () => {},
    onRemoveOption = () => {},
    allOptionsEnabled = false,
    allOptionsLabel = "All",
    onSelectAllOptions = () => {},
    optionLabel = "label",
    optionValue = "value",
    optionCode = "code",
    sponsoredText,
    onBookmark = () => {},
    actionComponent,
    componentName,
    LinkComponent,
    urgentText,
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
                nameSlug={x?.nameSlug}
                onSelectCard={(e, cardRef) =>
                  onSelectCard({
                    uuid: x?.uuid,
                    nameSlug: x?.nameSlug,
                    cardRef,
                  })
                }
                sellerName={x?.sellerName}
                imageUrl={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
                isFree={x?.isFree}
                isNegotiable={x?.isNegotiable}
                negotiableText={negotiableText}
                freeText={freeText}
                tags={x?.tags}
                categoryCode={x?.categoryCode}
                condition={x?.condition}
                quantity={x?.quantity}
                hasQuantities={x?.hasQuantities}
                status={x?.status}
                trade={x?.trade}
                forCart={x?.forCart}
                sponsoredText={sponsoredText}
                onBookmark={onBookmark}
                actionComponent={actionComponent}
                bookmarked={x?.bookmarked}
                bookmarkLists={x?.bookmarkLists}
                metadata={{ accessor: x?.accessor, name: componentName }}
                LinkComponent={LinkComponent}
                activeSalesPackages={x?.activeSalesPackages}
                urgentText={urgentText}
                hasFreeShipping={x?.hasFreeShipping}
              />
            ))
          : items?.slice(0, limit).map((x, index) => (
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
                nameSlug={x?.nameSlug}
                imageUrl={getImage(x?.image, x?.uuid, x?.sellerUuid) || null}
                isFree={x?.isFree}
                isNegotiable={x?.isNegotiable}
                negotiableText={negotiableText}
                freeText={freeText}
                tags={x?.tags}
                categoryCode={x?.categoryCode}
                condition={x?.condition}
                quantity={x?.quantity}
                hasQuantities={x?.hasQuantities}
                status={x?.status}
                trade={x?.trade}
                forCart={x?.forCart}
                sponsoredText={sponsoredText}
                onBookmark={onBookmark}
                actionComponent={actionComponent}
                bookmarked={x?.bookmarked}
                bookmarkLists={x?.bookmarkLists}
                metadata={{ accessor: x?.accessor, name: componentName }}
                sellerName={x?.sellerName}
                LinkComponent={LinkComponent}
                activeSalesPackages={x?.activeSalesPackages}
                urgentText={urgentText}
                hasFreeShipping={x?.hasFreeShipping}
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
        {isDefinedNotEmptyString(buttonLink) &&
          isDefinedNotEmptyString(buttonText) &&
          !isLoading && (
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
      <SuspenseSelectBar isLoading={isLoadingOptions}>
        {options && options?.length > 0 && (
          <SelectBar
            items={options}
            selectedIds={selectedOption}
            onRemove={onRemoveOption}
            onSelect={onSelectOption}
            allButton={allOptionsEnabled}
            onSelectAll={onSelectAllOptions}
            labelKey={optionLabel}
            valueKey={optionValue}
            codeKey={optionCode}
            noMargin={true}
            productsToolbarName={allOptionsLabel}
            noGradient={true}
            className="section__options"
          />
        )}
      </SuspenseSelectBar>

      <SuspenseDetailedProductCard
        isLoading={isLoading}
        keyPrefix="detailed-products-skeleton"
      >
        <GridWrapper limit={limit}>{memoizedProducts}</GridWrapper>
      </SuspenseDetailedProductCard>
    </TitleWithOptionsSectionWrapper>
  );
});

export default DetailedProductsSection;
