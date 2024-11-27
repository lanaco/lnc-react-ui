/* eslint-disable react/prop-types */
import { useContext, forwardRef } from "react";
import PopoverContext from "./PopoverContext";

const usePopoverState = () => {
  const context = useContext(PopoverContext);

  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }

  return context;
};

const PopoverClose = forwardRef(function PopoverClose(
  { children, ...props },
  ref
) {
  const state = usePopoverState();
  return (
    <div {...props} ref={ref} onClick={() => state.setOpen(false)}>
      {children}
    </div>
  );
});

export default PopoverClose;
