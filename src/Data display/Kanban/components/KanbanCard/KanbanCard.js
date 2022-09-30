import React, { useEffect } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const StyledCard = styled.div`
  height: 100%;
  width: 100%;
  padding: 18px 20px;
`;

export const KanbanCard = React.memo(
  React.forwardRef(({ id, className, style, children, ...rest }, ref) => {
    const theme = useTheme();

    return (
      <StyledCard
        ref={ref}
        theme={theme}
        className={className}
        style={style}
        {...rest}
      >
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
