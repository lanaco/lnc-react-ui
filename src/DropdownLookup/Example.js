import React, { useState } from "react";
import DropdownLookup from "./index";

const Example = (props) => {
  //
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState({ key: 0, value: "" });

  const load = (text) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOptions(props.args.options);
    }, 700);
  };

  const clear = () => setOptions([]);

  const onChange = (_, value) => setValue(value);

  return (
    <div
      style={{
        width: "500px",
      }}
    >
      <DropdownLookup
        {...props.args}
        loading={loading}
        options={options}
        initialValue={value}
        load={load}
        clear={clear}
        //TODO: onSelectionChange maybe ?
        onChange={onChange}
      />
    </div>
  );
};

export default Example;
