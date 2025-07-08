/* eslint-disable no-empty-pattern */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Wrapper } from "./style";

const SeparatorSection = forwardRef(({}, ref) => {
  return <Wrapper ref={ref} className="separator-section-lnc"></Wrapper>;
});

export default SeparatorSection;
