import { forwardRef } from "react";

import Icon from "../../../General/Icon/Icon";
import { TagWrapper } from "./style";

const FieldOfInterestsWithTagsCardTag = forwardRef(
  ({ text, isActive, icon, onCardSelect = () => {} }, ref) => {
    return (
      <TagWrapper className={isActive ? "active" : ""} onClick={onCardSelect}>
        <Icon icon={icon} className="wrapper__icon" />
        <div className="wrapper__text">{text}</div>
      </TagWrapper>
    );
  }
);

export default FieldOfInterestsWithTagsCardTag;
