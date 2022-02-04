import React from "react";
import styles from "./styles.module.css";
import ItemCounterTypes from "./ItemCounterTypes";
import styled from "@emotion/styled";

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  border-radius: 2px;
`;

const Container = styled.div`
  width: 100%;
  background-color: #ebf9ff;
  padding: 6px;
  border: 2px solid white;
  width: fit-content;
  border-radius: 8%;
  font-family: "Ubuntu";
  font-size: "0.70rem";
`;

const ItemCounter = (props) => {
  const { Items = [] } = props;

  const getClassForType = (typeCode) => {
    if (typeCode === ItemCounterTypes.Success.code) return styles.success;
    else if (typeCode === ItemCounterTypes.Danger.code) return styles.danger;
    else if (typeCode === ItemCounterTypes.Warning.code) return styles.warning;
  };

  if (Items) {
    return (
      <ContainerWrapper {...props.theme}>
        {Items.map((item, i) => (
          <Container key={i}>
            <div
              className={styles.number + " " + getClassForType(item.type.code)}
            >
              {item.number}
            </div>
            <div className={styles.number}># of {item.description}</div>
          </Container>
        ))}
      </ContainerWrapper>
    );
  } else {
    return <div />;
  }
};

export default ItemCounter;
