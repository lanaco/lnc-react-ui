/* eslint-disable react/prop-types */
import { useId } from "@floating-ui/react";
import { useContext, useLayoutEffect, forwardRef } from "react";
import PopoverContext from "./PopoverContext";

const usePopoverState = () => {
  const context = useContext(PopoverContext);

  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }

  return context;
};

const PopoverDescription = forwardRef(function PopoverDescription(
  { children, ...props },
  ref
) {
  const { setDescriptionId } = usePopoverState();
  const id = useId();

  // Only sets `aria-describedby` on the Popover root element
  // if this component is mounted inside it.
  useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return (
    <p {...props} ref={ref} id={id}>
      {children}
    </p>
  );
});

export default PopoverDescription;
