import React from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const StyledHeader = styled.div`
  font-family: ${(props) => props.theme?.typography?.fontFamily};
`;

export const KanbanHeader = React.memo(
    React.forwardRef(({ id, className, style, children, ...rest }, ref) => {

        const theme = useTheme();

        return <StyledHeader ref={ref} theme={theme} className={className} style={style} {...rest}>{children}</StyledHeader>
    })
);

KanbanHeader.defaultProps = {
    __TYPE__: "KANBAN_HEADER",
    //-------------------------
    style: {},
    color: "primary",
    size: "small",
};

KanbanHeader.propTypes = {
    __TYPE__: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    style: PropTypes.object,
};
