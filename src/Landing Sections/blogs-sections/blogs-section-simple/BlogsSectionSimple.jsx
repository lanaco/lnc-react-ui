/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import { RegulatTitleSectionWrapper } from "../../style";
import Button from "../../../General/Button/Button";
import SimpleBlogCard from "../../../Landing Components/blog-components/simple-blog-card";
import SuspenseBlogsSectionDetailed from "../../../Landing Components/skeleton-components/blog/blogs-section-detailed";

const MemoBlogCard = memo(SimpleBlogCard);

const BlogsSectionSimple = forwardRef((props, ref) => {
  const {
    icon,
    title,
    onButtonAction = () => { },
    onSelectCard = () => { },
    buttonLink,
    items,
    buttonText,
    limit = 3,
    isLoading = false,
    getImage = () => { },
    readMoreText = "Read more",
    componentName,
  } = props;

  const isMobile = useDetectMobile();

  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items?.map((x, index) => (
            <MemoBlogCard
              key={index}
              isBlog={true}
              title={x?.title}
              imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
              text={x?.description}
              titleSlug={x?.titleSlug}
              readMoreText={readMoreText}
              options={x?.options}
              onCardClick={(e, cardRef) =>
                onSelectCard(x?.titleSlug, cardRef)
              }
              metadata={{ name: componentName, accessor: x?.accessor }}
            />
          ))
          : items
            ?.slice(0, limit)
            .map((x, index) => (
              <MemoBlogCard
                key={index}
                isBlog={true}
                title={x?.title}
                imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
                text={x?.description}
                titleSlug={x?.titleSlug}
                readMoreText={readMoreText}
                options={x?.options}
                onCardClick={(e, cardRef) =>
                  onSelectCard(x?.titleSlug, cardRef)
                }
                metadata={{ name: componentName, accessor: x?.accessor }}
              />
            ))}
      </>
    );
  }, [items]);

  return (
    <RegulatTitleSectionWrapper ref={ref}>
      <div className="regular-title">
        <div className="regular-title-text">
          {isDefinedNotEmptyString(icon) && <i className={icon} />}
          <span>{title}</span>
        </div>
        {isDefinedNotEmptyString(buttonText) &&
          isDefinedNotEmptyString(buttonLink) &&
          !isLoading && (
              <Button
                type="button"
                btnType="tinted"
                color="neutral"
                onClick={(e) => {
                  e?.target?.blur();
                  onButtonAction(buttonLink);
                }}
                borderRadius="curved"
                className="button-link"
              >
                {buttonText}
              </Button>
          )}
      </div>
      <SuspenseBlogsSectionDetailed
        isLoading={isLoading}
        keyPrefix="blogs-simple-skeleton"
      >
        <GridWrapper limit={limit}>{memoizedProducts}</GridWrapper>
      </SuspenseBlogsSectionDetailed>
    </RegulatTitleSectionWrapper>
  );
});

export default BlogsSectionSimple;
