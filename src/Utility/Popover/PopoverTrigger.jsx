import { forwardRef, isValidElement, cloneElement } from "react";
import { useMergeRefs } from "@floating-ui/react";
import PropTypes from "prop-types";
import PopoverContext from "./PopoverContext";

const usePopoverState = () => {
  const context = useContext(PopoverContext);

  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }

  return context;
};

const PopoverTrigger = forwardRef(function PopoverTrigger(
  { children, asChild, ...props },
  propRef
) {
  const state = usePopoverState();
  const childrenRef = children.ref;
  const ref = useMergeRefs([state.reference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      state.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": state.open ? "open" : "closed",
      })
    );
  }

  return (
    <div
      ref={ref}
      // The user can style the trigger based on the state
      data-state={state.open ? "open" : "closed"}
      style={{ width: "max-content" }}
      {...state.getReferenceProps(props)}
    >
      {children}
    </div>
  );
});

PopoverTrigger.propTypes = {
  /** Allows the user to pass any element as the anchor */
  asChild: PropTypes.bool,
};

export default PopoverTrigger;
