import styled from "@emotion/styled";
import { getColorRgbaValue, getComponentPropValue } from "../../_utils/utils";

const prop = (props, field) => {
  return getComponentPropValue(
    props.theme,
    "StarRating",
    props.color,
    props.disabled === true ? "disabled" : "enabled",
    field
  );
};

export const Container = styled.div`
  font-size: ${(p) => prop(p, "fontSize")};
  line-height: ${(p) => prop(p, "lineHeight")};
  line-height: 1.5rem;
  width: fit-content;
  display: flex;
  gap: 0.25rem;

  & .rating {
    position: relative;
    margin: 0;
    padding: 0;
    width: fit-content;
  }

  & .review-count {
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.5rem;
    color: ${(p) => p.color};
  }
`;

export const FilledStars = styled.span`
  position: absolute;
  z-index: 1;
  display: block;
  top: 0;
  left: 0;
  overflow: hidden;
  width: ${(p) => p.width}%;

  color: ${(p) =>
    getColorRgbaValue(
      p.theme,
      "StarRating",
      p.color,
      p.disabled === true ? "disabled" : "enabled",
      "filledColor"
    )};
`;

export const EmptyStars = styled.span`
  padding: 0;
  display: block;
  z-index: 0;
  color: ${(p) => p.color};
`;
