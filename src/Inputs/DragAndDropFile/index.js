import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "../../General/Icon";
import { useDropzone } from "react-dropzone";

var paddingBySize = {
    small: "8px 13px",
    medium: "9.5px 14.5px",
    large: "11.75px 16.75px",
};

const standardCssFields = ({ theme, color, size }) => {
    return `
      font-family: ${theme.typography.fontFamily};
      font-size: ${theme.typography[size].fontSize};
    `;
};

const Container = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 3.875rem;
  border: 1px dashed ${(props) => props.theme.test_palette.light[500]};
  border-radius: 5px;
  cursor: pointer;
`;

const TextContent = styled.span`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].subTextSize};
  color: ${(props) => props.theme.test_palette.dark[400]};
`;

const Label = styled.span`
  ${(props) => standardCssFields(props)}
  white-space: nowrap;
  display: inline-block;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  background-color: ${(props) =>
        props.disabled
            ? props.theme.test_palette.light[400]
            : props.theme.test_palette[props.color][props.focused ? 200 : 400]};
  color: white;

  padding: ${(props) => paddingBySize[props.size]};
  border-radius: 10px;

  &:hover {
    background-color: ${(props) =>
        props.disabled
            ? ""
            : props.focused
                ? props.theme.test_palette[props.color][200]
                : props.theme.test_palette[props.color][300]};
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
        id,
        disabled,
        preventDefault,
        accept,
        multiple,
        selectFileText,
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
        ...rest
    } = props;
    const theme = useTheme();
    const [focused, setFocused] = useState(false);
    const [displayDnD, setDisplayDnD] = useState(showDnD);

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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleOnDrop,
        accept: accept,
        onDropAccepted: handleOnDropAccepted,
        multiple: multiple,
        disabled: disabled,
    });


    return (
        <Container
            {...themeProps}
            className={className}
            style={style}
            {...getRootProps()}
        >
            <Input
                {...getInputProps()}
                {...themeProps}
                multiple={multiple}
                ref={ref}
                type="file"
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
                {...rest}
            />
            {(!isDragActive && !displayDnD) && <PlusLabel><Icon icon={"plus"} size={size} color={disabled ? "disabled" : color} /></PlusLabel>}
            {(isDragActive || displayDnD) &&
                <>
                    <Icon icon={"upload"} size={size} color={"disabled"} />
                    <TextContent {...themeProps}>{dndFileText}</TextContent>
                    <Label {...themeProps}>
                        {selectFileText}
                    </Label>
                </>}
        </Container>
    );
});

DragAndDropFile.defaultProps = {
    id: "",
    disabled: false,
    accept: {},
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
    id: PropTypes.any.isRequired,
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
    dndFileText: PropTypes.string,
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
        "disabled",
    ]),
};

export default DragAndDropFile;
