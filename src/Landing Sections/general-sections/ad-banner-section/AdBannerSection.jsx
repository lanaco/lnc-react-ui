/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import useDetectMobile from "../../../_utils/useDetectMobile";
import AdBanner from "../../../Landing Components/general-components/ad-banner";
import { Wrapper } from "./style";

const AdBannerSection = forwardRef(
  ({ image, imageForMobile, link, onSelectCard = () => {} }, ref) => {
    const isMobile = useDetectMobile();

    return (
      <Wrapper>
        <AdBanner
          image={image}
          imageForMobile={imageForMobile}
          isMobile={isMobile}
          onSelectCard={() => onSelectCard?.(link)}
        />
      </Wrapper>
    );
  }
);

export default AdBannerSection;
