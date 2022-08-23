import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Button from "../../General/Button";
import Popover from "../../Utility/Popover";
import OutsideClickHandler from 'react-outside-click-handler';

const StyledDropDown = styled.div``;

const PopoverContent = styled.div`
  padding: 0.25rem;
  gap: 0.25rem;
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const DropDownMenu = React.forwardRef((props, ref) => {
  const {
    control,
    openOnClick,
    openOnHover,
    offset,
    verticalAlignment,
    horizontalAlignment,
    //----------------
    onFocus,
    onBlur,
    onClick,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onItemSelected,
    //----------------
    className,
    style,
    color,
    size,
    popoverProps,
    children,
    ...rest
  } = props;

  const menuContentRef = useRef();
  const [show, setShow] = useState(false);

  const controlRef = useRef();
  const firstItemRef = useRef();

  const clonedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      if (
        child.props.__TYPE__ == "TAB_ITEM" ||
        child.props.__TYPE__ == "NESTED_ITEM"
      ) {
        if (index == 0) {
          if (child.props.ref) firstItemRef.current = ref;
          return React.cloneElement(child, {
            ref: ref ? ref : firstItemRef, //needed to focus on navigation
            color: color,
            onItemSelected: onItemSelected,
          });
        }
        return React.cloneElement(child, {
          color: color,
          size: size,
          onItemSelected: onItemSelected,
        });
      }
    }

    return child;
  });

  const clonedControl = () => {
    if (typeof control === "string" || control instanceof String) {
      return (
        <Button
          text={control}
          onClick={handleOnClick}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onBlur={onBlur}
          onFocus={onFocus}
          ref={control?.ref ? control.ref : controlRef}
          onKeyDown={handleOnControlKeyDown}
          trailingIcon="angle-down"
          data-control={true} //Used for when click on outside of menu to ignore control click (control is outside)
        />
      );
    } else {
      return React.cloneElement(control, {
        color: color,
        size: size,
        ref: control?.ref ? control?.ref : controlRef,
        onClick: handleOnClick,
        onMouseEnter: handleOnMouseEnter,
        onMouseLeave: handleOnMouseLeave,
        onBlur: onBlur,
        onFocus: onFocus,
        onKeyDown: handleOnControlKeyDown,
        ["data-control"]: true
      });
    }
  };

  const handleOnClick = (e) => {
    if (openOnClick && !openOnHover) {
      setShow(!show)
    }

    onClick(e);
  };
  const handleOnMouseEnter = (e) => {
    if (openOnHover == true) {
      setShow(!show)
    };

    onMouseEnter(e);
  };
  const handleOnMouseLeave = (e) => {
    onMouseLeave(e);
  };

  const handleOnControlKeyDown = (e) => {
    e.preventDefault();
    firstItemRef?.current?.focus();
    onKeyDown(e);
  };

  const handleClickOutside = (e) => {
    //ignore if click is on control
    if(e.target?.attributes?.["data-control"]) return;

    setShow(false); 
  }

  return (
    <StyledDropDown ref={ref} {...rest}>
      {clonedControl()}
      <Popover
        anchorElement={control?.ref?.current ? control.ref.current : controlRef?.current}
        show={show}
        vertical={verticalAlignment}
        horizontal={horizontalAlignment}
        offset={offset}
        style={{ padding: 0 }}
        {...popoverProps}
      >
        <OutsideClickHandler
          onOutsideClick={handleClickOutside}>
          <PopoverContent ref={menuContentRef}>{clonedChildren}</PopoverContent>
        </OutsideClickHandler>
      </Popover>
    </StyledDropDown >

  );
});

DropDownMenu.defaultProps = {
  openOnClick: true,
  openOnHover: false,
  offset: 8,
  verticalAlignment: "bottom",
  // horizontalAlignment: "right",
  //-------------------------
  onBlur: () => { },
  onFocus: () => { },
  onClick: () => { },
  onKeyDown: () => { },
  onMouseEnter: () => { },
  onMouseLeave: () => { },
  onItemSelected: () => { },
  //-------------------------
  style: {},
  color: "primary",
  size: "small",
};

DropDownMenu.propTypes = {
  control: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  openOnClick: PropTypes.bool,
  openOnHover: PropTypes.bool,
  /**
   * Menu offset from the control
   */
  offset: PropTypes.number,
  //Menu's horizontal alignment
  horizontalAlignment: PropTypes.oneOf(["left", "right", "center"]),
  //Menu's vertical alignment
  verticalAlignment: PropTypes.oneOf(["top", "bottom"]),
  //---------------------------------------------------------------
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onItemSelected: PropTypes.func,
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  popoverProps: PropTypes.any,
};

export default DropDownMenu;
