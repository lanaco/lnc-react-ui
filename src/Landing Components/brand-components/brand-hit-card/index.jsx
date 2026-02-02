/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import { isDefined } from "../../../_utils/utils";
import { Wrapper } from "./style";

const BrandHitCard = forwardRef(
  (
    {
      imageComponent,
      image,
      onSelectCard,
      urlPrefix,
      urlSufix,
      code,
      LinkComponent,
    },
    ref,
  ) => {
    const Component = LinkComponent || "a";

    return (
      <Wrapper
        ref={ref}
        onClick={onSelectCard}
        as={Component}
        {...(LinkComponent
          ? { to: `${urlPrefix}${code}${urlSufix}` }
          : { href: `${urlPrefix}${code}${urlSufix}` })}
      >
        {isDefined(imageComponent) ? (
          imageComponent
        ) : (
          <img src={image} className="wrapper__image" />
        )}
      </Wrapper>
    );
  },
);

export default BrandHitCard;
