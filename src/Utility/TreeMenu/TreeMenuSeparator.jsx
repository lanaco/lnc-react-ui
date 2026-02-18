/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue } from "../../_utils/utils";
import { forwardRef } from "react";

const StyledSeparator = styled.div`
  height: 1px;
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "MenuItem",
      "default",
      "enabled",
      "separator",
    )};
  margin-left: -0.25rem;
  margin-right: -0.25rem;
`;

const TreeMenuSeparator = forwardRef((props, ref) => {
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

export default TreeMenuSeparator;
