/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import BlogCardLarge from "../../../Landing Components/blog-components/blog-card-large";
import SuspenseBlogLarge from "../../../Landing Components/skeleton-components/blog-skeletons/suspense-large";

const MemoizedBlogCard = memo(BlogCardLarge);

const BlogsSectionLarge = forwardRef((props, ref) => {
  const {
    items,
    onSelectCard = () => {},
    limit = 2,
    isLoading = false,
    getImage = () => {},
    componentName,
  } = props;

  const isMobile = useDetectMobile();

  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items?.map((x, index) => (
              <MemoizedBlogCard
                key={index}
                title={x?.title}
                imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
                text={x?.description}
                titleSlug={x?.titleSlug}
                buttonText={x?.buttonText}
                onCardClick={(e, cardRef) =>
                  onSelectCard(x?.titleSlug, cardRef)
                }
                metadata={{ name: componentName, accessor: x?.accessor }}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <MemoizedBlogCard
                  key={index}
                  title={x?.title}
                  imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
                  text={x?.description}
                  titleSlug={x?.titleSlug}
                  buttonText={x?.buttonText}
                  onCardClick={(e, cardRef) =>
                    onSelectCard(x?.titleSlug, cardRef)
                  }
                  metadata={{ name: componentName, accessor: x?.accessor }}
                />
              ))}
      </>
    );
  }, [items, isMobile, limit, onSelectCard]);

  return (
    <GridWrapper ref={ref} limit={limit}>
      <SuspenseBlogLarge
        isLoading={isLoading}
        limit={limit}
        keyPrefix={"explore-landing"}
      >
        {memoizedProducts}
      </SuspenseBlogLarge>
    </GridWrapper>
  );
});

export default BlogsSectionLarge;
