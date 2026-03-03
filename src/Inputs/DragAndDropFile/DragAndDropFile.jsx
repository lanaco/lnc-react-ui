/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
  cloneElement,
} from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "../../General/Icon/Icon";
import { useDropzone } from "react-dropzone";
import Button from "../../General/Button/Button";
import { getColorRgbaValue, isDefined } from "../../_utils/utils";

const paddingBySize = {
  small: "0.5rem 0.813rem",
  medium: "0.75rem 1.063rem",
  large: "1rem 1.313rem",
};

const getIconSize = {
  small: "1.25rem",
  medium: "1.5rem",
  large: "1.75rem",
};

const Container = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: ${(props) =>
    props.theme.typography.component[props.size].subTxtFontSize};
  padding: ${(props) => paddingBySize[props.size]};

  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "DragDropFiles",
      props.color,
      "enabled",
      "text",
    )};

  & .dnd-icon-lnc {
    font-size: ${(props) => getIconSize[props.size]};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DragDropFiles",
        props.color,
        "enabled",
        "text",
      )};
  }
`;

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const PlusLabel = styled.span`
  align-self: self-end;
  cursor: pointer;
`;

const getVideoDuration = (file) => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video?.src);
      resolve(video?.duration);
    };
    video.src = URL.createObjectURL(file);
  });
};

const DragAndDropFile = forwardRef((props, ref) => {
  const {
    inputRef,
    id = "",
    disabled = false,
    acceptDropzone = {},
    acceptInput,
    multiple = false,
    selectFileText = "Select file",
    control,
    dndFileText = "Drag and drop file here or",
    showDnD = true,
    className = "",
    style = {},
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onDropAccepted = () => {},
    onDrop = () => {},
    color = "primary",
    size = "small",
    inputProps,
    alwaysShowDropzone = false,
    maxVideoDuration = null, // in seconds
    onMaxDurationExceed = () => {},
    ...rest
  } = props;
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [displayDnD, setDisplayDnD] = useState(showDnD);
  const dropzoneRef = useRef();

  useEffect(() => {
    setDisplayDnD(showDnD);
  }, [showDnD]);

  var themeProps = { theme, size, color, disabled, focused };

  // Internal validation logic
  const validateFiles = async (files) => {
    if (!isDefined(maxVideoDuration)) return files; // No validation needed if max duration is not set
    const validFiles = [];
    for (const file of files) {
      const duration = await getVideoDuration(file);
      if (maxVideoDuration && duration > maxVideoDuration) {
        console.error(
          `${file.name} is too long. Max allowed: ${maxVideoDuration}`,
        );
        onMaxDurationExceed?.();
        continue;
      } else {
        validFiles.push(file);
      }
    }
    return validFiles;
  };

  // handle on drop
  const handleOnDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // const filtered = await validateFiles(acceptedFiles);

    if (onDrop) onDrop(acceptedFiles, rejectedFiles);
    // if (onDrop) onDrop(filtered, rejectedFiles);

    setDisplayDnD(false);
  }, []);

  const handleOnDropAccepted = useCallback(async (acceptedFiles) => {
    const filtered = await validateFiles(acceptedFiles);

    if (filtered?.length > 0) {
      if (onChange && !disabled) onChange(filtered);
      if (onDropAccepted) onDropAccepted(filtered);

      setDisplayDnD(false);
    }
    // if (onChange && !disabled) onChange(acceptedFiles);
    // if (onDropAccepted) onDropAccepted(acceptedFiles);
    // setDisplayDnD(false);
  }, []);

  const handleOnChange = async (e) => {
    const files = Array.from(e?.target?.files);
    const filtered = await validateFiles(files);

    if(filtered?.length > 0) {
      if (onChange && !disabled) onChange(filtered);
      setDisplayDnD(false);
    } else {
      e.target.value = ""; // reset input if files are invalid
    }
    // if (onChange && !disabled) onChange(e);
    // setDisplayDnD(false);
  };

  const handleControlClick = () => {
    //open(e) doesen't work for Firefox
    // open(e);

    ref?.current ? ref.current?.click() : dropzoneRef?.current?.click();
  };

  const clonedControl = () => {
    if (control) {
      return cloneElement(control, {
        onClick: (e) => {
          handleControlClick(e);
          if (control.onClick) control.onClick(e);
        },
        disabled: disabled,
      });
    } else {
      return (
        <Button
          color={color}
          size={size}
          text={selectFileText}
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            handleControlClick(e);
          }}
        ></Button>
      );
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleOnDrop,
    accept: acceptDropzone,
    onDropAccepted: handleOnDropAccepted,
    multiple: multiple,
    disabled: disabled,
    noClick: true,
  });

  return (
    <Container
      {...themeProps}
      className={className}
      style={style}
      {...getRootProps()}
      {...rest}
      ref={ref ? ref : dropzoneRef}
    >
      <Input
        {...getInputProps()}
        {...themeProps}
        multiple={multiple}
        ref={inputRef}
        type="file"
        action="bla.html"
        accept={acceptInput}
        id={id}
        onFocus={(e) => {
          if (!disabled) setFocused(true);
          if (onFocus && !disabled) onFocus(e);
        }}
        onBlur={(e) => {
          if (!disabled) setFocused(false);
          if (onBlur && !disabled) onBlur(e);
        }}
        onChange={handleOnChange}
        {...inputProps}
      />
      {!isDragActive && !displayDnD && !alwaysShowDropzone && (
        <PlusLabel>
          <Icon icon={"plus"} size={size} />
        </PlusLabel>
      )}
      {(isDragActive || displayDnD || alwaysShowDropzone) && (
        <>
          <Icon icon={"upload"} size={size} className={"dnd-icon-lnc"} />
          {dndFileText}
          {clonedControl()}
        </>
      )}
    </Container>
  );
});

export default DragAndDropFile;
