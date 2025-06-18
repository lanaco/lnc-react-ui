import { forwardRef } from "react";

import LandingPageOverlayGeneralCard from "../../Landing Components/general-components/overlay-general-card/index";
import { RegulatTitleSectionWrapper } from "../style";

import { GridWrapper } from "./style";

const OverlayGeneralCardsSection = forwardRef(
  ({ title, items, limit = 2 }, ref) => {
    return (
      <RegulatTitleSectionWrapper>
        <div className="regular-title center">
          <div className="regular-title-text">
            <span>{title}</span>
          </div>
        </div>
        <GridWrapper limit={limit}>
          {items &&
            items?.map((item, index) => (
              <LandingPageOverlayGeneralCard
                key={`landing-page-overlay-general-card__${index + 1}`}
                title={item?.title}
                image={item?.image}
                description={item?.description}
                handleClick={item?.handleClick}
                actionText={item?.actionText}
                overlay={item?.overlay}
              />
            ))}
        </GridWrapper>
      </RegulatTitleSectionWrapper>
    );
  }
);

export default OverlayGeneralCardsSection;
