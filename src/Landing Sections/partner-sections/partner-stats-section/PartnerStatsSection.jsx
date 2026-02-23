import { forwardRef } from "react";

import { Container } from "./style";

const PartnerStatsSection = forwardRef(({ title, description, items }, ref) => {
  return (
    <Container>
      <div className="section__text">
        {title && <div className="section__title">{title}</div>}
        {description && (
          <div className="section__description">{description}</div>
        )}
      </div>
      {items && items?.length > 0 && (
        <div className="section__items">
          {items?.map((item, idx) => (
            <div
              key={`partner-stats-section-item__${idx + 1}`}
              className="section__item"
            >
              <div className="item__title">{item?.title}</div>
              <div className="item__description">{item?.description}</div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
});

export default PartnerStatsSection;
