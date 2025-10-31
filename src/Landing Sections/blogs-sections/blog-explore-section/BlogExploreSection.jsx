import { forwardRef } from "react";

import PropTypes from "prop-types";

import { formatLocaleDateString } from "../../../_utils/utils";
import TextInput from "../../../Basic Inputs/TextInput/TextInput";
import Icon from "../../../General/Icon/Icon";
import Link from "../../../General/Link/Link";
import DropdownMenu from "../../../Utility/DropdownMenu/DropdownMenu";
import DropdownItem from "../../../Utility/DropdownMenu/DropdownItem";
import BlogExploreSectionTags from "../../../Landing Components/help-components/faq-section-components/tag";
import BlogProductCardsSection from "../../../Blog Sections/blog-product-cards-section/BlogProductCardsSection";
import Pagination from "../../../Landing Components/blog-components/blog-explore/pagination";
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
      handleBookmarkBlog = () => {},
      showAllButtonLink,
      showAllButtonText = "Show all products",
      viewAllButtonText = "View all (11)",
      viewAllButtonLink,
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
    },
    ref
  ) => {
    return (
      <Container>
        <div className="landing__main-content">
          {mainTitle && <div className="main-content__title">{mainTitle}</div>}
          {tags && (
            <BlogExploreSectionTags
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
                onBookmark={handleBookmarkBlog}
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
                onBookmark={handleBookmarkBlog}
              />
            )}
          </div>
          {totalPage && totalPage > 1 && (
            <Pagination
              perPageOptions={perPageOptions}
              perPage={perPage}
              handlePerPage={handlePerPage}
              page={page}
              handlePage={handlePage}
              totalPage={totalPage}
            />
          )}
        </div>
        <div className="landing__side-content">
          {sideTitle && <div className="side-content__title">{sideTitle}</div>}
          <div className="side-content__items">
            {miniBlogs &&
              miniBlogs?.length > 0 &&
              miniBlogs?.map((blog, idx) => (
                <div
                  className="side-content__item"
                  onClick={() => handleSelectBlog(blog)}
                >
                  <img
                    src={getBlogImageUrl(blog?.imageUrl, blog?.uuid) || null}
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
              ))}
          </div>
          <Link onClick={handleViewAll} className="side-content__link">
            {viewAllButtonText}
          </Link>
        </div>
      </Container>
    );
  }
);

BlogExploreSection.propTypes = {
  mainTitle: PropTypes.string,
  sideTitle: PropTypes.string,
  tags: PropTypes.array,
  selectedTag: PropTypes.any,
  handleSelectTag: PropTypes.func,
  blogs: PropTypes.array,
  miniBlogs: PropTypes.array,
  products: PropTypes.array,
  blogsLoading: PropTypes.bool,
  productsLoading: PropTypes.bool,
  sortingOptions: PropTypes.array,
  sortBy: PropTypes.any,
  handleSortBy: PropTypes.func,
  allTagText: PropTypes.string,
  searchPlaceholderText: PropTypes.string,
  timeToReadText: PropTypes.string,
  getBlogImageUrl: PropTypes.func,
  handleSelectBlog: PropTypes.func,
  handleSelectBlogTag: PropTypes.func,
  handleShareBlog: PropTypes.func,
  handleBookmarkBlog: PropTypes.func,
  showAllButtonLink: PropTypes.string,
  showAllButtonText: PropTypes.string,
  viewAllButtonText: PropTypes.string,
  handleShowAll: PropTypes.func,
  handleSelectProduct: PropTypes.func,
  getProductImageUrl: PropTypes.func,
  page: PropTypes.number,
  handlePage: PropTypes.func,
  perPage: PropTypes.any,
  handlePerPage: PropTypes.func,
  totalPage: PropTypes.number,
  perPageOptions: PropTypes.array,
  handleSearch: PropTypes.func,
};

export default BlogExploreSection;
