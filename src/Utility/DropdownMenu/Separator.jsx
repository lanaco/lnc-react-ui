/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
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

const Separator = forwardRef((props, ref) => {
  const { className = "", style = {}, ...rest } = props;
  const theme = useTheme();

  return (
    <StyledSeparator
      ref={ref}
      theme={theme}
      className={"lnc-ui-dropdown-separator " + className}
      style={style}
      {...rest}
    ></StyledSeparator>
  );
});

// Separator.defaultProps = {
//     style: {},
// };

export default Separator;
