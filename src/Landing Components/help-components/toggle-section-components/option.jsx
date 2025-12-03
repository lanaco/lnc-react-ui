import { forwardRef } from "react";

import PropTypes from "prop-types";

import Chip from "../../../Data display/Chip/Chip";
import { OptionsContainer } from "./style";

const ToggleSectionOptions = forwardRef(
  (
    { options = [], selectedOptionCode = null, onSelectOption = () => {} },
    ref
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
  }
);

ToggleSectionOptions.propTypes = {
  options: PropTypes.array,
  selectedOptionCode: PropTypes.any,
  onSelectOption: PropTypes.func,
};

export default ToggleSectionOptions;
