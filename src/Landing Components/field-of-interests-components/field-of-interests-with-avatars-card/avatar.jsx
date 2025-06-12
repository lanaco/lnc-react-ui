import { forwardRef } from "react";

import { isDefined } from "../../../_utils/utils";
import { AvatarWrapper } from "./style";

const FieldOfInterestsWithAvatarsCardAvatar = forwardRef(
  ({ isActive, image, imageComponent, onCardSelect = () => {} }, ref) => {
    return (
      <AvatarWrapper
        className={isActive ? "active" : ""}
        onClick={onCardSelect}
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
