import { forwardRef } from "react";

import PropTypes from "prop-types";

import { Container } from "./style";

const BannerSection = forwardRef(({ title, description, image }, ref) => {
  return (
    <Container ref={ref}>
      <div className="section__heading">
        {title && <div className="section__title">{title}</div>}
        {description && (
          <div className="section__description">{description}</div>
        )}
      </div>
      {image && <img src={image} alt="Banner" className="section__image" />}
    </Container>
  );
});

BannerSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default BannerSection;
