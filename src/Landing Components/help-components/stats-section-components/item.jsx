import { forwardRef } from "react";

import PropTypes from "prop-types";

import { Container } from "./style";

const StatsSectionItems = forwardRef(({ items = [] }) => {
  return (
    <Container>
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

StatsSectionItems.propTypes = {
  items: PropTypes.array,
};

export default StatsSectionItems;
