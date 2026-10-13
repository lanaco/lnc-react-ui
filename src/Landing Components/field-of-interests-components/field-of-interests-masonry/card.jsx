/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
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
      link,
      LinkComponent,
    },
    ref,
  ) => {
    const Component = LinkComponent || "a";

    const { theme } = useTheme();

    return (
      <Wrapper
        ref={ref}
        theme={theme}
        className={className}
        onClick={onSelectCard}
        as={Component}
        {...(LinkComponent
          ? { to: `/${link}` }
          : { href: isDefined(link) ? `/${link}` : undefined })}
      >
        {isDefined(imageComponent) ? (
          imageComponent
        ) : (
          <img src={image} alt={title || ""} className="wrapper__image" />
        )}
        <div className="wrapper__content">
          {title && <div className="wrapper__title">{title}</div>}
          {description && (
            <div className="wrapper__description">{description}</div>
          )}
        </div>
      </Wrapper>
    );
  },
);

export default FieldOfInterestsMasonryCard;
