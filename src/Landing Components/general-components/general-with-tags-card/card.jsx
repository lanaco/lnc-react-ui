/* eslint-disable react/display-name */
import { forwardRef } from "react";

import { useTheme } from "@emotion/react";

import { isDefined } from "../../../_utils/utils";
import { Wrapper } from "./style";

const GeneralWithTagsCard = forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ imageUrl, imageComponent, title, onSelectCard = () => {} }, ref) => {
    const { theme } = useTheme();

    return (
      <Wrapper ref={ref} theme={theme} onClick={onSelectCard}>
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
  }
);

export default GeneralWithTagsCard;
