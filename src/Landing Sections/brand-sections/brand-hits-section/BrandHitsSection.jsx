/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useState } from "react";

import BrandHitCard from "../../../Landing Components/brand-components/brand-hit-card";
import { Wrapper } from "./style";
import SuspenseBrandHits from "../../../Landing Components/skeleton-components/brand/brand-hits";

/**
 * Mirrors the web BrandHitsSection.astro: centered heading, a wrapping row of
 * square logo tiles and an optional "show more / show less" toggle. Extra
 * items stay rendered (crawlable links) and are only hidden with CSS, so no
 * measuring is needed.
 *  - mobileLimit (default 12): tiles shown on mobile before the toggle;
 *    pass 0 / null to disable the cap.
 *  - desktopLimit (default none): same for tablet / desktop (the web uses 14).
 */
const BrandHitsSection = forwardRef(
  (
    {
      title,
      subtitle,
      items = [],
      isLoading = false,
      onSelectCard = () => {},
      urlPrefix,
      urlSufix,
      LinkComponent,
      mobileLimit = 12,
      desktopLimit,
      showMoreText = "Show more",
      showLessText = "Show less",
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useState(false);

    const count = items?.length || 0;
    const hasMoreMobile = mobileLimit > 0 && count > mobileLimit;
    const hasMoreDesktop = desktopLimit > 0 && count > desktopLimit;
    const hasToggle = hasMoreMobile || hasMoreDesktop;

    return (
      <Wrapper
        ref={ref}
        mobileLimit={hasMoreMobile ? mobileLimit : null}
        desktopLimit={hasMoreDesktop ? desktopLimit : null}
        expanded={expanded}
        className="lp-section lp-brand-hits-section"
      >
        {(title || subtitle) && (
          <div className="wrapper__heading">
            {title && <div className="wrapper__title">{title}</div>}
            {subtitle && <div className="wrapper__subtitle">{subtitle}</div>}
          </div>
        )}
        <SuspenseBrandHits
          isLoading={isLoading}
          keyPrefix="brand-hits-skeleton"
        >
          <div className="wrapper__content">
            {items?.map((item, idx) => (
              <BrandHitCard
                key={`brand-hit-card__${idx + 1}`}
                image={item?.image ?? item?.logo}
                imageComponent={item?.imageComponent}
                onSelectCard={() => onSelectCard?.(item)}
                className="wrapper__item"
                urlPrefix={urlPrefix}
                urlSufix={urlSufix}
                code={item?.card}
                href={item?.href}
                name={item?.name}
                LinkComponent={LinkComponent}
              />
            ))}
          </div>
          {hasToggle && (
            <button
              type="button"
              className={`wrapper__more${
                !hasMoreDesktop ? " wrapper__more--mobile-only" : ""
              }${!hasMoreMobile ? " wrapper__more--desktop-only" : ""}`}
              aria-expanded={expanded}
              onClick={(e) => {
                e?.currentTarget?.blur();
                setExpanded((prev) => !prev);
              }}
            >
              <span>{expanded ? showLessText : showMoreText}</span>
              <i className="mng-lnc-chevron--down" />
            </button>
          )}
        </SuspenseBrandHits>
      </Wrapper>
    );
  },
);

export default BrandHitsSection;
