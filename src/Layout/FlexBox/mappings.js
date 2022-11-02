const Direction = {
  Row: "row",
  RowReverse: "row-reverse",
  Column: "column",
  ColumnReverse: "column-reverse",
};

const Wrap = {
  NoWrap: "nowrap",
  Wrap: "wrap",
  WrapReverse: "wrap-reverse",
};

const Justify = {
  Start: "flex-start",
  Center: "center",
  End: "flex-end",
  SpaceAround: "space-around",
  SpaceBetween: "space-between",
  SpaceEvenly: "space-evenly",
};

const Align = {
  Start: "flex-start",
  Center: "center",
  Stretch: "stretch",
  End: "flex-end",
  Baseline: "baseline",
};

export { Direction as DirectionMap, Wrap as WrapMap, Justify as JustifyMap, Align as AlignMap };
