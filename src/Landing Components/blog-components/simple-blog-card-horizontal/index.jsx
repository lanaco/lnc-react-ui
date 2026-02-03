/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useRef } from "react";
import { TextWrapper, Wrapper } from "./style";
import Link from "../../../General/Link/Link";
import ProductImageWrapper from "../../product-img-wrapper";

const SimpleBlogCardHorizontal = forwardRef((props, ref) => {
  const {
    title,
    imageUrl,
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
      to={`/${link}`}
      as={Component}
      {...(LinkComponent ? { to: `/${link}` } : { href: `/${link}` })}
    >
      <TextWrapper>
        <div className="text-wr-title">{title}</div>
        <div className="text-wr">{text}</div>
        <Link color="gray" onClick={handleCardClick}>
          {buttonText}
        </Link>
      </TextWrapper>
      <ProductImageWrapper src={imageUrl} />
    </Wrapper>
  );
});

export default SimpleBlogCardHorizontal;
