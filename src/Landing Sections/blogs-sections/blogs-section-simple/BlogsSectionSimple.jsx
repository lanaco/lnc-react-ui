import { forwardRef } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import { RegulatTitleSectionWrapper } from "../../style";
import Button from "../../../General/Button/Button";
import SimpleBlogCard from "../../../Landing Components/blog-components/simple-blog-card";

const BlogsSectionSimple = forwardRef((props, ref) => {
  const { icon, title, onSectionClick, items, buttonText, limit = 3 } = props;

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
            onClick={onSectionClick}
            borderRadius="curved"
          >
            {buttonText}
          </Button>
        )}
      </div>
      <GridWrapper limit={limit}>
        {isMobile === true
          ? items?.map((x, index) => (
              <SimpleBlogCard
                key={index}
                title={x?.title}
                image={x?.image}
                text={x?.text}
                titleSlug={x?.titleSlug}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <SimpleBlogCard
                  key={index}
                  title={x?.title}
                  image={x?.image}
                  text={x?.text}
                  titleSlug={x?.titleSlug}
                />
              ))}
      </GridWrapper>
    </RegulatTitleSectionWrapper>
  );
});

export default BlogsSectionSimple;
