import React, { useEffect, useState } from "react";
import Button from "../Button/index";
import { getGuid, mergeCSS } from "../Helper/helper";
import Icon from "../Icon/index";
import TransparentTextInput from "../TransparentTextInput/index";
import DropdownContent from "./DropdownContent";
import Filter from "./Filter";
import styles from "./styles.module.css";

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

const SearchBar = (props) => {
  const [Filters, setFilters] = useState([]);
  const [QuickFilterText, setQuickFilterText] = useState("");
  const [QuickFilterOpen, setQuickFilterOpen] = useState("");

  //====== PROPS ======

  const { onChange } = props;
  const { filterProps } = props;
  const { Localization, Icons } = props;

  //====== LIFECYCLE ======

  const [cursor, setCursor] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hasFilters, setHasFilters] = useState(Filters.length > 0);
  const transparentTextInput = React.createRef();
  const filterContainer = React.createRef();

  const changed = useHasChanged(Filters);

  useEffect(() => {
    transparentTextInput.current.focus();
    setMounted(true);
  }, []);

  useEffect(() => {
    filterContainer.current.scrollLeft += 1000;
  }, [Filters]);

  useEffect(() => {
    if (changed && mounted) {
      if (onChange) onChange(getAppliedFilters());
      setHasFilters(Filters.length > 0);
    }

    transparentTextInput.current.focus();

    onChange(getAppliedFilters());
  }, [Filters]);

  //====== EVENTS ======

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
    transparentTextInput.current.classList.add("lnc");
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

  //====== METHODS ======

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

  //====== RENDER ======

  const renderClearFiltersButton = () => {
    return (
      <div className={hasFilters ? styles.visibleX : styles.hidden}>
        <Button
          icon={"times"}
          onClick={onClearFilters}
          tooltip={Localization ? Localization.Clear : "Clear"}
        />
      </div>
    );
  };

  const renderResetFiltersButton = () => {
    return (
      <Button
        icon={"sync-alt"}
        onClick={onResetFilters}
        tooltip={Localization ? Localization.Reset : "Reset"}
      />
    );
  };

  const renderFilters = () => {
    return Filters.map((x, i) => (
      <Filter
        key={i}
        id={x.id}
        data={x}
        onRemove={onRemoveFilter}
        onToggleState={onToggleState}
        Icons={Icons}
      />
    ));
  };

  const renderSearchInput = () => {
    let dropdownContentCss =
      QuickFilterOpen === true
        ? mergeCSS([styles.dropdownContent, styles.showDropdown])
        : styles.dropdownContent;

    let quickFilters = filterProps.filter((x) => x.showInQuickFilters === true);

    return (
      <div className={styles.dropdown}>
        <div className={styles.Search}>
          <TransparentTextInput
            value={QuickFilterText}
            onKeyDown={onKeyDown}
            onInput={onQuickFilterInput}
            onBlur={onQuickFilterBlur}
            inputClassName={styles.QuickFilterInput}
            ref={transparentTextInput}
          />
        </div>
        <div className={dropdownContentCss}>
          <DropdownContent
            items={quickFilters}
            onSelect={onQuickFilterSelect}
            value={QuickFilterText}
            cursor={cursor}
          />
        </div>
      </div>
    );
  };

  const renderComponent = () => {
    return (
      <div className={mergeCSS([styles.Container, styles.Border])}>
        <div className={styles.inputAndCommandsContainer}>
          <span className={styles.iconHolder}>
            <Icon icon={"search"} iconSpanCssClass={styles.iconSpan}></Icon>
          </span>
          <span
            ref={filterContainer}
            className={
              hasFilters ? styles.filterContainer : styles.filterContainerHidden
            }
          >
            {renderFilters()}
          </span>
          <div className={styles.filtersAndCommandsHolder}>
            {renderSearchInput()}
            {renderClearFiltersButton()}
            <span className={styles.Commands}>
              {renderResetFiltersButton()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderElement = () => {
    return renderComponent();
  };

  return renderElement();
};

export default SearchBar;
