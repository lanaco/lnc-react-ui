import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue } from "../../_utils/utils";

const StyledSeparator = styled.div`
  height: 1px;
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "MenuItem",
      "default",
      "enabled",
      "separator"
    )};
  margin-left: -0.25rem;
  margin-right: -0.25rem;
`;

const TreeMenuSeparator = React.forwardRef((props, ref) => {
  const { className = "", style = {}, ...rest } = props;
  const theme = useTheme();

  return (
    <StyledSeparator
      ref={ref}
      theme={theme}
      className={"lnc-ui-separator " + className}
      style={style}
      {...rest}
    ></StyledSeparator>
  );
});

TreeMenuSeparator.propTypes = {
  /**
   * When the separator needs to be set beetween Menu Items that are justified to end, prop needs to be set to `justifyToEnd={true}`
   */
  className: PropTypes.string,
  style: PropTypes.object,
};

export default TreeMenuSeparator;
