import { forwardRef } from "react";

import OverlayGeneralCard from "../../../Landing Components/general-components/overlay-general-card";
import { Container } from "./style";
import SuspenseBlogsSectionDetailed from "../../../Landing Components/skeleton-components/blog/blogs-section-detailed";

const OverlayGeneralCardsSection = forwardRef(
  (
    {
      title,
      items,
      isLoading = false,
      onSelectCard = () => {},
      onButtonAction = () => {},
    },
    ref
  ) => {
    return (
      <Container ref={ref}>
        <div className="section__title">{title}</div>
        <SuspenseBlogsSectionDetailed
          isLoading={isLoading}
          keyPrefix="overlay-general-cards-skeleton"
        >
          <div className="section__items">
            {items?.map((item, idx) => (
              <OverlayGeneralCard
                key={`overlay-general-card__${idx + 1}`}
                title={item?.title}
                description={item?.description}
                imageUrl={item?.imageUrl}
                buttonText={item?.buttonText}
                backgroundColor={item?.backgroundColor}
                handleSelectCard={() => onSelectCard(item)}
                handleButtonAction={() => onButtonAction(item)}
              />
            ))}
          </div>
        </SuspenseBlogsSectionDetailed>
      </Container>
    );
  }
);

export default OverlayGeneralCardsSection;
