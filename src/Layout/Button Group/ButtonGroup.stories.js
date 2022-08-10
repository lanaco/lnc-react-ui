import React from "react";
import ButtonGroup from ".";
import Button from "../../General/Button/index";
import IconButton from "../../General/IconButton/index";

export default {
  title: "Layout/Button group",
  component: ButtonGroup,
};

const Template = (args) => (
  <div>
    <ButtonGroup>
      <Button type="filled" text="Really Left" color="neutral" />
      <Button type="tinted" text="Left" />
      <Button type="basic" text="Center" color="secondary" disabled={true} />
      <Button type="tinted" text="Right" />
      <Button type="filled" text="Really Right" color="neutral" />
    </ButtonGroup>
    <br />
    <ButtonGroup>
      <Button type="tinted" text="Really Left" color="neutral" />
      <Button type="basic" text="Left" />
      <Button type="basic" text="Center" color="secondary" />
      <Button type="basic" text="Right" />
      <Button type="tinted" text="Really Right" color="neutral" />
    </ButtonGroup>
    <br />
    <ButtonGroup>
      <IconButton type="filled" icon="angle-double-left" color="secondary" />
      <IconButton type="filled" icon="angle-left" color="primary" />
      <Button type="filled" text="1" color="neutral" />
      <Button type="filled" text="2" color="neutral" disabled={true} />
      <Button type="filled" text="3" color="neutral" />
      <IconButton type="filled" icon="angle-right" color="primary" />
      <IconButton type="filled" icon="angle-double-right" color="secondary" />
    </ButtonGroup>
    <br />
    <ButtonGroup>
      <IconButton type="basic" icon="angle-double-left" color="secondary" />
      <IconButton type="basic" icon="angle-left" color="primary" />
      <Button type="basic" text="1" color="neutral" />
      <Button type="basic" text="2" color="neutral" />
      <Button type="basic" text="3" color="neutral" />
      <IconButton type="basic" icon="angle-right" color="primary" />
      <IconButton type="basic" icon="angle-double-right" color="secondary" />
    </ButtonGroup>
    <br />
    <ButtonGroup>
      <IconButton type="basic" icon="angle-double-left" color="secondary" />
      <IconButton type="basic" icon="angle-left" color="primary" />
      <Button type="basic" text="1" color="neutral" />
      <Button type="basic" text="2" color="neutral" />
      <Button type="basic" text="3" color="neutral" />
      <IconButton type="basic" icon="angle-right" color="primary" />
      <IconButton type="basic" icon="angle-double-right" color="secondary" />
    </ButtonGroup>
  </div>
);

export const Default = Template.bind({});
