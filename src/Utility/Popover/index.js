import * as React from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  Placement,
  FloatingPortal,
  FloatingFocusManager,
  useId,
} from "@floating-ui/react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentPropValue,
} from "../../_utils/utils";

const StyledContent = styled(motion.div)`
  font-family: ${(props) => props.theme?.typography?.fontFamily};
  animation: fadeIn 0.4s;
  box-shadow: ${(props) =>
    getComponentPropValue(
      props.theme,
      "Popover",
      props.color,
      "enabled",
      "boxShadow"
    )};
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, props.borderRadius)};
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  padding: 0.25rem;
  background-color: ${(props) =>
    getColorRgbaValue(props.theme, "Popover", "default", "enabled", "bg")};
`;

export function usePopover({
  initialOpen = false,
  placement,
  offsetValue,
  modal = true,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const [labelId, setLabelId] = React.useState(undefined);
  const [descriptionId, setDescriptionId] = React.useState(undefined);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      flip({
        fallbackAxisSideDirection: "end",
      }),
      shift({ padding: 5 }),
    ],
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId]
  );
}

const PopoverContext = React.createContext(null);

export const usePopoverState = () => {
  const context = React.useContext(PopoverContext);

  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }

  return context;
};

export function Popover({ children, modal, ...restOptions }) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions });
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
}

Popover.defaultProps = {
  initialOpen: false,
  modal: false,
  offsetValue: 5,
//   placement: "bottom"
  // onOpenChange: (open) => {}
};

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


export const PopoverTrigger = React.forwardRef(function PopoverTrigger(
  { children, asChild, ...props },
  propRef
) {
  const state = usePopoverState();
  const childrenRef = children.ref;
  const ref = useMergeRefs([state.reference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
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
      style={{width: "max-content"}}
      {...state.getReferenceProps(props)}
    >
      {children}
    </div>
  );
});

PopoverTrigger.defaultProps = {
  asChild: false,
};

PopoverTrigger.propTypes = {
  /** Allows the user to pass any element as the anchor */
  asChild: PropTypes.bool,
};

export const PopoverContent = React.forwardRef(function PopoverContent(
  { borderRadius, className, zIndex, style, ...props },
  propRef
) {
  const state = usePopoverState();
  const ref = useMergeRefs([state.floating, propRef]);
  const theme = useTheme();

  return (
    <FloatingPortal>
      {state.open && (
        <FloatingFocusManager context={state.context} modal={state.modal}>
          <div
            ref={ref}
            style={{
              position: state.strategy,
              top: state.y ?? 0,
              left: state.x ?? 0,
              width: "max-content",
              zIndex: zIndex,
            }}
            aria-labelledby={state.labelId}
            aria-describedby={state.descriptionId}
            {...state.getFloatingProps(props)}
          >
            <StyledContent theme={theme} borderRadius={borderRadius} className={className} style={style}>
              {props.children}
            </StyledContent>
          </div>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  );
});

PopoverContent.defaultProps = {
  className: "",
  borderRadius: "regular",
  style: {},
};

PopoverContent.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  zIndex: PropTypes.number,
};

export const PopoverHeading = React.forwardRef(function PopoverHeading(
  { children, ...props },
  ref
) {
  const { setLabelId } = usePopoverState();
  const id = useId();

  // Only sets `aria-labelledby` on the Popover root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <h2 {...props} ref={ref} id={id}>
      {children}
    </h2>
  );
});

export const PopoverDescription = React.forwardRef(function PopoverDescription(
  { children, ...props },
  ref
) {
  const { setDescriptionId } = usePopoverState();
  const id = useId();

  // Only sets `aria-describedby` on the Popover root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return (
    <p {...props} ref={ref} id={id}>
      {children}
    </p>
  );
});

export const PopoverClose = React.forwardRef(function PopoverClose(
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
