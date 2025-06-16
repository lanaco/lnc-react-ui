import { forwardRef } from "react";

import Icon from "../../../General/Icon/Icon";
import { TagWrapper } from "./style";

const FieldOfInterestsMasonryTag = forwardRef(
  ({ text, isActive, icon, onSelectCard = () => {} }, ref) => {
    return (
      <TagWrapper className={isActive ? "active" : ""} onClick={onSelectCard}>
        <Icon icon={icon} className="wrapper__icon" />
        <div className="wrapper__text">{text}</div>
      </TagWrapper>
    );
  }
);

export default FieldOfInterestsMasonryTag;
