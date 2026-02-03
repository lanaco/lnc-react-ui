/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { CardWrapper } from "./style";

const CategorySimpleCard = forwardRef((props, ref) => {
  const { image, name, urlPrefix, urlSufix, code, uuid, onSelectCard = () => {} } = props;

  return (
    <CardWrapper
      ref={ref}
      className="simple-category-card"
      onClick={() => onSelectCard(uuid)}
      to={`${urlPrefix}${code}${urlSufix}`}
    >
      <img src={image} />
      <div className="card-content">
        <div className="card-content-2">{name}</div>
      </div>
    </CardWrapper>
  );
});

export default CategorySimpleCard;
