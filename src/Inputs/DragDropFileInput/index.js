import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";
import theme from "../../_utils/theme";

const StyledDragDrop = styled.div``;

const DragDropFileInput = React.forwardRef((props, ref) => {
  return <StyledDragDrop>DRAG & DROP FILE INPUT</StyledDragDrop>;
});

DragDropFileInput.defaultProps = {};

DragDropFileInput.propTypes = {};

export default DragDropFileInput;
