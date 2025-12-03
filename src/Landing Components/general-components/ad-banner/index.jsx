import { forwardRef } from "react";

import { Wrapper } from "./style";

const AdBanner = forwardRef(
  ({ image, imageForMobile, isMobile, onSelectCard }, ref) => {
    return (
      <Wrapper ref={ref}>
        <img
          src={isMobile ? imageForMobile : image}
          className="wrapper__image"
          onClick={onSelectCard}
        />
      </Wrapper>
    );
  }
);

export default AdBanner;
