/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import SalesCampaignCard from "../../../Landing Components/campaigns-components/sales-campaign-card/SalesCampaignCard";
import { StyledScrollableSection } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import ItemlessBanner from "../../../Landing Components/general-components/itemless-banner";
import SuspenseSalesCampaign from "../../../Landing Components/skeleton-components/general/sales-campaign";

const MemoizedCampaignItemRecommended = memo(SalesCampaignCard);

const SalesCampaignsSection = forwardRef(
  (
    {
      sellerType = "Shop",
      items = [],
      title,
      icon,
      isLoading,
      onSelectCard = () => {},
      onSelectShop = () => {},
      getImage = () => {},
      campaignSingleText,
      upcomingCampaignText,
      salesCampaignTypes = [],
      startsInPrefixTextPlural,
      startsinSuffixTextPlural,
      startsInPrefixTextSingular,
      startsinSuffixTextSingular,
      endsInPrefixTextPlural,
      endsinSuffixTextPlural,
      endsInPrefixTextSingular,
      endsinSuffixTextSingular,
      endedText,
      numOfSlides = 4,
      showNavigation = true,
      numberOfListingsTextSingular,
      numberOfListingsTextPlural,
      itemlessImageUrl,
      itemlessMaxHeight,
      handleItemlessLink = () => {},
      componentName,
      hasNextPage = false,
      handleFetchNextPage = () => {},
      LinkComponent,
    },
    ref,
  ) => {
    const isMobile = useDetectMobile();

    const isSingleItem = items?.length === 1;
    const showItemlessBanner =
      isSingleItem && !isMobile && !!itemlessImageUrl;
    // 1 or 2 items => wide cards with image on the side (horizontal)
    const isHorizontalCard = items?.length <= 2;
    // exactly 3 items => vertical 3-up grid with a smaller (landscape) cover image
    const isThreeUp = !isMobile && items?.length === 3;

    // Accept the raw API field names too (what the web dispatcher reads) as
    // fallbacks for the names this component has always used.
    const normalizedItems = useMemo(
      () =>
        (items || []).map((item) => ({
          ...item,
          coverPhoto: item?.coverPhoto ?? item?.coverImage,
          campaignUuid: item?.campaignUuid ?? item?.uuid,
          shopUuid: item?.shopUuid ?? item?.sellerUuid,
          shopName: item?.shopName ?? item?.sellerName,
          shopCategory: item?.shopCategory ?? item?.sellerCategory,
          profileImage: item?.profileImage ?? item?.sellerImage ?? item?.shopImage,
          name: item?.name ?? item?.title,
        })),
      [items],
    );

    const memoizedItems = useMemo(() => {
      let components = normalizedItems.map((item, index) => (
        <MemoizedCampaignItemRecommended
          key={`campaign__item__${index}__${item?.startDate}___${item?.endDate}`}
          className={`campaign-item ${
            isHorizontalCard ? "horizontal-campaign-item" : ""
          }`}
          coverPhoto={
            getImage(item?.coverPhoto, item?.uuid || item?.campaignUuid) ||
            item?.coverPhoto
          }
          description={item?.description}
          endDate={item?.endDate}
          salesPackages={item?.salesPackages}
          // sellerType={SellerType.SHOP}
          sellerType={sellerType}
          shopImage={item?.profileImage}
          shopImageComponent={item?.profileImageComponent}
          shopName={item?.shopName}
          shopUuid={item?.shopUuid}
          shopCategory={item?.shopCategory}
          startDate={item?.startDate}
          title={item?.name}
          uuid={item?.campaignUuid}
          onSelectCard={(e, cardRef) =>
            onSelectCard(item?.campaignUuid, item?.shopUuid, cardRef)
          }
          onSelectShop={() => onSelectShop(item?.shopUuid)}
          campaignSingleText={campaignSingleText}
          upcomingCampaignText={upcomingCampaignText}
          upcoming={item?.upcoming}
          salesCampaignTypes={salesCampaignTypes}
          startsInPrefixTextPlural={startsInPrefixTextPlural}
          startsinSuffixTextPlural={startsinSuffixTextPlural}
          startsInPrefixTextSingular={startsInPrefixTextSingular}
          startsinSuffixTextSingular={startsinSuffixTextSingular}
          endsInPrefixTextPlural={endsInPrefixTextPlural}
          endsinSuffixTextPlural={endsinSuffixTextPlural}
          endsInPrefixTextSingular={endsInPrefixTextSingular}
          endsinSuffixTextSingular={endsinSuffixTextSingular}
          endedText={endedText}
          themeData={item?.themeData}
          numberOfListings={item?.numberOfListings}
          numberOfListingsTextSingular={numberOfListingsTextSingular}
          numberOfListingsTextPlural={numberOfListingsTextPlural}
          metadata={{ name: componentName, accessor: item?.accessor }}
          LinkComponent={LinkComponent}
          sponsored={item?.sponsored}
        />
      ));

      if (showItemlessBanner) {
        return [
          ...components,
          <ItemlessBanner
            key={`itemless-campaign-section-banner`}
            imageUrl={itemlessImageUrl}
            className="campaign-item"
            maxHeight={itemlessMaxHeight}
            handleClick={handleItemlessLink}
          />,
        ];
      }

      return components;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [normalizedItems, isMobile, itemlessImageUrl]);

    return (
      <SuspenseSalesCampaign
        isLoading={isLoading}
        keyPrefix="sales-campaign-skeleton"
      >
        <StyledScrollableSection
          key={`sales-campaign-section__${isMobile}`}
          icon={icon}
          title={title}
          numOfSlides={numOfSlides}
          tabletNumOfSlides={2}
          showNavigation={showNavigation}
          hasNextPage={hasNextPage}
          handleFetchNextPage={handleFetchNextPage}
          className={`lp-section lp-sales-campaigns-section${showItemlessBanner ? " itemless" : ""}${isThreeUp ? " three-up" : ""}`}
        >
          {memoizedItems}
        </StyledScrollableSection>
      </SuspenseSalesCampaign>
    );
  },
);

export default SalesCampaignsSection;
