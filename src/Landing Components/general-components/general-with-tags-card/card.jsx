/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

import { useTheme } from "@emotion/react";

import { isDefined } from "../../../_utils/utils";
import { Wrapper } from "./style";

const GeneralWithTagsCard = forwardRef(
  // eslint-disable-next-line react/prop-types
  (
    {
      imageUrl,
      imageComponent,
      title,
      onSelectCard = () => {},
      selectAction,
      LinkComponent,
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const Component = LinkComponent || "a";

    return (
      <Wrapper
        ref={ref}
        theme={theme}
        onClick={onSelectCard}
        as={Component}
        {...(LinkComponent
          ? {
              to: `/${selectAction}`,
            }
          : {
              href: `/${selectAction}`,
            })}
      >
        {isDefined(imageComponent) ? (
          imageComponent
        ) : (
          <img src={imageUrl} className="wrapper__image" />
        )}
        <div className="wrapper__content">
          <div className="wrapper__title">{title}</div>
        </div>
      </Wrapper>
    );
  },
);

export default GeneralWithTagsCard;
