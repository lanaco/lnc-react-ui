/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useState } from "react";
import { Wrapper } from "./style";

/**
 * SEO text section: an optional (HTML) title and an HTML body that is
 * visually clamped to 9rem with a fade-out, plus a "show more/less" toggle.
 * The full HTML is always rendered (only visually clipped).
 *
 * NOTE: `title` and `content` are injected as raw HTML — the consumer is
 * responsible for sanitizing them.
 */
const SeoTextSection = forwardRef(
  (
    {
      title,
      content,
      description,
      showMoreText = "Prikaži više",
      showLessText = "Prikaži manje",
      showAll = false,
      className = "",
      style,
    },
    ref
  ) => {
    const [expanded, setExpanded] = useState(false);
    const html = content ?? description;

    if (!html) return null;

    const isExpanded = showAll || expanded;

    return (
      <Wrapper
        ref={ref}
        style={style}
        className={`lp-section lp-seo-text-section ${className}`.trim()}
      >
        {title && (
          <div
            className="seo-text__title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        <div
          className={`seo-text__body${isExpanded ? " is-expanded" : ""}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {!showAll && (
          <button
            type="button"
            className="seo-text__toggle"
            aria-expanded={expanded}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? showLessText : showMoreText}
          </button>
        )}
      </Wrapper>
    );
  }
);

export default SeoTextSection;
