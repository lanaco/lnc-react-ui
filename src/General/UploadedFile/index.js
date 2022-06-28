import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "../Icon";
import ProgressBar from "../../Feedback/ProgressBar";


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
    color: ${(props) => props.theme.test_palette[props.color][400]};
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
        fileSize,
        showFileSize,
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

    const getFileName = () => {
        if (fileName && fileSize && showFileSize)
            return `${fileName} (${formatBytes(fileSize, 2)})`

        if (fileName) return fileName;
        return "";
    };

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return (
        <Container>
            <Icon {...themeProps}
                icon={fileIcon}
                sizeInUnits={getIconSize(themeProps.size)}
                style={{ cursor: (onFileClick ? 'pointer' : 'default') }}
                onClick={(e) => onFileClick ? onFileClick(e) : null}
                {...rest} />
            <ProgressContent {...themeProps}>
                <ProgressText>
                    <div style={{ cursor: (onFileClick ? 'pointer' : 'default') }} onClick={onFileClick ? onFileClick : null}
                    >{getFileName()}</div>
                    {progressPercentage && <div>{progressPercentage}%</div>}
                </ProgressText>
                {(progressPercentage || progressPercentage == 0) && <ProgressBar progressPercentage={progressPercentage} {...themeProps} />}
            </ProgressContent>
            <CancelWrapper onCancel={onCancel} onClick={onCancel ? onCancel : null}>
                <Icon {...themeProps} color={"disabled"} icon={cancelIcon} {...rest} />
            </CancelWrapper>
        </Container >
    )
});

UploadedFile.defaultProps = {
    id: "",
    fileName: "file-name.png",
    fileSize: null,
    showFileSize: false,
    // progressPercentage: 20,
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
    fileSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showFileSize: PropTypes.bool,
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
        "danger",
        "warning",
        "disabled",
        "info"
    ]),
    fileIcon: PropTypes.string,
    cancelIcon: PropTypes.string,
};


export default UploadedFile;