import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Container = styled.div`
  border: 1px solid #80808080;
  border-radius: 3px;
  padding: 6px;
  margin-bottom: 6px;
`;

const CustomTableHeader = (props) => {
  //--------------------------

  return <Container>HEADER</Container>;
};

CustomTableHeader.defaultProps = {
  __TYPE__: "TABLE_HEADER",
};
CustomTableHeader.propTypes = {
  __TYPE__: PropTypes.string,
};

export default CustomTableHeader;
