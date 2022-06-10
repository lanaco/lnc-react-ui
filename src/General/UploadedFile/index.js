import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "../Icon";
import Progress from "../Progress";


const standardCssFields = ({ theme, color, size }) => {
    return `
      font-family: ${theme.typography.fontFamily};
      font-size: ${theme.typography[size].fontSize};
    `;
};

const getIconSize = (size) => {
    if (size === "small") {
        return '1.6rem';
    } else if (size === "medium") {
        return '1.8rem';
    } else if (size === 'large') {
        return '2.0rem';
    }
}

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  `
const ProgressContent = styled.div`
    ${(props) => standardCssFields(props)}
    color: ${(props) => props.theme.palette[props.color].main};
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3px;
`
const ProgressText = styled.div`
    display: flex;
    justify-content: space-between;
`
const CancelWrapper = styled.div`
    cursor: ${props => props.onCancel ? 'pointer' : 'default'}
`

const UploadedFile = React.forwardRef((props, ref) => {
    const {
        id,
        fileName,
        progressPercentage,
        className,
        style,
        onFileClick,
        onCancel,
        size,
        color,
        fileIcon,
        cancelIcon,
        ...rest
    } = props;
    const theme = useTheme();
    var themeProps = { theme, size, color };

    return (
        <Container>
            <Icon {...themeProps}
                icon={fileIcon}
                sizeInUnits={getIconSize(themeProps.size)}
                style={{ cursor: (onFileClick ? 'pointer' : 'default') }}
                onClick={onFileClick ? onFileClick : null}
                {...rest} />
            <ProgressContent {...themeProps}>
                <ProgressText>
                    <div style={{ cursor: (onFileClick ? 'pointer' : 'default') }} onClick={onFileClick ? onFileClick : null}
                    >{fileName}</div>
                    {progressPercentage && <div>{progressPercentage}%</div>}
                </ProgressText>
                {(progressPercentage || progressPercentage == 0) && <Progress progressPercentage={progressPercentage} {...themeProps} />}
            </ProgressContent>
            <CancelWrapper onCancel={onCancel} onClick={onCancel ? onCancel : null}>
                <Icon {...themeProps} color={"gray"} icon={cancelIcon} {...rest} />
            </CancelWrapper>
        </Container >
    )
});

UploadedFile.defaultProps = {
    id: "",
    fileName: "file-name.png",
    progressPercentage: 20,
    //------------------
    className: "",
    style: {},
    //------------------
    onFileClick: () => { },
    onCancel: () => { },
    //------------------
    size: "small",
    color: "primary",
    fileIcon: "file",
    cancelIcon: "times",
};

UploadedFile.propTypes = {
    id: PropTypes.any.isRequired,
    fileName: PropTypes.string,
    progressPercentage: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
    onFileClick: PropTypes.func,
    onCancel: PropTypes.func,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "gray",
    ]),
    fileIcon: PropTypes.string,
    cancelIcon: PropTypes.string,
};


export default UploadedFile;