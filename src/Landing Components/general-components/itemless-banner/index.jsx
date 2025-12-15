import { forwardRef } from "react";

import PropTypes from "prop-types";
import { Container } from "./style";

const ItemlessBanner = forwardRef(
  (
    {
      sectionName,
      imageUrl,
      maxHeight = "16.25rem",
      className = "",
      handleClick = () => {},
    },
    ref
  ) => {
    return (
      <Container
        ref={ref}
        maxHeight={maxHeight}
        onClick={handleClick}
        className={`itemless-banner ${className}`}
      >
        <img src={imageUrl} alt={`itemless-banner__${sectionName}`} />
      </Container>
    );
  }
);

ItemlessBanner.propTypes = {
  sectionName: PropTypes.string,
  imageUrl: PropTypes.string,
  maxHeight: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
};

export default ItemlessBanner;
