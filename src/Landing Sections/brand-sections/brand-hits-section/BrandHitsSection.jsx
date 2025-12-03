/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import BrandHitCard from "../../../Landing Components/brand-components/brand-hit-card";
import BrandHitCardSkeleton from "../../../Landing Components/brand-components/brand-hit-card/skeleton";
import { Wrapper } from "./style";

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
        <div className="wrapper__content">
          {isLoading
            ? Array.from("12345")?.map((_, idx) => (
                <BrandHitCardSkeleton
                  key={`brand-hit-card-skeleton__${idx + 1}`}
                />
              ))
            : items?.map((item, idx) => (
                <BrandHitCard
                  key={`brand-hit-card__${idx + 1}`}
                  image={item?.image}
                  imageComponent={item?.imageComponent}
                  onSelectCard={() => onSelectCard?.(item)}
                  className="wrapper__item"
                />
              ))}
        </div>
      </Wrapper>
    );
  }
);

export default BrandHitsSection;
