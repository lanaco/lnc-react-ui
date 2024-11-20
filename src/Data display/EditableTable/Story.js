import React, { useState, useEffect, useRef } from "react";
import EditableTable from ".";
import styled from "@emotion/styled";
import TableSpecialLastRow from "./components/TableSpecialLastRow";
import Button from "../../General/Button/index";
import cloneDeep from "lodash.clonedeep";
import isEmpty from "lodash.isempty";
import isEqual from "lodash.isequal";
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
  padding: 10px 10px 0 10px;
  display: flex;
`;

//============================================

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

  //========== LIFECYCLE =================================

  useEffect(() => setLoading(props.args.Loading), [props.args.Loading]);

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
      itemToUpdate["status"] = column.selectItems.find(
        (x) => x.id === parseInt(value)
      ).name;
      //
    } else if (column.objectAccessor) {
      itemToUpdate[column.accessor][column.objectAccessor] = value;
    } else {
      itemToUpdate[column.accessor] = value;
    }

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
    var original = db_invoices[rowIndex] || props.args.EmptyDataItem;
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
        : props.args.EmptyDataItem;
    }

    setData(dataCopy);
  };

  const onCreateNewItem = (timeout) => {
    if (timeout > 0) setLoading(true);
    setData([...data, props.args.EmptyDataItem]);

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
        <Button
          btnType="tinted"
          leadingIcon="rotate"
          text={"Reload"}
          onClick={loadData}
        />
      </Commands>
      <EditableTable
        ref={tableRef}
        {...props.args}
        Data={data}
        Loading={loading}
        //--------------------------
        onCellFocusChange={() => {}}
        //--------------------------
        //--------------------------
        onRowFocusChange={(e, rowIndex, nextRow) => {
          if (rowIndex !== nextRow) {
            onSave(rowIndex);
          }
        }}
        //--------------------------
        onDiscard={onDiscard}
        //--------------------------
        onInputChange={onFieldChanged}
        //--------------------------
      >
        <TableSpecialLastRow Loading={loading} onClick={onSpecialRowClick} />
      </EditableTable>
    </Container>
  );
};

export default StoryTemplate;
