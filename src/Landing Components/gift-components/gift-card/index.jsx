/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import {
  formatPrice,
  GetCurrencySymbol,
  isDefined,
} from "../../../_utils/utils";
import { Wrapper } from "./style";

const GiftCard = forwardRef(
  (
    { image, imageComponent, text, price, currency, onSelectCard = () => {} },
    ref
  ) => {
    return (
      <Wrapper ref={ref} onClick={onSelectCard}>
        <div className="wrapper__card">
          {isDefined(imageComponent) ? (
            imageComponent
          ) : (
            <img src={image} className="wrapper__image" />
          )}
          <div className="wrapper__tag">{`${formatPrice(
            price
          )} ${GetCurrencySymbol(currency)}`}</div>
        </div>
        <div className="wrapper__text">{text}</div>
      </Wrapper>
    );
  }
);

export default GiftCard;
