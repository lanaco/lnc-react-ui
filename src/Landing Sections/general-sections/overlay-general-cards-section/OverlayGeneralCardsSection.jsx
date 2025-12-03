import { forwardRef } from "react";

import OverlayGeneralCard from "../../../Landing Components/general-components/overlay-general-card";
import { Container } from "./style";

const OverlayGeneralCardsSection = forwardRef(
  (
    { title, items, onSelectCard = () => {}, onButtonAction = () => {} },
    ref
  ) => {
    return (
      <Container ref={ref}>
        <div className="section__title">{title}</div>
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
      </Container>
    );
  }
);

export default OverlayGeneralCardsSection;
