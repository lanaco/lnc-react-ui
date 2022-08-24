import { getBorderRadiusValueWithUnits, getColorRgbaValue, getSizeValueWithUnits, hexToRgba } from "../../_utils/utils";

const getOutline = (theme) => {
    const palette = theme.colorContext[theme.palette.outline.context];

    const color =
        theme.palette[palette][theme.palette.outline.weight];

    return `${theme.palette.outline.width} ${theme.palette.outline.style} ${color}`;
}

export const getDisabledBg = (theme) => {
    const paletteColor = theme.palette.disabled.color;
    const bgColorHex =
        theme.palette[paletteColor][theme.palette.disabled.background];
    const opacity = theme.palette.opacity[theme.palette.disabled.opacity];
    const bgColorRgba = hexToRgba(bgColorHex, opacity ?? "100%");

    return bgColorRgba;
};

export const getDisabledColor = (theme) => {
    const paletteColor = theme.palette.disabled.color;
    const fontColorHex =
        theme.palette[paletteColor][theme.palette.disabled.text];
    return fontColorHex;
};

const customStyles = {
    container: (p, s) => ({
        ...p,
        minHeight: getSizeValueWithUnits(s.theme, s.selectProps.size),
        maxHeight: getSizeValueWithUnits(s.theme, s.selectProps.size),

    }),
    control: (p, s) => ({
        ...p,
        minHeight: getSizeValueWithUnits(s.theme, s.selectProps.size),
        maxHeight: getSizeValueWithUnits(s.theme, s.selectProps.size),
        fontWeight: s.theme.components["Input"].default["enabled"].fontWeight,
        fontSize: s.theme.typography.component[s.selectProps.size].fontSize,
        lineHeight: s.theme.typography.component[s.selectProps.size].lineHeight,
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        outline: s.isFocused ? getOutline(s.theme) : "none",
        outlineOffset: s.isFocused ? s.theme.palette.outline.offset : "0",
        '&:hover': {
            border: `1px solid
            ${getColorRgbaValue(
                s.theme,
                "Input",
                s.focused ? "primary" : s.color,
                s.disabled ? "disabled" : "enabled",
                "border"
            )}`,
            boxSizing: "border-box",
            minHeight: getSizeValueWithUnits(s.theme, s.selectProps.size),
            maxHeight: getSizeValueWithUnits(s.theme, s.selectProps.size),
        },
        // This line disable the blue border
        boxShadow: 'none',
        backgroundColor: s.isDisabled ?
            getDisabledBg(s.theme)
            :
            getColorRgbaValue(
                s.theme,
                "Input",
                s.color,
                "enabled",
                "background"
            ),
        border: `1px solid
      ${getColorRgbaValue(
            s.theme,
            "Input",
            s.focused ? "primary" : s.selectProps.color,
            s.disabled ? "disabled" : "enabled",
            "border"
        )}`,
        borderRadius: getBorderRadiusValueWithUnits(s.theme, "regular"),
        color: s.isDisabled ?
            getDisabledColor(s.theme)
            :
            (s.isFocused ?
                getColorRgbaValue(
                    s.theme,
                    "Input",
                    "primary",
                    "enabled",
                    "text"
                )
                :
                getColorRgbaValue(
                    s.theme,
                    "Input",
                    s.color,
                    "enabled",
                    "text"
                )),
    }),
    menu: (p, s) => ({
        ...p,
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
        borderRadius: getBorderRadiusValueWithUnits(s.theme, "regular"),
    }),
    option: (p, s) => ({
        ...p,
        fontWeight: s.theme.components["Input"].default["enabled"].fontWeight,
        fontSize: s.theme.typography.component[s.selectProps.size].fontSize,
        lineHeight: s.theme.typography.component[s.selectProps.size].lineHeight,
        backgroundColor: s.isSelected ? getColorRgbaValue(
            s.theme,
            "Dropdown",
            s.selectProps.color,
            "selected",
            "background"
        ) : (s.isFocused ? 
            getColorRgbaValue(
                s.theme,
                "Dropdown",
                s.selectProps.color,
                "hover",
                "background"
            )
            :
            "transparent"),
        "&:hover": {
            backgroundColor: getColorRgbaValue(
                s.theme,
                "Dropdown",
                s.selectProps.color,
                "hover",
                "background"
            ),
        },
    }),
    multiValue: (p, s) => ({
        ...p,
        borderRadius: getBorderRadiusValueWithUnits(s.theme, "regular"),
    }),
    multiValueLabel: (p, s) => ({
        ...p,
      
    }),
    multiValueRemove: (p, s) => ({
        ...p,
        "&:hover": {
            backgroundColor: 'transparent',
            color: getColorRgbaValue(
                s.theme,
                "Danger",
                "danger",
                "enabled",
                "text"
            ),
            cursor: 'pointer',
        }
    })
}

export default customStyles