import { forwardRef } from "react";

import { isDefined } from "../../../_utils/utils";
import { Wrapper } from "./style";

const BrandHitCard = forwardRef(
  ({ imageComponent, image, onSelectCard }, ref) => {
    return (
      <Wrapper>
        {isDefined(imageComponent) ? (
          imageComponent
        ) : (
          <img src={image} className="wrapper__image" onClick={onSelectCard} />
        )}
      </Wrapper>
    );
  }
);

export default BrandHitCard;
