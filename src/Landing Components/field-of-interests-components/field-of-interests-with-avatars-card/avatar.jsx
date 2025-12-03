import { forwardRef } from "react";

import { isDefined } from "../../../_utils/utils";
import { AvatarWrapper } from "./style";

const FieldOfInterestsWithAvatarsCardAvatar = forwardRef(
  ({ isActive, image, imageComponent, onSelectCard = () => {} }, ref) => {
    return (
      <AvatarWrapper
        ref={ref}
        className={isActive ? "active" : ""}
        onClick={onSelectCard}
      >
        {isDefined(imageComponent) ? (
          imageComponent
        ) : (
          <img src={image} className="wrapper__image" />
        )}
      </AvatarWrapper>
    );
  }
);

export default FieldOfInterestsWithAvatarsCardAvatar;
