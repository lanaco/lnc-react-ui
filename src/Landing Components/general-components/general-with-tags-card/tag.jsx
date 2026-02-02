/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import Icon from "../../../General/Icon/Icon";
import { TagWrapper } from "./style";
import { isDefinedNotEmptyString } from "../../../_utils/utils";

const GeneralWithTagsCardTag = forwardRef(
  (
    { title, icon, onSelectCard = () => {}, selectAction, LinkComponent },
    ref,
  ) => {
    const Component = LinkComponent || "a";

    return (
      <TagWrapper
        ref={ref}
        onClick={onSelectCard}
        as={Component}
        {...(LinkComponent
          ? {
              to: `/${selectAction}`,
            }
          : {
              href: `/${selectAction}`,
            })}
      >
        {isDefinedNotEmptyString(icon) && (
          <Icon icon={icon} className="wrapper__icon" />
        )}
        <div className="wrapper__text">{title}</div>
      </TagWrapper>
    );
  },
);

export default GeneralWithTagsCardTag;
