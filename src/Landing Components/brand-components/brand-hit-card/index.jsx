/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import { isDefined } from "../../../_utils/utils";
import { Wrapper } from "./style";

const BrandHitCard = forwardRef(
  ({ imageComponent, image, onSelectCard, urlPrefix, urlSufix, code }, ref) => {
    return (
      <Wrapper ref={ref} onClick={onSelectCard} to={`${urlPrefix}${code}${urlSufix}`}>
        {isDefined(imageComponent) ? (
          imageComponent
        ) : (
          <img src={image} className="wrapper__image" />
        )}
      </Wrapper>
    );
  }
);

export default BrandHitCard;
