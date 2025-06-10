/* eslint-disable react/display-name */
import { forwardRef } from "react";

import { useTheme } from "@emotion/react";

import { Wrapper } from "./style";

const ShopCardSkeleton = forwardRef(({}, ref) => {
  const theme = useTheme();

  return (
    <Wrapper theme={theme}>
      <div className="wrapper__tile">
        <div className="wrapper__image--skeleton"></div>
        <div className="wrapper__info">
          <div className="info__title--skeleton"></div>
          <div className="info__subtitle--skeleton"></div>
          <div className="info__badges--skeleton"></div>
          <div className="info__rating--skeleton"></div>
        </div>
      </div>
      <div className="wrapper__products">
        <div className="wrapper__product--skeleton"></div>
        <div className="wrapper__product--skeleton"></div>
        <div className="wrapper__product--skeleton"></div>
      </div>
    </Wrapper>
  );
});

export default ShopCardSkeleton;
