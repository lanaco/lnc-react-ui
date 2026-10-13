/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import { isDefined, isDefinedNotEmptyString } from "../../../_utils/utils";
import { Wrapper } from "./style";
import DefaultImage from "../../../assets/images/NoListingsPhoto.svg";

const BrandHitCard = forwardRef(
  (
    {
      imageComponent,
      image,
      logo,
      name,
      href,
      onSelectCard,
      urlPrefix,
      urlSufix,
      code,
      LinkComponent,
      className = "",
    },
    ref,
  ) => {
    const Component = LinkComponent || "a";
    // An explicit `href` (what the web passes) wins over the prefix/code/sufix
    // concatenation the card has always built.
    const url = isDefinedNotEmptyString(href)
      ? href
      : `${urlPrefix ?? ""}${code ?? ""}${urlSufix ?? ""}`;
    const src = image ?? logo;

    return (
      <Wrapper
        ref={ref}
        onClick={onSelectCard}
        as={Component}
        className={`brand-hit-card ${className}`}
        title={name}
        aria-label={name}
        {...(LinkComponent ? { to: url } : { href: url })}
      >
        {isDefined(imageComponent) ? (
          imageComponent
        ) : (
          <img
            src={isDefinedNotEmptyString(src) ? src : DefaultImage}
            alt={name || ""}
            loading="lazy"
            className="wrapper__image"
            onError={(e) => {
              const img = e?.currentTarget;
              if (img && img.dataset.fallback !== "1") {
                img.dataset.fallback = "1";
                img.src = DefaultImage;
              }
            }}
          />
        )}
      </Wrapper>
    );
  },
);

export default BrandHitCard;
