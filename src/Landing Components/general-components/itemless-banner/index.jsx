import { forwardRef } from "react";

import PropTypes from "prop-types";
import { Container } from "./style";

const ItemlessBanner = forwardRef(
  ({
    sectionName,
    imageUrl,
    maxHeight = "16.25rem",
    handleClick = () => {},
  }) => {
    return (
      <Container
        maxHeight={maxHeight}
        onClick={handleClick}
        className="itemless-banner"
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
  handleClick: PropTypes.func,
};

export default ItemlessBanner;
