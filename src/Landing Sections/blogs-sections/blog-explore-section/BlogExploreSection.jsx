/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import { forwardRef, Fragment, useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";

import useDetectMobile from "../../../_utils/useDetectMobile";
import { formatLocaleDateString } from "../../../_utils/utils";
import TextInput from "../../../Basic Inputs/TextInput/TextInput";
import Icon from "../../../General/Icon/Icon";
import Link from "../../../General/Link/Link";
import IconButton from "../../../General/IconButton/IconButton";
import DropdownMenu from "../../../Utility/DropdownMenu/DropdownMenu";
import DropdownItem from "../../../Utility/DropdownMenu/DropdownItem";
import BlogExploreSectionTags from "../../../Landing Components/help-components/faq-section-components/tag";
import BlogProductCardsSection from "../../../Blog Sections/blog-product-cards-section/BlogProductCardsSection";
import Pagination from "../../../Landing Components/blog-components/blog-explore/pagination";
import ProductImageWrapper from "../../../Landing Components/product-img-wrapper";
import BlogListSection from "../blog-list-section/BlogListSection";
import { Container } from "./style";

const BlogExploreSection = forwardRef(
  (
    {
      mainTitle,
      sideTitle,
      tags,
      selectedTag,
      handleSelectTag = () => {},
      blogs,
      miniBlogs,
      products,
      blogsLoading = false,
      productsLoading = false,
      sortingOptions,
      sortBy,
      handleSortBy = () => {},
      allTagText = "All",
      searchPlaceholderText = "Search blogs",
      timeToReadText = "{0} min read",
      getBlogImageUrl = () => {},
      handleSelectBlog = () => {},
      handleSelectBlogTag = () => {},
      handleShareBlog = () => {},
      // handleBookmarkBlog = () => {},
      showAllButtonLink,
      showAllButtonText = "Show all products",
      viewAllButtonText = "View all (11)",
      // viewAllButtonLink,
      handleViewAll = () => {},
      handleShowAll = () => {},
      handleSelectProduct = () => {},
      getProductImageUrl = () => {},
      page,
      handlePage = () => {},
      perPage,
      handlePerPage = () => {},
      totalPage,
      perPageOptions,
      handleSearch = () => {},
      onBookmark = () => {},
      bookmarkComponent = <></>,
      componentName,
      LinkComponent
    },
    ref
  ) => {
    const handlePageAndScrollToTop = (newPage) => {
      const landingContainer = document.getElementById("landing__container");

      landingContainer.scrollIntoView({ behavior: "smooth", block: "start" });

      handlePage?.(newPage);
    };

    const tagsRef = useRef(null);

    const isMobile = useDetectMobile();

    const [tagsElementInfo, setTagsElementInfo] = useState({
      arrowsVisible: false,
      leftArrowDisabled: false,
      rightArrowDisabled: false,
    });

    useEffect(() => {
      const tagsContent = tagsRef?.current;

      if (!tagsContent) return;

      const updateTagsElementInfo = () => {
        const maxScroll = tagsContent.scrollWidth - tagsContent.clientWidth;

        setTagsElementInfo((prev) => ({
          ...prev,
          arrowsVisible: tagsContent.clientWidth < tagsContent.scrollWidth,
          leftArrowDisabled: tagsContent.scrollLeft <= 0,
          rightArrowDisabled: tagsContent.scrollLeft >= maxScroll,
        }));
      };

      const observer = new ResizeObserver(updateTagsElementInfo);

      observer.observe(tagsContent);

      updateTagsElementInfo();

      tagsContent.addEventListener("scroll", updateTagsElementInfo);

      return () => {
        observer.disconnect();
        tagsContent.removeEventListener("scroll", updateTagsElementInfo);
      };
    }, []);

    const handleRightNavigate = () => {
      tagsRef?.current?.scrollBy({ left: 100, behavior: "smooth" });
    };

    const handleLeftNavigate = () => {
      tagsRef?.current?.scrollBy({ left: -100, behavior: "smooth" });
    };

    return (
      <Container ref={ref} id="landing__container">
        <div className="landing__main-content">
          <div className="main-content__heading">
            <div className="main-content__title">{mainTitle}</div>
            {!isMobile && tagsElementInfo?.arrowsVisible && (
              <div className="main-content__tags-nav">
                <IconButton
                  icon="chevron-left"
                  borderRadius="curved"
                  btnType="tinted"
                  color="neutral"
                  disabled={tagsElementInfo?.leftArrowDisabled}
                  className="main-content__tag-nav"
                  onClick={handleLeftNavigate}
                />
                <IconButton
                  icon="chevron-right"
                  borderRadius="curved"
                  btnType="tinted"
                  color="neutral"
                  disabled={tagsElementInfo?.rightArrowDisabled}
                  className="main-content__tag-nav"
                  onClick={handleRightNavigate}
                />
              </div>
            )}
          </div>
          {tags && (
            <BlogExploreSectionTags
              ref={tagsRef}
              tags={tags}
              allTagText={allTagText}
              selectedTagCode={selectedTag}
              onSelectTag={handleSelectTag}
            />
          )}
          <div className="main-content__actions">
            <TextInput
              className="main-content__search"
              placeholder={searchPlaceholderText}
              debounceTime={200}
              prefix={
                <Icon
                  icon=" mng-lnc-search"
                  sizeInUnits="1.25rem"
                  className="main-content__search-prefix"
                />
              }
              color="neutral"
              onChange={handleSearch}
            />
            <DropdownMenu
              color="neutral"
              control={sortBy?.name}
              zIndex={1001}
              className="main-content__sort-by"
            >
              {sortingOptions?.map((option, idx) => (
                <DropdownItem
                  key={`blog-epxlore-section-sorting-option__${idx + 1}`}
                  active={option?.code === sortBy?.code}
                  className="sort-by__item"
                  onClick={() => handleSortBy(option)}
                >
                  {option?.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </div>
          <div className="main-content__items">
            {blogs && blogs?.length > 0 && (
              <BlogListSection
                timeToReadText={timeToReadText}
                items={blogs?.slice(0, 5)}
                isLoading={blogsLoading}
                getImage={getBlogImageUrl}
                onSelectCard={handleSelectBlog}
                onSelectOption={handleSelectBlogTag}
                onShare={handleShareBlog}
                // onBookmark={handleBookmarkBlog}
                onBookmark={onBookmark}
                bookmarkComponent={bookmarkComponent}
                componentName={componentName}
                LinkComponent={LinkComponent}
              />
            )}
            <div className="main-content__divider"></div>
            {products && products?.length > 0 && (
              <BlogProductCardsSection
                buttonText={showAllButtonText}
                buttonLink={showAllButtonLink}
                onButtonAction={handleShowAll}
                onSelectCard={handleSelectProduct}
                items={products}
                isLoading={productsLoading}
                getImage={getProductImageUrl}
                isHighlight={true}
                componentName={componentName}
                LinkComponent={LinkComponent}
              />
            )}
            <div className="main-content__divider"></div>
            {blogs && blogs?.length > 0 && (
              <BlogListSection
                timeToReadText={timeToReadText}
                items={blogs?.slice(5)}
                isLoading={blogsLoading}
                getImage={getBlogImageUrl}
                onSelectCard={handleSelectBlog}
                onSelectOption={handleSelectBlogTag}
                onShare={handleShareBlog}
                // onBookmark={handleBookmarkBlog}
                onBookmark={onBookmark}
                bookmarkComponent={bookmarkComponent}
                componentName={componentName}
                LinkComponent={LinkComponent}
              />
            )}
          </div>
          {totalPage && totalPage > 1 && (
            <Pagination
              perPageOptions={perPageOptions}
              perPage={perPage}
              handlePerPage={handlePerPage}
              page={page}
              handlePage={handlePageAndScrollToTop}
              totalPage={totalPage}
            />
          )}
        </div>
        <div className="landing__side-content">
          {sideTitle && <div className="side-content__title">{sideTitle}</div>}
          {miniBlogs && miniBlogs?.length > 0 && (
            <>
              <div className="side-content__items">
                {miniBlogs?.map((blog, idx) => (
                  <Fragment key={`mini_blg_${idx}`}>
                    <div
                      className="side-content__item"
                      onClick={() => handleSelectBlog(blog)}
                    >
                      <ProductImageWrapper
                        src={
                          getBlogImageUrl(blog?.imageUrl, blog?.uuid) || null
                        }
                        alt={`Mini blog ${idx + 1}`}
                        className="item__image"
                      />
                      <div className="item__content">
                        <div className="item__title">{blog?.title}</div>
                        <div className="item__description">
                          {formatLocaleDateString(blog?.publishedAt)}
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
              <Link onClick={handleViewAll} className="side-content__link">
                {viewAllButtonText}
              </Link>
            </>
          )}
        </div>
      </Container>
    );
  }
);

export default BlogExploreSection;
