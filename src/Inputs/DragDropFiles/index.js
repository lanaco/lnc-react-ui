import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import DragAndDropFile from "../DragAndDropFile";
import UploadedFile from "../../General/UploadedFile";
import { useTheme } from "@emotion/react";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
} from "../../_utils/utils";

const StyledDragDropFiles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  border: ${(props) =>
    `1px solid ${getColorRgbaValue(
      props.theme,
      "DragDropFiles",
      props.color,
      "enabled",
      "border"
    )}`};
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, "regular")};
  padding: 1.25rem 2.5rem;
`;

const FilesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const DragDropFiles = React.forwardRef((props, ref) => {
  const {
    id,
    disabled,
    preventDefault,
    accept,
    multiple,
    selectFileText,
    dndFileText,
    control,
    showFileSize,
    files,
    onChange,
    onFocus,
    onBlur,
    onDropAccepted,
    onDrop,
    fileClick,
    onCancel,
    className,
    style,
    color,
    size,
    dragAndDropFileProps,
    uploadedFileProps,
    ...rest
  } = props;
  const theme = useTheme();
  var themeProps = { theme, size, color };

  const [inputFiles, setInputFiles] = useState([]);
  useEffect(() => {
    setInputFiles(files);
  }, [files]);

  const handleOnDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (onDrop) onDrop(acceptedFiles, rejectedFiles);
  }, []);

  const handleOnDropAccepted = useCallback((acceptedFiles) => {
    if (onDropAccepted) onDropAccepted(acceptedFiles);
  }, []);

  const handleOnChange = (e) => {
    if (e.target?.files) {
      setInputFiles([...inputFiles, ...e.target.files]);
    } else if (e) {
      setInputFiles([...inputFiles, ...e]);
    }
    if (onChange) onChange(e);
  };

  return (
    <StyledDragDropFiles ref={ref} {...themeProps} {...rest}>
      <DragAndDropFile
        id={id}
        disabled={disabled}
        preventDefault={preventDefault}
        accept={accept}
        multiple={multiple}
        selectFileText={selectFileText}
        dndFileText={dndFileText}
        control={control}
        showFileSize={showFileSize}
        showDnD={!(inputFiles?.length > 0)}
        onChange={handleOnChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onDrop={handleOnDrop}
        onDropAccepted={handleOnDropAccepted}
        color={color}
        size={size}
        {...dragAndDropFileProps}
      />
      <FilesList>
        {inputFiles?.map((file, i) => (
          <UploadedFile
            key={i}
            fileName={file.name}
            fileSize={file.size}
            showFileSize={showFileSize}
            color={color}
            size={size}
            onFileClick={fileClick}
            onCancel={onCancel}
            {...uploadedFileProps}
          />
        ))}
      </FilesList>
    </StyledDragDropFiles>
  );
});

DragDropFiles.defaultProps = {
  id: "",
  disabled: false,
  preventDefault: false,
  accept: {},
  multiple: false,
  selectFileText: "Select file",
  dndFileText: "Drag and drop file here or",
  showFileSize: true,
  files: [],
  //------------------
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onDropAccepted: () => {},
  onDrop: () => {},
  // onFileClick: () => {},
  onCancel: () => {},
  //------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

DragDropFiles.propTypes = {
  id: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  preventDefault: PropTypes.bool,
  /**
   * Type of: { \[key: string]: string[] }
   *
   * Ex: {
   *
   *   'image/png': ['.png'],
   *
   *   'text/html': ['.html', '.htm']
   *
   * }
   */
  accept: PropTypes.object,
  multiple: PropTypes.bool,
  selectFileText: PropTypes.string,
  dndFileText: PropTypes.string,
  /**
   * Custom control which opens file explorer on click
   */
  control: PropTypes.element,
  showFileSize: PropTypes.bool,
  files: PropTypes.array,
  //-------------------------
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDrop: PropTypes.func,
  fileClick: PropTypes.func,
  onCancel: PropTypes.func,
  //-------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "neutral",
  ]),
  dragAndDropFileProps: PropTypes.any,
  uploadedFileProps: PropTypes.any,
};

export default DragDropFiles;
