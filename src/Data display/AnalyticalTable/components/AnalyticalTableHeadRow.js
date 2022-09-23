import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";

const HtmlRow = styled.tr`
  border-radius: 0.5rem 0.5rem 0 0;
`;

const AnalyticalTableHeadRow = (props) => {
  //--------------------------
  const {
    Index,
    //-------------
    className,
    size,
    color,
    theme,
  } = props;

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  return (
    <HtmlRow {...themeProps} key={Index}>
      {props.children}
    </HtmlRow>
  );
};

AnalyticalTableHeadRow.defaultProps = {
  __TYPE__: "TABLE_HEAD_ROW",
  //--------------------
  Index: 0,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

AnalyticalTableHeadRow.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Index: PropTypes.any,
  //----------------------------------------
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
    "white",
    "black",
  ]),
  theme: PropTypes.object.isRequired,
};

export default AnalyticalTableHeadRow;
