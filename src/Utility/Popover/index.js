import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { withActions } from '@storybook/addon-actions';

const StyledPopover = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  top: ${props => props.position ? `${(props.position?.top + props.position?.height)}` : '0'};

  box-shadow: ${(props) => `0px 0px 6px -2px ${props.theme.test_palette["disabled"][400]}`};
`

const Popover = React.forwardRef((props, ref) => {
  const {
    anchorElement,
    show,
    className,
    style,
    children,
    ...rest
  } = props;

  const theme = useTheme();
  const popoverRef = useRef();

  const [anchor, setAnchor] = useState(anchorElement);
  const [anchorElPosition, setAnchorElPosition] = useState();

  useEffect(() => {
    setAnchor(anchorElement);
    if (anchorElement) {
      var elementPos = anchorElement.getBoundingClientRect();
      console.log("use ef", anchorElement.getBoundingClientRect());
      setAnchorElPosition({ top: elementPos.top, left: elementPos.left, bottom: elementPos.bottom, right: elementPos.right, height: elementPos.height, width: elementPos.width });
      const { innerHeight: height, innerWidth: width } = window;
      console.log("window", height, width);
      if (popoverRef?.current) {
        console.log("ref", popoverRef.current.getBoundingClientRect());
      }
    }

  }, [anchorElement])

  const setPopoverPosition = () => {
    const { innerHeight: windowHeight, innerWidth: windowWidth } = window;
    let popoverChildrenPosition = ref ? ref.current?.getBoundingClientRect() : popoverRef.current?.getBoundingClientRect();

    if (popoverChildrenPosition && anchorElPosition) {
      //is anchor element further away from top of from the bottom of the window, and is it further away from the right or from the left
      if ((anchorElPosition.top < windowHeight - anchorElPosition.bottom) && (popoverChildrenPosition.height < anchorElPosition.top)) {
        //can it show bellow the anchor element?
        if (popoverChildrenPosition.height < windowHeight - anchorElPosition.bottom) {
          //is anchor element closer to the right or to the left
          if(popoverChildrenPosition.left < windowWidth - popoverChildrenPosition.right) {
            
          }
        } else {

        }
      } else {
        //can it show above anchor element?
        if (popoverChildrenPosition.height < anchorElPosition.top) {
          //is anchor element closer to the right or to the left

        } else {

        }
      }
    }
  }


  return (
    <StyledPopover theme={theme} ref={ref ? ref : popoverRef} position={position} show={show} className={className} style={style} {...rest}>
      {children}
    </StyledPopover>
  )
});

Popover.defaultProps = {
  className: "",
  style: {},
};

Popover.propTypes = {
  id: PropTypes.any,
  anchorElement: PropTypes.object,
  show: PropTypes.bool,
  //----------------------
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Popover