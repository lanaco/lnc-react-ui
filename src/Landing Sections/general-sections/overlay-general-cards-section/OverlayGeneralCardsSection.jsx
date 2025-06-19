/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import LandingPageOverlayGeneralCard from "../../../Landing Components/general-components/overlay-general-card/index";

import { GridWrapper } from "./style";
import { RegulatTitleSectionWrapper } from "../../style";

const OverlayGeneralCardsSection = forwardRef(
  ({ title, items, limit = 2, onSelectCard = () => {} }, ref) => {
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
                actionText={item?.actionText}
                overlay={item?.overlay}
                handleClick={() => onSelectCard(item?.uuid)}
              />
            ))}
        </GridWrapper>
      </RegulatTitleSectionWrapper>
    );
  }
);

export default OverlayGeneralCardsSection;
