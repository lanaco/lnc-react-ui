import React, { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "../../General/Icon";
import { useDropzone } from "react-dropzone";
import Button from "../../General/Button";
import { getColorRgbaValue } from "../../_utils/utils";

const paddingBySize = {
    small: "0.5rem 0.813rem",
    medium: "0.75rem 1.063rem",
    large: "1rem 1.313rem",
};

const getIconSize = {
    small: "1.25rem",
    medium: "1.5rem",
    large: "1.75rem"
}


const Container = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: ${props => props.theme.typography.component[props.size].subTxtFontSize};
  padding: ${props => paddingBySize[props.size]};

  color: ${props => getColorRgbaValue(
    props.theme,
    "DragDropFiles",
    props.color,
    "enabled",
    "text"
  )};

  & .dnd-icon-lnc {
    font-size: ${props => getIconSize[props.size]};
    color: ${props => getColorRgbaValue(
        props.theme,
        "DragDropFiles",
        props.color,
        "enabled",
        "text"
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
`

const DragAndDropFile = React.forwardRef((props, ref) => {
    const {
        inputRef,
        id,
        disabled,
        preventDefault,
        acceptDropzone,
        acceptInput,
        multiple,
        selectFileText,
        control,
        dndFileText,
        showFileSize,
        showDnD,
        className,
        style,
        onChange,
        onFocus,
        onBlur,
        onDropAccepted,
        onDrop,
        color,
        size,
        inputProps,
        ...rest
    } = props;
    const theme = useTheme();
    const [focused, setFocused] = useState(false);
    const [displayDnD, setDisplayDnD] = useState(showDnD);
    const dropzoneRef = useRef();

    useEffect(() => {
        setDisplayDnD(showDnD);
    }, [showDnD])


    var themeProps = { theme, size, color, disabled, focused };

    const handleOnDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (onDrop) onDrop(acceptedFiles, rejectedFiles);

        setDisplayDnD(false);
    }, []);

    const handleOnDropAccepted = useCallback((acceptedFiles) => {
        if (onChange && !disabled) onChange(acceptedFiles);
        if (onDropAccepted) onDropAccepted(acceptedFiles);

        setDisplayDnD(false);
    }, []);

    const handleOnChange = (e) => {
        if (onChange && !disabled) onChange(e);
        setDisplayDnD(false);
    }

    const handleControlClick = (e) => {
        //open(e) doesen't work for Firefox
        // open(e);

        ref?.current ? ref.current?.click() : dropzoneRef?.current?.click();
    }

    const clonedControl = () => {
        if (control) {
            return React.cloneElement(control, {
                onClick: (e) => { handleControlClick(e); if(control.onClick) control.onClick(e); },
                disabled: disabled,
            });
        } else {
            return (
                <Button color={color} size={size} text={selectFileText} disabled={disabled} onClick={(e) => { e.preventDefault(); handleControlClick(e); }}>
                </Button>
            );
        }
    };

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
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
            {(!isDragActive && !displayDnD) && <PlusLabel><Icon icon={"plus"} size={size} /></PlusLabel>}
            {(isDragActive || displayDnD) &&
                <>
                    <Icon icon={"upload"} size={size} className={"dnd-icon-lnc"} />
                    {dndFileText}
                    {clonedControl()}
                </>}
        </Container>
    );
});

DragAndDropFile.defaultProps = {
    id: "",
    disabled: false,
    acceptDropzone: {},
    multiple: false,
    selectFileText: "Select file",
    dndFileText: "Drag and drop file here or",
    showFileSize: false,
    showDnD: true,
    //------------------
    onChange: () => { },
    onFocus: () => { },
    onBlur: () => { },
    onDropAccepted: () => { },
    onDrop: () => { },
    //------------------
    className: "",
    style: {},
    size: "small",
    color: "primary",
};

DragAndDropFile.propTypes = {
    inputRef: PropTypes.any,
    id: PropTypes.string,
    disabled: PropTypes.bool,
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
    /**
     * Custom control which opens file explorer on click
     */
    control: PropTypes.element,
    dndFileText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    showFileSize: PropTypes.bool,
    /**
     * Determines whether Drag and Drop area or Add button will be shown
     * 
     * }
    */
    showDnD: PropTypes.bool,
    //-------------------------
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onDropAccepted: PropTypes.func,
    onDrop: PropTypes.func,
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
        "information",
        "neutral",
    ]),
    inputProps: PropTypes.any,
};

export default DragAndDropFile;
