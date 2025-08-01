import { forwardRef } from "react";

import { useTheme } from "@emotion/react";

import { isDefined } from "../../../_utils/utils";
import { Wrapper } from "./style";

const FieldOfInterestsMasonryCard = forwardRef(
  (
    {
      image,
      imageComponent,
      title,
      description,
      className,
      onSelectCard = () => {},
    },
    ref
  ) => {
    const { theme } = useTheme();

    return (
      <Wrapper theme={theme} className={className} onClick={onSelectCard}>
        {isDefined(imageComponent) ? (
          imageComponent
        ) : (
          <img src={image} className="wrapper__image" />
        )}
        <div className="wrapper__content">
          {title && <div className="wrapper__title">{title}</div>}
          {description && (
            <div className="wrapper__description">{description}</div>
          )}
        </div>
      </Wrapper>
    );
  }
);

export default FieldOfInterestsMasonryCard;
