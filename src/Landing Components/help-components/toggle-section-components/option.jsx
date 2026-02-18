/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import Chip from "../../../Data display/Chip/Chip";
import { OptionsContainer } from "./style";

const ToggleSectionOptions = forwardRef(
  (
    { options = [], selectedOptionCode = null, onSelectOption = () => {} },
    ref,
  ) => {
    return (
      <OptionsContainer ref={ref}>
        {options?.map((option, idx) => (
          <Chip
            key={`toggle-section-tag__${idx + 1}`}
            label={option}
            borderRadius="curved"
            color="neutral"
            className={`options__item ${
              selectedOptionCode === idx ? "active" : ""
            }`}
            onClick={() => {
              onSelectOption(idx);
            }}
          />
        ))}
      </OptionsContainer>
    );
  },
);

export default ToggleSectionOptions;
