import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import DragAndDropFile from "../DragAndDropFile";
import UploadedFile from "../../General/UploadedFile";
import { useTheme } from "@emotion/react";

const StyledDragDropFiles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  border: 1px dashed ${(props) => props.theme.test_palette.light[500]};
  border-radius: 5px;

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
    showFileSize,
    files,
    onChange,
    onFocus,
    onBlur,
    onDropAccepted,
    onDrop,
    onFileClick,
    onCancel,
    className,
    style,
    color,
    size,
    ...rest
  } = props;
  const theme = useTheme();
  var themeProps = { theme, size, color };


  const [inputFiles, setInputFiles] =useState([]);
  useEffect(() => {
    setInputFiles(files)
  }, [files])

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
    <StyledDragDropFiles {...themeProps}>
      <DragAndDropFile
        id={id}
        disabled={disabled}
        preventDefault={preventDefault}
        accept={accept}
        multiple={multiple}
        selectFileText={selectFileText}
        dndFileText={dndFileText}
        showFileSize={showFileSize}
        showDnD={!(inputFiles?.length > 0)}
        onChange={handleOnChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onDrop={handleOnDrop}
        onDropAccepted={handleOnDropAccepted}
        color={color}
        size={size}
        {...rest}
      />
      <FilesList>
        {inputFiles?.map((file, i) => (
          <UploadedFile key={i} 
          fileName={file.name} 
          fileSize={file.size}
          showFileSize={showFileSize}
          color={color} 
          size={size} 
          onFileClick={onFileClick}
          onCancel={onCancel}/>
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
  onFileClick: () => {},
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
  showFileSize: PropTypes.bool,
  files: PropTypes.array,
  //-------------------------
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDrop: PropTypes.func,
  onFileClick: PropTypes.func,
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
    "disabled",
  ]),
};

export default DragDropFiles;
