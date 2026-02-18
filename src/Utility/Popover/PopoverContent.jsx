/* eslint-disable react/prop-types */
import { forwardRef, useContext } from "react";
import {
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";
import { useTheme } from "@emotion/react";
import PopoverContext from "./PopoverContext";
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

const usePopoverState = () => {
  const context = useContext(PopoverContext);

  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }

  return context;
};

const PopoverContent = forwardRef(function PopoverContent(
  { borderRadius = "regular", className = "", zIndex, style = {}, ...props },
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
            className="lnc-ui-floating-manager"
            aria-labelledby={state.labelId}
            aria-describedby={state.descriptionId}
            {...state.getFloatingProps(props)}
          >
            <StyledContent
              theme={theme}
              borderRadius={borderRadius}
              className={"lnc-ui-popover-content " + className}
              style={style}
            >
              {props.children}
            </StyledContent>
          </div>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  );
});

export default PopoverContent;
