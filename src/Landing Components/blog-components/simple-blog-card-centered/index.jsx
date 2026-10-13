/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useRef } from "react";
import { TextWrapper, Wrapper } from "./style";
import ProductImageWrapper from "../../product-img-wrapper";

const SimpleBlogCardCentered = forwardRef((props, ref) => {
  const {
    title,
    image,
    text,
    buttonText,
    onCardClick,
    metadata,
    link,
    LinkComponent,
  } = props;
  const Component = LinkComponent || "a";

  const cardRef = useRef();

  const handleCardClick = (e) => {
    onCardClick(e, cardRef);
  };

  return (
    <Wrapper
      ref={cardRef}
      name={metadata?.name}
      data-accessor={metadata?.accessor}
      className="blog-card"
      onClick={handleCardClick}
      as={Component}
      {...(LinkComponent ? { to: `/${link}` } : { href: `/${link}` })}
    >
      <ProductImageWrapper src={image} />
      <TextWrapper>
        {title && <div className="text-wr-title">{title}</div>}
        {text && <div className="text-wr">{text}</div>}
      </TextWrapper>
      {buttonText && (
        <span className="simple-blog-card-centered__button">{buttonText}</span>
      )}
    </Wrapper>
  );
});

export default SimpleBlogCardCentered;
