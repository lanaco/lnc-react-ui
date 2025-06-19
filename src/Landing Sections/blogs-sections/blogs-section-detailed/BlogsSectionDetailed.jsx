import { forwardRef } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import { RegulatTitleSectionWrapper } from "../../style";
import Button from "../../../General/Button/Button";

import BlogCardDetailed from "../../../Landing Components/blog-components/blog-card-detailed";

const BlogsSectionDetailed = forwardRef((props, ref) => {
  const {
    icon,
    title,
    onButtonAction,
    items,
    buttonText,
    limit = 3,
    onSelectCard = () => {},
  } = props;

  const isMobile = useDetectMobile();

  return (
    <RegulatTitleSectionWrapper>
      <div className="regular-title">
        <div className="regular-title-text">
          {isDefinedNotEmptyString(icon) && <i className={icon} />}
          <span>{title}</span>
        </div>
        {isDefinedNotEmptyString(onSectionClick) && (
          <Button
            type="button"
            btnType="tinted"
            color="gray"
            onClick={() => onButtonAction(buttonLink)}
            borderRadius="curved"
          >
            {buttonText}
          </Button>
        )}
      </div>
      <GridWrapper limit={limit}>
        {isMobile === true
          ? items?.map((x, index) => (
              <BlogCardDetailed
                key={index}
                title={x?.title}
                image={x?.image}
                text={x?.text}
                titleSlug={x?.titleSlug}
                numberOfLikes={x?.numberOfLikes}
                numberOfComments={x?.numberOfComments}
                datePublished={x?.date}
                readDuration={x?.readDuration}
                tags={x?.tags}
                onCardClick={() => onSelectCard(x?.uuid)}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <BlogCardDetailed
                  key={index}
                  title={x?.title}
                  image={x?.image}
                  text={x?.text}
                  titleSlug={x?.titleSlug}
                  tags={x?.tags}
                  numberOfLikes={x?.numberOfLikes}
                  numberOfComments={x?.numberOfComments}
                  datePublished={x?.date}
                  readDuration={x?.readDuration}
                  onCardClick={() => onSelectCard(x?.uuid)}
                />
              ))}
      </GridWrapper>
    </RegulatTitleSectionWrapper>
  );
});

export default BlogsSectionDetailed;
