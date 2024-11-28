import { forwardRef, useLayoutEffect, useContext } from "react";
import { useId } from "@floating-ui/react";
import PopoverContext from "./PopoverContext";

const usePopoverState = () => {
  const context = useContext(PopoverContext);

  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }

  return context;
};

const PopoverHeading = forwardRef(function PopoverHeading(
  { children, ...props },
  ref
) {
  const { setLabelId } = usePopoverState();
  const id = useId();

  // Only sets `aria-labelledby` on the Popover root element
  // if this component is mounted inside it.
  useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <h2 {...props} ref={ref} id={id}>
      {children}
    </h2>
  );
});

export default PopoverHeading;
