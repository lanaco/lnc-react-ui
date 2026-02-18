/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useState, useCallback, useEffect, forwardRef } from "react";
import styled from "@emotion/styled";
import DragAndDropFile from "../DragAndDropFile/DragAndDropFile";
import UploadedFile from "../../General/UploadedFile/UploadedFile";
import { useTheme } from "@emotion/react";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
} from "../../_utils/utils";
import FlexGrid from "../../Layout/FlexGrid/FlexGrid";
import FlexGridItem from "../../Layout/FlexGrid/FlexGridItem";

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
      "border",
    )}`};
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, "regular")};
  padding: 1.25rem 2.5rem;

  & .file-item-lnc {
    padding: 0.5rem 0.813rem;
    height: 100%;
  }
`;

const DragDropFiles = forwardRef((props, ref) => {
  const {
    id = "",
    disabled = false,
    preventDefault = false,
    acceptDropzone = {},
    acceptInput,
    multiple = true,
    selectFileText = "Select file",
    dndFileText = "Drag and drop file here or",
    control,
    showFileSize = true,
    files = [],
    // ----------------------------------------
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onDropAccepted = () => {},
    onDrop = () => {},
    fileClick = () => {},
    onCancel = () => {},
    // ----------------------------------------

    color = "primary",
    size = "small",
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
      <FlexGrid direction="RowReverse">
        <FlexGridItem M={inputFiles?.length > 0 ? 6 : 12}>
          <DragAndDropFile
            id={id}
            disabled={disabled}
            preventDefault={preventDefault}
            acceptDropzone={acceptDropzone}
            acceptInput={acceptInput}
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
        </FlexGridItem>
        {inputFiles?.map((file, i) => (
          <FlexGridItem M={6} key={i}>
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
              className={"file-item-lnc " + uploadedFileProps?.className}
            />
          </FlexGridItem>
        ))}
      </FlexGrid>
    </StyledDragDropFiles>
  );
});

// DragDropFiles.defaultProps = {
//   id: "",
//   disabled: false,
//   preventDefault: false,
//   acceptDropzone: {},
//   multiple: true,
//   selectFileText: "Select file",
//   dndFileText: "Drag and drop file here or",
//   showFileSize: true,
//   files: [],
//   //------------------
//   onChange: () => { },
//   onFocus: () => { },
//   onBlur: () => { },
//   onDropAccepted: () => { },
//   onDrop: () => { },
//   // onFileClick: () => {},
//   onCancel: () => { },
//   //------------------
//   className: "",
//   style: {},
//   size: "small",
//   color: "primary",
// };

export default DragDropFiles;
