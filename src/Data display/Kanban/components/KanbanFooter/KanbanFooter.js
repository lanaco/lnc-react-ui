import React, { useEffect } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const StyledFooter = styled.div`
  font-family: ${(props) => props.theme?.typography?.fontFamily};
  padding: 5px 8px;
  margin-top: auto;
`;

export const KanbanFooter = React.memo(
    React.forwardRef(({ id, className, style, children, ...rest }, ref) => {

        const theme = useTheme();

        return <StyledFooter ref={ref} theme={theme} className={className} style={style} {...rest}>{children}</StyledFooter>
    })
);

KanbanFooter.defaultProps = {
    __TYPE__: "KANBAN_FOOTER",
    //-------------------------
    style: {},
    color: "primary",
    size: "small",
};

KanbanFooter.propTypes = {
    __TYPE__: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    style: PropTypes.object,
};
