import React, { useEffect } from "react";
import TableSelectionType from "../DataView/Constants/TableSelectionType";
import * as css from "./style.module.css";
//-----------------------------------------------------------------------------------
// import Filtering from "./Filtering";
import ComponentBox from "_ui/components/Modals/ComponentBox";
import Button from "_ui/components/Button/Button";
import Grid from "_ui/components/Grid/Grid";
//-----------------------------------------------------------------------------------

const GridLookup = (props) => {
  const {
    Columns = [],
    Data = [],
    Pagination = {},
    OnChange = () => {},
    Load = () => {},
    SelectedData = {},
    Localization = {},
    EnableReset = true,
    Reset = () => {},
    SelectionType = "single",
    Developer = false,
  } = props;

  const {
    label,
    required,
    open = false,
    openLookup = () => {},
    closeLookup = () => {},
  } = props;

  var state = {
    General: {
      IsLookup: true, // Stamp specific
      DataFromBackend: true,
      MapData: {},
      Redirect: false,
      CurrentView: "TableView",
    },
    Options: {
      EnableFormViewMovement: false,
      EnableActions: false,
      EnablePagination: true,
      EnableSelection: true,
      EnableDelete: false,
      EnableEdit: false,
      EnableAdd: false,
      EnableExports: false, // Later...
      EnableFilters: false, // Stamp specific
      EnableOrdering: true,
      EnableSwitchReadOnlyMode: false,
      ReadOnly: false,
    },
    // Filtering: {
    //   Filters: [], // Stamp specific
    //   FilterProps: [], // Stamp specific
    // },
    Ordering: {
      DefaultAccessor: "id",
    },
    Pagination: {
      PageSizes: [3, 10, 20, 30, 40, 50],
      PageSize: 3,
      CurrentPage: 1,
    },
    Table: {
      SelectionIndicator: "id",
      SelectionType: SelectionType,
      Actions: [],
    },
  };

  //=====================================

  useEffect(() => {
    Load();
  }, []);

  //==================================================

  const handleDialogOpen = () => {
    openLookup();
  };

  const handleDialogClose = () => {
    closeLookup();
  };

  const handleOnChange = (data) => {
    closeLookup();
    OnChange(data);
  };

  //==================================================

  const renderValue = () => {
    if (SelectionType === TableSelectionType.SINGLE)
      return <>{SelectedData.Value} &nbsp;</>;

    return null;
  };

  const renderReset = () => {
    if (EnableReset) {
      return (
        <span className={css.clearInputSpan}>
          <Button icon="times" onClick={() => Reset(props.id)}></Button>
        </span>
      );
    }

    return <></>;
  };

  const getInputClass = () => {
    return SelectionType === TableSelectionType.SINGLE
      ? css.inputWithIconButton
      : css.inputWithIconButtonMultiple;
  };

  //==================================================

  return (
    <div
      className={
        props.useSideLabel ? css.containerWithSideLabel : css.container
      }
    >
      <label className={css.label}>
        {label}
        {required ? "*" : ""}
        &nbsp;
      </label>
      <div className={getInputClass()}>
        <span onClick={handleDialogOpen} className={css.value}>
          {renderValue()}
        </span>
        <div className={css.innerDivWithIcons}>
          <Button icon="search" onClick={handleDialogOpen} />
          &nbsp; &nbsp;
          {renderReset()}
        </div>
      </div>
      <div className={css.errorText}>{props.errorText}</div>
      <ComponentBox
        basic={true}
        id={props.id}
        open={open}
        size="medium"
        title={label}
        closeComponentBox={handleDialogClose}
        closeModalOnOutsideClick={handleDialogClose}
      >
        <div className={css.coponentBoxContent}>
          <Grid
            Developer={Developer}
            Config={state}
            Columns={Columns}
            Data={Data}
            Pagination={Pagination}
            Load={Load}
            Localization={Localization}
            //---------------------
            OnChange={handleOnChange}
            SelectedData={SelectedData}
          />
        </div>
      </ComponentBox>
    </div>
  );
};

//------------------------------------------------------------------------------------

export default GridLookup;
