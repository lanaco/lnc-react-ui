/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo, useRef } from "react";
import SalesCampaignCard from "../../../Landing Components/campaigns-components/sales-campaign-card/SalesCampaignCard";
import useDetectMobile from "../../../_utils/useDetectMobile";
import ScrollableSectionV2 from "../../../Utility/ScrollableSectionV2";
import { SectionBlock } from "./style";
import SuspenseCampaignCard from "./skeleton";

const MemoizedCampaignItemRecommended = memo(SalesCampaignCard);

const SalesCampaignsSection = forwardRef(
  (
    {
      sellerType = "Shop",
      items = [],
      title,
      isLoading,
      onSelectCard = () => {},
      onSelectShop = () => {},
      getImage = () => {},
      // new
      customScrollSize,
      campaignSingleText,
      salesCampaignTypes = [],
      startsInPrefixTextPlural,
      startsinSuffixTextPlural,
      startsInPrefixTextSingular,
      startsinSuffixTextSingular,
    },
    ref
  ) => {
    const scrollableSectionRef = useRef();
    const isMobile = useDetectMobile();

    const memoizedItems = useMemo(() => {
      return items?.map((item, index) => (
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
          shopName={item?.shopName}
          shopUuid={item?.shopUuid}
          startDate={item?.startDate}
          title={item?.name}
          uuid={item?.campaignUuid}
          onSelectCard={() => onSelectCard(item?.campaignUuid, item?.shopUuid)}
          onSelectShop={() => onSelectShop(item?.shopUuid)}
          campaignSingleText={campaignSingleText}
          salesCampaignTypes={salesCampaignTypes}
          startsInPrefixTextPlural={startsInPrefixTextPlural}
          startsinSuffixTextPlural={startsinSuffixTextPlural}
          startsInPrefixTextSingular={startsInPrefixTextSingular}
          startsinSuffixTextSingular={startsinSuffixTextSingular}
          themeData={item?.themeData}
        />
      ));
    }, [items]);

    return (
      <>
        {items?.length > 0 && (
          <SectionBlock ref={ref} className="row-section-scroll">
            <ScrollableSectionV2
              arrowsVisibleOnHover={false}
              columnGap="0"
              methodsRef={scrollableSectionRef}
              mobileHoverScrollButtons={true}
              noArrows={true}
              padding={"0.25rem 0"}
              rightAlignArrows={true}
              scrollBySize={
                isMobile
                  ? window.innerWidth
                  : customScrollSize > 0
                  ? customScrollSize
                  : window.innerWidth
                //document.getElementById("home-page-container")?.offsetWidth
              }
              showTimesBtn={false}
              //   title={t("home.campaignsRecommended")}
              title={title}
              onShowEnd={() => {}}
              arrowsZIndex={11}
            >
              <SuspenseCampaignCard
                isLoading={isLoading}
                itemsCount={2}
                keyPrefix={"sales-camp"}
              >
                {memoizedItems}
              </SuspenseCampaignCard>
            </ScrollableSectionV2>
          </SectionBlock>
        )}
      </>
    );
  }
);

export default SalesCampaignsSection;
