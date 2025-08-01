/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import LandingPageMasonryGeneralCard from "../../../Landing Components/general-components/masonry-card";

import { GridWrapper } from "./style";
import { RegularTitleSectionWrapper } from "./style";

const MasonryGeneralCardsSection = forwardRef(
  ({ title, items, limit = 3, onSelectCard = () => {} }, ref) => {
    return (
      <RegularTitleSectionWrapper ref={ref}>
        <div className="regular-title">
          <div className="regular-title-text">
            <span>{title}</span>
          </div>
        </div>
        <GridWrapper limit={limit}>
          {items &&
            items?.map((item, index) => (
              <LandingPageMasonryGeneralCard
                key={`landing-page-masonry-general-card__${index + 1}`}
                {...item}
                onSelectCard={(selectAction) =>
                  onSelectCard(selectAction, item)
                }
              />
            ))}
        </GridWrapper>
      </RegularTitleSectionWrapper>
    );
  }
);

export default MasonryGeneralCardsSection;
