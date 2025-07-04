/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import { RegulatTitleSectionWrapper } from "../../style";

import SuspenseOverlayCard from "../../../Landing Components/skeleton-components/general-skeletons/suspense-overlay-card";
import LandingPageOverlayGeneralCard from "../../../Landing Components/general-components/overlay-general-card/index";

const MemoizedProductCard = memo(LandingPageOverlayGeneralCard);

const OverlayGeneralCardsSection = forwardRef(
  (
    { title, items, limit = 2, onSelectCard = () => {}, isLoading = false, onButtonAction = () => {} },
    ref
  ) => {
    const memoizedProducts = useMemo(() => {
      return (
        <>
          {items &&
            items?.map((item, index) => (
              <MemoizedProductCard
                key={`landing-page-overlay-general-card__${index + 1}`}
                title={item?.title}
                image={item?.imageUrl}
                description={item?.description}
                buttonText={item?.buttonText}
                backgroundColor={item?.backgroundColor}
                handleClick={() => onSelectCard(item?.selectAction, item)}
                onButtonAction={() => onButtonAction(item?.buttonLink, item)}
              />
            ))}
        </>
      );
    }, [items, onSelectCard]);

    return (
      <RegulatTitleSectionWrapper ref={ref}>
        <div className="regular-title center">
          <div className="regular-title-text">
            <span>{title}</span>
          </div>
        </div>
        <GridWrapper limit={limit}>
          <SuspenseOverlayCard
            isLoading={isLoading}
            limit={limit}
            keyPrefix={"explore-landing"}
          >
            {memoizedProducts}
          </SuspenseOverlayCard>
        </GridWrapper>
      </RegulatTitleSectionWrapper>
    );
  }
);

export default OverlayGeneralCardsSection;
