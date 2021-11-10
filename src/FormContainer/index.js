import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

const getColumns = (columns) => {
  var frs = "";
  for (let i = 0; i < columns; i++) frs += "1fr ";
  return frs;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: ${(props) => getColumns(props.columns)};

  & > div {
    margin: ${(props) => props.fieldMargin};
  }
`;

const FormContainer = (props) => {
  const { className, columns, children, fieldMargin } = props;

  return (
    <Container
      columns={columns}
      fieldMargin={fieldMargin}
      className={className}
    >
      {children}
    </Container>
  );
};

FormContainer.defaultProps = {
  className: "",
  columns: 1,
  fieldMargin: "0.3125rem",
};

FormContainer.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.number,
  fieldMargin: PropTypes.string,
};

export default FormContainer;
