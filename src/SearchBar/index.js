import styled from "@emotion/styled";
import React, { useEffect, useState, useRef } from "react";
import Button from "../Button";
import Bubble from "../Bubble";
import { getGuid } from "../Helper/helper";

const paddingBySize = (size) => {
  if (size === "small") return "0.3rem 0.375rem";
  if (size === "medium") return "0.3625rem 0.375rem";
  if (size === "large") return "0.4rem 0.375rem";
};

const heightBySize = (size, hasText) => {
  if (size === "small") return `1.625rem`;
  if (size === "medium") return `2rem`;
  if (size === "large") return `2.375rem`;
};

const Icon = styled.i((props) => ({
  fontSize: props.theme.typography[props.size].fontSize,
}));

const FilterTextInput = styled.input((props) => {
  return {
    appearance: "none",
    outline: "none",
    border: "none",
    borderBottom: `0.125rem solid ${props.theme.palette[props.color].main}`,
    transition: "all 250ms",
    display: "inline-block",
    flexDirection: "row",
    justifyContent: "center",
    cursor: "text",
    padding: paddingBySize(props.size),
    fontSize: props.theme.typography[props.size].fontSize,
    backgroundColor: props.theme.palette[props.color].lighter,
    color: props.theme.palette[props.color].textDark,
    borderRadius: "0.125rem",
    width: "100%",
    boxSizing: "border-box",
    minHeight: heightBySize(props.size),
    maxHeight: heightBySize(props.size),
    fontFamily: props.theme.typography.fontFamily,
    "&:disabled": {
      backgroundColor: props.theme.palette.gray[200],
      borderBottom: `0.125rem solid ${props.theme.palette.gray[900]}`,
      color: props.theme.palette.gray.textLight,
      opacity: 0.7,
      cursor: "default",
    },
    "&:focus": {
      backgroundColor: props.theme.palette.common.white,
      color: props.theme.palette.common.black,
    },
  };
});

const Filter = (props) => {
  const { onToggleState, onRemove } = props;
  const { id } = props;
  const { Icons } = props;

  const toggleState = () => {
    onToggleState(id);
  };

  const remove = () => {
    onRemove(id);
  };

  const getIsAppliedCss = () => {
    return props.data.isApplied === true ? styles.bgActive : styles.bgNonActive;
  };

  const getIsAppliedColumnNameCss = () => {
    return props.data.isApplied === true ? "" : styles.bgColumnNameNonActive;
  };

  const getPopoverContent = (item) => {
    item = props.data;
    let content = "";

    item.statements.forEach((element) => {
      content +=
        element.name +
        " " +
        element.operationType.name.toLowerCase() +
        ' "' +
        element.value +
        '"\n';
    });

    return content;
  };

  let columnName = props.data.statements[0].name;
  let columnValue = props.data.statements[0].value;
  if (columnName.length > 14) {
    columnName = columnName.substring(0, 13) + ".";
  }
  if (columnValue.length > 14) {
    columnValue = columnValue.substring(0, 13) + ".";
  }

  return (
    <div
      style={
        props.data.isApplied
          ? {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "center",
              borderRadius: "15px",
              fontSize: props.theme.typography.fontSize,
              minWidth: "150px",
              width: "auto",
              backgroundColor: props.theme.palette[props.color].main,
              color: props.theme.palette["white"].textDark,
              paddingLeft: "5px",
              paddingRight: "10px",
              marginRight: "5px",
            }
          : {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "center",
              borderRadius: "15px",
              fontSize: props.theme.typography.fontSize,
              minWidth: "150px",
              width: "500px",
              backgroundColor: props.theme.palette["gray"]["700"],
              color: props.theme.palette["white"].textDark,
              paddingLeft: "5px",
              paddingRight: "10px",
              marginRight: "5px",
            }
      }
    >
      <div
        style={{
          width: "90%",
          whiteSpace: "nowrap",
          display: "flex",
          justifyContent: "space-around",
        }}
        title={getPopoverContent()}
        onClick={toggleState}
      >
        {columnName} &nbsp;
        <b>{columnValue}</b>
      </div>
      <Button
        icon={"times"}
        onClick={remove}
        size="small"
        color="transparent"
      />
    </div>
  );
};

const DropdownContent = (props) => {
  //====== PROPS ======

  const { onSelect, items, value, cursor } = props;

  //====== LIFECYCLE ======

  //====== EVENTS ======

  //====== METHODS ======

  //====== RENDER ======

  return (
    <div
      style={{
        padding: "5px",
      }}
    >
      {items.map((el, i) => {
        return (
          <a
            style={{
              textDecoration: "none",
              "&:hover": {
                backgroundColor: props.theme.palette[props.color].light,
              },
            }}
            key={i}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelect(el)(value);
            }}
          >
            {`${el.name} : "${value}"`}
          </a>
        );
      })}
    </div>
  );
};

const ScrollContainer = styled.div`
  width: 200px;
  padding: 4px;
  border: 2px solid gray;
  display: flex;
  overflow: auto;
  scrollbarwidth: none;

  &::-webkit-scrollbar {
    background: white;
    height: 0;
    width: 0;
  }
`;

function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}

const SearchBar = (props) => {
  const scrollRef = useHorizontalScroll();

  const useHasChanged = (val) => {
    const prevVal = usePrevious(val);
    return prevVal !== JSON.stringify(val);
  };

  const usePrevious = (value) => {
    const ref = React.useRef();
    useEffect(() => {
      ref.current = JSON.stringify(value);
    });
    return ref.current;
  };

  const [Filters, setFilters] = useState([]);
  const [QuickFilterText, setQuickFilterText] = useState("");
  const [QuickFilterOpen, setQuickFilterOpen] = useState("");

  //====== PROPS ======

  const { onChange, filterProps, Localization, Icons } = props;

  //====== LIFECYCLE ======

  const [cursor, setCursor] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hasFilters, setHasFilters] = useState(Filters.length > 0);
  const transparentTextInput = React.createRef();
  const filterContainer = React.createRef();

  const changed = useHasChanged(Filters);

  useEffect(() => {
    //transparentTextInput.current.focus();
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   filterContainer.current.scrollLeft += 1000;
  // }, [Filters]);

  useEffect(() => {
    if (changed && mounted) {
      if (onChange) onChange(getAppliedFilters());
      setHasFilters(Filters.length > 0);
    }

    //transparentTextInput.current.focus();

    onChange(getAppliedFilters());
  }, [Filters]);

  const renderFilters = () => {
    if (hasFilters)
      return Filters.map((x, i) => (
        <Filter
          {...props}
          key={i}
          id={x.id}
          data={x}
          onRemove={onRemoveFilter}
          onToggleState={onToggleState}
          Icons={Icons}
          theme={props.theme}
        />
      ));
    return;
  };

  const renderClearFiltersButton = () => {
    if (hasFilters)
      return (
        <Button
          theme={props.theme}
          color={"transparent"}
          size={props.size}
          iconStyle="solid"
          icon={"times"}
          onClick={onClearFilters}
          tooltip={Localization ? Localization.Clear : "Clear"}
        />
      );
  };

  const renderResetFiltersButton = () => {
    return (
      <Button
        theme={props.theme}
        color={"transparent"}
        size={props.size}
        iconStyle="solid"
        icon={"sync-alt"}
        onClick={onResetFilters}
        tooltip={Localization ? Localization.Reset : "Reset"}
      />
    );
  };

  const onClearFilters = () => {
    setFilters([]);
  };

  const onResetFilters = () => {
    var newFilters = Filters.map((x) => {
      x.isApplied = false;
      return x;
    });
    setFilters(newFilters);
  };

  const onRemoveFilter = (id) => {
    var newFilters = Filters.filter((x) => x.id !== id);

    setFilters(newFilters);
  };

  const onToggleState = (id) => {
    var newFilters = [...Filters];
    let item = newFilters.filter((x) => x.id === id)[0];
    item.isApplied = !item.isApplied;
    setFilters(newFilters);
  };

  const changeQuickFilterText = (text) => {
    setQuickFilterText(text);
  };

  const onChangeHandler = (id, value) => {
    console.log("cejndz:", value);
    setQuickFilterText(value);
    onChange(id, value);
  };

  const onKeyDown = (e) => {
    let quickFilters = filterProps.filter((x) => x.showInQuickFilters === true);
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);
    }

    if (e.keyCode === 40 && cursor < quickFilters.length - 1) {
      setCursor(cursor + 1);
    }

    if (e.key === "Enter") {
      onQuickFilterSelect(quickFilters[cursor])(QuickFilterText);
      setQuickFilterOpen(false);
    }

    if (e.key === "Backspace" && Filters.length > 0 && QuickFilterText === "") {
      onRemoveFilter(Filters[Filters.length - 1].id);
      setQuickFilterOpen(false);
    }
  };

  const onQuickFilterSelect = (element) => {
    // transparentTextInput.current.classList.add("lnc");
    return (value) => {
      let data = {
        id: getGuid(),
        propID: element.value,
        propertyName: element.propName,
        name: element.name,
        firstLevel: element.firstLevel ? element.firstLevel : "",
        secondLevel: element.secondLevel ? element.secondLevel : "",
        operationType: element.quickFiltersOperationType,
        operationTypes: element.operationTypes,
        dataType: element.dataType,
        value: value,
        localizedOperationType: element.quickFiltersOperationType.name,
      };

      setCursor(0);

      var newFilters = [...Filters];
      newFilters.push({
        statements: [data],
        name: QuickFilterText,
        id: getGuid(),
        isApplied: true,
      });
      setFilters(newFilters);
      setHasFilters(newFilters.length > 0);

      changeQuickFilterText("");
    };
  };

  const onQuickFilterInput = (e) => {
    if (e.target.value.length > 0) {
      e.target.classList.remove("lnc");
    } else {
      e.target.classList.add("lnc");
    }
    setQuickFilterOpen(true);
    changeQuickFilterText(e.target.value);
  };

  const onQuickFilterBlur = (e) => {
    setTimeout(() => {
      setCursor(0);
      if (QuickFilterOpen === true) setQuickFilterOpen(false);
    }, 250);
  };

  const getAppliedFilters = () => {
    let dynamicFilters = [];

    let appliedFilters = Filters.map((f) => {
      if (f.isApplied === true) {
        return f.statements.map((s) => {
          return {
            PropertyName: s.propertyName,
            FirstLevel: s.firstLevel,
            SecondLevel: s.secondLevel,
            OperationType: s.operationType.value,
            DataType: s.dataType.name,
            Value: s.value,
          };
        });
      } else {
        return null;
      }
    });

    appliedFilters.forEach((el) => {
      if (el !== null) dynamicFilters.push(el);
    });

    return dynamicFilters;
  };

  let quickFilters = filterProps.filter((x) => x.showInQuickFilters === true);

  return (
    <ScrollContainer ref={scrollRef}>
      <Bubble text="text" />
      <Bubble text="text" />
      <Bubble text="text" />
      <Bubble text="text" />
      <Bubble text="text" />
      <Bubble text="text" />
      <Bubble text="text" />
      <Bubble text="text" />
      <Bubble text="text" />
      <Bubble text="text" />
      <Bubble text="text" />
      <Bubble text="text" />
    </ScrollContainer>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          fontFamily: props.theme.typography.fontFamily,
          outline: "none",
          backgroundColor: props.theme.palette[props.color].lighter,
          color: props.theme.palette[props.color].textDark,
          transition: "all 250ms",
          fontSize: props.theme.typography[props.size].fontSize,
          border: "0px",
          borderBottom: `0.125rem solid ${
            props.theme.palette[props.color].main
          }`,
          //padding: paddingBySize(props.size),
          //width: "100%",
          boxSizing: "border-box",
          minHeight: heightBySize(props.size),
          maxHeight: heightBySize(props.size),
          cursor: "pointer",
          "&:focus": {
            backgroundColor: props.theme.palette.common.white,
            color: props.theme.palette.common.black,
          },
          "&:disabled": {
            backgroundColor: props.theme.palette.gray[200],
            borderBottom: `0.125rem solid ${props.theme.palette.gray[900]}`,
            color: props.theme.palette.gray.textLight,
            cursor: "default",
            opacity: 0.7,
          },
        }}
      >
        <Icon
          {...props}
          className={`fas fa-search fa-fw`}
          style={{
            color: props.theme.palette[props.color].main,
            margin: "7px",
          }}
        />
        <div
          ref={filterContainer}
          style={{
            display: "flex",
            overflowX: "auto",
            justifyContent: "flex-start",
            // overflowY: "hidden",
            overflowY: "hidden",
          }}
        >
          {renderFilters()}
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            minWidth: "20% !important",
          }}
        >
          <FilterTextInput
            // ref={transparentTextInput}
            {...props}
            value={QuickFilterText}
            onKeyDown={onKeyDown}
            onInput={onQuickFilterInput}
            onBlur={onQuickFilterBlur}
            //onChange={onChangeHandler}
          ></FilterTextInput>
          {renderClearFiltersButton()}
          {renderResetFiltersButton()}
        </div>
      </div>
      <div
        style={
          QuickFilterOpen
            ? {
                display: "block",
                position: "fixed",
                boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
                marginTop: "5px",
                zIndex: "99",
              }
            : { display: "none" }
        }
      >
        <DropdownContent
          {...props}
          items={quickFilters}
          onSelect={onQuickFilterSelect}
          value={QuickFilterText}
          cursor={cursor}
        ></DropdownContent>
      </div>
    </>
  );
};

// SearchBar.defaultProps = {
//   id: "",
//   disabled: false,
//   tooltip: "",
//   onChange: () => {},
//   className: "",
//   preventDefault: true,
//   size: "small",
//   color: "primary",
//   theme: theme,
//   items: [],
//   withoutEmpty: false,
//   mapValueTo: "value",
//   mapNameTo: "name",
// };

// SearchBar.propTypes = {
//   theme: PropTypes.object.isRequired,
//   id: PropTypes.string,
//   disabled: PropTypes.bool,
//   tooltip: PropTypes.string,
//   onChange: PropTypes.func,
//   className: PropTypes.string,
//   preventDefault: PropTypes.bool,
//   withoutEmpty: PropTypes.bool,
//   mapValueTo: PropTypes.string,
//   mapNameTo: PropTypes.string,
//   size: PropTypes.oneOf(["small", "medium", "large"]),
//   color: PropTypes.oneOf([
//     "primary",
//     "secondary",
//     "success",
//     "error",
//     "warning",
//     "gray",
//   ]),
// };

export default SearchBar;
