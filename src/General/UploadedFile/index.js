import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "../Icon";
import ProgressBar from "../../Feedback/ProgressBar";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";

const getIconSize = (size) => {
  if (size === "small") {
    return "1.5rem";
  } else if (size === "medium") {
    return "1.75rem";
  } else if (size === "large") {
    return "2.0rem";
  }
};

const size = {
  small: "1.5rem",
  medium: "1.75rem",
  large: "2rem",
};

const sizeWithProgress = {
  small: "2.25rem",
  medium: "2.5rem",
  large: "2.75rem",
};

const Container = styled.div`
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;

  min-height: ${(props) =>
    props.progress ? sizeWithProgress[props.size] : size[props.size]};
  max-height: ${(props) =>
    props.progress ? sizeWithProgress[props.size] : size[props.size]};
`;

const ProgressContent = styled.div`
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "UploadedFile",
      props.color,
      "enabled",
      "color"
    )};

  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.1875rem;
  min-width: 0;
  flex-shrink: 1;
  min-height: 0;
`;
const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "UploadedFile",
      props.size,
      "enabled"
    )};
`;
const CancelWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.onCancel ? "pointer" : "default")};
`;

const FileName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: ${(props) => (props.hasOnClick ? "pointer" : "default")};

  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "UploadedFile",
      props.size,
      "enabled"
    )};
`;

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
  var themeProps = {
    theme,
    size,
    color,
    progress: progressPercentage && progressPercentage > 0,
  };

  const getFileName = () => {
    if (fileName && fileSize && showFileSize)
      return `${fileName} (${formatBytes(fileSize, 2)})`;

    if (fileName) return fileName;
    return "";
  };

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const iconSizes = {
    small: "1rem",
    medium: "1.25rem",
    large: "1.5rem",
  };

  return (
    <Container id="CONTAINER" {...themeProps}>
      <Icon
        {...themeProps}
        icon={fileIcon}
        sizeInUnits={iconSizes[props.size]}
        style={{ cursor: onFileClick ? "pointer" : "default" }}
        onClick={(e) => (onFileClick ? onFileClick(e) : null)}
        {...rest}
      />

      <ProgressContent {...themeProps}>
        <ProgressText {...themeProps}>
          <FileName
            {...themeProps}
            hasOnClick={onFileClick ? true : false}
            onClick={(e) => (onFileClick ? onFileClick(e) : null)}
          >
            {getFileName()}
          </FileName>
          {progressPercentage && <div>{progressPercentage}%</div>}
        </ProgressText>

        {(progressPercentage || progressPercentage == 0) && (
          <ProgressBar
            progressPercentage={progressPercentage}
            style={{ height: "0.5rem" }}
            {...themeProps}
          />
        )}
      </ProgressContent>

      <CancelWrapper onCancel={onCancel} onClick={onCancel ? onCancel : null}>
        <Icon
          {...themeProps}
          icon={cancelIcon}
          sizeInUnits={iconSizes[props.size]}
          {...rest}
        />
      </CancelWrapper>
    </Container>
  );
});

UploadedFile.defaultProps = {
  id: "",
  fileName: "file",
  fileSize: null,
  showFileSize: false,
  // progressPercentage: 20,
  //------------------
  className: "",
  style: {},
  //------------------
  onFileClick: () => {},
  onCancel: () => {},
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
    "neutral",
    "information",
  ]),
  fileIcon: PropTypes.string,
  cancelIcon: PropTypes.string,
};

export default UploadedFile;
