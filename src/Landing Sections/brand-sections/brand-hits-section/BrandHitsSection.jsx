/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import BrandHitCard from "../../../Landing Components/brand-components/brand-hit-card";
import { Wrapper } from "./style";
import SuspenseBrandHits from "../../../Landing Components/skeleton-components/brand/brand-hits";

const BrandHitsSection = forwardRef(
  (
    { title, subtitle, items = [], isLoading = false, onSelectCard = () => {} },
    ref
  ) => {
    return (
      <Wrapper ref={ref}>
        <div className="wrapper__heading">
          {title && <div className="wrapper__title">{title}</div>}
          {subtitle && <div className="wrapper__subtitle">{subtitle}</div>}
        </div>
        <SuspenseBrandHits
          isLoading={isLoading}
          keyPrefix="brand-hits-skeleton"
        >
          <div className="wrapper__content">
            {items?.map((item, idx) => (
              <BrandHitCard
                key={`brand-hit-card__${idx + 1}`}
                image={item?.image}
                imageComponent={item?.imageComponent}
                onSelectCard={() => onSelectCard?.(item)}
                className="wrapper__item"
              />
            ))}
          </div>
        </SuspenseBrandHits>
      </Wrapper>
    );
  }
);

export default BrandHitsSection;
