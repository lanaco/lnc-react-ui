/* eslint-disable react/prop-types */
import { memo, forwardRef } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import IconButton from "../../../../General/IconButton/IconButton";

const StyledFooter = styled.div`
  font-family: ${(props) => props.theme?.typography?.fontFamily};
  padding: 5px 8px;
  margin-top: auto;
`;

const KanbanFooter = memo(
  forwardRef(
    (
      {
        id,
        showAddNewCard = false,
        showLoadMoreCards = false,
        onAddNewCard = () => {},
        onLoadMoreCards = () => {},
        className = "",
        style = {},
        children,
        ...rest
      },
      ref,
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
              btnType="outline"
              style={{ maxWidth: "unset", width: "100%", marginBottom: "8px" }}
            />
          )}
          {showAddNewCard && (
            <IconButton
              onClick={(e) => onAddNewCard(e, id)}
              icon="plus-circle"
              btnType="outline"
              style={{ maxWidth: "unset", width: "100%", marginBottom: "8px" }}
            />
          )}
        </StyledFooter>
      );
    },
  ),
);

// TODO : type
// KanbanFooter.defaultProps = {
//   __TYPE__: "KANBAN_FOOTER",
//   //-------------------------
//   showLoadMoreCards: false,
//   showAddNewCard: false,
//   addNewCardText: "Add New Card",
//   //-------------------------
//   onAddNewCard: (e, columnId) => {},
//   onLoadMoreCards: (e, columnId) => {},
//   //-------------------------
//   style: {},
//   color: "primary",
//   size: "small",
// };

export default KanbanFooter;

KanbanFooter.displayName = "KANBAN_FOOTER";
