/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import { Container } from "./style";

const HelpBannerSection = forwardRef(({ title, description, image }, ref) => {
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

export default HelpBannerSection;
