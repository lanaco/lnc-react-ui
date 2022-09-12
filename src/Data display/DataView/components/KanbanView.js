import React, { useState } from "react";
import styled from "@emotion/styled";
import TextInput from "../../../Basic Inputs/TextInput";
import DecimalInput from "../../../Basic Inputs/DecimalInput";
import FlexGrid from "../../../Layout/FlexGrid";
import FormField from "../../../Layout/FormField";
import FlexGridItem from "../../../Layout/FlexGrid/FlexGridItem";
import { useEffectOnce } from "react-use";
import Button from "../../../General/Button";

const View = styled.div`
  border-radius: 8px;
  background-color: fcfcfc;
  padding: 8px 12px;
  border-radius: 8px;

  border: 1px solid #ededed;
`;

const KanbanView = (props) => {
  const { Data = [], GroupByAccesor = "", Groups = [] } = props;

  return <View></View>;
};

KanbanView.defaultProps = {
  __TYPE__: "KANBAN_VIEW",
};

export default KanbanView;
