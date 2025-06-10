/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { Wrapper } from "./style";
import { isDefined } from "../../../_utils/utils";

const ClearProductCard = forwardRef((props, ref) => {
  const {
    uuid,
    title,
    image,
    sellerUuid,
    onSelectCard = () => {},
    imageComponent,
  } = props;

  return (
    <Wrapper className="product-card" onClick={onSelectCard}>
      {isDefined(imageComponent) ? imageComponent : <img src={image} />}
      <div className="card-title">{title}</div>
    </Wrapper>
  );
});

export default ClearProductCard;
