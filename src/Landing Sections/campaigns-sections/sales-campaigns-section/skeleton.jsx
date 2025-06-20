/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, Suspense } from "react";
import { useTheme } from "@emotion/react";
import { CampaignCardContainer, ContentWrapper, FilledPlaceholder, ImgWrapper } from "./style";

const CampaignCardSkeleton = forwardRef(({}, ref) => {
  const theme  = useTheme();

  return (
    <CampaignCardContainer ref={ref} theme={theme}>
      <div className="campaign__left-section">
        <ImgWrapper
          theme={theme}
          width="15rem"
          height="15rem"
          borderRadius="edged"
        />
      </div>
      <div className="campaign__right-section">
        <ContentWrapper theme={theme}>
          <FilledPlaceholder heightCoeff={0.75} theme={theme} width="35%" />
          <FilledPlaceholder heightCoeff={1.25} theme={theme} />
          <FilledPlaceholder heightCoeff={3} theme={theme} />
        </ContentWrapper>
        <div className="campaign__user">
          <ImgWrapper
            theme={theme}
            width="2.5rem"
            height="2.5rem"
            borderRadius="curved"
          />
          <FilledPlaceholder theme={theme} width="75%" />
        </div>
      </div>
    </CampaignCardContainer>
  );
});

const SkeletonCampaigns = ({ itemsCount = 5, keyPrefix }) => {
  return (
    <>
      {Array.from({ length: itemsCount }, (_, index) => (
        <CampaignCardSkeleton
          key={`${keyPrefix}-skeleton-campaign-card-${index}`}
        />
      ))}
    </>
  );
};

const SuspenseCampaignCard = ({
  children,
  fallbackComponent = <></>,
  isLoading = false,
  itemsCount = 5,
  keyPrefix,
}) => {
  return (
    <Suspense fallback={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonCampaigns itemsCount={itemsCount} keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseCampaignCard;

