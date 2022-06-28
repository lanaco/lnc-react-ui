import React from 'react';
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

const standardCssFields = ({ theme, color, size }) => {
    return `
      font-family: ${theme.typography.fontFamily};
    `;
};

const Bar = styled.div`
  width: 100%;
  position: relative;
  background-color: ${props => props.theme.test_palette.disabled[600]};
  height: ${props => props.showLabel ? '1.375rem' : '0.625rem'};
  border-radius: 5px;
  animation: progres 4s infinite linear;    
`

const Progressed = styled.div`
  height: 100%;
  width: ${props => props.progressPercentage + '%'};
  background-color: ${(props) => props.theme.test_palette[props.color][400]};
  position absolute;
  border-radius: ${props => props.progressPercentage == 100 ? '5px' : '5px 0px 0px 5px'};
  
  -webkit-transition: ${props => 'width 1s ' + props.theme.transition.easing.easeInOut};
  -moz-transition: ${props => 'width 1s ' + props.theme.transition.easing.easeInOut};
  -o-transition: ${props => 'width 1s ' + props.theme.transition.easing.easeInOut};
  transition: ${props => 'width 1s ' + props.theme.transition.easing.easeInOut};
`

const Label = styled.label`
    ${(props) => standardCssFields(props)}
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 0.875rem;
    font-weight: ${props => props.theme.typography.fontWeightBold}
`

const ProgressBar = React.forwardRef((props, ref) => {
    const {
        id,
        showLabel,
        progressPercentage,
        className,
        style,
        onChange,
        color,
        ...rest
    } = props;

    const theme = useTheme();

    return (
        <Bar theme={theme} showLabel={showLabel} {...rest}>
            <Progressed progressPercentage={progressPercentage} theme={theme} color={color} />
            {showLabel && 
            (<Label theme={theme}>
                {progressPercentage}%
            </Label>)}
        </Bar>
    );
});

ProgressBar.defaultProps = {
    id: "",
    showLabel: false,
    progressPercentage: 0,
    //------------------
    onChange: () => { },
    //------------------
    className: "",
    style: {},
    color: "primary",
    //-------------------
};

ProgressBar.propTypes = {
    id: PropTypes.string.isRequired,
    showLabel: PropTypes.bool,
    progressPercentage: PropTypes.number,
    //-------------------------
    onChange: PropTypes.func,
    //-------------------------
    className: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "disabled",
        "info"
    ]),
};

export default ProgressBar


