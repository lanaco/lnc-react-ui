import React, { useState } from "react";
import styles from "./styles.module.css";
import Icon from "../../General/Icon/index";
import styled from "@emotion/styled";
import theme from "../../_utils/theme";
import Button from "../../General/Button/index.js";

//============================================================

const Dropdown = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  background-color: white;
  min-width: 160px;
  border-radius: 3.5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const ItemWrapper = styled.div`
  padding: 2px;
`;

const Item = styled.a`
  background-color: white;
  color: ${theme.palette.primary.main};
  padding: 6px 6px;
  text-decoration: none;
  display: block;
  font-size: 12px;
  padding: 2px;

  &:hover {
    background-color: whitesmoke;
    color: ${theme.palette.primary.light};
  }
`;

//============================================================

{
  /* <Button
          tooltip={Localization.Refresh}
          onClick={freezeLoading() ? () => {} : OnRefresh}
          // disabled={freezeLoading()}
          icon={"sync-alt"}
          inverted={true}
        /> */
}

const DropdownMenu = (props) => {
  const { actionData = () => {}, items = [] } = props;

  const [show, setShow] = useState(false);

  const onHover = () => {
    if (props.disabled !== true) setShow(true);
  };

  const onBlur = () => {
    setShow(false);
  };

  return (
    <div>
      <div onMouseOver={onHover} onMouseOut={onBlur}>
        <Button
          disabled={props.disabled}
          onClick={onHover}
          icon={"bars"}
          inverted={true}
        />
      </div>

      {/* <span className={styles.dropbtn} disabled={props.disabled}>
        {props.label}&nbsp;&nbsp;
        <span className={styles.iconSpan}>
          <i iconClassName={props.downDoubleIconClassName}></i>
        </span>
      </span> */}

      <Dropdown show={show}>
        {items.map((x, i) => (
          <ItemWrapper key={i} onMouseOver={onHover} onMouseOut={onBlur}>
            <Item
              href="#"
              onMouseOver={onHover}
              onMouseOut={onBlur}
              onClick={(e) => {
                e.preventDefault();
                x.action(actionData);
              }}
            >
              <span className={styles.linkInnerSpan}>
                <span className={styles.linkIconSpan}>
                  <Icon icon={x.icon} />
                </span>
                {x.name}
              </span>
            </Item>
          </ItemWrapper>
        ))}
      </Dropdown>

      {/* <div className={styles.dropdownContent}>
        {items.map((x, i) => (
          <a
            key={i}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              x.action(actionData);
            }}
          >
            <span className={styles.linkInnerSpan}>
              <span className={styles.linkIconSpan}>
                <Icon iconClassName={x.iconClassName}></Icon>
              </span>
              {x.name}
            </span>
          </a>
        ))}
      </div> */}
    </div>
  );
};

export default DropdownMenu;
