/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import Icon from "../../../General/Icon/Icon";
import { TagWrapper } from "./style";

const FieldOfInterestsMasonryTag = forwardRef(
  ({ text, isActive = false, icon, onSelectCard = () => {} }, ref) => {
    return (
      <TagWrapper
        ref={ref}
        className={isActive ? "active" : ""}
        onClick={onSelectCard}
      >
        <Icon icon={icon} className="wrapper__icon" />
        <div className="wrapper__text">{text}</div>
      </TagWrapper>
    );
  },
);

export default FieldOfInterestsMasonryTag;
