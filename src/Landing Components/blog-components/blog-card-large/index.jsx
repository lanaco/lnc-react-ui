import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import BlogCardLargeSkeleton from "./skeleton";
import Button from "../../../General/Button/Button";

const BlogCardLarge = forwardRef((props, ref) => {
  const { title, image, text, onCardClick, buttonText } = props;
  const isMobile = useDetectMobile();

  return (
    // <BlogCardLargeSkeleton />
    <Wrapper className="blog-card" onClick={onCardClick}>
      <img src={image} />
      <TextWrapper>
        <div className="text-wr-title">{title}</div>
        <div className="text-wr">{text}</div>
        {isMobile !== true && (
          <Button
            type="button"
            btnType="outline"
            size="medium"
            color="gray"
            onClick={onCardClick}
          >
            {buttonText}
          </Button>
        )}
      </TextWrapper>
      {isMobile === true && (
        <Button
          className="action"
          type="button"
          btnType="outline"
          size="medium"
          color="gray"
          onClick={onCardClick}
        >
          {buttonText}
        </Button>
      )}
    </Wrapper>
  );
});

export default BlogCardLarge;
