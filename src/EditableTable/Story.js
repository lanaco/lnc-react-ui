import React, { useState, useEffect, useRef } from "react";
import EditableTable from ".";
import styled from "@emotion/styled";
import service from "../AdvancedGrid/services/service";
import CustomInput from "./components/CustomInput";
import CustomSelectList from "./components/CustomSelectList";
import CustomCheckbox from "./components/CustomCheckbox";
import CustomDatePicker from "./components/CustomDatePicker";
import { inputType } from "./constants/constants";
import TextInput from "../TextInput/index";
import TableSpecialLastRow from "./components/TableSpecialLastRow";
import Button from "../Button/index";
import { cloneDeep, isEmpty, isEqual } from "lodash";
import { useStateWithCallbackLazy } from "use-state-with-callback";

const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

const Container = styled.div``;

const Commands = styled.div`
  margin: 2px;
  padding: 8px 0;
  display: flex;
  gap: 8px;
`;

//============================================

const customTextInput = React.forwardRef((props, ref) => {
  return <CustomInput {...props} ref={ref} />;
});

const customSelectList = React.forwardRef((props, ref) => {
  return <CustomSelectList {...props} ref={ref} />;
});

const customRenderSelectedValue = React.forwardRef((props, ref) => {
  var style = {};

  if (props.rowData.status_id === 1) {
    style = {
      padding: "3px 5px",
      borderRadius: "3px",
      backgroundColor: "#8bf7a9",
      fontWeight: "bold",
    };
  }

  if (props.rowData.status_id === 2) {
    style = {
      padding: "3px 5px",
      borderRadius: "3px",
      backgroundColor: "salmon",
      fontWeight: "bold",
    };
  }

  return <span style={style}>{props.rowData.status}</span>;
});

const customCheckbox = React.forwardRef((props, ref) => {
  return (
    <CustomCheckbox
      {...props}
      onChange={(e, value, id) => props.onChange(e, value, id)}
      checked={props.value}
      ref={ref}
    />
  );
});

const customRenderCheckbox = React.forwardRef((props, ref) => {
  return (
    <CustomCheckbox
      {...props}
      onChange={() => {}}
      tabIndex={-1}
      checked={props.value}
      ref={ref}
    />
  );
});

var db_invoices = [
  {
    id: "db235f2c-2023-47fa-9932-99e25832d90f",
    company_iban: "HR75 3509 8698 7394 1416 4",
    company_name: "Feedfire",
    amount: 8187.46,
    date: "22.01.2022",
    status: "Approved",
    status_id: 1,
    processed: true,
  },
  {
    id: "67792659-ae00-46a2-9742-49f41d61997b",
    company_iban: "SM97 K032 2583 391A UIAY MGMS QTM",
    company_name: "Yodoo",
    amount: 2617.95,
    date: "10.05.2021",
    status: "Rejected",
    status_id: 2,
    processed: false,
  },
  {
    id: "7a4ce6b3-36a4-470f-8e93-7a5a1791968f",
    company_iban: "VG18 UGXB 1371 0224 8507 7471",
    company_name: "Twimbo",
    amount: 8962.72,
    date: "31.07.2021",
    status: "Approved",
    status_id: 1,
    processed: false,
  },
  {
    id: "c804cd2d-d92d-4324-8c37-a6664b4838cc",
    company_iban: "NO09 5446 4416 582",
    company_name: "Lago",
    amount: 5219.39,
    date: "25.12.2021",
    status: "Rejected",
    status_id: 2,
    processed: true,
  },
  {
    id: "8069a146-384c-41b2-b016-6b9a2f5c92db",
    company_iban: "ME06 7363 2360 5431 5228 85",
    company_name: "Lazzy",
    amount: 3856.21,
    date: "31.07.2022",
    status: "Approved",
    status_id: 1,
    processed: true,
  },
];

//============================================

const StoryTemplate = (props) => {
  //========== STATE =====================================

  const [loading, setLoading] = useStateWithCallbackLazy(false);
  const [data, setData] = useState([]);

  var tableRef = useRef();

  const config = {
    Columns: [
      {
        id: 1,
        displayName: "Iban",
        accessor: "company_iban",
        width: 30,
        sortable: true,
        editable: true,
        inputType: inputType.STRING,
        editComponent: customTextInput,
      },
      {
        id: 2,
        displayName: "Name",
        accessor: "company_name",
        width: 20,
        editable: true,
        inputType: inputType.STRING,
        editComponent: customTextInput,
      },
      {
        id: 3,
        displayName: "Amount ($)",
        accessor: "amount",
        editable: true,
        width: 17,
        inputType: inputType.STRING,
        editComponent: customTextInput,
      },
      {
        id: 4,
        displayName: "Date",
        accessor: "date",
        width: 13,
        editable: true,
        inputType: inputType.STRING,
        editComponent: customTextInput,
      },
      {
        id: 5,
        displayName: "Processed",
        accessor: "processed",
        width: 10,
        editable: true,
        inputType: inputType.BOOLEAN,
        editComponent: customCheckbox,
        readonlyComponent: customRenderCheckbox,
      },
      {
        id: 6,
        displayName: "Status",
        accessor: "status_id",
        width: 10,
        editable: true,
        inputType: inputType.SELECT,
        editComponent: customSelectList,
        readonlyComponent: customRenderSelectedValue,
        selectItems: [
          { id: 1, name: "Approved" },
          { id: 2, name: "Rejected" },
        ],
        selectProps: {
          mapNameTo: "name",
          mapValueTo: "id",
        },
      },
    ],
    //--------------------
    EmptyDataItem: {
      id: "",
      company_iban: "",
      company_name: "",
      amount: 0.0,
      date: "09.03.2022",
      status: "Approved",
      status_id: 1,
      processed: false,
    },
    //--------------------
    SelectedData: [{ id: "7a4ce6b3-36a4-470f-8e93-7a5a1791968f" }],
    Ordering: {
      columnId: 1,
      ascending: false,
      descending: true,
    },
    //--------------------
    EnableSelection: true,
    EnableOrdering: true,
    EnableSelectAll: true,
    EnableLoader: true,
  };

  //========== LIFECYCLE =================================

  useEffect(() => loadData(), []);

  //========== METHODS ===================================

  const loadData = () => {
    setLoading(true);

    setTimeout(() => {
      setData(db_invoices);
      setLoading(false);
    }, 1200);
  };

  const commitData = () => {
    var dataCopy = cloneDeep(data);

    dataCopy.forEach((item) => {
      if (isEmpty(item.id)) {
        item.id = uuidv4();
      }
    });

    db_invoices = dataCopy;

    loadData();
  };

  //========== EVENTS ====================================

  const onFieldChanged = (e, value, rowIndex, cellIndex, column, rowData) => {
    var dataCopy = cloneDeep(data);
    var itemToUpdate = isEmpty(rowData.id)
      ? dataCopy[rowIndex]
      : dataCopy.find((x) => x.id === rowData.id);

    if (column.accessor === "status_id") {
      //
      itemToUpdate[column.accessor] = parseInt(value);
      console.log(itemToUpdate, column);
      itemToUpdate["status"] = column.selectItems.find(
        (x) => x.id === parseInt(value)
      ).name;
      //
    } else itemToUpdate[column.accessor] = value;

    setData(dataCopy);
  };

  const validateEdit = (rowData) => {
    return true;
  };

  const validateAdd = (rowData) => {
    return true;
  };

  const showDialog = (rowIndex, edited) => {
    if (
      confirm(
        "There are validation errors. Do you want to discard the edited data ?"
      )
    ) {
      //--
      onDiscard(null, rowIndex, -1, edited);
      setLoading(false);
      //--
    } else if (tableRef.current) {
      setLoading(false, () => {
        tableRef.current.focusLastActiveCell();
      });
    }
  };

  const onSave = (rowIndex) => {
    var original = db_invoices[rowIndex] || config.EmptyDataItem;
    var edited = data[rowIndex];

    if (!isEqual(original, edited) || isEmpty(edited.id)) {
      setLoading(true);

      setTimeout(() => {
        if (isEmpty(data[rowIndex].id) && !validateAdd(edited)) {
          showDialog(rowIndex, edited);
          return;
        }

        if (!isEmpty(data[rowIndex].id) && !validateEdit(edited)) {
          showDialog(rowIndex, edited);
          return;
        }

        commitData();
        setLoading(false);
      }, 800);
    }
  };

  const onDiscard = (e, rowIndex, cellIndex, rowData) => {
    var dataCopy = cloneDeep(data);

    var originalItem = db_invoices.find((x) => x.id === rowData.id);
    var itemToUpdate = dataCopy.find((x) => x.id === rowData.id);

    if (isEmpty(rowData.id)) {
      dataCopy.splice(rowIndex, 1);
    } else {
      dataCopy[dataCopy.indexOf(itemToUpdate)] = originalItem
        ? originalItem
        : config.EmptyDataItem;
    }

    setData(dataCopy);
  };

  const onCreateNewItem = (timeout) => {
    if (timeout > 0) setLoading(true);
    setData([...data, config.EmptyDataItem]);

    setTimeout(() => {
      if (timeout > 0) setLoading(false);
    }, timeout);
  };

  const onSpecialRowClick = (isEnter) => {
    onCreateNewItem(isEnter ? 300 : 0);

    setTimeout(() => {
      tableRef.current.focusFirstCellOfLastRow();
    }, 300);
  };

  //========== RENDER ====================================

  return (
    <Container>
      <Commands>
        <Button text={"Reload"} onClick={loadData} />
      </Commands>
      <EditableTable
        ref={tableRef}
        {...props.args}
        {...config}
        Data={data}
        Loading={loading}
        //--------------------------
        onCellFocusChange={() => {}}
        //--------------------------
        onCreateNewItem={(timeout) => {
          onCreateNewItem(timeout);
        }}
        //--------------------------
        onRowFocusChange={(e, rowIndex, nextRow) => {
          if (rowIndex !== nextRow) {
            console.log(rowIndex, nextRow);
            onSave(rowIndex);
          }
        }}
        //--------------------------
        onDiscard={(e, rowIndex, cellIndex, rowData) => {
          onDiscard(e, rowIndex, cellIndex, rowData);
        }}
        //--------------------------
        onInputChange={(e, value, rowIndex, cellIndex, column, rowData) => {
          onFieldChanged(e, value, rowIndex, cellIndex, column, rowData);
        }}
        //--------------------------
      >
        <TableSpecialLastRow onClick={onSpecialRowClick} />
      </EditableTable>
    </Container>
  );
};

export default StoryTemplate;
