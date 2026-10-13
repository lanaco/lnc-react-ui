/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import { Container } from "./style";

/**
 * Stats bar (WebFrontend PartnerStatsSection.astro parity): a bordered,
 * rounded card with icon-circle stats in one row on desktop, and a
 * borderless 2x2 grid with an inline icon before each number on mobile.
 * Each item: { title, description, icon? } where icon is an icon class name.
 */
const PartnerStatsSection = forwardRef(({ title, description, items }, ref) => {
  return (
    <Container ref={ref} className="lp-section lp-partner-stats-section">
      {(title || description) && (
        <div className="section__text">
          {title && <h2 className="section__title">{title}</h2>}
          {description && (
            <div className="section__description">{description}</div>
          )}
        </div>
      )}
      {items && items?.length > 0 && (
        <div className="section__items">
          {items?.map((item, idx) => (
            <div
              key={`partner-stats-section-item__${idx + 1}`}
              className="section__item"
            >
              {item?.icon && (
                <span className="item__icon-circle">
                  <i className={item.icon} />
                </span>
              )}
              <div className="item__text">
                <div className="item__title">
                  {item?.icon && (
                    <i className={`${item.icon} item__icon-inline`} />
                  )}
                  <span>{item?.title}</span>
                </div>
                <div className="item__description">{item?.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
});

export default PartnerStatsSection;
