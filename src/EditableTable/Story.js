import React, { useState, useEffect, useRef } from "react";
import EditableTable from ".";
import styled from "@emotion/styled";
import service from "../AdvancedGrid/services/service";
import CustomInput from "./components/CustomInput";
import CustomSelectList from "./components/CustomSelectList";
import CustomCheckbox from "./components/CustomCheckbox";
import { inputType } from "./constants/constants";
import TextInput from "../TextInput/index";
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

  if (props.value === "active") {
    style = {
      padding: "3px",
      borderRadius: "3px",
      backgroundColor: "#8bf7a9",
      fontWeight: "bold",
    };
  }

  if (props.value === "inactive") {
    style = {
      padding: "3px",
      borderRadius: "3px",
      backgroundColor: "#e6e6e6",
    };
  }

  return <span style={style}>{props.value}</span>;
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

var statusList = [
  {
    name: "active",
    value: "active",
  },
  {
    name: "inactive",
    value: "inactive",
  },
];

var db = [
  {
    id: "61f7b8ea2fe061cacbcdbfea",
    isBlocked: true,
    balance: 1476.66,
    // age: 21,
    name: "Katie Wilson",
    // gender: "female",
    company: "QUAREX",
    // email: "katiewilson@quarex.com",
    // phone: "(807) 443-2274",
    address: "125 Oceanview Avenue, Moquino, Mississippi, 418",
    status: "active",
    statusList: statusList,
  },
  {
    id: "61f7b8ea63d0fc830f326350",
    isBlocked: false,
    balance: 3239.46,
    // age: 32,
    name: "Delgado Lott",
    // gender: "male",
    company: "XYMONK",
    // email: "delgadolott@xymonk.com",
    // phone: "(973) 427-2565",
    address: "402 Vernon Avenue, Draper, Florida, 6921",
    status: "inactive",
    statusList: statusList,
  },
  {
    id: "61f7b8eaf418ca604fcdffba",
    isBlocked: false,
    balance: 3804.94,
    // age: 21,
    name: "Frankie Jacobson",
    // gender: "female",
    company: "QUALITEX",
    // email: "frankiejacobson@qualitex.com",
    // phone: "(825) 404-3871",
    address: "980 Rodney Street, Kansas, Marshall Islands, 6171",
    status: "inactive",
    statusList: statusList,
  },
  {
    id: "61f7b8ea066dfb5760224b71",
    isBlocked: true,
    balance: 3731.79,
    // age: 29,
    name: "Lynch Sims",
    // gender: "male",
    company: "EARTHPURE",
    // email: "lynchsims@earthpure.com",
    // phone: "(979) 489-3188",
    address: "620 Riverdale Avenue, Greenbush, New Mexico, 9605",
    status: "active",
    statusList: statusList,
  },
  {
    id: "61f7b8eadd6586c40491b91e",
    isBlocked: true,
    balance: 2116.41,
    // age: 30,
    name: "Black William",
    // gender: "male",
    company: "RODEOMAD",
    // email: "blackwilliam@rodeomad.com",
    // phone: "(818) 583-2805",
    address: "125 Kathleen Court, Bergoo, Michigan, 1206",
    status: "active",
    statusList: statusList,
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
        displayName: "Name",
        accessor: "name",
        width: 20,
        editable: true,
        inputType: inputType.STRING,
        component: customTextInput,
      },
      {
        id: 2,
        displayName: "Company",
        accessor: "company",
        width: 15,
        editable: false,
      },
      {
        id: 3,
        displayName: "Address",
        accessor: "address",
        editable: true,
        width: 30,
        inputType: inputType.STRING,
        component: customTextInput,
      },
      {
        id: 4,
        displayName: "Balance ($)",
        accessor: "balance",
        width: 10,
        editable: false,
      },
      {
        id: 5,
        displayName: "Status",
        accessor: "status",
        width: 15,
        editable: true,
        inputType: inputType.SELECT,
        component: customSelectList,
        render: customRenderSelectedValue,
        selectProps: {
          itemsFieldAccessor: "statusList",
          mapNameTo: "name",
          mapValueTo: "value",
        },
      },
      {
        id: 6,
        displayName: "Blocked",
        accessor: "isBlocked",
        width: 10,
        editable: true,
        inputType: inputType.BOOLEAN,
        component: customCheckbox,
        render: customRenderCheckbox,
      },
    ],
    //--------------------
    EmptyDataItem: {
      id: "",
      name: "",
      isBlocked: false,
      company: "",
      address: "",
      balance: "$0.00",
      status: "active",
      statusList: statusList,
    },
    //--------------------
    EnableSelection: false,
    EnableOrdering: false,
    EnableSelectAll: false,
    EnableLoader: true,
  };

  //========== LIFECYCLE =================================

  useEffect(() => loadData(), []);

  //========== METHODS ===================================

  const loadData = () => {
    setLoading(true);

    setTimeout(() => {
      setData(db);
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

    db = dataCopy;

    loadData();
  };

  //========== EVENTS ====================================

  const onFieldChanged = (e, value, rowIndex, cellIndex, column, rowData) => {
    var dataCopy = cloneDeep(data);
    var itemToUpdate = isEmpty(rowData.id)
      ? dataCopy[rowIndex]
      : dataCopy.find((x) => x.id === rowData.id);

    itemToUpdate[column.accessor] = value;

    if (itemToUpdate.isBlocked) itemToUpdate.balance = 0.0;

    setData(dataCopy);
  };

  const onSave = (rowIndex) => {
    var original = db[rowIndex] || config.EmptyDataItem;
    var edited = data[rowIndex];

    if (!isEqual(original, edited)) {
      setLoading(true);

      setTimeout(() => {
        if (isEmpty(data[rowIndex].name)) {
          if (
            confirm(
              "There are validation errors. Do you want to discard the edited data ?"
            )
          ) {
            //--
            var dataCopy = cloneDeep(data);
            dataCopy[rowIndex] = original;
            setData(dataCopy);
            setLoading(false);
            //--
          } else if (tableRef.current) {
            setLoading(false, () => {
              tableRef.current.focusLastActiveCell();
            });
          }
        } else {
          commitData();
          setLoading(false);
        }
      }, 800);
    }
  };

  const onDiscard = (e, rowIndex, cellIndex, rowData) => {
    var dataCopy = cloneDeep(data);

    var originalItem = db.find((x) => x.id === rowData.id);
    var itemToUpdate = dataCopy.find((x) => x.id === rowData.id);

    dataCopy[dataCopy.indexOf(itemToUpdate)] = originalItem
      ? originalItem
      : config.EmptyDataItem;

    setData(dataCopy);
  };

  const onCreateNewItem = (timeout) => {
    if (timeout > 0) setLoading(true);
    setData([...data, config.EmptyDataItem]);

    setTimeout(() => {
      if (timeout > 0) setLoading(false);
    }, timeout);
  };

  //========== RENDER ====================================

  return (
    <Container>
      <Commands>
        <Button onClick={loadData} text={"Reload"} />
        <Button
          onClick={() => tableRef.current.focusLastActiveCell()}
          text={"Focus last active cell"}
        />
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
            console.log("%c Save handler ", "background: green; color: white");
          }
        }}
        //--------------------------
        onDiscard={(e, rowIndex, cellIndex, rowData) => {
          onDiscard(e, rowIndex, cellIndex, rowData);
          console.log("%c Discard handler ", "background: black; color: white");
        }}
        //--------------------------
        onInputChange={(e, value, rowIndex, cellIndex, column, rowData) => {
          onFieldChanged(e, value, rowIndex, cellIndex, column, rowData);
          console.log(
            "%c Input changed handler ",
            "background: gray; color: white"
          );
        }}
        //--------------------------
      ></EditableTable>
    </Container>
  );
};

export default StoryTemplate;
