/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import { Container } from "./style";

const StatsSectionItems = forwardRef(({ items = [] }, ref) => {
  return (
    <Container ref={ref}>
      {items?.map((item, idx) => (
        <div key={`stats-section-item__${idx + 1}`} className="section__card">
          <div>
            <img
              src={item?.image}
              alt={`Stats Card ${idx + 1}`}
              className="section__image"
            />
          </div>
          <div>
            <div className="section__title">{item?.title}</div>
            <div className="section__description">{item?.description}</div>
          </div>
        </div>
      ))}
    </Container>
  );
});

export default StatsSectionItems;
