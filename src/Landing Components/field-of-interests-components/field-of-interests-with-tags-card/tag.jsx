import { forwardRef } from "react";

import { isDefinedNotEmptyString } from "../../../_utils/utils";
import Icon from "../../../General/Icon/Icon";
import { TagWrapper } from "./style";

const FieldOfInterestsWithTagsCardTag = forwardRef(
  ({ name, isActive, icon, onSelectCard = () => {} }, ref) => {
    return (
      <TagWrapper className={isActive ? "active" : ""} onClick={onSelectCard}>
        {isDefinedNotEmptyString(icon) && (
          <Icon icon={icon} className="wrapper__icon" />
        )}
        <div className="wrapper__text">{name}</div>
      </TagWrapper>
    );
  }
);

export default FieldOfInterestsWithTagsCardTag;
