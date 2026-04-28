/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useRef } from "react";
import { CardContainer, Container } from "./style";

const CategoryCard = forwardRef(
  (
    {
      name,
      imageUrl,
      buttonLink,
      borderColor,
      onSelectCard = () => {},
      LinkComponent,
    },
    ref,
  ) => {
    const Component = LinkComponent || "a";
    const cardRef = useRef();

    return (
      <Container>
        <CardContainer
          ref={cardRef}
          borderColor={borderColor}
          onClick={(e) => onSelectCard(e, cardRef)}
          as={Component}
          {...(LinkComponent
            ? { to: `/${buttonLink}` }
            : { href: `/${buttonLink}` })}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt={name}
              className="card__image"
              loading="lazy"
            />
          )}
          {name && (
            <div className="card__name-badge">
              <span className="card__name">{name}</span>
            </div>
          )}
        </CardContainer>
        {name && <div className="card__name below">{name}</div>}
      </Container>
    );
  },
);

export default CategoryCard;
