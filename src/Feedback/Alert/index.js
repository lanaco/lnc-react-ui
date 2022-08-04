import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getBorderRadiusValueWithUnits, getColorRgbaValue, getComponentPropValue, getComponentTypographyCss } from "../../_utils/utils";
import Icon from "../../General/Icon";


const Container = styled.div`
min-height: 3rem;
${(props) =>
    getComponentTypographyCss(props.theme, "Alert", props.size, "enabled")};
border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, "regular")};
background-color: ${props => getColorRgbaValue(props.theme, "Alert", props.color, "enabled", "background", "backgroundOpacity")};
color:  ${props => getColorRgbaValue(props.theme, "Alert", props.color, "enabled", "text")};
word-wrap: break-word;
box-sizing: border-box;
padding: 0.875rem 1rem;
display: flex;
gap: 1rem;
& .alert-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
& .alert-icon {
  align-items: flex-start;
}
& .alert-title {
  font-weight: ${props => getComponentPropValue(props.theme, "Alert", props.color, "enabled", "fontWeightTitle")};
  color:  ${props => getColorRgbaValue(props.theme, "Alert", props.color, "enabled", "title")};
}
& .alert-actions {
  padding-top: 0.5rem;
}

& .alert-actions > * {
  font-weight: ${props => getComponentPropValue(props.theme, "Alert", props.color, "enabled", "fontWeightAction")};
  color:  ${props => getColorRgbaValue(props.theme, "Alert", props.color, "enabled", "action")};
  cursor: pointer;
}
`;

const Alet = (props) => {
  const { className, size, color, title, actions, children, ...rest } = props;
  const theme = useTheme();
  const themeProps = { theme, size, color };


  return (
    <Container {...themeProps} className={className} {...rest}>
      <Icon className={"alert-icon"} icon={"question-circle"}/>
      <div className="alert-content">
        <div className="alert-title">

          {title}
        </div>
        {children}
        <div className="alert-actions">{actions}</div>
      </div>
    </Container>
  );
};

Alet.defaultProps = {
  className: "",
  size: "small",
  color: "primary",
};

Alet.propTypes = {
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  actions: PropTypes.element,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "information",
    "neutral"
  ]),
};

export default Alet;
