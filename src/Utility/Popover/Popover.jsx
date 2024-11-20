import * as React from "react";
import PropTypes from "prop-types";
import PopoverContext from "./PopoverContext";
import usePopover from "./usePopover";

function Popover({ children, modal = false, ...restOptions }) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions });
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
}

Popover.propTypes = {
  initialOpen: PropTypes.bool,
  placement: PropTypes.oneOf([
    "center",
    "top",
    "right",
    "bottom",
    "left",
    "top-start",
    "top-end",
    "right-start",
    "right-end",
    "bottom-start",
    "bottom-end",
    "left-start",
    "left-end",
  ]),
  modal: PropTypes.bool,
  offsetValue: PropTypes.number,
  /** For controlled usage of Popover */
  open: PropTypes.bool,
  /** For controlled usage of Popover */
  onOpenChange: PropTypes.func,
};

export default Popover;
