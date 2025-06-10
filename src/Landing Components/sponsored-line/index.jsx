/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { Wrapper } from "./style";

const SponsoredLine = forwardRef(({ sponsoredText = "Sponsored" }, ref) => {
  return (
    <Wrapper ref={ref} className="sponsored-line">
      <i className="mng-lnc-paw2" />
      <span>{sponsoredText}</span>
    </Wrapper>
  );
});

export default SponsoredLine;
