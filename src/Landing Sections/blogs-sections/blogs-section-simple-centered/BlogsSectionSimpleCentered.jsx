/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import SimpleBlogCardCentered from "../../../Landing Components/blog-components/simple-blog-card-centered";
import SuspenseBlogsSectionSimpleCentered from "../../../Landing Components/skeleton-components/blog/blogs-section-simple-centered";

const BlogsSectionSimpleCentered = forwardRef((props, ref) => {
  const {
    items,
    limit = 3,
    onSelectCard = () => {},
    isLoading = false,
    componentName,
  } = props;

  const isMobile = useDetectMobile();

  return (
    <SuspenseBlogsSectionSimpleCentered
      isLoading={isLoading}
      keyPrefix="blogs-simple-centered-skeleton"
    >
      <GridWrapper ref={ref} limit={limit}>
        <>
          {isMobile === true
            ? items?.map((x, index) => (
                <SimpleBlogCardCentered
                  key={index}
                  title={x?.title}
                  image={x?.image || null}
                  text={x?.text}
                  buttonText={x?.buttonText}
                  onCardClick={(e, cardRef) => onSelectCard(x, cardRef)}
                  metadata={{ name: componentName, accessor: x?.accessor }}
                />
              ))
            : items
                ?.slice(0, limit)
                .map((x, index) => (
                  <SimpleBlogCardCentered
                    key={index}
                    title={x?.title}
                    image={x?.image || null}
                    text={x?.text}
                    buttonText={x?.buttonText}
                    onCardClick={(e, cardRef) => onSelectCard(x, cardRef)}
                    metadata={{ name: componentName, accessor: x?.accessor }}
                  />
                ))}
        </>
      </GridWrapper>
    </SuspenseBlogsSectionSimpleCentered>
  );
});

export default BlogsSectionSimpleCentered;
