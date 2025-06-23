/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { SwitchWrapper } from "./style";

const GenderRadioToggle = forwardRef((props, ref) => {
  const {
    onChange = () => {},
    items = [
      { name: "Male", icon: "mng-lnc-male-02", value: "male" },
      { name: "Female", value: "female", icon: "mng-lnc-female-02" },
    ],
    ...rest
  } = props;

  const knobContentOff = (
    <div className="cont">
      <i className={items?.at(0)?.icon} />
      <span>{items?.at(0)?.name}</span>
    </div>
  );
  const knobContentOn = (
    <div className="cont">
      <span>{items?.at(1)?.name}</span>
      <i className={items?.at(1)?.icon} />
    </div>
  );
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (onChange)
      onChange(
        e.target.checked === true ? items?.at(1)?.value : items?.at(0)?.value
      );
  };

  return (
    <SwitchWrapper ref={ref} checked={checked} {...rest}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className="knob">{checked ? knobContentOn : knobContentOff}</span>
      <span className="text">
        <div className="cont">
          <i className={items?.at(0)?.icon} />
          {checked === true && (
            <span className="hidden-txt">{items?.at(0)?.name}</span>
          )}
        </div>
        <div className="cont">
          {checked !== true && (
            <span className="hidden-txt">{items?.at(1)?.name}</span>
          )}
          <i className={items?.at(1)?.icon} />
        </div>
      </span>
    </SwitchWrapper>
  );
});

GenderRadioToggle.propTypes = {
  value: PropTypes.any,
  handleClick: PropTypes.func,
  color: PropTypes.string,
};

export default GenderRadioToggle;
