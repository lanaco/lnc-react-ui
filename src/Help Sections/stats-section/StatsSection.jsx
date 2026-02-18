/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import StatsSectionItems from "../../Landing Components/help-components/stats-section-components/item";
import { Container } from "./style";

const StatsSection = forwardRef(({ title, description, items = [] }, ref) => {
  return (
    <Container ref={ref}>
      <div className="section__heading">
        {title && <div className="section__title">{title}</div>}
        {description && (
          <div className="section__description">{description}</div>
        )}
      </div>
      <StatsSectionItems items={items} />
    </Container>
  );
});

export default StatsSection;
