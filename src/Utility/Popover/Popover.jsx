/* eslint-disable react/prop-types */
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

export default Popover;
