import { forwardRef } from "react";

import Icon from "../../../General/Icon/Icon";
import { TagWrapper } from "./style";

const GeneralWithTagsCardTag = forwardRef(
  ({ text, icon, onSelectCard = () => {} }, ref) => {
    return (
      <TagWrapper onClick={onSelectCard}>
        <Icon icon={` ${icon}`} className="wrapper__icon" />
        <div className="wrapper__text">{text}</div>
      </TagWrapper>
    );
  }
);

export default GeneralWithTagsCardTag;
