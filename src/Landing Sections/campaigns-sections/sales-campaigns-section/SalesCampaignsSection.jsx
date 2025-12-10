/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import SalesCampaignCard from "../../../Landing Components/campaigns-components/sales-campaign-card/SalesCampaignCard";
import SuspenseCampaignCard from "./skeleton";
import ScrollableSectionV3 from "../../../Utility/ScrollableSectionV3";
import useDetectMobile from "../../../_utils/useDetectMobile";
import ItemlessBanner from "../../../Landing Components/general-components/itemless-banner";

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
      numOfSlides = 2,
      showNavigation = true,
      numberOfListingsTextSingular,
      numberOfListingsTextPlural,
      itemlessImageUrl,
      itemlessLink,
      handleItemlessLink = () => {},
      componentName,
    },
    ref
  ) => {
    const isMobile = useDetectMobile();

    const memoizedItems = useMemo(() => {
      let components = items?.map((item, index) => (
        <MemoizedCampaignItemRecommended
          key={`campaign__item__${index}__${item?.startDate}___${item?.endDate}`}
          className="campaign-item"
          coverPhoto={getImage(
            item?.coverPhoto,
            item?.uuid || item?.campaignUuid
          )}
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
          themeData={item?.themeData}
          numberOfListings={item?.numberOfListings}
          numberOfListingsTextSingular={numberOfListingsTextSingular}
          numberOfListingsTextPlural={numberOfListingsTextPlural}
          metadata={{ name: componentName, accessor: item?.accessor }}
        />
      ));

      if (items?.length < 2 && !isMobile) {
        return [
          ...components,
          <ItemlessBanner
            key={`itemless-campaign-section-banner`}
            imageUrl={itemlessImageUrl}
            className="campaign-item"
            handleClick={handleItemlessLink}
          />,
        ];
      }

      return components;
    }, [items]);

    return (
      <SuspenseCampaignCard
        isLoading={isLoading}
        itemsCount={isMobile ? 1 : 2}
        keyPrefix="sales-camp"
      >
        <ScrollableSectionV3
          key={`sales-campaign-section__${isMobile}`}
          icon={icon}
          title={title}
          numOfSlides={numOfSlides}
          showNavigation={showNavigation}
        >
          {memoizedItems}
        </ScrollableSectionV3>
      </SuspenseCampaignCard>
    );
  }
);

export default SalesCampaignsSection;
