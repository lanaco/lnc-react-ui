/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import TextInput from "../../Basic Inputs/TextInput/TextInput";
import Icon from "../../General/Icon/Icon";
import SearchSectionTags from "../../Landing Components/help-components/search-section-components/tag";
import SearchSectionVideo from "../../Landing Components/help-components/search-section-components/video";
import { Container } from "./style";

const SearchSection = forwardRef(
  (
    {
      title,
      description,
      suggestedText = "Suggested",
      searchPlaceholderText = "Search for rules, tempates, forms and more",
      tags = [],
      includeSearch = false,
      video,
      thumbnail,
    },
    ref,
  ) => {
    return (
      <Container ref={ref}>
        {includeSearch ? (
          <div className="section__left search">
            <div>{title && <div className="section__title">{title}</div>}</div>
            <TextInput
              className="section__text-input"
              placeholder={searchPlaceholderText}
              prefix={
                <Icon
                  icon=" mng-lnc-search"
                  sizeInUnits="1.25rem"
                  className="section__prefix"
                />
              }
              color="neutral"
            />
            <div className="section__tags">
              <div className="section__suggested">{suggestedText}</div>
              <SearchSectionTags tags={tags} />
            </div>
          </div>
        ) : (
          <div className="section__left">
            <div>
              {title && <div className="section__title">{title}</div>}
              {description && (
                <div className="section__description">{description}</div>
              )}
            </div>
            <div className="section__tags">
              <SearchSectionTags tags={tags} />
            </div>
          </div>
        )}
        <div className="section__right">
          <SearchSectionVideo video={video} thumbnail={thumbnail} />
        </div>
      </Container>
    );
  },
);

export default SearchSection;
