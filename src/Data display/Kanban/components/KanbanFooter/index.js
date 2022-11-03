import React from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import IconButton from "../../../../General/IconButton";

const StyledFooter = styled.div`
  font-family: ${(props) => props.theme?.typography?.fontFamily};
  padding: 5px 8px;
  margin-top: auto;
`;

const KanbanFooter = React.memo(
  React.forwardRef(
    (
      {
        id,
        showAddNewCard,
        showLoadMoreCards,
        addNewCardText,
        onAddNewCard,
        onLoadMoreCards,
        className,
        style,
        children,
        ...rest
      },
      ref
    ) => {
      const theme = useTheme();

      return (
        <StyledFooter
          ref={ref}
          theme={theme}
          className={className}
          style={style}
          {...rest}
        >
          {children}
          {showLoadMoreCards && (
            <IconButton
              onClick={(e) => onLoadMoreCards(e, id)}
              icon="chevron-circle-down"
              type="outline"
              style={{ maxWidth: "unset", width: "100%", marginBottom: "8px" }}
            />
          )}
          {showAddNewCard && (
            <IconButton
              onClick={(e) => onAddNewCard(e, id)}
              icon="plus-circle"
              type="outline"
              style={{ maxWidth: "unset", width: "100%", marginBottom: "8px" }}
            />
          )}
        </StyledFooter>
      );
    }
  )
);

KanbanFooter.defaultProps = {
  __TYPE__: "KANBAN_FOOTER",
  //-------------------------
  showLoadMoreCards: false,
  showAddNewCard: false,
  addNewCardText: "Add New Card",
  //-------------------------
  onAddNewCard: (e, columnId) => {},
  onLoadMoreCards: (e, columnId) => {},
  //-------------------------
  style: {},
  color: "primary",
  size: "small",
};

KanbanFooter.propTypes = {
  __TYPE__: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //---------------------------------------------------------
  showLoadMoreCards: PropTypes.bool,
  showAddNewCard: PropTypes.bool,
  addNewCardText: PropTypes.string,
  //---------------------------------------------------------
  onAddNewCard: PropTypes.func,
  onLoadMoreCards: PropTypes.func,
  //---------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
};

export default KanbanFooter;
