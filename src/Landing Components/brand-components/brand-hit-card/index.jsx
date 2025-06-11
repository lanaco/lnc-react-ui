import { forwardRef } from "react";

import { isDefined } from "../../../_utils/utils";
import { Wrapper } from "./style";

const BrandHitCard = forwardRef(({ imageComponent, image }, ref) => {
  return (
    <Wrapper>
      {isDefined(imageComponent) ? (
        imageComponent
      ) : (
        <img src={image} className="wrapper__image" />
      )}
    </Wrapper>
  );
});

export default BrandHitCard;
