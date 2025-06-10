import styled from "styled-components";
import { getBorderRadiusValueWithUnits, getColorRgbaValue } from "../_utils/utils";


export const color = (p, field, opacity = null) => {
  if (opacity !== null) {
    return getColorRgbaValue(
      p.theme,
      "BorderPanel",
      p.color,
      "enabled",
      field,
      opacity
    );
  }

  return getColorRgbaValue(p.theme, "ShopCard", p.color, "enabled", field);
};

export const BorderPanel = styled.div`
  background: ${(p) => color(p, "backgroundColor")};
  border-radius: ${(p) => getBorderRadiusValueWithUnits(p.theme, "edged")};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid ${(p) => color(p, "borderColor", "borderOpacity")};
`;