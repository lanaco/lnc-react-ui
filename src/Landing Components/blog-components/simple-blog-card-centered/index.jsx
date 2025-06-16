import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";
import SimpleBlogCardCenteredSkeleton from "./skeleton";
import Button from "../../../General/Button/Button";

const SimpleBlogCardCentered = forwardRef((props, ref) => {
  const { title, image, text, buttonText, onCardClick } = props;

  return (
    // <SimpleBlogCardCenteredSkeleton />
    <Wrapper className="blog-card" onClick={onCardClick}>
      <img src={image} />
      <TextWrapper>
        <div className="text-wr-title">{title}</div>
        <div className="text-wr">{text}</div>
      </TextWrapper>
      <Button
        borderRadius="curved"
        color="gray"
        type="button"
        btnType="outline"
        onClick={onCardClick}
        size="medium"
      >
        {buttonText}
      </Button>
    </Wrapper>
  );
});

export default SimpleBlogCardCentered;
