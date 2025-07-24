import { forwardRef } from "react";

import { useTheme } from "@emotion/react";

import { isDefined } from "../../../_utils/utils";
import { Wrapper } from "./style";

const FieldOfInterestsWithTagsCard = forwardRef(
  (
    { image, imageComponent, name, description, onSelectCard = () => {} },
    ref
  ) => {
    const { theme } = useTheme();

    return (
      <Wrapper theme={theme} onClick={onSelectCard}>
        {isDefined(imageComponent) ? (
          imageComponent
        ) : (
          <img src={image} className="wrapper__image" />
        )}
        <div className="wrapper__content">
          {name && <div className="wrapper__title">{name}</div>}
          {description && (
            <div className="wrapper__description">{description}</div>
          )}
        </div>
      </Wrapper>
    );
  }
);

export default FieldOfInterestsWithTagsCard;
