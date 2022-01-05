import React, { useState } from "react";
import CheckBox from "../CheckBox/index.js";
import Button from "../Button/index.js";
import ToggleSwitch from "../ToggleSwitch/index.js";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: 0 0 6px #bebebe;
  border-radius: 0.175rem;
  padding: 8px;
  width: ${(props) =>
    props.width && props.width !== "" ? props.width : "fit-content"};

  font-family: ${theme.typography.fontFamily};
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  border: 1.7px solid #80808060;
  background-color: whitesmoke;
  border-radius: 0.175rem;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    background: white;
    height: 0;
    width: 0;
  }
  overflow: auto;
  height: ${(props) =>
    props.height && props.height !== "" ? props.height : "auto"};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: all 250ms ease;
  background-color: white;

  &:hover {
    background-color: whitesmoke;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #80808050;
  background-color: whitesmoke;
  border-radius: 3px 3px 0 0;
  position: sticky;
`;

const HeaderColumnCheck = styled.div`
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: ${(props) => (props.check ? "8px" : "0")};
  padding-left: 8px;
  border-right: 1px solid #80808050;
`;

const ColumnCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px ${(props) => (props.check ? "8px" : "0")} 5px 8px;
  border-right: 1px solid #80808050;
`;

const ColumnTitle = styled.div`
  padding: 5px 8px 5px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
`;

const HeaderColumnTitle = styled.div`
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
  padding-right: 8px;
  font-size: calc(
    ${(props) => props.theme.typography[props.size].fontSize} + 3px
  );
`;

const FooterRow = styled.div`
  display: flex;
  // flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  border: 1.7px solid #80808060;
  background-color: whitesmoke;
  border-radius: 0.175rem;
  padding: 3px;

  margin-top: 8px;
`;

const ButtonContainer = styled.div`
  margin: 3px;
`;

const PageNumber = styled.div`
  font-size: calc(
    ${(props) => props.theme.typography[props.size].fontSize} + 3px
  );
  margin: 3px 5px;
`;

//=======================================================================

const CheckboxLookup = (props) => {
  const {
    id,
    onChange,
    selectedOptions,
    onSelectDeselectAll,
    options,
    theme,
    size,
    color,
    style,
    disabled,
    itemId,
    itemText,
    className,
    title,
    localization,
    pagination,
    height,
    width,
    displayedItemsCount,
  } = props;

  let themeProps = { theme, size, color, height, width };

  const [page, setPage] = useState(1);

  const handleCheckboxChange = (_id, _value) => {
    let selectedItems = [...selectedOptions];

    if (_value) {
      selectedItems.push(
        options.filter((item) => {
          return item[itemId] === _id;
        })[0]
      );
    } else {
      selectedItems = selectedItems.filter((item) => {
        return item[itemId] !== _id;
      });
    }

    onChange(id, selectedItems);
  };

  const pageCount = Math.floor(options.length / displayedItemsCount) + 1;

  var label =
    options.length === selectedOptions.length
      ? localization.DeselectAll || "Deselect all"
      : localization.SelectAll || "Select all";

  let _options = pagination
    ? options.slice(
        (page - 1) * displayedItemsCount,
        page * displayedItemsCount
      )
    : options;

  return (
    <Container {...themeProps} className={className}>
      <Global
        styles={css`
          .item-enter {
            opacity: 0;
          }

          .item-enter-active {
            transition: all 0.4s ease-in;
            opacity: 1;
          }

          .item-exit {
          }

          .item-exit-active {
            opacity: 0;
            transition: opacity 400ms ease-out;
          }
        `}
      />

      <Table>
        <HeaderRow>
          <HeaderColumnCheck check={style === "regular"}>
            {style === "regular" ? (
              <CheckBox
                {...{
                  id: id,
                  disabled: false,
                  checked:
                    options.length > 0 &&
                    options.length === selectedOptions.length,
                  onChange: () =>
                    onSelectDeselectAll(
                      options.length > 0 &&
                        options.length === selectedOptions.length
                        ? false
                        : true
                    ),
                  color: color,
                  size: size,
                  theme: theme,
                  tooltip: label,
                }}
              />
            ) : (
              <ToggleSwitch
                {...{
                  id: id,
                  disabled: false,
                  checked: options.length === selectedOptions.length,
                  onChange: () =>
                    onSelectDeselectAll(
                      options.length === selectedOptions.length ? false : true
                    ),
                  color: color,
                  size: size,
                  theme: theme,
                  tooltip: label,
                }}
              />
            )}
          </HeaderColumnCheck>
          <HeaderColumnTitle {...themeProps}>{title}</HeaderColumnTitle>
        </HeaderRow>

        <Body {...themeProps}>
          <TransitionGroup component="div">
            {_options.map((x, i) => {
              let isChecked = false;

              if (selectedOptions) {
                selectedOptions.forEach((element) => {
                  if (element[itemId] === x[props.itemId]) {
                    isChecked = true;
                  }
                });
              }

              return (
                <CSSTransition key={i} timeout={350} classNames="item">
                  <Row
                    onClick={() => handleCheckboxChange(x[itemId], !isChecked)}
                  >
                    <ColumnCheck check={style === "regular"}>
                      {style === "regular" ? (
                        <CheckBox
                          {...{
                            id: x[itemId],
                            disabled: disabled,
                            checked: isChecked,
                            onChange: () => {},
                            color: color,
                            size: size,
                            theme: theme,
                          }}
                        />
                      ) : (
                        <ToggleSwitch
                          {...{
                            id: x[itemId],
                            disabled: disabled,
                            value: isChecked,
                            onChange: () => {},
                            color: color,
                            size: size,
                            theme: theme,
                          }}
                        />
                      )}
                    </ColumnCheck>
                    <ColumnTitle {...themeProps}>{x[itemText]}</ColumnTitle>
                  </Row>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </Body>
      </Table>

      {pagination && (
        <FooterRow>
          <ButtonContainer>
            <Button
              {...themeProps}
              icon="angle-double-left"
              onClick={() => setPage(1)}
              disabled={page === 1 || disabled}
            />
          </ButtonContainer>

          <ButtonContainer>
            <Button
              {...themeProps}
              icon="angle-left"
              onClick={() => setPage(page - 1)}
              disabled={page === 1 || disabled}
            />
          </ButtonContainer>

          <PageNumber {...themeProps}>{`${page}/${pageCount}`}</PageNumber>

          <ButtonContainer>
            <Button
              {...themeProps}
              icon="angle-right"
              onClick={() => setPage(page + 1)}
              disabled={page === pageCount || disabled}
            />
          </ButtonContainer>

          <ButtonContainer>
            <Button
              {...themeProps}
              icon="angle-double-right"
              onClick={() => setPage(pageCount)}
              disabled={page === pageCount || disabled}
            />
          </ButtonContainer>
        </FooterRow>
      )}
    </Container>
  );
};

CheckboxLookup.defaultProps = {
  theme: theme,
  id: "",
  title: "Title",
  pagination: true,
  disabled: false,
  onChange: () => {},
  onSelectDeselectAll: () => {},
  selectedOptions: [],
  options: [],
  className: "",
  preventDefault: true,
  size: "small",
  label: "",
  height: "",
  width: "",
  color: "primary",
  style: "regular",
  itemId: "id",
  itemText: "code",
  displayedItemsCount: 5,
  localization: {
    SelectAll: "Select all",
    DeselectAll: "Deselect all",
  },
};

CheckboxLookup.propTypes = {
  localization: PropTypes.object,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  selectedOptions: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSelectDeselectAll: PropTypes.func,
  className: PropTypes.string,
  itemId: PropTypes.string,
  itemText: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  preventDefault: PropTypes.bool,
  pagination: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  style: PropTypes.oneOf(["regular", "toggle"]),
  label: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
  displayedItemsCount: PropTypes.number,
};

export default CheckboxLookup;
