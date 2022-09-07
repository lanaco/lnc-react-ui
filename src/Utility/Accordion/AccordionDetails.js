import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const getPadding = (isExpanded, size) => {
  if(size == "medium")
    return `${isExpanded ? "0.4rem" : "0"} 1.25rem ${isExpanded ? "0.8rem" : "0"} 1.25rem`;
  if(size == "large")
    return `${isExpanded ? "0.6rem" : "0"} 1.5rem ${isExpanded ? "1rem" : "0"} 1.5rem`;
  
  return  `${isExpanded ? "0.2rem" : "0"} 1rem ${isExpanded ? "0.6rem" : "0"} 1rem`;
}

const StyledDetails = styled.div`
  transform: ${(props) => (props.isExpanded ? "scaleY(1)" : "scaleY(0)")};
  transform-origin: top;
  transition: transform 0.25s ease;
  max-height: ${props => props.isExpanded ? "auto" : "0"};
  padding: ${props => getPadding(props.isExpanded, props.size)};
`;

const AccordionDetails = React.forwardRef((props, ref) => {
  const {
    isExpanded,
    size,
    children,
    ...rest
  } = props;

  return (
    <StyledDetails ref={ref} size={size} isExpanded={isExpanded} {...rest}>
      {children}
    </StyledDetails>
  );
});

AccordionDetails.defaultProps = {
  __TYPE__: "ACCORDION_DETAILS",
  //-------------------------
  style: {},
  size: "small",
};

AccordionDetails.propTypes = {
  __TYPE__: PropTypes.string,
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default AccordionDetails;
