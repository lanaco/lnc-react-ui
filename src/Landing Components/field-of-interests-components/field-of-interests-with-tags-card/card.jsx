/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import { useTheme } from "@emotion/react";

import { isDefined, isDefinedNotEmptyString } from "../../../_utils/utils";
import { Wrapper } from "./style";

const FieldOfInterestsWithTagsCard = forwardRef(
  (
    {
      image,
      imageComponent,
      name,
      description,
      onSelectCard = () => {},
      uuid,
      nameSlug,
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
        onClick={onSelectCard}
        as={Component}
        {...(LinkComponent
          ? {
              to: `/product/${
                isDefinedNotEmptyString(nameSlug) ? `${nameSlug}-` : ""
              }${uuid}`,
            }
          : {
              href: `/product/${
                isDefinedNotEmptyString(nameSlug) ? `${nameSlug}-` : ""
              }${uuid}`,
            })}
      >
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
  },
);

export default FieldOfInterestsWithTagsCard;
