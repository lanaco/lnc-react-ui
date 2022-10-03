import React from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import Icon from "../../../../General/Icon";
import DropdownMenu from "../../../../Utility/DropdownMenu/index";
import DropdownItem from "../../../../Utility/DropdownMenu/DropdownItem";

const StyledCard = styled.div`
  height: 100%;
  width: 100%;
  padding: 18px 20px;
  position: relative;
  & .card-action-lnc {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
`;

export const KanbanCard = React.memo(
  React.forwardRef(({ id, preventDrag, className, style, children, ...rest }, ref) => {
    const theme = useTheme();

    return (
      <StyledCard
        ref={ref}
        theme={theme}
        className={className}
        style={style}
        {...rest}
      >
        {/* <DropdownMenu
          className="card-action-lnc"
          control={
            <Icon className="card-action-lnc" icon="ellipsis-v" onClick={preventDrag} />
          }
        >
          <DropdownItem>OK</DropdownItem>
        </DropdownMenu> */}
        {children}
      </StyledCard>
    );
  })
);

KanbanCard.defaultProps = {
  __TYPE__: "KANBAN_CARD",
  //-------------------------
  style: {},
  color: "primary",
  size: "small",
};

KanbanCard.propTypes = {
  __TYPE__: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
};
