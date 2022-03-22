import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../_utils/theme";

const heightBySize = (size) => {
  if (size === "small") return `32px`;
  if (size === "medium") return `38px`;
  if (size === "large") return `44px`;
};

const ContainerWrapper = styled.div`
  min-height: ${(props) => heightBySize(props.size)};
  max-height: ${(props) => heightBySize(props.size)};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  border-radius: 2px;
`;

const Container = styled.div`
  min-height: ${(props) => heightBySize(props.size)};
  max-height: ${(props) => heightBySize(props.size)};
  background-color: #F5F5F5;
  padding: 6px;       
  border: 2px solid white;
  width: fit-content;
  border-radius: 8%;
};
`;

const Number = styled.div`
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.palette[props.color].light};
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
`;

const Description = styled.div`
  text-align: center;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
`;

const ItemCounter = (props) => {
  const { Items = [], theme, color, size } = props;
  const themeProps = { theme, size, color };

  if (Items) {
    return (
      <ContainerWrapper {...themeProps}>
        {Items.map((item, i) => (
          <Container {...themeProps} key={i}>
            <Number {...themeProps} color={item.color}>
              {item.number}
            </Number>
            <Description {...themeProps}># of {item.description}</Description>
          </Container>
        ))}
      </ContainerWrapper>
    );
  } else {
    return <div />;
  }
};

ItemCounter.defaultProps = {
  id: "",
  size: "small",
  text: "",
  color: "primary",
  theme: theme,
};

ItemCounter.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.any,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  text: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
    "background",
    "transparent",
  ]),
};

export default ItemCounter;
