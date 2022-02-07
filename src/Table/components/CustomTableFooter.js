import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Container = styled.div`
  border: 1px solid #80808080;
  border-radius: 3px;
  padding: 6px;
  margin-top: 6px;
`;

const CustomTableFooter = (props) => {
  //--------------------------

  return <Container>FOOTER</Container>;
};

CustomTableFooter.defaultProps = {
  __TYPE__: "TABLE_FOOTER",
};
CustomTableFooter.propTypes = {
  __TYPE__: PropTypes.string,
};

export default CustomTableFooter;
