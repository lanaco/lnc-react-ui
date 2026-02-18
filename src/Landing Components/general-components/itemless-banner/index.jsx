/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

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
    ref,
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
  },
);

export default ItemlessBanner;
